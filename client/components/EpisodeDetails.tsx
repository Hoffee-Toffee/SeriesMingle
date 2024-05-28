export default function EpisodeDetails(props) {
  const { entry, i, schedule, colors, numberOfLayers, bookmark, setBookmark, last } = props

  const minHeight = 30

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
        height: `calc(var(--scale) * ${Math.max(10, entry.runtime || entry.average_run_time)}px)`,
        marginLeft: `${entry.layer * 28 + 3}px`,
        backgroundColor: `hwb(${entry.show_id ? colors.tv[entry.show_id].color : colors.movies[entry.layer].color} 0% 25%)`,
        marginTop: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || entry.average_run_time)) + 30}px / 2)`,
        marginBottom: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || entry.average_run_time)) + 30}px / 2)`
      }}
      id={bookmark == `${entry.type}-${entry.id}` ? 'bookmark' : undefined}
    >
      <div
        className={['episode-detail', i % 2 && 'odd'].filter(Boolean).join(' ')}
        style={{
          minHeight: `${(Math.max(minHeight, (entry.runtime || entry.average_run_time))) + 4}px`,
          maxHeight: `${(Math.max(minHeight, (entry.runtime || entry.average_run_time))) + (schedule[i + 1] && Math.max(minHeight, (schedule[i + 1].runtime || schedule[i + 1].average_run_time))) + 20}px`,
          width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - var(--offset))`,
        }}
      >
        <div
          style={{
            minHeight: `${(Math.max(minHeight, (entry.runtime || entry.average_run_time))) - 12}px`,
            maxHeight: `calc(var(--scale) * ${(Math.max(minHeight, (entry.runtime || entry.average_run_time))) - 2}px + var(--height-mult) * ${(schedule[i + 1] ? Math.max(minHeight, (schedule[i + 1].runtime || schedule[i + 1].average_run_time)) : 40) - 2}px)`,
          }}
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
            <span>
              {colors.tv[entry.show_id].userTitle || entry.show_title} (S{entry.season}E{entry.episode})
            </span>
          ) : colors.movies[entry.layer].userTitle && <span>
            {colors.movies[entry.layer].userTitle} ({colors.movies[entry.layer].indices.findIndex(e => e == i) + 1} of {colors.movies[entry.layer].indices.length})
          </span>}
          <span className="title">{entry.title}</span>
          <span className="spoiler">
            {entry.overview || 'No Description Available'}
          </span>
        </div>
      </div>
    </div>
  )
}
