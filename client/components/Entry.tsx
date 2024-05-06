import search from '../apis/search.ts'
import fetchMedia from '../apis/fetchMedia.ts'

function Entry({
  id,
  layer,
  entry,
  entries,
  setEntries,
  data,
  addData,
}: {
  id: number
  layer: number
  entry: any
  entries: any[]
  setEntries: any
  data: object
  addData: any
}) {
  let options

  function handleSearch() {
    search(entry)
      .then((res) => {
        entries[id] = res
        setEntries([...entries])
      })
      .catch((err) => console.log(err))
  }

  function getMedia(type, mid) {
    if (data[type][mid]) {
      entries[id] = data[type][mid]
      setEntries([...entries])
    } else {
      fetchMedia(type, mid)
        .then((res) => {
          addData(res, layer, id)
        })
        .catch((err) => console.log(err))
    }
  }

  switch (Array.isArray(entry) ? 'array' : typeof entry) {
    case 'string':
    case 'undefined':
      options = (
        <>
          <input
            placeholder="Enter a title"
            type="text"
            className="addEntry"
            value={entry}
            onChange={(e) => {
              entries[id] = e.target.value
              setEntries([...entries])
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </>
      )
      break
    case 'array':
      options = (
        <>
          <select
            onChange={(e) => {
              entries[id] = entry.map((option) => ({
                ...option,
                selected: option.id == e.target.value,
              }))
              setEntries([...entries])
            }}
          >
            {entry.map((option, index) => {
              const year = (
                option.first_air_date ||
                option.release_date ||
                ''
              ).split('-')[0]
              return (
                <option key={index} value={option.id} title={option.overview}>
                  {`${option.name || option.title} (${option.media_type}${year !== '' ? `, ${year}` : ''})`}
                </option>
              )
            })}
          </select>
          <button
            onClick={() => {
              const selected =
                entry.find((option) => option.selected) || entry[0]
              getMedia(selected.media_type, selected.id)
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              entries[id] = ''
              setEntries([...entries])
            }}
          >
            Back
          </button>
        </>
      )
      break
    case 'object':
      options = (
        <div>
          {entry.type === 'tv' && (
            <label>
              Start:
              <select
                onChange={(e) => {
                  // Remove old 'start', if it exists, and add new 'start'
                  entries[id].seasons = entries[id].seasons.map((season) => ({
                    ...season,
                    episodes: season.episodes.map((episode) => ({
                      ...episode,
                      start:
                        season.season + ':' + episode.episode == e.target.value,
                    })),
                  }))
                  setEntries([...entries])
                }}
              >
                {entry.seasons.map((season) => (
                  <optgroup
                    label={`Season ${season.season}`}
                    key={season.season}
                  >
                    {season.episodes.map((episode) => (
                      <option
                        key={episode.episode}
                        value={season.season + ':' + episode.episode}
                        selected={episode.start}
                      >{`S${season.season}E${episode.episode}: ${episode.title}`}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
          <span className="option" tmdb-id={entry.id} tmdb-type={entry.type}>
            {`${entry.title}${entry.year !== '' ? ` (${entry.year})` : ''}`}
          </span>
          <button
            onClick={() => {
              setEntries([...entries.filter((_, i) => i !== id)], true)
            }}
          >
            x
          </button>
        </div>
      )
  }

  return { ...options }
}

export default Entry
