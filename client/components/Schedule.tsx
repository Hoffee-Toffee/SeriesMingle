import EpisodeDetails from './EpisodeDetails.tsx'

export default function Schedule({ scheduleData }) {
  let { schedule, colors, bookmark, data, layers, setLayers, totalSpan } = scheduleData

  let showing = !bookmark
  let seenSpan = 0

  schedule = schedule.map((entry) => {
    const show = (showing =
      showing || (bookmark && `${entry.type}-${entry.id}` == bookmark))
    const span = entry.runtime || entry.average_run_time
    const type = entry.show_id ? 'tv' : 'movies'
    const index = entry.show_id || entry.layer

    if (!colors[type][index].span) {
      colors[type][index].span = 0
      colors[type][index].watched = 0
    }
    colors[type][index].span += span

    if (!showing) {
      seenSpan += span
      colors[type][index].watched += span
    }
    return {
      ...entry,
      show
    }
  })

  const seenPercentage = seenSpan / totalSpan * 100

  function removeWatched() {
    const seenProgress = {}
    schedule.toReversed().forEach((entry) => {
      const id = `${entry.layer}-${entry.layer_id}-${entry.type}-${entry.show_id || entry.id}`
      if (!entry.show && !seenProgress[id]) seenProgress[id] = entry
    })

    const seenProgressKeys = Object.keys(seenProgress)
    seenProgressKeys.forEach((id) => {
      const entry = seenProgress[id]
      if (entry.type == 'movie') layers[entry.layer][entry.layer_id] = undefined
      else {
        // Must be an episode, it's the last seen episode, so we need to find the next episode to start from
        const show = data.tv[entry.show_id]
        // Get the next episode in that season, if existing, or the first of the next season, if existing, or you must have finished the show so remove it
        const episodes = show.seasons.flatMap((season) => {
          const num = season.season
          return season.episodes.map((ep) => ({ ...ep, season: num }))
        })
        const nextEpisode =
          episodes[episodes.findIndex((episode) => episode.id == entry.id) + 1]

        if (nextEpisode)
          layers[entry.layer][entry.layer_id].start =
            `${nextEpisode.season}:${nextEpisode.episode}`
        else layers[entry.layer][entry.layer_id] = undefined
      }
    })

    setLayers(
      layers.map((layer) => layer.filter(Boolean)),
      true,
    )
  }

  return (
    <>
      <fieldset id="key">
        <legend>Key:</legend>
        {Object.values(colors.movies)
          .concat(Object.values(colors.tv))
          .sort((a, b) => a.firstIndex - b.firstIndex)
          .map((color) => (
            <span
              txt={color.title}
              key={color.firstIndex}
              style={{ backgroundColor: `hwb(${color.color} 0% 25%)` }}
              watched={`(${Math.round((color.watched / color.span) * 10000) / 100}% watched)`}
            />
          ))}
      </fieldset>
      {bookmark && (
        <>
          <a href="#bookmark">Jump to Progress ({Math.round(seenPercentage * 100) / 100}% watched)</a>
          <button onClick={removeWatched}>Remove Watched</button>
        </>
      )}
      <div id="timelineContainer">
        <div id="scheduleVisualization">
          {schedule.map((entry, i) =>
            entry.episodes ? (
              <div className="multiple" key={i}>
                {entry.episodes.map((episode, j) => (
                  <EpisodeDetails
                    entry={{ ...entry, ...episode }}
                    key={`${i}.${j + 1}`}
                    i={i}
                    {...scheduleData}
                  />
                ))}
              </div>
            ) : (
              <EpisodeDetails entry={entry} key={i} i={i} {...scheduleData} />
            ),
          )}
        </div>
      </div>
    </>
  )
}
