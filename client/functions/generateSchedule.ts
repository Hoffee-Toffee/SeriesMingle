import {
  Barrier,
  Colors,
  CustomDetails,
  Data,
  EntryDetails,
  LayerEntry,
  LayerMedia,
  MediaDetails,
  Season,
  ShowDetails,
} from '../../models/schedule.ts'
import generateColors from '../functions/generateColors.ts'

export function generateSchedule(
  layers: LayerEntry[][],
  mpSpacing: string,
  bookmark: string | null,
  setBookmark: (bookmark: string | null) => void,
  data: Data,
  setLayers: (layers: LayerEntry[][], force: boolean) => void,
  titles: (string | null)[],
  setTitles: (id: number, title: string | null) => void,
  setShow: () => void,
  setCustom: (key: string, value: object) => void,
  streak: number,
  goal: number,
  showStreaks: boolean,
  groupStreaks: boolean,
) {
  // Loop over each layer, ignoring the final entry in each
  const schedule = layers.map((entries) => {
    // Loop over each entry, collapsing and removing some episodes
    return entries
      .map((entryRef: LayerEntry, i: number) => {
        // For books, do not skip the last entry
        if (typeof entryRef === 'object' && entryRef !== null && 'ref' in entryRef) {
          const [type, refId] = (entryRef as LayerMedia).ref;
          const entry = data[type]?.[refId];
          console.log(`[generateSchedule] Found entry for type=${type}, refId=${refId}:`, entry);
          if (!entry) {
            console.log('[generateSchedule] Entry not found in data:', type, refId, entryRef);
            return undefined;
          }
          if (type === 'movie') {
            console.log('[generateSchedule] Processing movie entry:', entry);
            return { ...entry, average_run_time: 30 };
          }
          if (type === 'custom') {
            console.log('[generateSchedule] Processing custom entry:', entry);
            return {
              ...entry,
              entries: Array((entry as CustomDetails).repeat)
                .fill(0)
                .map(() => ({ ...entry })),
            };
          }
          if (type === 'book') {
            console.log('[generateSchedule] Processing book entry:', entry);
            // Estimate duration: (pageCount * wordsPerPage) / readingSpeed (minutes)
            const wordsPerPage = entry.density || 250;
            const readingSpeed = 250; // words per minute
            const duration = ((entry.pageCount || 200) * wordsPerPage) / readingSpeed;
            console.log(`[generateSchedule] Book duration calculated: ${duration} minutes`);
            return { ...entry, runtime: duration, average_run_time: duration };
          }
          // Otherwise, its a show and needs its episodes returned
          let inRange = !(entryRef as LayerMedia).start;
          console.log('[generateSchedule] Processing show entry:', entry);
          return {
            ...entry,
            seasons: undefined,
            episodes: ((entry as ShowDetails).seasons || [])
              .flatMap((season: Season) =>
                season.episodes.map((episode: EntryDetails, num: number) => {
                  if (
                    !inRange &&
                    (entryRef as LayerMedia).start !==
                      `${season.season}:${episode.episode}`
                  )
                    return undefined;
                  inRange =
                    (entryRef as LayerMedia).end !==
                    `${season.season}:${episode.episode}`;
                  return {
                    ...episode,
                    average_run_time:
                      data.tv[(entryRef as LayerMedia).ref[1]].episode_run_time ||
                      30,
                    season: season.season,
                    show_id: entry.id,
                    show_title: entry.userTitle || entry.title,
                    // Set 'premier' and 'finale' depending on if first/last of this season
                    premier: !num,
                    finale: num === season.episodes.length - 1,
                  };
                }),
              )
              .filter((entry: EntryDetails | undefined) => entry !== undefined),
          };
        }
        // Return those where entryRef.barrier is defined
        if (typeof entryRef === 'object' && entryRef !== null && 'barrier' in entryRef) {
          console.log('[generateSchedule] Processing barrier entry:', entryRef);
          return entryRef as Barrier;
        }
        console.log('[generateSchedule] Entry missing ref and barrier:', entryRef);
        return undefined;
      })
      .filter((layer) => layer !== undefined)
  })

  const layerSpans = schedule.map((layer) =>
    layer.reduce(
      (running: number, entry) =>
        running +
        ('barrier' in entry
          ? 0
          : entry.type !== 'tv'
            ? ((entry as EntryDetails).runtime ||
                (entry as EntryDetails).average_run_time ||
                0) * ((entry as CustomDetails).repeat || 1)
            : ((entry as ShowDetails).episodes || []).reduce(
                (running: number, episode: EntryDetails) =>
                  running + (episode.runtime || episode.average_run_time || 0),
                0,
              )),
      0,
    ),
  )
  const totalSpan = layerSpans.reduce((running, layer) => running + layer, 0)

  let processed = schedule
    .map((layer, i) => {
      // For each layer we simply subtract it's combined runtime by the whole total (to get the blank times for that layer)
      // Then we divide that gap by that layer's total runtime to get the ratio of content to gap

      const padding = (totalSpan - layerSpans[i]) / layerSpans[i]

      // In each layer, the entries will be added with the calculated padding between each.
      // So, now we flatten the entries for each layer, giving them their 'start' points
      // That will be one set of padding offset from the current total, then it's runtime and it's padding will then be added to the new runtime

      const condensed: (MediaDetails | Barrier | { check: true })[] = []
      let series = [] as EntryDetails[]
      let temp = undefined as EntryDetails | undefined

      layer
        .map((entry, layer_id: number) =>
          !('barrier' in entry) && entry.type !== 'movie' && entry !== undefined
            ? (
                entry.type == 'tv'
                  ? entry.episodes
                  : entry.type == 'book'
                    ? [entry] // Directly include book entry
                    : 'entries' in entry && entry.entries || []
              ).map((episode: CustomDetails | EntryDetails | BookDetails | undefined) => ({
                ...episode,
                layer_id,
                layer: i,
                set: entry.id,
              }))
            : { ...entry, layer_id, layer: i },
        )
        .flat()
        .concat({ check: true })
        .forEach((entry) => {
          if (
            !('barrier' in entry) &&
            'type' in entry &&
            entry.type !== 'custom' &&
            entry.title
          ) {
            // Check if the title is in a multiple episode set
            const [full, title, part] =
              entry.title?.match(/^(.*) \((\d+)\)$/) || []

            if (full) {
              if (series.length + 1 == parseInt(part)) {
                series.push({ ...entry, title, part })
                return
              } else {
                temp = { ...entry, title, part }
              }
            }
          }

          if (series.length) {
            const first = series[0]

            const title = series.some((ce) => ce.title !== first.title)
              ? series.map((ce) => ce.title).join(' / ')
              : first.title
            const runtime = series.reduce(
              (rt, ce) => rt + (ce.runtime || ce.average_run_time || 0),
              0,
            )

            if (title == first.title) {
              series = series.map((ce) => ({
                ...ce,
                title: `${ce.title} (Part ${ce.part} of ${series.length})`,
              }))
            } else {
              series = series.map((ce) => ({
                ...ce,
                title: `${ce.title} (Arc ${ce.part} of ${series.length})`,
              }))
            }

            if (mpSpacing == 'normal') {
              condensed.push(...series)
            } else {
              condensed.push({
                type: 'multiple',
                runtime,
                episodes: series,
                average_run_time: series[0].average_run_time,
              })
            }

            series = temp ? [temp] : []

            if (temp) {
              temp = undefined
              return
            }
          }

          if (!('check' in entry)) condensed.push(entry)
        })

      let start = 0

      return condensed.map((entry) => {
        // If normal and near...
        if ('barrier' in entry) {
          return {
            ...(entry as Barrier),
            mid: start,
          }
        } else if (
          'type' in entry &&
          entry.type == 'multiple' &&
          mpSpacing == 'closer'
        ) {
          // Ratio of content to gap
          // Needs to be maintained
          const area =
            ((entry.runtime || entry.average_run_time || 0) * padding +
              (entry.runtime || entry.average_run_time || 0)) /
            4

          start += area

          const res = ((entry as ShowDetails).episodes as EntryDetails[]).map(
            (part: EntryDetails) => {
              const mid =
                start +
                (((part.runtime || part.average_run_time || 0) * padding) / 2 +
                  (part.runtime || part.average_run_time || 0) / 2 / 2)
              start +=
                ((part.runtime || part.average_run_time || 0) * padding +
                  (part.runtime || part.average_run_time || 0)) /
                2

              return {
                ...part,
                mid,
              }
            },
          )

          start += area

          return res
        } else if ('type' in entry) {
          const mid =
            start +
            ((entry.runtime ||
              ('average_run_time' in entry && entry.average_run_time) ||
              0) *
              padding) /
              2 +
            (entry.runtime ||
              ('average_run_time' in entry && entry.average_run_time) ||
              0) /
              2
          start +=
            (entry.runtime ||
              ('average_run_time' in entry && entry.average_run_time) ||
              0) *
              padding +
            (entry.runtime ||
              ('average_run_time' in entry && entry.average_run_time) ||
              0)

          if (entry.type !== 'multiple')
            return {
              ...entry,
              mid,
            }
          return ((entry as ShowDetails).episodes as EntryDetails[]).map(
            (episode: EntryDetails) => ({
              ...episode,
              mid,
            }),
          )
        }
      })
    })
    .map((layer) => layer.flatMap((entry) => entry || []))
    .filter((entry) => entry !== undefined)
    .map((layer) => {
      let nextBarrier = layer.find((entry) => 'barrier' in entry)

      if (!nextBarrier) return layer

      // o = original, t = target
      let oStart = 0
      let oEnd = nextBarrier.mid
      let tStart = 0
      let tEnd = totalSpan / (100 / (nextBarrier.barrier || 100))

      return layer.map((entry: MediaDetails, i: number) => {
        const mid =
          (((entry.mid || 0) - oStart) / (oEnd - oStart)) * (tEnd - tStart) +
          tStart

        if ('barrier' in entry) {
          nextBarrier = layer
            .slice(i + 1)
            .find((entry) => 'barrier' in entry) || {
            mid: totalSpan,
            barrier: 100,
          }
          oStart = entry.mid || oStart
          oEnd = nextBarrier.mid || oEnd
          tStart = totalSpan / (100 / ((entry as Barrier).barrier || 100))
          tEnd = totalSpan / (100 / (nextBarrier.barrier || 100))
        }

        return {
          ...entry,
          mid,
        }
      })
    })
    .map((layer, i) => {
      if (!streak) return layer

      const layerSpan = layerSpans[i]
      const streakLength = Math.round(streak * layerSpan * 60) / layerSpan

      return layer.map((entry) => {
        let mid = entry.mid
        mid /= totalSpan / layerSpan
        mid = Math.ceil(mid / streakLength) * streakLength
        mid /= layerSpan / totalSpan
        return {
          ...entry,
          mid,
        }
      })
    })
    .flat(2)
    .sort((a, b) => {
      if (a.mid == b.mid) return (a.layer || 0) - (b.layer || 0)
      return a.mid - b.mid
    })

  const sets = {
    tv: {},
    movie: {},
    custom: {},
    book: {},
  } as Data & { book: Record<string, any> };

  processed.forEach((entry, index) => {
    if ('barrier' in entry) return;
    if ('show_id' in entry && entry.show_id && !sets.tv[entry.show_id]) {
      sets.tv[entry.show_id] = {
        id: entry.show_id,
        title: entry.show_title,
        userTitle: data.tv[entry.show_id].userTitle,
        indices: [index],
        type: 'tv',
      };
    } else if (entry.type == 'custom') {
      if (!sets.custom[entry.id as keyof Data['custom']])
        sets.custom[entry.id as keyof Data['custom']] = {
          title: entry.title as string,
          indices: [index],
          type: 'custom',
          layer: entry.id,
        };
      else sets.custom[entry.id as keyof Data['custom']].indices?.push(index);
    } else if (
      ['movie', 'book'].includes(entry.type || '') &&
      !sets[entry.type as keyof Data][entry.layer as keyof Data['movie'] ]
    ) {
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']] = {
        title: `'${entry.userTitle || entry.title}'`,
        userTitle: titles[entry.layer as number] || undefined,
        indices: [index],
        layer: entry.layer,
        type: entry.type as 'movie' | 'book',
      };
    } else if (
      ['movie', 'book'].includes(entry.type || '') &&
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']] &&
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']].title?.endsWith("'")
    ) {
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']].title =
        sets[entry.type as keyof Data][entry.layer as keyof Data['movie']].title + ' & other ' + entry.type + 's';
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']].indices?.push(index);
    } else if (
      ['movie', 'book'].includes(entry.type || '')
    ) {
      sets[entry.type as keyof Data][entry.layer as keyof Data['movie']].indices?.push(index);
    }
  });

  console.log(JSON.stringify(sets, null, 2));

  const colors = {
    tv: {},
    movie: {},
    custom: {},
    book: {},
  } as Colors

  // Calculate the step size based on the number of shows and movies
  const numOfColors =
    Object.values(sets.tv).length +
    Object.values(sets.movie).length +
    Object.values(sets.custom).length +
    Object.values(sets.book).length

  const allColors = generateColors(numOfColors)

  // Assign a unique hue to each show / movie layer
  ;[
    Object.values(sets.movie),
    Object.values(sets.tv),
    Object.values(sets.custom),
    Object.values(sets.book),
  ]
    .flat()
    .sort((a, b) => (a.indices as number[])[0] - (b.indices as number[])[0])
    .forEach((set, index) => {
      const color = allColors?.[index]
      if (color == undefined) return
      if (set.type === 'book') {
        colors.book[set.layer as number] = { ...set, color }
      } else {
        colors[set.type as keyof Colors][
          set.type == 'tv' ? (set.id as number) : (set.layer as number)
        ] = { ...set, color }
      }
    })

  let showing = !bookmark
  let seenSpan = 0
  let lastStreak: string | null = null
  const streakLengths: number[] = []
  const streakEnds: number[] = []

  processed = processed.flatMap((entry, i: number) => {
    if ('barrier' in entry) {
      let className = ''
      const prev = processed[i - 1]
      const next = processed[i + 1]
      const isPrevBarrier =
        prev && 'barrier' in prev && prev.layer === entry.layer - 1
      const isNextBarrier =
        next && 'barrier' in next && next.layer === entry.layer + 1
      if (isPrevBarrier && isNextBarrier) {
        className = 'join-lr'
      } else if (isPrevBarrier) {
        className = 'join-l'
      } else if (isNextBarrier) {
        className = 'join-r'
      }
      return {
        ...entry,
        posIndex: i,
        show: showing,
        className,
      }
    }

    const posId = `${entry.layer}-${entry.layer_id}` + (
      entry.type == 'movie'
        ? ''
        : entry.type == 'book'
          ? '-' + entry.id
          : '-' + (['episode', 'multiple'].includes(entry.type || '')
            ? entry.id
            : ((entry.type == 'custom'
                ? colors.custom[(entry as CustomDetails).set as number]?.indices
                : entry.type == 'book'
                  ? colors.book[entry.id]?.indices
                  : colors[entry.type as keyof Colors][index]?.indices
              ) || []).findIndex((e) => e == i))
    );

    const show = (showing = Boolean(showing || (bookmark && posId == bookmark)))
    const span =
      entry.runtime ||
      ('average_run_time' in entry && entry.average_run_time) ||
      0
    const type = 'show_id' in entry ? 'tv' : entry.type
    const index =
      ('show_id' in entry && entry.show_id) ||
      ((['movie', 'book'].includes(entry.type || '')
        ? entry.layer
        : (entry as CustomDetails).set) as number);

      if (!colors[type as keyof Colors][index].span) {
        colors[type as keyof Colors][index].span = 0
        colors[type as keyof Colors][index].watched = 0
      }
      if (colors) (colors[type as keyof Colors][index].span as number) += span
      if (!showing) {
        seenSpan += span;
        (colors[type as keyof Colors][index].watched as number) += span
      }

    if (streak) {
      if (lastStreak == null) lastStreak = `${entry.mid}-${entry.layer_id}`
      streakLengths[streakEnds.length] =
        (streakLengths[streakEnds.length] || 0) + span

      if (lastStreak !== `${entry.mid}-${entry.layer_id}`) {
        lastStreak = `${entry.mid}-${entry.layer_id}`
        streakEnds.push(i - 1)
      }
    }

    return {
      ...entry,
      posIndex: i,
      show,
    }
  })

  console.log({ colors, sets })
  return {
    schedule: processed,
    colors,
    numberOfLayers: layers.filter((layer) =>
      layer.some((entry) => typeof entry === 'object' && !Array.isArray(entry)),
    ).length,
    seenSpan,
    totalSpan,
    bookmark,
    setBookmark,
    data,
    layers,
    setLayers,
    titles,
    setTitles,
    setShow,
    setCustom,
    streak,
    goal,
    showStreaks,
    groupStreaks,
    streakEnds,
    streakLengths,
  }
}
