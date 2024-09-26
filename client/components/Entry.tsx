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
  setTitle,
  runAfterConfirm,
  bookmark,
}: {
  id: number
  layer: number
  entry: any
  entries: any[]
  setEntries: any
  data: object
  addData: any
  className: string | undefined
  setCustom: any,
  setTitle: any,
  runAfterConfirm: any,
  bookmark: string | undefined,
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

  function addBarrier(entryId: number) {
    entries[entryId] = { barrier: null }
    setEntries([...entries], true)
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
              runAfterConfirm(() => {
                entries[id] = e.target.value
                setEntries([...entries])
              })
            }}
            onKeyPress={(e) => runAfterConfirm(() => e.key === 'Enter' && handleSearch())}
          />
          <button onClick={() => runAfterConfirm(handleSearch)}>Search</button>
          <button onClick={() => runAfterConfirm(() => setCustom(entry, layer, id))}>
            Create Custom
          </button>
          <button onClick={() => runAfterConfirm(() => addBarrier(id))}>
            Add Barrier
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
                onClick={(e) => {
                  if (bookmark) e.target.blur()
                  runAfterConfirm(() => { })
                }
                }

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
                onClick={() => runAfterConfirm(() => {
                  const selected =
                    entry.find((option) => option.selected) || entry[1]
                  getMedia(selected.media_type, selected.id)
                })}
              >
                Add
              </button>
            </>
          )}
          <button
            onClick={() => runAfterConfirm(() => {
              entries[id] = entry[0]
              setEntries([...entries])
            })}
          >
            Back
          </button>
        </div>
      )
      break
    case 'object':
      if (entry.ref) {
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
                    onClick={(e) => {
                      if (bookmark) e.target.blur()
                      runAfterConfirm(() => { })
                    }
                    }

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
                    onClick={(e) => {
                      if (bookmark) e.target.blur()
                      runAfterConfirm(() => { })
                    }
                    }

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
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value || ""))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...entryData, repeat: parseInt(value == "" ? 1 : value || entryData.repeat) })
                        setValue(value == "" ? 1 : value)
                      })}
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
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value || ""))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...entryData, offset: parseInt(value == "" ? 0 : value || entryData.offset) })
                        setValue(value == "" ? 0 : value)
                      })}
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
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value))}
                      onBlur={() => runAfterConfirm(() =>
                        setCustom({ ...entryData, term: value || entryData.term }))}
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
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...entryData, runtime: parseInt(value || entryData.runtime) })
                        setValue(value == "" ? 1 : value)
                      })}
                    />
                  ),
                },
              ]
              : null

        options = (
          <div ref={setNodeRef} className={className}>
            <i
              className="handle fa-solid fa-grip-vertical"
              {...(bookmark ? { onDragStart: () => runAfterConfirm(() => { }) } : { ...attributes, ...listeners })}
            />
            {entryData.type !== 'movie' && (
              <span className="setting">
                <label className="setting-label"
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
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                if (!e.target.innerText.trim()) e.target.innerText = entryData.title
                else setTitle(entryData.show_id || entryData.id, e.target.innerText, true)
              }}
            >
              {entryData.userTitle || entryData.title}
            </span>
            <button
              onClick={() => runAfterConfirm(() => {
                setEntries([...entries.filter((_, i) => i !== id)], true)
              })}
            >
              x
            </button>
          </div>
        )
      }
      else {
        // Barrier
        options = (
          <div ref={setNodeRef} className="barrier">
            <i
              className="handle fa-solid fa-grip-vertical"
              {...(bookmark ? { onDragStart: () => runAfterConfirm(() => { }) } : { ...attributes, ...listeners })}
            />
            <span className="setting">
              <label>
                Position (Percentage):
              </label>
              <input
                className="value"
                type="number"
                min="0"
                max="100"
                value={value == "" ? null : (value || entry.barrier)}
                onChange={(e) => runAfterConfirm(() =>
                  setValue(Math.max(0, Math.min(100, parseFloat(e.target.value))) || ""))}
                onBlur={() => runAfterConfirm(() => {
                  entries[id] = { barrier: value == "" ? null : value }
                  setEntries([...entries], true)
                  setValue(value == "" ? null : value)
                })}
              />
            </span>
            <span className="option">Barrier</span>
            <button
              onClick={() => runAfterConfirm(() => {
                setEntries([...entries.filter((_, i) => i !== id)], true)
              })}
            >
              x
            </button>
          </div>
        )
      }
  }

  return { ...options }
}

export default Entry
