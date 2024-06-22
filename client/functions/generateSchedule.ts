import { sortCollisionsDesc } from '@dnd-kit/core/dist/utilities/algorithms/helpers'
import Entry from '../components/Entry.tsx'
import generateColors from '../functions/generateColors.ts'

export function generateSchedule(
  layers,
  mpSpacing,
  bookmark,
  setBookmark,
  data,
  setLayers,
  titles,
  setTitle,
  setShow,
  setCustom,
  streak,
  goal,
  showStreaks,
  groupStreaks,
) {
  // Loop over each layer, ignoring the final entry in each
  const schedule = layers.map((entries) => {
    // Loop over each entry, collapsing and removing some episodes
    return entries
      .map((entryRef, i) => {
        if (i === entries.length - 1) return undefined

        const entry = data[entryRef.ref[0]][entryRef.ref[1]]

        // If a movie, simply return it
        if (entry.type == 'movie') return { ...entry, average_run_time: 30 }
        // If custom, give it 'n' entries
        else if (entry.type == 'custom')
          return {
            ...entry,
            entries: Array(entry.repeat)
              .fill(0)
              .map((_) => ({
                ...entry,
              })),
          }

        // Otherwise, its a show and needs it's episodes returned
        let inRange = !entryRef.start

        return {
          ...entry,
          seasons: undefined,
          episodes: entry.seasons
            .flatMap((season, i) =>
              season.episodes.map((episode, num) => {
                if (!inRange && entryRef.start !== `${i + 1}:${num + 1}`)
                  return undefined
                inRange = entryRef.end !== `${i + 1}:${num + 1}`
                return {
                  ...episode,
                  average_run_time:
                    data.tv[entryRef.ref[1]].episode_run_time || 30,
                  season: season.season,
                  show_id: entry.id,
                  show_title: entry.title,
                  // Set 'premier' and 'finale' depending on if first/last of this season
                  premier: !num,
                  finale: num === season.episodes.length - 1,
                }
              }),
            )
            .filter((entry) => entry),
        }
      })
      .filter((entry) => entry)
  })

  const layerSpans = schedule.map((layer) =>
    layer.reduce(
      (running, entry) =>
        running +
        (entry.type !== 'tv'
          ? (entry.runtime || entry.average_run_time) * (entry.repeat || 1)
          : entry.episodes.reduce(
              (running, episode) =>
                running + (episode.runtime || episode.average_run_time),
              0,
            )),
      0,
    ),
  )
  const totalSpan = layerSpans.reduce((running, layer) => running + layer, 0)

  const processed = schedule
    .map((layer, i) => {
      // For each layer we simply subtract it's combined runtime by the whole total (to get the blank times for that layer)
      // Then we divide that gap by that layer's total runtime to get the ratio of content to gap

      const padding = (totalSpan - layerSpans[i]) / layerSpans[i]

      // In each layer, the entries will be added with the calculated padding between each.
      // So, now we flatten the entries for each layer, giving them their 'start' points
      // That will be one set of padding offset from the current total, then it's runtime and it's padding will then be added to the new runtime

      const condensed = []
      let series = []
      let temp

      layer
        .map((entry, layer_id) =>
          entry.type !== 'movie'
            ? entry[entry.type == 'tv' ? 'episodes' : 'entries'].map(
                (episode) => ({
                  ...episode,
                  layer_id,
                  layer: i,
                  set: entry.id,
                }),
              )
            : { ...entry, layer_id, layer: i },
        )
        .flat()
        .concat({ check: true })
        .forEach((entry) => {
          if (entry.type == 'custom') {
            condensed.push(entry)
            return
          } else if (entry.title) {
            // Check if the title is in a multiple episode set
            const [full, title, part] =
              entry.title.match(/^(.*) \((\d+)\)$/) || []

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
              (rt, ce) => rt + (ce.runtime || ce.average_run_time),
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

          if (!entry.check) {
            condensed.push(entry)
          }
        })

      let start = 0

      return condensed.map((entry) => {
        // If normal and near...
        if (entry.type == 'multiple' && mpSpacing == 'closer') {
          // Ratio of content to gap
          // Needs to be maintained
          const area =
            ((entry.runtime || entry.average_run_time) * padding +
              (entry.runtime || entry.average_run_time)) /
            4

          start += area

          const res = entry.episodes.map((part) => {
            const mid =
              start +
              (((part.runtime || part.average_run_time) * padding) / 2 +
                (part.runtime || part.average_run_time) / 2 / 2)
            start +=
              ((part.runtime || part.average_run_time) * padding +
                (part.runtime || part.average_run_time)) /
              2

            return {
              ...part,
              mid,
            }
          })

          start += area

          return res
        } else {
          const mid =
            start +
            ((entry.runtime || entry.average_run_time) * padding) / 2 +
            (entry.runtime || entry.average_run_time) / 2
          start +=
            (entry.runtime || entry.average_run_time) * padding +
            (entry.runtime || entry.average_run_time)

          if (entry.type !== 'multiple')
            return {
              ...entry,
              mid,
            }
          return entry.episodes.map((episode) => ({
            ...episode,
            mid,
          }))
        }
      })
    })
    .map((layer) => layer.flatMap((entry) => entry))
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
      if (a.mid == b.mid) return a.layer - b.layer
      return a.mid - b.mid
    })

  const sets = {
    tv: {},
    movie: {},
    custom: {},
  }

  processed.forEach((entry, index) => {
    // Each show and custom entry gets a unique color
    if (entry.show_id && !sets.tv[entry.show_id]) {
      sets.tv[entry.show_id] = {
        title: entry.show_title,
        userTitle: data.tv[entry.show_id].userTitle,
        show: entry.show_id,
        indices: [index],
        isShow: true,
        type: 'tv',
      }
    } else if (entry.type == 'custom') {
      if (!sets.custom[entry.id])
        sets.custom[entry.id] = {
          title: entry.title,
          indices: [index],
          isCustom: true,
          type: 'custom',
          layer: entry.id,
        }
      else sets.custom[entry.id].indices.push(index)
    }
    // Each layer gets a unique movie color
    else if (entry.type == 'movie' && !sets.movie[entry.layer]) {
      sets.movie[entry.layer] = {
        title: `'${entry.title}'`,
        userTitle: titles[entry.layer],
        indices: [index],
        layer: entry.layer,
        type: 'movie',
      }
    }
    // Add ' and others' if there are multiple, but only do so once
    else if (
      entry.type == 'movie' &&
      sets.movie[entry.layer] &&
      sets.movie[entry.layer].title.endsWith("'")
    ) {
      sets.movie[entry.layer].title =
        sets.movie[entry.layer].title + ' & other movies'
      sets.movie[entry.layer].indices.push(index)
    } else if (entry.type == 'movie') {
      sets.movie[entry.layer].indices.push(index)
    }
  })

  const colors = {
    tv: {},
    movie: {},
    custom: {},
  }

  // Calculate the step size based on the number of shows and movies
  const numOfColors =
    Object.values(sets.tv).length +
    Object.values(sets.movie).length +
    Object.values(sets.custom).length

  const allColors = generateColors(numOfColors)

  // Assign a unique hue to each show / movie layer
  Object.values(sets.movie)
    .concat(Object.values(sets.tv))
    .concat(Object.values(sets.custom))
    .sort((a, b) => a.indices[0] - b.indices[0])
    .forEach((set, index) => {
      const color = allColors[index]
      colors[set.type][set.isShow ? set.show : set.layer] = { ...set, color }
    })

  return {
    schedule: processed,
    colors,
    numberOfLayers: layers.filter((layer) =>
      layer.some((entry) => typeof entry === 'object' && !Array.isArray(entry)),
    ).length,
    totalSpan,
    bookmark,
    setBookmark,
    data,
    layers,
    setLayers,
    setTitle,
    setShow,
    setCustom,
    streak,
    goal,
    showStreaks,
    groupStreaks,
  }
}
