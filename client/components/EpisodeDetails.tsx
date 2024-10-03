export default function EpisodeDetails(props) {
  const {
    entry,
    i,
    schedule,
    colors,
    numberOfLayers,
    bookmark,
    setBookmark,
    last,
  } = props

  const minHeight = 30

  if (entry.barrier !== undefined) return (
    <div
      className={[
        'episode-marker',
        'barrier',
        !entry.show && 'fade',
        entry.layer % 2 && 'odd',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height: `calc(var(--scale) * 10px)`,
        marginLeft: `${entry.layer * 30 + 4}px`,
        marginTop: `calc(var(--scale) * 10px / 2)`,
        marginBottom: `calc(var(--scale) * 10px / 2)`,
      }}
    >
    </div>
  )

  const posId = `${entry.layer}-${entry.layer_id}${entry.type == 'movie' ? '' : '-' + (entry.type == 'episode' ? entry.id : colors.custom[entry.set].indices.findIndex((e) => e == i))}`

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
        marginLeft: `${entry.layer * 30 + 4}px`,
        backgroundColor: `hwb(${entry.show_id ? colors.tv[entry.show_id].color : entry.type == 'movie' ? colors.movie[entry.layer].color : colors.custom[entry.set].color} 0% 25%)`,
        marginTop: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || entry.average_run_time)) + 30}px / 2)`,
        marginBottom: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || entry.average_run_time)) + 30}px / 2)`,
      }}
      id={bookmark == posId ? 'bookmark' : undefined}
      data-id={entry.show_id ? `tv/${entry.show_id}/${entry.season}/${entry.episode}` : entry.type == 'movie' ? `movie/${entry.id}` : null}
      data-title={entry.show_title || entry.title}
    >
      <div
        className={['episode-detail', i % 2 && 'odd'].filter(Boolean).join(' ')}
        style={{
          minHeight: `${Math.max(minHeight, entry.runtime || entry.average_run_time) + 4}px`,
          maxHeight: `${Math.max(minHeight, entry.runtime || entry.average_run_time) + (schedule[i + 1] && Math.max(minHeight, schedule[i + 1].runtime || schedule[i + 1].average_run_time)) + 22}px`,
          width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - 5px)`,
        }}
      >
        <div
          style={{
            minHeight: `${Math.max(minHeight, entry.runtime || entry.average_run_time) - 12}px`,
            maxHeight: `calc(var(--scale) * ${Math.max(minHeight, entry.runtime || entry.average_run_time) - 5}px + var(--height-mult) * ${(schedule[i + 1] ? Math.max(minHeight, schedule[i + 1].runtime || schedule[i + 1].average_run_time) : 40) - 2}px)`,
          }}
        >
          <label htmlFor={`bookmark-${i}`}>
            <i
              className={`fa-${bookmark == posId ? 'solid' : 'regular'} fa-bookmark`}
            />
          </label>
          <input
            type="checkbox"
            id={`bookmark-${i}`}
            checked={bookmark == posId}
            onChange={() => {
              setBookmark(bookmark == posId ? null : posId)
            }}
          />
          {entry.show_id ? (
            <span>
              {colors.tv[entry.show_id].userTitle || entry.show_title} (S
              {entry.season}E{entry.episode})
            </span>
          ) : (
            entry.type == 'movie' ? (
              colors.movie[entry.layer].userTitle &&
              colors.movie[entry.layer].indices.length > 1 && (
                <span>
                  {`${colors.movie[entry.layer].userTitle} (${colors.movie[entry.layer].indices.findIndex((e) => e == i) + 1} of ${colors.movie[entry.layer].indices.length})`}
                </span>
              ))
              :
              colors.custom[entry.set].indices.length > 1 || (entry.offset && entry.offset > 0) ? (
                <span>
                  {colors.custom[entry.set].userTitle || colors.custom[entry.set].title}
                </span>
              ) : null
          )}
          <span className="title">
            {entry.type == 'custom' ?
              colors.custom[entry.set].indices.length > 1 || (entry.offset && entry.offset > 0) ? `${entry.term} ${colors.custom[entry.set].indices.findIndex((e) => e == i) + 1 + (entry.offset || 0)}` : colors.custom[entry.set].userTitle || colors.custom[entry.set].title
              :
              entry.userTitle || entry.title}
            {entry.runtime && <span className="spoiler">{`${entry.runtime > 59 ? `${Math.floor(entry.runtime / 60)}h` : ''}${entry.runtime > 59 && entry.runtime % 60 ? ' ' : ''}${entry.runtime % 60 ? `${entry.runtime % 60}m` : ''}`}</span>}
          </span>
          <span className="spoiler">
            {entry.type !== 'custom' ? entry.overview || 'No Description Available' :
              colors.custom[entry.set].indices.length > 1 || (entry.offset && entry.offset > 0) ? `From '${colors.custom[entry.set].userTitle || colors.custom[entry.set].title}', a custom entry` : 'A custom entry'}
          </span>
        </div>
      </div>
    </div>
  )
}
