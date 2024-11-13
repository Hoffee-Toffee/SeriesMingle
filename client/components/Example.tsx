/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { generateSchedule } from '../functions/generateSchedule.ts'
import example from '../files/example.json'
import EpisodeDetails from '../components/EpisodeDetails.tsx'

const { schedule, colors } = generateSchedule(
  example.layers,
  'normal',
  null,
  () => { },
  example.data,
  () => { },
  example.titles,
  () => { },
  () => { },
  () => { },
  0,
  0,
  true,
  false,
);

[colors.movie[0].color, colors.movie[1].color] = [colors.movie[1].color, colors.movie[0].color]

export default function Example({ id }: { id: string }) {
  if (!["main", "bookmark", "background"].includes(id)) id = "background"

  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh((prev) => !prev)
    }, 50) // 20ms, time between re-renders

    return () => clearInterval(intervalId)
  }, [])

  const loopTime = 1000 * 60 * 60 // 1 hour, until loop restarts
  const scale = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--scale',
    ),
  )

  const viewHeight = window.outerHeight * (2 / 3)
  const bodyHeight = schedule.reduce(
    (acc, cur) => acc + (scale * (Math.max(10, cur.runtime || cur.average_run_time) + 0.5 * (Math.max(0, 30 - (cur.runtime || cur.average_run_time))) + 15)) + 4,
    viewHeight / 2,
  )

  const entryPositions = (offset, top = 0) => {
    let isFirst = true

    return schedule.map((entry) => {
      const posId = `${entry.layer}-${entry.layer_id}${entry.type == 'movie' ? '' : '-' + (entry.type == 'episode' ? entry.id : colors.custom[entry.set].indices.findIndex((e: any) => e == i))}`

      const height = scale * Math.max(10, entry.runtime || entry.average_run_time) + 4
      const margin = scale * Math.max(0, 30 - (entry.runtime || entry.average_run_time)) / 2 + (scale * 15)
      const toReturn = []

      if (
        top + height >= offset - margin &&
        top <= offset + viewHeight + margin
      ) {
        const y = top - offset
        top += height + margin

        if (isFirst) {
          isFirst = false
          toReturn.push(Math.round(y))
        }

        if (id == "background") return [...toReturn, entry]

        // If any part is touching the 1/2 vertical line...
        if (top - height <= offset + viewHeight / 2 && top >= offset + viewHeight / 2) entry = { ...entry, className: "highlighted" }
        // If schedule is 'bookmark' and if any part is touching one margin after the 1/2 vertical line then also set it's bookmark to it's posID
        if (id == "bookmark" && top - height <= offset + viewHeight / 2 - (scale * 15) && top >= offset + viewHeight / 2 - (scale * 30)) entry = { ...entry, className: `${entry.className || ""} bookmarked`, bookmark: posId }
        toReturn.push(entry)

        return toReturn
      }
      top += height + margin
      return toReturn
    }).filter(Boolean).flat()
  }

  const offset = ((Date.now()) % loopTime) * ((bodyHeight) / loopTime) - viewHeight / 2
  // const offset = bodyHeight - viewHeight / 2

  // 0 - viewHeight / 3 to 0,
  // bodyHeight - viewHeight / 3 to bodyHeight
  const elements = []

  if (offset >= bodyHeight - viewHeight && offset <= bodyHeight) {
    elements.push(...entryPositions(offset), ...entryPositions(offset % (bodyHeight - viewHeight), offset - bodyHeight + viewHeight + viewHeight / 2))
  }
  else {
    elements.push(...entryPositions(offset))
  }

  return (<div id="project" className="bg">
    <div id="timelineContainer" data-id={id}>
      <div id="layerTitles">
        <span style={{ marginLeft: "calc(0px + 2px * (2 - var(--scale)))" }}>
          Breaking Bad Universe
        </span>
        <span style={{ marginLeft: "calc(30px + 2px * (2 - var(--scale)))" }}>
          James Bond Films
        </span>
        <span style={{ marginLeft: "calc(60px + 2px * (2 - var(--scale)))" }}>
          'House'
        </span>
      </div>
      <div id="scheduleVisualization">
        {elements.map((entry) => typeof entry === "number" ? (
          <div
            key={-1}
            style={{
              marginTop: `${entry}px`,
            }}
          />
        ) : (
          <EpisodeDetails
            entry={entry}
            key={entry.posIndex}
            i={entry.posIndex}
            schedule={schedule}
            colors={colors}
            numberOfLayers={example.layers.length}
            bookmark={entry.bookmark || null}
            setBookmark={() => { }}
            className={entry.className || null}
          />
        ))}
      </div>
    </div>
  </div>)
}