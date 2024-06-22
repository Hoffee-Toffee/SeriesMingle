import EpisodeDetails from './EpisodeDetails.tsx'
import { useEffect } from 'react';

export default function Schedule({ scheduleData, user }) {
  let { schedule, colors, bookmark, data, layers, setLayers, totalSpan, setTitle, setShow, setCustom, streak, goal, showStreaks, groupStreaks } = scheduleData

  let showing = !bookmark
  let seenSpan = 0
  let lastStreak = null
  let streakEnds = []
  const streakLengths = []

  useEffect(scrollToBookmark, [user]);

  function scrollToBookmark() {
    document.getElementById('bookmark') && document.getElementById('timelineContainer').scroll({
      top: document.getElementById('bookmark').offsetTop - 5,
      left: 0,
      behavior: 'smooth',
    })
  }

  schedule = schedule.flatMap((entry, i) => {
    const posId = `${entry.layer}-${entry.layer_id}${entry.type == 'movie' ? '' : '-' + (['episode', 'multiple'].includes(entry.type) ? entry.id : colors.custom[entry.set].indices.findIndex(e => e == i))}`

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

    if (streak) {
      if (lastStreak == null) lastStreak = `${entry.mid}-${entry.layerId}`
      streakLengths[streakEnds.length] = (streakLengths[streakEnds.length] || 0) + span

      if (lastStreak !== `${entry.mid}-${entry.layerId}`) {
        lastStreak = `${entry.mid}-${entry.layerId}`
        streakEnds.push(i - 1)
      }
    }

    return {
      ...entry,
      posIndex: i,
      show
    }
  })

  // get the length of each section
  const sessionLength = streak !== 0 ? totalSpan / Math.round(Math.max(streakLengths.length / goal, 1)) : totalSpan / (goal * 60)
  const sessionEnds = []

  if (goal !== 0) (streak !== 0 ? streakLengths : schedule).reduce((total, element, i) => {
    const newTotal = total + (streak !== 0 ? element : (element.runtime || element.average_run_time))
    const target = sessionLength * (sessionEnds.length + 1)

    // We will start by checking if total is closer to totalPassed + 1 than newTotal is
    // Only will check when newTotal is greater than target
    if (Math.abs(target - total) < Math.abs(target - newTotal)) {
      sessionEnds.push(streak !== 0 ? streakEnds[i - 1] : i - 1)
      if (streak == 0) streakEnds.push(i - 1)
    }

    return newTotal
  }, 0)

  if (streak !== 0 && groupStreaks && goal !== 0) {
    // Group same-source streaks within watch sessions
    // AKA for every session, loop over each streak, averaging out the midpoints of all streak entries of the same layer_id

    const sessions = [[]]

    schedule.forEach((entry, i) => {
      // Add to the end of the last session in the array
      sessions[sessions.length - 1].push({ i, mid: entry.mid, layer: entry.layer })

      // If the end of a session, then add an empty array for the next session
      if (sessionEnds.includes(i)) sessions.push([])
    })

    sessions.forEach((session) => {
      // Group all entries by layers
      const groups = session.reduce((groups, entry) => {
        const layer = entry.layer
        if (!groups[layer]) groups[layer] = []
        groups[layer].push(entry)
        return groups
      }, [])

      // For each group, calculate the average midpoint of all entries
      groups.forEach((group) => {
        console.log(group)
        const averageMid = group.reduce((sum, entry) => sum + entry.mid, 0) / group.length
        group.forEach((entry) => {
          schedule[entry.i].mid = averageMid
        })
      })
    })

    const oldSchedule = [...schedule]
    schedule.sort((a, b) => a.mid - b.mid)

    // Fix streakEnds to match the new sorted schedule
    streakEnds = streakEnds.map((end) => schedule.findIndex((entry) => entry.posIndex == end))
  }

  console.log(streakEnds)
  console.log(sessionEnds)

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
          <button onClick={scrollToBookmark}>Jump to Progress ({Math.round(seenPercentage * 100) / 100}% watched)</button>
          <button onClick={removeWatched}>Remove Watched</button>
        </>
      )}
      <div id="timelineContainer">
        <div id="scheduleVisualization">
          {schedule.map((entry, i) =>
            <>{entry.episodes ? (
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
              // Show if in the list, but not if 'showStreaks' is false while 'goal' is not 0
            )}{streakEnds.includes(i) && !(!showStreaks && goal !== 0 && !sessionEnds.includes(i)) ? <span className={[sessionEnds.includes(i) ? "sessionBound" : "streakBound", entry.show ? '' : 'fade'].join(' ')} /> : null}
            </>
          )}
        </div>
      </div>
    </>
  )
}
