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
) {
  // Loop over each layer, ignoring the final entry in each
  const schedule = layers.map((entries) => {
    // Loop over each entry, collapsing and removing some episodes
    return entries
      .map((entryRef, i) => {
        if (i === entries.length - 1) return undefined

        const entry = data[entryRef.ref[0]][entryRef.ref[1]]

        // If a movie, simply return it
        if (entry.type === 'movie') return { ...entry, average_run_time: 30 }

        // Otherwise, its a show and needs it's episodes returned
        let started = !entryRef.start

        return {
          ...entry,
          seasons: undefined,
          episodes: entry.seasons
            .flatMap((season, i) =>
              season.episodes.map((episode, num) => {
                if (!started && entryRef.start !== `${i + 1}:${num + 1}`)
                  return undefined
                started = true
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
        (entry.type === 'movie'
          ? entry.runtime || entry.average_run_time
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
          entry.type == 'tv'
            ? entry.episodes.map((episode) => ({
                ...episode,
                layer_id,
                layer: i,
              }))
            : { ...entry, layer_id, layer: i },
        )
        .flat()
        .concat({ check: true })
        .forEach((entry) => {
          if (entry.title) {
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
    .flat(2)
    .sort((a, b) => {
      if (a.mid == b.mid) return a.layer - b.layer
      return a.mid - b.mid
    })

  const sets = {
    tv: {},
    movies: {},
  }

  processed.forEach((entry, index) => {
    // Each show gets a unique color
    if (entry.show_id && !sets.tv[entry.show_id]) {
      sets.tv[entry.show_id] = {
        title: `'${entry.show_title}'`,
        firstIndex: index,
      }
    }
    // Each layer gets a unique movie color
    else if (entry.type == 'movie' && !sets.movies[entry.layer]) {
      sets.movies[entry.layer] = {
        title: `'${entry.title}'`,
        userTitle: titles[entry.layer],
        firstIndex: index,
        layer: entry.layer,
        set: !!titles[entry.layer],
      }
    }
    // Add ' and others' if there are multiple, but only do so once
    else if (
      entry.type == 'movie' &&
      sets.movies[entry.layer] &&
      sets.movies[entry.layer].title.endsWith("'")
    ) {
      sets.movies[entry.layer].title =
        sets.movies[entry.layer].title + ' & other movies'
    }
  })

  const colors = {
    tv: {},
    movies: {},
  }

  // Calculate the step size based on the number of shows and movies
  const numOfColors =
    Object.values(sets.tv).length + Object.values(sets.movies).length

  const allColors = generateColors(numOfColors)

  // Assign a unique hue to each show / movie layer
  Object.entries(sets.tv).forEach((entry, index) => {
    const [show_id, info] = entry

    // Calculate the hue for each show based on its position
    const color = allColors[index]
    colors.tv[show_id] = { ...info, color }
  })

  Object.entries(sets.movies).forEach((entry, index) => {
    const [layer_id, info] = entry

    // Calculate the hue for each show based on its position
    const color = allColors[index + Object.values(sets.tv).length]
    colors.movies[layer_id] = { ...info, color }
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
  }
}
