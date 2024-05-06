import EpisodeDetails from './EpisodeDetails.tsx'

export default function Schedule({ scheduleData }) {
  const { schedule, colors, bookmark } = scheduleData

  let showing = !bookmark

  function show(entry) {
    return (showing =
      showing || (bookmark && `${entry.type}-${entry.id}` == bookmark))
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
            />
          ))}
      </fieldset>
      {bookmark && <a href="#bookmark">Jump to Progress</a>}
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
                    show={show(episode)}
                    {...scheduleData}
                  />
                ))}
              </div>
            ) : (
              <EpisodeDetails
                entry={entry}
                key={i}
                i={i}
                {...scheduleData}
                show={show(entry)}
              />
            ),
          )}
        </div>
      </div>
    </>
  )
}
