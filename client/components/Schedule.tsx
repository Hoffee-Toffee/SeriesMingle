import EpisodeDetails from './EpisodeDetails.tsx'
import { useEffect } from 'react'

export default function Schedule({ scheduleData, user }) {
  let {
    schedule,
    colors,
    bookmark,
    data,
    layers,
    titles,
    seenSpan,
    totalSpan,
    setTitles,
    setShow,
    setCustom,
    streak,
    goal,
    showStreaks,
    groupStreaks,
    streakEnds,
    streakLengths,
  } = scheduleData

  const numOfLayers = layers.reduce(
    (acc, layer) => (acc += layer.length > 1 ? 1 : 0),
    0,
  )

  function scrollToBookmark() {
    document.getElementById('bookmark') &&
      document.getElementById('timelineContainer').scroll({
        top: document.getElementById('bookmark').offsetTop - 5,
        left: 0,
        behavior: 'smooth',
      })
  }

  // get the length of each section
  const sessionLength =
    streak !== 0
      ? totalSpan / Math.round(Math.max(streakLengths.length / goal, 1))
      : totalSpan / Math.round(totalSpan / (goal * 60))
  const sessionEnds = []

  if (goal !== 0)
    (streak !== 0 ? streakLengths : schedule).reduce((total, element, i) => {
      const newTotal =
        total +
        (streak !== 0 ? element : element.runtime || element.average_run_time)
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
      sessions[sessions.length - 1].push({
        i,
        mid: entry.mid,
        layer: entry.layer,
      })

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
        const averageMid =
          group.reduce((sum, entry) => sum + entry.mid, 0) / group.length
        group.forEach((entry) => {
          schedule[entry.i].mid = averageMid
        })
      })
    })

    const oldSchedule = [...schedule]
    schedule.sort((a, b) => a.mid - b.mid)

    // Fix streakEnds to match the new sorted schedule
    streakEnds = streakEnds.map((end) =>
      schedule.findIndex((entry) => entry.posIndex == end),
    )
  }

  console.log('sessionEnds', sessionEnds)

  const seenPercentage = (seenSpan / totalSpan) * 100

  // Minutes -> Years, Months, Weeks, Days, Hours, Minutes (in that order, ignoring 0 values)
  // Units is simply how much to divide the total by to get how many of that unit
  // The remainder is then passed down to be processed by the next unit
  const timeUnits = {
    year: 525600,
    month: 43800,
    week: 10080,
    day: 1440,
    hour: 60,
    minute: 1,
  }

  const timeNames = Object.keys(timeUnits)

  const minutesToTime = (minutes) => {
    let remainder = minutes
    const time = timeNames
      .map((unit) => {
        const unitValue = Math.floor(remainder / timeUnits[unit])
        remainder -= unitValue * timeUnits[unit]
        return unitValue
          ? `${unitValue} ${unit}${unitValue > 1 ? 's' : ''}`
          : null
      })
      .filter(Boolean)

    // Join with ', ' except for the last two, which are joined with ', and '
    // If there are only two, then join with ' and '
    // If there is only one, then return it
    // If there are none, return '0 minutes'

    return (
      time.reduce((timeString, unit, i) => {
        // Rules:
        // If the last unit, simply add it
        // If the first of two units, add it with ' and '
        // If the second to last past this point, add it with ', and '
        // Otherwise, add it with ', '

        const reverseIndex = time.length - i - 1
        if (reverseIndex == 0) return timeString + unit
        if (reverseIndex == 1 && i == 0) return timeString + unit + ' and '
        if (reverseIndex == 1) return timeString + unit + ', and '
        return timeString + unit + ', '
      }, '') || '0 minutes'
    )
  }

  // console.log(`You have watched ${seenPercentage}% of your schedule.\nOr ${seenSpan} minutes out of ${totalSpan} minutes, with ${totalSpan - seenSpan} minutes remaining.`)
  console.log(
    `You have watched ${seenPercentage}% of your schedule.\nOr '${minutesToTime(seenSpan)}' out of '${minutesToTime(totalSpan)}', with '${minutesToTime(totalSpan - seenSpan)}' remaining.`,
  )
  return (
    <>
      <fieldset id="key">
        <legend>Key:</legend>
        {Object.values(colors.movie)
          .concat(Object.values(colors.tv))
          .concat(Object.values(colors.custom))
          .sort((a, b) => a.indices[0] - b.indices[0])
          .map((color) => (
            <span
              key={color.indices[0]}
              style={{ backgroundColor: `hwb(${color.color} 0% 25%)` }}
            >
              <span className="setTitle">
                {color.indices.length > 1
                  ? color.userTitle || color.title
                  : color.title}
              </span>
              <span className="setWatched">
                {`(${Math.round((color.watched / color.span) * 10000) / 100}% watched)`}
              </span>
            </span>
          ))}
      </fieldset>
      {bookmark && (
        <>
          <button onClick={scrollToBookmark}>
            Jump to Progress ({Math.round(seenPercentage * 100) / 100}% watched)
          </button>
          <button onClick={() => document.getElementById('removeWatchedPopup').classList.add('show')}
          >
            Remove Watched
          </button>
        </>
      )}
      <button onClick={() => document.getElementById('clearSchedulePopup').classList.add('show')}>
        Clear Schedule
      </button>
      <div id="timelineContainer">
        <div id="layerTitles">
          {numOfLayers && Array(numOfLayers)
            .fill()
            .map((_, j) => (
              <span
                key={j}
                style={{
                  marginLeft: `calc(${j * 30}px + 2px * (2 - var(--scale)))`,
                }}
              >
                {titles[j]}
              </span>
            ))}
        </div>

        <div id="scheduleVisualization">
          {schedule.map((entry, i) => (
            <>
              {entry.episodes ? (
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
              )}
              {streakEnds.includes(i) &&
                !(!showStreaks && goal !== 0 && !sessionEnds.includes(i)) ? (
                <span
                  className={[
                    sessionEnds.includes(i) ? 'sessionBound' : 'streakBound',
                    entry.show ? '' : 'fade',
                  ].join(' ')}
                />
              ) : null}
            </>
          ))}
        </div>
      </div>
    </>
  )
}
