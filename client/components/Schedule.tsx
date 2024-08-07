import EpisodeDetails from './EpisodeDetails.tsx'
import { useEffect } from 'react';

export default function Schedule({ scheduleData, user }) {
  const { schedule, colors, bookmark, data, layers, setLayers, seenSpan, totalSpan, setTitles, setShow, setCustom, streak, goal, showStreaks, groupStreaks } = scheduleData

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

  const seenPercentage = seenSpan / totalSpan * 100

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
                    setTitles(color.layer, newText)
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
          <button onClick={() => document.getElementById('removeWatchedPopup').classList.add("show")}>Remove Watched</button>
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
