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
  let options, entryData

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
      entries[id] = { ref: [type, mid] }
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
        <div className="new">
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
        </div>
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
      entryData = data[entry.ref[0]][entry.ref[1]]

      options = (
        <div>
          {entryData.type === 'tv' && (
            <label>
              Start:
              <select
                onChange={(e) => {
                  entries[id] = { ...entries[id], start: e.target.value }
                  setEntries([...entries])
                }}
              >
                {entryData.seasons.map((season) => (
                  <optgroup
                    label={`Season ${season.season}`}
                    key={season.season}
                  >
                    {season.episodes.map((episode) => (
                      <option
                        key={episode.episode}
                        value={season.season + ':' + episode.episode}
                        selected={
                          `${season.season}:${episode.episode}` == entry.start
                        }
                      >{`S${season.season}E${episode.episode}: ${episode.title}`}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
          <span
            className="option"
            tmdb-id={entryData.id}
            tmdb-type={entryData.type}
          >
            {`${entryData.title}${entryData.year !== '' ? ` (${entryData.year})` : ''}`}
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
