import search from '../apis/search.ts'
import { useState } from 'react'
import fetchMedia from '../apis/fetchMedia.ts'
import { useSortable } from '@dnd-kit/sortable'
import { LayerEntry, Data, MediaResult, LayerMedia, ShowDetails, Season, EntryDetails, MediaDetails, CustomDetails, Barrier } from '../../models/schedule.ts'

export default function Entry({
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
  entry: LayerEntry
  entries: LayerEntry[]
  setEntries: (entries: LayerEntry[], force?: boolean) => void
  data: Data
  addData: (entry: LayerEntry, layer: number, id: number) => void
  className?: string
  setCustom: (entry: CustomDetails | string, layer?: number, id?: number) => void
  setTitle?: (id: number, title: string, force: boolean) => void
  runAfterConfirm: (func: () => void) => void
  bookmark?: string | null,
}) {
  let options
  let settings: { title: string, content: JSX.Element }[] | null = []
  let entryData: MediaDetails
  const [setting, setSetting] = useState(0)
  const [value, setValue] = useState<string | number | null>(null)

  function handleSearch() {
    typeof entry === 'string' &&
      search(entry)
        .then((res) => {
          entries[id] = res
          setEntries([...entries])
        })
        .catch((err) => console.log(err))
  }

  function getMedia(type: keyof Data, mid: number) {
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

  const { setNodeRef, attributes, listeners } = useSortable({
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
            value={entry as string}
            onChange={(e) => {
              runAfterConfirm(() => {
                entries[id] = e.target.value
                setEntries([...entries])
              })
            }}
            onKeyDown={(e) => runAfterConfirm(() => e.key === 'Enter' && handleSearch())}
          />
          <button onClick={() => runAfterConfirm(handleSearch)}>Search</button>
          <button onClick={() => runAfterConfirm(() => setCustom(entry as string, layer, id))}>
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
          {(entry as MediaResult[]).length == 1 ? (
            <span>No results found</span>
          ) : (
            <>
              <select
                onChange={(e) => {
                  entries[id] = (entry as MediaResult[]).map((option: MediaResult) => ({
                    ...option,
                    selected: String(option.id) == e.target.value,
                  }))
                  setEntries([...entries])
                }}
                onClick={(e) => {
                  if (bookmark) (e.target as HTMLSelectElement).blur()
                  runAfterConfirm(() => { })
                }
                }
              >
                {(entry as MediaResult[]).map((option: MediaResult, index: number) => {
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
                    (entry as MediaResult[]).find((option: MediaResult) => option.selected) || (entry as MediaResult[])[1]
                  getMedia(selected.media_type, selected.id)
                })}
              >
                Add
              </button>
            </>
          )}
          <button
            onClick={() => runAfterConfirm(() => {
              entries[id] = (entry as MediaResult[])[0] as unknown as string
              setEntries([...entries])
            })}
          >
            Back
          </button>
        </div>
      )
      break
    case 'object':
      if ('ref' in (entry as LayerMedia)) {
        entryData = data[(entry as LayerMedia).ref[0]][(entry as LayerMedia).ref[1]]

        settings =
          entryData.type == 'tv'
            ? [
              {
                title: 'Start',
                content: (
                  <select
                    onChange={(e) => {
                      entries[id] = { ...(entries[id] as LayerMedia), start: e.target.value }
                      setEntries([...entries], true)
                    }}
                    onClick={(e) => {
                      if (bookmark) (e.target as HTMLSelectElement).blur()
                      runAfterConfirm(() => { })
                    }
                    }

                  >
                    {("end" in (entry as LayerMedia)
                      ? ((entryData as ShowDetails).seasons || []).slice(
                        0,
                        parseInt((entry as LayerMedia).end?.split(':')[0] || '')
                      )
                      : (entryData as ShowDetails).seasons || []
                    ).map((season: Season) => (
                      <optgroup
                        label={`Season ${season.season}`}
                        key={season.season}
                      >
                        {((entry as LayerMedia).end
                          ? season.episodes.slice(
                            0,
                            parseInt((entry as LayerMedia).end?.split(':')[1] || '')
                          )
                          : season.episodes
                        ).map((episode: EntryDetails) => (
                          <option
                            key={episode.episode}
                            value={season.season + ':' + episode.episode}
                            selected={
                              `${season.season}:${episode.episode}` ==
                              (entry as LayerMedia).start
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
                      entries[id] = { ...(entries[id] as LayerMedia), end: e.target.value }
                      setEntries([...entries], true)
                    }}
                    onClick={(e) => {
                      if (bookmark) (e.target as HTMLSelectElement).blur()
                      runAfterConfirm(() => { })
                    }
                    }

                  >
                    {((entryData as ShowDetails).seasons || [])
                      .slice(
                        (entry as LayerMedia).start
                          ? ((entryData as ShowDetails).seasons || []).findIndex((s: Season) => s.season >= parseInt((entry as LayerMedia).start?.split(':')[0] || '0') - 1)
                          : 0,
                      )
                      .map((season: Season) => (
                        <optgroup
                          label={`Season ${season.season}`}
                          key={season.season}
                        >
                          {season.episodes
                            .slice(
                              (entry as LayerMedia).start && parseInt((entry as LayerMedia).start?.split(':')[0] || '0') == season.season
                                ? season.episodes.findIndex((e: EntryDetails) => e.episode || 0 >= parseInt((entry as LayerMedia).start?.split(':')[1] || '0') - 1)
                                : 0,
                            )
                            .map((episode: EntryDetails) => (
                              <option
                                key={episode.episode}
                                value={season.season + ':' + episode.episode}
                                selected={
                                  `${season.season}:${episode.episode}` ==
                                  ((entry as LayerMedia).end || `${((entryData as ShowDetails).seasons || []).at(-1)?.season}:${((entryData as ShowDetails).seasons || []).at(-1)?.episodes.at(-1)?.episode}`)
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
                      value={value == "" ? undefined : Math.max(parseInt(value as string) || 1, 1) || entryData.repeat}
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value || ""))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...(entryData as CustomDetails), repeat: parseInt((value == "" || value == undefined) ? "1" : String(value) || String((entryData as CustomDetails).repeat) || "1") })
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
                      value={value == "" ? undefined : Math.max(parseInt(value as string) || 0, 0) || entryData.offset}
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value || ""))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...(entryData as CustomDetails), offset: parseInt((value == "" || value == undefined) ? "0" : String(value) || String((entryData as CustomDetails).offset) || "0") })
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
                      value={value == undefined ? entryData.term : value}
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value))}
                      onBlur={() => runAfterConfirm(() =>
                        setCustom({ ...(entryData as CustomDetails), term: String(value) || (entryData as CustomDetails).term }))}
                    />
                  ),
                }, {
                  title: 'Duration (mins)',
                  content: (
                    <input
                      className="value"
                      type="number"
                      min="1"
                      value={value == "" ? undefined : Math.max(parseInt(value as string) || 30, 1) || entryData.runtime || 30}
                      onChange={(e) => runAfterConfirm(() => setValue(e.target.value))}
                      onBlur={() => runAfterConfirm(() => {
                        setCustom({ ...(entryData as CustomDetails), runtime: parseInt((value == "" || value == undefined) ? "30" : String(value) || String((entryData as CustomDetails).runtime) || "30") })
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
                <button className="setting-label"
                  onClick={() => {
                    if (settings) {
                      setSetting((setting + 1) % settings.length)
                      setValue(null)
                    }
                  }}
                >
                  <i className="fa-solid fa-sort"></i>
                  {settings && settings[setting].title}:
                </button>
                {settings && settings[setting].content}
              </span>
            )
            }
            <div className="option">
              <div
                data-tmdb-id={entryData.id}
                data-tmdb-type={entryData.type}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (!e.target.innerText.trim()) e.target.innerText = entryData.title || ''
                  else if (entryData.type == 'custom') {
                    setCustom({ ...entryData, title: e.target.innerText })
                  }
                  else setTitle && setTitle(((entryData as ShowDetails).show_id || entryData.id) as number, e.target.innerText, true)
                }}
              >
                {(entryData as ShowDetails | EntryDetails).userTitle || entryData.title}
              </div>
            </div>
            <button
              onClick={() => runAfterConfirm(() => {
                setEntries([...entries.filter((_, i) => i !== id)], true)
              })}
            >
              x
            </button>
          </div >
        )
      }
      else {
        // Barrier
        options = (
          <div ref={setNodeRef} className={[className, 'barrier'].filter(Boolean).join(' ')}>
            <i
              className="handle fa-solid fa-grip-vertical"
              {...(bookmark ? { onDragStart: () => runAfterConfirm(() => { }) } : { ...attributes, ...listeners })}
            />
            <span className="setting">
              <label htmlFor={`barrier-${id}`}>
                Position (Percentage):
              </label>
              <input
                id={`barrier-${id}`}
                className="value"
                type="number"
                min="0"
                max="100"
                value={value == "" ? undefined : Math.max(0, Math.min(100, parseFloat(value as string)) || 0) || (entry as Barrier).barrier || 0}
                onChange={(e) => runAfterConfirm(() =>
                  setValue(Math.max(0, Math.min(100, parseFloat(e.target.value))) || ""))}
                onBlur={() => runAfterConfirm(() => {
                  entries[id] = { barrier: Math.max(0, Math.min(100, parseFloat(value as string)) || 0) }
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

  return options
}