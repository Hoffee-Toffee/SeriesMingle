import { Barrier, Colors, CustomDetails, EntryDetails, MediaDetails } from "../../models/schedule"

export default function EpisodeDetails(props: {
  entry: MediaDetails | Barrier
  i: number
  schedule: (MediaDetails | Barrier)[]
  colors: Colors
  numberOfLayers: number
  bookmark: string | null
  setBookmark: (bookmark: string | null) => void
  className: string
}) {
  const {
    entry,
    i,
    schedule,
    colors,
    numberOfLayers,
    bookmark,
    setBookmark,
    className,
  } = props

  const minHeight = 30

  if ("barrier" in entry) return (
    <div
      className={[
        'episode-marker',
        'barrier',
        !entry.show && 'fade',
        (entry.layer || 0) % 2 && 'odd',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height: `calc(var(--scale) * 10px)`,
        marginLeft: `${((entry.layer || 0) * 30) + 4}px`,
        marginTop: `calc(var(--scale) * 10px / 2)`,
        marginBottom: `calc(var(--scale) * 10px / 2)`,
      }}
    >
    </div>
  )

  const posId = `${entry.layer}-${entry.layer_id}${entry.type == 'movie' ? '' : '-' + (entry.type == 'episode' ? entry.id : (colors.custom[(entry as CustomDetails).set as number].indices || []).findIndex((e: number) => e == i))}`

  return (
    <div
      className={[
        'episode-marker',
        'part' in entry && 'part',
        'premier' in entry && entry.premier && 'premier',
        'finale' in entry && entry.finale && 'finale',
        (entry.layer || 0) % 2 && 'odd',
        !entry.show && 'fade',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height: `calc(var(--scale) * ${Math.max(10, entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0)}px)`,
        marginLeft: `${((entry.layer || 0) * 30) + 4}px`,
        backgroundColor: `hwb(${'show_id' in entry ? colors.tv[entry.show_id as number].color : entry.type == 'movie' ? colors.movie[entry.layer as number].color : colors.custom[(entry as CustomDetails).set as number].color} 0% 25%)`,
        marginTop: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0)) + 30}px / 2)`,
        marginBottom: `calc(var(--scale) * ${Math.max(0, minHeight - (entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0)) + 30}px / 2)`,
      }}
      id={bookmark == posId ? 'bookmark' : undefined}
      data-id={'show_id' in entry ? `tv/${entry.show_id}/${(entry as EntryDetails).season}/${(entry as EntryDetails).episode}` : entry.type == 'movie' ? `movie/${entry.id}` : null}
      data-title={('show_title' in entry && entry.show_title) || entry.title}
    >
      <div
        className={['episode-detail', i % 2 && 'odd'].filter(Boolean).join(' ')}
        style={{
          minHeight: `${Math.max(minHeight, entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0) + 4}px`,
          maxHeight: `${Math.max(minHeight, entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0) + (schedule[i + 1] && Math.max(minHeight, ((nextEntry: MediaDetails | Barrier) => (('runtime' in nextEntry && nextEntry.runtime) || 'average_run_time' in nextEntry && nextEntry.average_run_time) || 0)(schedule[i + 1]))) + 22}px`,
          width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - 5px)`,
        }}
      >
        <div
          style={{
            minHeight: `${Math.max(minHeight, entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0) - 12}px`,
            maxHeight: `calc(var(--scale) * ${Math.max(minHeight, entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0) - 5}px + var(--height-mult) * ${(schedule[i + 1] ? Math.max(minHeight, ((nextEntry: MediaDetails | Barrier) => (('runtime' in nextEntry && nextEntry.runtime) || 'average_run_time' in nextEntry && nextEntry.average_run_time) || 0)(schedule[i + 1])) : 40) - 2}px)`,
          }}
        >
          <label htmlFor={`bookmark-${i}`}>
            <i
              className={`fa-${bookmark == posId ? 'solid' : 'regular'} fa-bookmark`}
              aria-label="Bookmark this entry"
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
          {'show_id' in entry ? (
            <span>
              {colors.tv[entry.show_id as number].userTitle || entry.show_title} (S
              {(entry as EntryDetails).season}E{(entry as EntryDetails).episode})
            </span>
          ) : (
            entry.type == 'movie' ? (
              colors.movie[entry.layer as number].userTitle &&
              (colors.movie[entry.layer as number].indices || []).length > 1 && (
                <span>
                  {`${colors.movie[entry.layer as number].userTitle} (${(colors.movie[entry.layer as number].indices || []).findIndex((e: number) => e == i) + 1} of ${(colors.movie[entry.layer as number].indices || []).length})`}
                </span>
              ))
              :
              (colors.custom[(entry as CustomDetails).set as number].indices || []).length > 1 || (('offset' in (entry as CustomDetails) && (entry as CustomDetails).offset || 0) > 0) ? (
                <span>
                  {colors.custom[(entry as CustomDetails).set as number].userTitle || colors.custom[(entry as CustomDetails).set as number].title}
                </span>
              ) : null
          )}
          <span className="title">
            {entry.type == 'custom' ?
              (colors.custom[(entry as CustomDetails).set as number].indices || []).length > 1 || (entry.offset && entry.offset > 0) ? `${entry.term} ${(colors.custom[(entry as CustomDetails).set as number].indices || []).findIndex((e: number) => e == i) + 1 + (entry.offset || 0)}` : colors.custom[(entry as CustomDetails).set as number].userTitle || colors.custom[(entry as CustomDetails).set as number].title
              :
              entry.userTitle || entry.title}
            {entry.runtime && <span className="spoiler">{`${entry.runtime > 59 ? `${Math.floor(entry.runtime / 60)}h` : ''}${entry.runtime > 59 && entry.runtime % 60 ? ' ' : ''}${entry.runtime % 60 ? `${entry.runtime % 60}m` : ''}`}</span>}
          </span>
          <span className="spoiler">
            {entry.type !== 'custom' ? ('overview' in entry && entry.overview) || 'No Description Available' :
              (colors.custom[(entry as CustomDetails).set as number].indices || []).length > 1 || (entry.offset && entry.offset > 0) ? `From '${colors.custom[(entry as CustomDetails).set as number].userTitle || colors.custom[(entry as CustomDetails).set as number].title}', a custom entry` : 'A custom entry'}
          </span>
        </div>
      </div>
    </div>
  )
}
