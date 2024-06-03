import EpisodeDetails from './EpisodeDetails.tsx'

export default function Schedule({ scheduleData }) {
  let { schedule, colors, bookmark, data, layers, setLayers, totalSpan, setTitle, setShow, setCustom } = scheduleData

  let showing = !bookmark
  let seenSpan = 0

  schedule = schedule.map((entry, i) => {
    const posId = `${entry.layer}-${entry.layer_id}${entry.type == 'movie' ? '' : '-' + (entry.type == 'episode' ? entry.id : colors.custom[entry.set].indices.findIndex(e => e == i))}`

    const show = (showing =
      showing || (bookmark && posId == bookmark))
    const span = entry.runtime || entry.average_run_time
    const type = entry.show_id ? 'tv' : entry.type
    const index = entry.show_id || (entry.type == 'movie' ? entry.layer : entry.set)

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
      posIndex: i,
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
      else if (entry.type == 'episode') {
        // Must be an episode, it's the last seen episode/entry, so we need to find the next episode to start from
        const show = data.tv[entry.show_id]
        // Get the next episode in that season, if existing, or the first of the next season, if existing, but only up until the 'end' season
        const episodes = show.seasons.flatMap((season, num) => {
          return season.episodes.map((ep, i) => ({ ...ep, pos: `${num + 1}:${i + 1}` }))
        })
        const nextEpisode =
          episodes.find(episode => episode.id == entry.id).pos !== layers[entry.layer][entry.layer_id].end && episodes[episodes.findIndex((episode) => episode.id == entry.id) + 1]

        if (nextEpisode)
          layers[entry.layer][entry.layer_id].start = nextEpisode.pos
        else layers[entry.layer][entry.layer_id] = undefined
      }
      else {
        // Must be a custom entry, this will be handled shortly
        const newRepeat = entry.repeat - colors.custom[entry.id].indices.findIndex((e) => e == entry.posIndex) - 1
        if (newRepeat) setCustom({ ...entry, repeat: newRepeat, offset: entry.repeat - newRepeat + (entry.offset || 0) })
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
        {Object.values(colors.movie)
          .concat(Object.values(colors.tv)).concat(Object.values(colors.custom))
          .sort((a, b) => a.indices[0] - b.indices[0])
          .map((color) => (
            <span
              key={color.indices[0]}
              style={{ backgroundColor: `hwb(${color.color} 0% 25%)` }}
            >
              <span className={`setTitle${color.isShow ? " showTitle" : ""}`} contentEditable suppressContentEditableWarning={true}
                onBlur={(e) => {
                  let newText = null
                  if (!e.target.innerText.trim()) {
                    e.target.innerText = color.title
                  }
                  else if ((color.userTitle || color.title) == e.target.innerText) {
                    e.target.innerText = (color.userTitle || color.title)
                    return
                  }
                  else {
                    newText = e.target.innerText
                  }

                  if (color.isShow) {
                    setShow(color.show, newText)
                  }
                  else if (color.type == 'movie') {
                    setTitle(color.layer, newText)
                  }
                  else {
                    setCustom({ ...data.custom[color.layer], title: newText })
                  }
                }}
              >
                {color.userTitle || color.title}
              </span>
              <span className="setWatched">
                {`(${Math.round((color.watched / color.span) * 10000) / 100}% watched)`}
              </span>
            </span>
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
