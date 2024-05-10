export default function EpisodeDetails(props) {
  const { entry, i, schedule, colors, numberOfLayers, bookmark, setBookmark } =
    props
  const minRuntime = 30

  return (
    <div
      className={[
        'episode-marker',
        entry.part && 'part',
        entry.premier && 'premier',
        entry.finale && 'finale',
        entry.layer % 2 && 'odd',
        !entry.show && 'fade',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height: `calc(var(--scale) * ${Math.max(entry.runtime, minRuntime)}px)`,
        marginLeft: `${entry.layer * 28 + 3}px`,
        backgroundColor: `hwb(${entry.show_id ? colors.tv[entry.show_id].color : colors.movies[entry.layer].color} 0% 25%)`,
      }}
    >
      <div
        className={['episode-detail', i % 2 && 'odd'].filter(Boolean).join(' ')}
        style={{
          minHeight: `${Math.max(entry.runtime, minRuntime) + 4}px`,
          maxHeight: `${Math.max(entry.runtime, minRuntime) + (schedule[i + 1] ? schedule[i + 1].runtime : 30) + 10}px`,
          width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - var(--offset))`,
        }}
      >
        <div
          style={{
            minHeight: `${Math.max(entry.runtime, minRuntime) - 12}px`,
            maxHeight: `calc(var(--scale) * ${Math.max(entry.runtime, minRuntime) - 4}px + var(--height-mult) * ${(schedule[i + 1] ? schedule[i + 1].runtime : 30) - 2}px)`,
          }}
          id={bookmark == `${entry.type}-${entry.id}` ? 'bookmark' : undefined}
        >
          <label htmlFor={`bookmark-${i}`}>
            <i
              className={`fa-${bookmark == `${entry.type}-${entry.id}` ? 'solid' : 'regular'} fa-bookmark`}
            />
          </label>
          <input
            type="checkbox"
            id={`bookmark-${i}`}
            checked={bookmark == `${entry.type}-${entry.id}`}
            onChange={() => {
              const newVal = `${entry.type}-${entry.id}`
              setBookmark(newVal == bookmark ? null : newVal)
            }}
          />
          {entry.show_id ? (
            <>
              <span>
                {entry.show_title} (S{entry.season}E{entry.episode})
              </span>
              <span className="title">{entry.title}</span>
              <span className="spoiler">
                {entry.overview || 'No Description Available'}
              </span>
            </>
          ) : (
            <>
              <span className="title">{entry.title}</span>
              <span className="spoiler">
                {entry.overview || 'No Description Available'}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
