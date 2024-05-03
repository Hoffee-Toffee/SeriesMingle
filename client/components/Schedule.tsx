import EpisodeDetails from './EpisodeDetails.tsx'

export default function Schedule({ scheduleData }) {
  const { schedule, colors } = scheduleData

  return (
    <>
      <fieldset id="key">
        <legend>Key:</legend>
        {['movies', 'tv'].map((type) =>
          Object.values(colors[type]).map((color) => (
            <span
              txt={color.text}
              key={color.text}
              style={{ backgroundColor: `hwb(${color.color} 0% 25%)` }}
            />
          )),
        )}
      </fieldset>
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
