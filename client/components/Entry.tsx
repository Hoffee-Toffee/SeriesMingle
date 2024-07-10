import search from '../apis/search.ts'
import { useState } from 'react'
import fetchMedia from '../apis/fetchMedia.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Entry({
  id,
  layer,
  entry,
  entries,
  setEntries,
  data,
  addData,
  className,
  setCustom,
}: {
  id: number
  layer: number
  entry: any
  entries: any[]
  setEntries: any
  data: object
  addData: any
  className: string | undefined
  setCustom: any
}) {
  let options, entryData, settings
  const [setting, setSetting] = useState(0)
  const [value, setValue] = useState(null)

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
      setEntries([...entries], true)
    } else {
      fetchMedia(type, mid)
        .then((res) => {
          addData(res, layer, id)
        })
        .catch((err) => console.log(err))
    }
  }

  const { setNodeRef, attributes, listeners, isDragging } = useSortable({
    id: `${layer}-${id}`,
    data: {
      type: 'Entry',
      entry,
    },
  })

  switch (Array.isArray(entry) ? 'array' : typeof entry) {
    case 'string':
    case 'undefined':
      options = (
        <div className="new" ref={setNodeRef}>
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
          <button onClick={() => setCustom(entry, layer, id)}>
            Create Custom
          </button>
        </div>
      )
      break
    case 'array':
      options = (
        <div ref={setNodeRef} className="pick">
          {entry.length == 1 ? (
            <span>No results found</span>
          ) : (
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
                  if (!index) return

                  const year = (
                    option.first_air_date ||
                    option.release_date ||
                    ''
                  ).split('-')[0]
                  return (
                    <option
                      key={index}
                      value={option.id}
                      title={option.overview}
                    >
                      {`${option.name || option.title} (${option.media_type}${year !== '' ? `, ${year}` : ''})`}
                    </option>
                  )
                })}
              </select>
              <button
                onClick={() => {
                  const selected =
                    entry.find((option) => option.selected) || entry[1]
                  getMedia(selected.media_type, selected.id)
                }}
              >
                Add
              </button>
            </>
          )}
          <button
            onClick={() => {
              entries[id] = entry[0]
              setEntries([...entries])
            }}
          >
            Back
          </button>
        </div>
      )
      break
    case 'object':
      entryData = data[entry.ref[0]][entry.ref[1]]

      settings =
        entryData.type == 'tv'
          ? [
            {
              title: 'Start',
              content: (
                <select
                  onChange={(e) => {
                    entries[id] = { ...entries[id], start: e.target.value }
                    setEntries([...entries], true)
                  }}
                >
                  {(entry.end
                    ? entryData.seasons.slice(
                      0,
                      parseInt(entry.end.split(':')[0]),
                    )
                    : entryData.seasons
                  ).map((season) => (
                    <optgroup
                      label={`Season ${season.season}`}
                      key={season.season}
                    >
                      {(entry.end
                        ? season.episodes.slice(
                          0,
                          parseInt(entry.end.split(':')[1]),
                        )
                        : season.episodes
                      ).map((episode) => (
                        <option
                          key={episode.episode}
                          value={season.season + ':' + episode.episode}
                          selected={
                            `${season.season}:${episode.episode}` ==
                            entry.start
                          }
                        >{`S${season.season}E${episode.episode}: ${episode.title}`}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ),
            },
            {
              title: 'End',
              content: (
                <select
                  onChange={(e) => {
                    entries[id] = { ...entries[id], end: e.target.value }
                    setEntries([...entries], true)
                  }}
                >
                  {entryData.seasons
                    .slice(
                      entry.start
                        ? entryData.seasons.findIndex(s => s.season >= parseInt(entry.start.split(':')[0] - 1))
                        : 0,
                    )
                    .map((season) => (
                      <optgroup
                        label={`Season ${season.season}`}
                        key={season.season}
                      >
                        {season.episodes
                          .slice(
                            entry.start && entry.start.split(':')[0] == season.season
                              ? season.episodes.findIndex(e => e.episode >= parseInt(entry.start.split(':')[1] - 1))
                              : 0,
                          )
                          .map((episode) => (
                            <option
                              key={episode.episode}
                              value={season.season + ':' + episode.episode}
                              selected={
                                `${season.season}:${episode.episode}` ==
                                (entry.end || `${entryData.seasons.at(-1).season}:${entryData.seasons.at(-1).episodes.at(-1).episode}`)
                              }
                            >{`S${season.season}E${episode.episode}: ${episode.title}`}</option>
                          ))}
                      </optgroup>
                    ))}
                </select>
              ),
            },
          ]
          : entryData.type == 'custom'
            ? [
              {
                title: 'Repeat',
                content: (
                  <input
                    className="value"
                    type="number"
                    min="1"
                    value={value == "" ? null : Math.max(parseInt(value), 1) || entryData.repeat}
                    onChange={(e) => setValue(e.target.value || "")}
                    onBlur={() => {
                      setCustom({ ...entryData, repeat: parseInt(value == "" ? 1 : value || entryData.repeat) })
                      setValue(value == "" ? 1 : value)
                    }}
                  />
                ),
              },
              {
                title: 'Offset',
                content: (
                  <input
                    className="value"
                    type="number"
                    min="0"
                    value={value == "" ? null : Math.max(parseInt(value), 0) || entryData.offset}
                    onChange={(e) => setValue(e.target.value || "")}
                    onBlur={() => {
                      setCustom({ ...entryData, offset: parseInt(value == "" ? 0 : value || entryData.offset) })
                      setValue(value == "" ? 0 : value)
                    }
                    }
                  />
                ),
              },
              {
                title: 'Term',
                content: (
                  <input
                    className="value"
                    type="text"
                    value={value == null ? entryData.term : value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => setCustom({ ...entryData, term: value || entryData.term })}
                  />
                ),
              }, {
                title: 'Duration (mins)',
                content: (
                  <input
                    className="value"
                    type="number"
                    min="1"
                    value={value == "" ? null : Math.max(parseInt(value), 1) || entryData.runtime}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => {
                      setCustom({ ...entryData, runtime: parseInt(value || entryData.runtime) })
                      setValue(value == "" ? 1 : value)
                    }}
                  />
                ),
              },
            ]
            : null

      options = (
        <div ref={setNodeRef} className={className}>
          <i
            className="handle fa-solid fa-grip-vertical"
            {...attributes}
            {...listeners}
          />
          {entryData.type !== 'movie' && (
            <span className="setting">
              <label
                onClick={() => {
                  setSetting((setting + 1) % settings.length)
                  setValue(null)
                }}
              >
                <i className="fa-solid fa-sort"></i>
                {settings[setting].title}:
              </label>
              {settings[setting].content}
            </span>
          )}
          <span
            className="option"
            tmdb-id={entryData.id}
            tmdb-type={entryData.type}
          >
            {`${entryData.title}${![undefined, ''].includes(entryData.year) ? ` (${entryData.year})` : ''}`}
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
