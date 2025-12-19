import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext, LoadingContext } from './App.tsx'
import '../styles/project.scss'
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import Layer from './Layer.tsx'
import { generateSchedule } from '../functions/generateSchedule.ts'
import Schedule from './Schedule.tsx'
import example from '../files/example.json'
import setProject from '../apis/setProject.ts'
import Entry from './Entry.tsx'
import Terminal from './Terminal.tsx'
import { useParams } from 'react-router-dom'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import fetchSecret from '../apis/fetchSecret.ts'
import { MediaDetails, LayerEntry, ScheduleState, ProjectData } from '../../models/schedule.ts'

export default function Project() {
  const { user } = useContext(UserContext)
  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  const [readOnly, setReadOnly] = useState(true)
  const summaryRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleKeyOrClick = (e: MouseEvent | KeyboardEvent) => {
      if ((e as PointerEvent).pointerId == -1 || (e.target as HTMLElement).tagName == 'LEGEND') {
        e.preventDefault();
        (e.target as HTMLElement).blur()
      }
    }

    const currentSummaryRefs = summaryRefs.current;
    console.log(currentSummaryRefs)
    currentSummaryRefs.forEach((summary) => {
      if (!summary) return
      summary.addEventListener('click', handleKeyOrClick)
      summary.addEventListener('keydown', handleKeyOrClick)
    })

    return () => {
      currentSummaryRefs.forEach((summary) => {
        if (!summary) return
        summary.removeEventListener('click', handleKeyOrClick)
        summary.removeEventListener('keydown', handleKeyOrClick)
      })
    }
  }, [summaryRefs])

  const id = useParams().id
  const uid = user?.uid
  const db = getFirestore();

  const initialState = {
    layers: [[]],
    mpSpacing: 'normal',
    data: {
      tv: {},
      movie: {},
      custom: {},
    },
    bookmark: null,
    force: false,
    titles: [],
    streak: 0,
    goal: 0,
    showStreaks: true,
    groupStreaks: false,
    title: 'Untitled Schedule',
    description: 'No Description',
    keys: [],
    lastModified: Date.now(),
    user: uid || '',
    permissions: {}
  } as ScheduleState
  // Layers as a state
  const [state, setState] = useState(initialState)

  const [activeEntry, setActiveEntry] = useState(null)
  const [tempLayers, setTempLayers] = useState(null)
  const [outlinePos, setOutlinePos] = useState<string | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [changedProps, setChangedProps] = useState<string[]>([])
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!saved) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [saved])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  useEffect(() => {
    // Create listener for document in the projects collection with the given id
    if (!id) return;
    const projectRef = doc(db, 'projects', id)
    const projectListener = onSnapshot(projectRef, (doc) => {
      let project = doc.data() as ProjectData
      project = {
        ...project,
        ...(typeof project.state == 'object' ? project.state : {}),
        state: project?.state ? true : undefined,
        layers: (typeof project.state == 'object' && project.state !== null && 'layers' in project.state)
          ? project.state.layers
          : 'layers' in project
            ? (Object.values(project.layers).map((layer: { [key: number]: LayerEntry[] }, i: number) => layer[i]) as LayerEntry[][])
            : [[]],
      }

      if (project?.user == uid || (uid && project?.permissions && project?.permissions[uid] >= 1)) {
        setReadOnly(false)
        setHasAccess(true)
      }
      if (project) setState(project)
      setIsPageLoaded(true)
    })

    return () => {
      projectListener();
    };
  }, [id, uid, db, setIsPageLoaded]);

  const { layers, mpSpacing, data, bookmark, titles, streak, goal, showStreaks, groupStreaks, title, description, keys } = {
    ...initialState,
    ...state,
  }

  const [savedJS, setSavedJS] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    let updated = false
    keys.forEach(async (key) => {
      if (!(key in savedJS)) {
        savedJS[key] = await fetchSecret(key)
        updated = true
      }
      eval(savedJS[key])
    })
    if (updated) setSavedJS({ ...savedJS })
  }, [keys, savedJS])

  useEffect(() => {
    const bookmark = document.getElementById('bookmark')
    if (bookmark) document.getElementById('timelineContainer')?.scroll({
      top: bookmark.offsetTop - 5,
      left: 0,
      behavior: 'smooth',
    })
  }, [bookmark])

  useEffect(() => {
    // Set title to '{title} - Project | SeriesMingle'
    document.title = `${title} | SeriesMingle`
  }, [title])

  const shown = tempLayers || layers

  useEffect(() => {
    if (state.force && !readOnly) {
      // Compare the new state with the old state
      setSaved(false)
      if (id) {
        setProject({ ...state, force: false }, id, changedProps)
          .then(() => setSaved(true))
          .catch((error) => console.error(error));
      }
      setChangedProps([])
      setState({
        mpSpacing,
        layers,
        data,
        bookmark,
        force: false,
        titles,
        streak,
        goal,
        showStreaks,
        groupStreaks,
        title,
        description,
        keys,
        lastModified: Date.now(),
        user: uid || '',
        permissions: state.permissions,
      })
    }
  }, [
    id,
    bookmark,
    data,
    layers,
    mpSpacing,
    readOnly,
    state,
    state.force,
    uid,
    titles,
    changedProps,
    streak,
    goal,
    showStreaks,
    groupStreaks,
    title,
    description,
    keys
  ])

  function addData(entry: MediaDetails, layerId: number, entryId: number) {
    if (readOnly) return;
    data[entry.type] = data[entry.type] || {};
    data[entry.type][entry.id] = entry;
    if (!layers[layerId]) layers[layerId] = [];
    // Always add at the end, never replace
    layers[layerId].push({ ref: [entry.type, entry.id] });
    setState({ ...state, layers, data, force: true });
    setChangedProps([...changedProps, 'data', 'layers']);
  }

  function setCustom(newData: string | MediaDetails | null = null, layer = null, id = null) {
    if (readOnly) return
    const defaultData = {
      title: typeof newData === 'string' && newData.trim() ? newData : 'Custom Set',
      type: 'custom',
      id: data.custom ? Object.keys(data.custom).length + 1 : 1,
      runtime: 30,
      repeat: 1,
      offset: 0,
      term: 'Part',
    }

    if (id == null && newData && typeof newData == 'object') {
      data.custom = data.custom || {};
      data.custom[newData.id] = newData;
      setState({ ...state, data, force: true });
      setChangedProps([...changedProps, 'data']);
    } else if (layer !== null && id !== null) {
      console.log('Adding custom data to a specific layer and entry:', { layer, id, newData });
      addData(typeof newData == 'string' && newData.trim() ? { ...defaultData, title: newData } : defaultData, layer, id);
    }
  }

  function setBookmark(newBookmark: string | null) {
    if (readOnly) return
    setState({ ...state, bookmark: newBookmark, force: true })
    setChangedProps([...changedProps, 'bookmark'])
  }

  // function setBookmarkType(newType, schedule) {
  //   if (readOnly || newType == bookmarkType) return

  //   // 'Bookmark' will always be the scroll point, the first unwatched entry

  //   // 'Normal' -> 'Layers' = Get the last entry in each layer above the bookmark, mark with 'bookmarked'
  //   // 'Normal' -> 'Manual' = Mark all entries above the bookmark with 'watched'
  //   // 'Layers' -> 'Manual' = Mark all entries above and including each 'bookmarked' entry with 'watched'
  //   // 'Manual' -> 'Layers' = Remove all 'watched' marks, except for the last one of each layer, to be replaced with 'bookmarked'

  //   // If going to normal, remove any 'bookmarked' or 'watched' marks
  //   let newLayers = null
  //   newLayers = layers.map((layer) =>
  //     layer.map((entry, i) => {
  //       if (i === layer.length - 1) return entry
  //       if (newType == 'normal') {
  //         delete entry.bookmarked
  //         delete entry.watched
  //       }

  //     }),
  //   )

  //   setState({ ...state, bookmarkType: newType, bookmark: newBookmark, layers: newLayers, force: true })
  //   setChangedProps([...changedProps, 'bookmarkType', 'bookmark', 'layers'])
  // }

  function setLayers(newLayers: LayerEntry[][], force = false) {
    if (readOnly) return
    // If newLayers has less layers and sublayers than the old set, ensure all unreferenced data is removed to save space
    const newProps = [...changedProps, 'layers']
    const newData = { ...initialState.data }
    const updateData = layers.flat().length > newLayers.flat().length
    if (updateData) {
      // Transfer all referenced data from 'data' to 'newData', removing all that is not referenced
      newLayers.forEach(layer => (layer as LayerEntry[]).forEach((entry) => {
        // If entry has type of MediaDetails...
        if (typeof entry == "object" && 'ref' in entry) newData[entry.ref[0]][entry.ref[1]] = data[entry.ref[0]][entry.ref[1]]
      }))
      newProps.push('data')
    }
    newProps.push('bookmark')

    setState({
      ...state,
      layers: newLayers,
      data: updateData ? newData : data,
      force,
      bookmark: null,
    })
    setChangedProps(newProps)
  }

  function setMpSpacing(mpSpacing: string) {
    if (readOnly) return
    setState({ ...state, mpSpacing, force: true })
    setChangedProps([...changedProps, 'mpSpacing'])
  }

  function setStreak(streak: number) {
    if (readOnly) return
    setState({ ...state, streak, force: true })
    setChangedProps([...changedProps, 'streak'])
  }

  function setGoal(goal: number) {
    if (readOnly) return
    setState({ ...state, goal, force: true })
    setChangedProps([...changedProps, 'goal'])
  }

  function setShowStreaks(showStreaks: boolean) {
    if (readOnly) return
    setState({ ...state, showStreaks, force: true })
    setChangedProps([...changedProps, 'showStreaks'])
  }

  function setGroupStreaks(groupStreaks: boolean) {
    if (readOnly) return
    setState({ ...state, groupStreaks, force: true })
    setChangedProps([...changedProps, 'groupStreaks'])
  }

  function setTitles(layer: number, title: string) {
    if (readOnly) return
    titles[layer] = title
    setState({
      ...state,
      titles,

      force: true,
    })
    setChangedProps([...changedProps, 'titles'])
  }

  function setShow(showId: number, newData: MediaDetails | string | null) {
    if (readOnly) return

    if (typeof newData === 'string' || newData == null) {
      data.tv[showId].userTitle = newData
      setState({
        ...state,
        data,

        force: true,
      })
    } else {
      data.tv[showId] = newData
      setState({
        ...state,
        data,

        force: true,
      })
    }
    setChangedProps([...changedProps, 'data'])
  }

  function setMovie(movieId: number, newData: MediaDetails | string | null) {
    if (readOnly) return

    if (typeof newData === 'string' || newData == null) {
      data.movie[movieId].userTitle = newData
      setState({
        ...state,
        data,

        force: true,
      })
    } else {
      data.movie[movieId] = newData
      setState({
        ...state,
        data,

        force: true,
      })
    }
    setChangedProps([...changedProps, 'data'])
  }

  function setBook(bookId: string, newData: MediaDetails | string | null) {
    if (readOnly) return

    if (typeof newData === 'string' || newData == null) {
      data.book[bookId].userTitle = newData
      setState({
        ...state,
        data,

        force: true,
      })
    } else {
      data.book[bookId] = newData
      setState({
        ...state,
        data,

        force: true,
      })
    }
    setChangedProps([...changedProps, 'data'])
  }

  function setTitle(newTitle: string) {
    if (readOnly) return
    setState({ ...state, title: newTitle, force: true })
    setChangedProps([...changedProps, 'title'])
  }

  function setDescription(newDescription: string) {
    if (readOnly) return
    setState({ ...state, description: newDescription, force: true })
    setChangedProps([...changedProps, 'description'])
  }

  function setKeys(newKeys: string[]) {
    if (readOnly) return
    setState({ ...state, keys: newKeys, force: true })
    setChangedProps([...changedProps, 'keys'])
  }

  async function removeWatched() {
    const seenProgress: { [key: string]: any } = {}
    scheduleData.schedule.toReversed().forEach((entry) => {
      const id = `${entry.layer}-${entry.layer_id}-${entry.type}-${entry.show_id || entry.id}`
      if (!entry.show && !seenProgress[id]) seenProgress[id] = entry
    })

    const seenProgressKeys = Object.keys(seenProgress)

    seenProgressKeys.forEach((id) => {
      const entry = seenProgress[id]
      if (entry.type == 'movie') layers[entry.layer][entry.layer_id] = undefined
      else if (entry.type == 'episode') {
        // Must be an episode, it's the last seen episode/entry, so we need to find the next episode to start from
        const show = data.tv[entry.show_id]
        // Get the next episode in that season, if existing, or the first of the next season, if existing, but only up until the 'end' season
        const episodes = show.seasons.flatMap((season) => {
          return season.episodes.map((ep) => ({ ...ep, pos: `${season.season}:${ep.episode}` }))
        })
        const nextEpisode =
          episodes.find(episode => episode.id == entry.id).pos !== layers[entry.layer][entry.layer_id].end && episodes[episodes.findIndex((episode) => episode.id == entry.id) + 1]

        if (nextEpisode)
          layers[entry.layer][entry.layer_id].start = nextEpisode.pos
        else layers[entry.layer][entry.layer_id] = undefined
      }
      else {
        // Must be a custom entry, this will be handled shortly
        const newRepeat = entry.repeat - scheduleData.colors.custom[entry.id].indices.findIndex((e) => e == entry.posIndex) - 1
        if (newRepeat) setCustom({ ...entry, repeat: newRepeat, offset: entry.repeat - newRepeat + (entry.offset || 0) })
        else layers[entry.layer][entry.layer_id] = undefined
      }
    })

    setLayers(
      layers.map((layer) => layer.filter(Boolean)),
      true,
    )
  }

  async function runAfterConfirm(action: () => void) {
    if (bookmark) {
      document.getElementById('rippleActionPopup')?.classList.add('show')
    } else {
      action()
    }
  }

  const scheduleData = generateSchedule(
    layers,
    mpSpacing,
    bookmark,
    setBookmark,
    data,
    setLayers,
    titles,
    setTitles,
    setShow,
    setCustom,
    streak,
    goal,
    showStreaks,
    groupStreaks
  )

  return (
    <>
      {isPageLoaded && (hasAccess ? (
        <main className='fadein'>
          <div id='removeWatchedPopup'>
            <div>
              <p>Are you sure you want to remove all completed content?</p>
              <strong>This action cannot be undone.</strong>
              <button onClick={() => {
                removeWatched()
                document.getElementById('removeWatchedPopup')?.classList.remove('show');
              }}>Remove Completed</button>
              <button onClick={() => document.getElementById('removeWatchedPopup')?.classList.remove('show')}>Cancel</button>
            </div>
          </div>
          <div id='clearSchedulePopup'>
            <div>
              <p>Are you sure you want to remove all layers?</p>
              <strong>This action cannot be undone.</strong>
              <button onClick={() => {
                // Old state with default layers, data, and titles
                setState({ ...state, layers: initialState.layers, data: initialState.data, titles: initialState.titles, force: true })
                setChangedProps([...changedProps, 'layers', 'data', 'titles'])
                document.getElementById('clearSchedulePopup')?.classList.remove('show')
              }}>
                Clear Schedule
              </button>
              <button onClick={() => document.getElementById('clearSchedulePopup')?.classList.remove('show')}>Cancel</button>
            </div>
          </div>
          <div id='rippleActionPopup'>
            <div>
              <p>Remove completed content to perform this action?</p>
              <strong>This action cannot be undone.</strong>
              <button onClick={() => {
                removeWatched()
                document.getElementById('rippleActionPopup')?.classList.remove('show')
              }}>Remove Completed</button>
              <button onClick={() => {
                document.getElementById('rippleActionPopup')?.classList.remove('show')
              }}>Cancel</button>
            </div>
          </div>
          <Terminal
            keys={keys}
            setKeys={setKeys}
          />
          {scheduleData.schedule.length > 0 && (
            <button
              onClick={() =>
                navigator.share({
                  title: 'My Watching Schedule',
                  text: 'Check out my watching schedule on SeriesMingle!',
                  url: `${window.location.origin}${window.location.pathname}`,
                })
              }
            >
              Share Schedule
            </button>
          )}
          {scheduleData.schedule.length == 0 && (
            <button
              onClick={() => {
                if (readOnly) return
                setState(example)
                setChangedProps(Object.keys(example))
              }}
            >
              Load Example
            </button>
          )}
          {readOnly && (
            <span
              style={{ color: 'white', display: 'block', textAlign: 'center' }}
            >
              READ-ONLY
            </span>
          )}
          <div id="project-details">
            <h2 className="setTitle showTitle" contentEditable suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (!e.target.innerText.trim()) e.target.innerText = title
                else setTitle(e.target.innerText)
              }}>{title}</h2>
            <span className="setDescription" contentEditable suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (!e.target.innerText.trim()) e.target.innerText = description
                else setDescription(e.target.innerText)
              }}>{description}</span></div>
          <fieldset id="layerContainer">
            {/* open if a bookmark does not exist */}
            <details open={!bookmark}>
              <summary ref={summaryRefs[0]}>
                <legend>Layers</legend></summary>
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <SortableContext
                  items={shown.flatMap((layer, li) =>
                    layer.map((_, ei) => ({ id: `${li}-${ei}` })),
                  )}
                >
                  {shown.map((entries, index) => (
                    <Layer
                      key={index}
                      id={index}
                      entries={entries}
                      layers={shown}
                      setLayers={setLayers}
                      data={data}
                      addData={addData}
                      outlinePos={outlinePos}
                      setCustom={setCustom}
                      titles={titles}
                      setTitles={setTitles}
                      setShow={setShow}
                      setMovie={setMovie}
                      setBook={setBook}
                      runAfterConfirm={runAfterConfirm}
                      bookmark={bookmark}
                    />
                  ))}
                </SortableContext>
                <button onClick={() => runAfterConfirm(() => setLayers([...layers, []]))}>
                  New Layer
                </button>
                <DragOverlay dropAnimation={null}>
                  {activeEntry && (
                    <Entry
                      entry={activeEntry}
                      data={data}
                      className="overlay"
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </details>
          </fieldset>
          {/* Collapsible set (summary and details) */}
          {scheduleData.schedule.length > 0 && <>
            <fieldset id='settings'>
              <details>
                <summary ref={summaryRefs[1]}>
                  <legend>
                    Settings
                  </legend>
                </summary>
                <fieldset id="mp" onChange={(e) => runAfterConfirm(() => setMpSpacing(e.target.value))}>
                  <legend>Space Multi-Parters
                  </legend>
                  <>{['Normally', 'Closer', 'Consecutively'].map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`mp-opt-${i}`}
                        value={option.toLowerCase().slice(0, 6)}
                        checked={mpSpacing === option.toLowerCase().slice(0, 6)}
                      />
                      <label htmlFor={`mp-opt-${i}`}>{option}</label>
                    </div>
                  ))}
                    <br />
                    <span>
                      {
                        ({
                          normal: "Normal",
                          closer: "Less",
                          consec: "No"
                        }[mpSpacing]) + " spacing between episode parts and arcs"
                      }
                    </span></>
                </fieldset>
                <fieldset id="streak">
                  <legend>Average Streak Duration (hours)
                  </legend>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={streak}
                    onChange={(e) => runAfterConfirm(() => setStreak(Math.max(parseFloat(e.target.value), 0)))}
                  />
                </fieldset>
                <fieldset id="goal">
                  <legend>Average {streak !== 0 ? "# of Streaks per" : "duration of each"} Watch Session</legend>
                  <>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      step={streak !== 0 ? "1" : "0.25"}
                      value={goal}
                      onChange={(e) => runAfterConfirm(() => setGoal(Math.max(parseInt(e.target.value), 0)))}
                    />
                    {goal !== 0 ? streak !== 0 ? <>
                      <br />
                      <br />
                      <span>Making ~{Math.round([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1} watch sessions</span>
                      <br />
                      <span>Each with an average length of {Math.round((scheduleData.totalSpan / ([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1) / 6) / 10} hours</span>
                    </> : <>
                      <br />
                      <br />
                      <span>Making {Math.round(scheduleData.totalSpan / (goal * 60))} watch sessions</span>
                    </>
                      : null}
                  </>
                </fieldset>
                {streak !== 0 && goal !== 0 ? (
                  <fieldset id="sessionOptions">
                    <legend>Watch Session Options
                    </legend>
                    <>
                      <fieldset id="showStreaks">
                        <legend>Show Streaks
                        </legend>
                        <input
                          type="checkbox"
                          checked={showStreaks}
                          onChange={(e) => runAfterConfirm(() => setShowStreaks(e.target.checked))}
                        />
                      </fieldset>
                      <fieldset id="groupStreaks">
                        <legend>Group Streaks
                        </legend>
                        <input
                          type="checkbox"
                          checked={groupStreaks}
                          onChange={(e) => runAfterConfirm(() => setGroupStreaks(e.target.checked))}
                        />
                      </fieldset>
                    </>
                  </fieldset>
                ) : null}
              </details></fieldset >
            <fieldset id='stats'>
              <details>
                <summary ref={summaryRefs[2]}>
                  <legend>
                    Statistics
                  </legend>
                </summary>
                {/* Percentage of schedule completed */}
                {/* Percentage of layer / show / set completed, as well as time remaining / passed (2 decimal places)*/}
                {/* Entire schedule time remaining / passed */}
                {/* Finish estimate (comparing start date to current date and percentage watched over that time) */}
                <fieldset>
                  <legend>Progress</legend>
                  <span>
                    {/* 1 hour and 3 minutes watched (25%) out of 4 hours and 12 minutes. */}
                    {Math.floor(scheduleData.seenSpan / 60) ?
                      <>
                        <span className="yellow">
                          {`${Math.floor(scheduleData.seenSpan / 60)}`}
                        </span>
                        {scheduleData.seenSpan / 60 > 1 ? ' hours ' : ' hour '}
                      </>
                      : ''
                    }
                    {Math.floor(scheduleData.seenSpan / 60) && scheduleData.seenSpan % 60 ? 'and ' : ''}
                    {scheduleData.seenSpan % 60 ?
                      <>
                        <span className="yellow">
                          {`${scheduleData.seenSpan % 60}`}
                        </span>
                        {scheduleData.seenSpan % 60 > 1 ? ' minutes ' : ' minute '}
                      </>
                      : ''
                    }
                    completed ({Math.round(scheduleData.seenSpan / scheduleData.totalSpan * 10000) / 100}%) out of {scheduleData.totalSpan ? <>
                      {Math.floor(scheduleData.totalSpan / 60) ?
                        <>
                          <span className="yellow">
                            {`${Math.floor(scheduleData.totalSpan / 60)}`}
                          </span>
                          {scheduleData.totalSpan / 60 > 1 ? ' hours' : ' hour'}
                        </>
                        : ''
                      }
                      {Math.floor(scheduleData.totalSpan / 60) && scheduleData.totalSpan % 60 ? ' and ' : ''}
                      {scheduleData.totalSpan % 60 ?
                        <>
                          <span className="yellow">
                            {`${scheduleData.totalSpan % 60}`}
                          </span>
                          {scheduleData.totalSpan % 60 > 1 ? ' minutes' : ' minute'}
                        </>
                        : ''
                      }
                    </> : '0 minutes'}.
                  </span>
                </fieldset>
              </details>
            </fieldset>
            <Schedule scheduleData={scheduleData} user={user} />
          </>
          }
        </main >
      )
        : <p>No Access</p>)
      }
    </>
  )

  function onDragStart(event: DragStartEvent) {
    setTempLayers(null)
    setActiveEntry({ ...event.active, ...(event.active.data.current?.entry || {}) })
  }

  function onDragEnd() {
    setActiveEntry(null)
    setOutlinePos(null)
    if (JSON.stringify(tempLayers) !== JSON.stringify(layers))
      if (tempLayers) setLayers(tempLayers, true)

    setTempLayers(null)
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const ActID = String(active.id).split('-')
    const OvrID = String(over.id).split('-')

    if (outlinePos === `${OvrID[0]}-${OvrID[1]}`) return

    setTempLayers(
      moveEntry(
        Number(ActID[0]),
        Number(ActID[1]),
        Number(OvrID[0]),
        Number(OvrID[1]),
      ),
    )
  }

  function moveEntry(oldLayer: number, oldIndex: number, newLayer: number, newIndex: number) {
    const clone = JSON.parse(JSON.stringify(layers))
    const entry = layers[oldLayer][oldIndex]

    clone[oldLayer].splice(oldIndex, 1)
    clone[newLayer].splice(
      Math.min(clone[newLayer].length - 1, newIndex),
      0,
      entry,
    )
    setOutlinePos(
      `${newLayer}-${Math.min(clone[newLayer].length - 2, newIndex)}`,
    )
    return clone
  }
}