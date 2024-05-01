export default function Schedule({ scheduleData }) {
  const { schedule, colors, numberOfLayers } = scheduleData
  console.log(scheduleData)
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
          {schedule.map((entry, i) => (
            <div
              className={[
                'episode-marker',
                entry.part && 'part',
                entry.premier && 'premier',
                entry.finale && 'finale',
                entry.layer % 2 && 'odd',
              ]
                .filter(Boolean)
                .join(' ')}
              key={i}
              style={{
                height: `${entry.runtime}px`,
                marginLeft: `${entry.layer * 28 + 3}px`,
                backgroundColor: `hwb(${entry.show_id ? colors.tv[entry.show_id].color : colors.movies[entry.layer].color} 0% 25%)`,
              }}
            >
              <div
                className={['episode-detail', i % 2 && 'odd']
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  minHeight: `${entry.runtime + 4}px`,
                  maxHeight: `${entry.runtime + (schedule[i + 1] ? schedule[i + 1].runtime + 5 : 0)}px`,
                  width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - var(--offset))`,
                }}
              >
                <span
                  style={{
                    minHeight: `${entry.runtime - 8}px`,
                  }}
                >
                  {entry.show_id ? (
                    <>
                      {entry.show_title}
                      <br />S{entry.season}E{entry.episode}: {entry.title}
                    </>
                  ) : (
                    entry.title
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
