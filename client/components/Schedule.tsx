export default function Schedule({ schedule, colors }) {
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
      <div
        id="timelineContainer"
        style={{ width: '100%', overflowX: 'scroll', border: '1px solid #ccc' }}
      >
        <div id="scheduleVisualization">
          {schedule.map((entry, i) => (
            <div
              title={entry.title}
              className={`episode-marker${entry.part ? ' part' : ''}`}
              key={i}
              style={{
                marginTop: `${entry.layer * 25}px`,
                width: `${entry.runtime / 2}px`,
                backgroundColor: `hwb(${entry.show_id ? colors.tv[entry.show_id].color : colors.movies[entry.layer].color} 0% 25%)`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}
