export function generateSchedule(layers, mpSpacing, bookmark, setBookmark) {
  // Loop over each layer, ignoring the final entry in each
  const schedule = layers.map((entries) => {
    // Loop over each entry, collapsing and removing some episodes
    return entries
      .map((entry, i) => {
        if (i === entries.length - 1) return undefined

        // If a movie, simply return it
        if (entry.type === 'movie') return entry

        // Otherwise, its a show and needs it's episodes returned
        let started = false

        return {
          ...entry,
          seasons: undefined,
          episodes: entry.seasons
            .flatMap((season) =>
              season.episodes.map((episode, num) => {
                if (!started && !episode.start) return undefined
                started = true
                return {
                  ...episode,
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
          ? entry.runtime
          : entry.episodes.reduce(
              (running, episode) => running + episode.runtime,
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
        .map((entry) => (entry.type == 'tv' ? entry.episodes : entry))
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
            const runtime = series.reduce((rt, ce) => rt + ce.runtime, 0)

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
          const area = (entry.runtime * padding + entry.runtime) / 4

          start += area

          const res = entry.episodes.map((part) => {
            const mid =
              start + ((part.runtime * padding) / 2 + part.runtime / 2 / 2)
            start += (part.runtime * padding + part.runtime) / 2

            return {
              ...part,
              mid,
              layer: i,
            }
          })

          start += area

          return res
        } else {
          const mid = start + (entry.runtime * padding) / 2 + entry.runtime / 2
          start += entry.runtime * padding + entry.runtime

          if (entry.type !== 'multiple')
            return {
              ...entry,
              mid,
              layer: i,
            }
          return entry.episodes.map((episode) => ({
            ...episode,
            mid,
            layer: i,
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
        firstIndex: index,
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
    360 / (Object.values(sets.tv).length + Object.values(sets.movies).length)

  // Assign a unique hue to each show / movie layer
  Object.entries(sets.tv).forEach((entry, index) => {
    const [show_id, info] = entry

    // Calculate the hue for each show based on its position
    const color = (index * numOfColors) % 360
    colors.tv[show_id] = { ...info, color }
  })

  Object.entries(sets.movies).forEach((entry, index) => {
    const [layer_id, info] = entry

    // Calculate the hue for each show based on its position
    const color = ((index + Object.values(sets.tv).length) * numOfColors) % 360
    colors.movies[layer_id] = { ...info, color }
  })

  return {
    schedule: processed,
    colors,
    numberOfLayers: layers.filter((layer) =>
      layer.some((entry) => typeof entry === 'object' && !Array.isArray(entry)),
    ).length,
    bookmark,
    setBookmark,
  }
}
