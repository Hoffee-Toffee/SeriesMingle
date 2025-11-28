import { Barrier, Colors, CustomDetails, EntryDetails, MediaDetails } from "../../models/schedule"
import IMDb_Logo from '../../icons/imdb.png'

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

  const minHeight = 60;

  // Height calculations for episode-detail and inner div
  const entryRuntime = entry.runtime || ('average_run_time' in entry && entry.average_run_time) || 0;
  const nextEntry = schedule[i + 1];
  const nextEntryRuntime = nextEntry ? ((nextEntry: MediaDetails | Barrier) => (('runtime' in nextEntry && nextEntry.runtime) || ('average_run_time' in nextEntry && nextEntry.average_run_time) || 0))(nextEntry) : 0;

  // For .episode-detail
  const episodeDetailMinHeight = Math.max(minHeight, entryRuntime) + 4;
  const episodeDetailMaxHeight = Math.max(minHeight, entryRuntime) + (nextEntry ? Math.max(minHeight, nextEntryRuntime) : minHeight) + 28;

  // For inner div
  const innerMinHeight = Math.max(minHeight, entryRuntime) - 2;
  const innerMaxHeight = `calc(var(--scale) * ${Math.max(minHeight, entryRuntime) - 5}px + var(--height-mult) * ${(nextEntry ? Math.max(minHeight, nextEntryRuntime) : 40) - 2}px)`;

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
          minHeight: `${episodeDetailMinHeight}px`,
          maxHeight: `${episodeDetailMaxHeight}px`,
          width: `calc(50% * var(--scale) - ${numberOfLayers} * var(--layer-size) * var(--scale) - 5px)`,
        }}
      >
        <div
          style={{
            minHeight: `${innerMinHeight}px`,
            maxHeight: innerMaxHeight,
          }}
        >
          <div className="top-bar">
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
                {(entry as EntryDetails).season}E{String((entry as EntryDetails).episode).padStart(2, '0')})
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
              {entry.type == 'movie' &&
                <a
                  className="spoiler"
                  href={`https://letterboxd.com/tmdb/${entry.id}/`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View on Letterboxd"
                  title="View on Letterboxd"
                >
                  {/* https://a.ltrbxd.com/logos/letterboxd-decal-dots-pos-rgb-500px.png */}
                  <img
                    src="https://a.ltrbxd.com/logos/letterboxd-decal-dots-pos-rgb-500px.png"
                    alt="Letterboxd Logo"
                  />
                </a>}
              {entry.imdb_id && <a
                className="spoiler"
                href={`https://www.imdb.com/title/${entry.imdb_id}/`}
                target="_blank"
                rel="noreferrer"
                aria-label="View on IMDb"
                title="View on IMDb"
              >
                <img
                  src={IMDb_Logo}
                  alt="IMDb Logo"
                />
              </a>}
            </span>
          </div>
          <span className="spoiler episode-description">
            {entry.type !== 'custom' ? ('overview' in entry && entry.overview) || 'No Description Available' :
              (colors.custom[(entry as CustomDetails).set as number].indices || []).length > 1 || (entry.offset && entry.offset > 0) ? `From '${colors.custom[(entry as CustomDetails).set as number].userTitle || colors.custom[(entry as CustomDetails).set as number].title}', a custom entry` : 'A custom entry'}
          </span>
        </div>
      </div>
    </div>
  )
}
