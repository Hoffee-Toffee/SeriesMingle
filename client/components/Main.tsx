import { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import favicon from '../files/favicon.ico'
import Layer from './Layer.tsx'
import { generateSchedule } from '../functions/generateSchedule.ts'
import Schedule from './Schedule.tsx'
import example from '../files/example.json'
import fetchProject from '../apis/fetchProject.ts'
import setProject from '../apis/setProject.ts'
import Entry from './Entry.tsx'

function Main({ user, id, signOut }) {
  const uid = user?.uid
  const readOnly = !(uid == id || (uid && !id))

  const initialState = {
    layers: [[]],
    mpSpacing: 'normal',
    data: { tv: {}, movie: {}, custom: {} },
    bookmark: null,
    force: false,
    titles: [],
    streak: 0,
    goal: 0
  }
  // Layers as a state
  const [state, setState] = useState(initialState)

  const [activeEntry, setActiveEntry] = useState(null)
  const [tempLayers, setTempLayers] = useState(null)
  const [outlinePos, setOutlinePos] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadAnimation, setLoadAnimation] = useState(null)
  const [changedProps, setChangedProps] = useState([])
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    const onBeforeUnload = (e) => {
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
    const fetchProjectData = async () => {
      const fromCloud = await fetchProject(id || uid)
      setIsLoaded(true)
      setLoadAnimation('fadein')
      if (fromCloud) setState(fromCloud)
    }

    fetchProjectData()
  }, [uid, id])

  const { layers, mpSpacing, data, bookmark, titles, streak, goal } = {
    ...initialState,
    ...state,
  }

  const shown = tempLayers || layers

  useEffect(() => {
    if (state.force && !readOnly) {
      console.log('force rerender')
      // Compare the new state with the old state
      setSaved(false)
      setProject({ ...state, force: false }, uid, changedProps).then((_) =>
        setSaved(true),
      )
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
      })
    }
  }, [
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
    goal
  ])

  function addData(entry, layerId: number, entryId: number) {
    if (readOnly) return
    data[entry.type] = data[entry.type] || {}
    data[entry.type][entry.id] = entry
    layers[layerId][entryId] = { ref: [entry.type, entry.id] }
    setState({ ...state, layers, data, force: true })
    setChangedProps([...changedProps, 'data'])
  }

  function setCustom(newData = null, layer = null, id = null) {
    if (readOnly) return
    const defaultData = {
      title: newData || 'Custom Set',
      type: 'custom',
      id: data.custom ? Object.keys(data.custom).length + 1 : 1,
      runtime: 30,
      repeat: 1,
      offset: 0,
      term: 'Part',
    }
    if (!layer) {
      data.custom = data.custom || {}
      data.custom[newData.id] = newData
      setState({ ...state, data, force: true })
      setChangedProps([...changedProps, 'data'])
    } else {
      addData(typeof newData == 'string' ? defaultData : newData, layer, id)
    }
  }

  function setBookmark(newBookmark) {
    if (readOnly) return
    setState({ ...state, bookmark: newBookmark, force: true })
    setChangedProps([...changedProps, 'bookmark'])
  }

  function setLayers(newLayers, force = false) {
    if (readOnly) return
    setState({
      ...state,
      layers: newLayers,

      force,
      bookmark: undefined,
    })
    setChangedProps([...changedProps, 'layers'])
  }

  function setMpSpacing(mpSpacing) {
    if (readOnly) return
    setState({ ...state, mpSpacing, force: true })
    setChangedProps([...changedProps, 'mpSpacing'])
  }

  function setStreak(streak) {
    if (readOnly) return
    setState({ ...state, streak, force: true })
    setChangedProps([...changedProps, 'streak'])
  }

  function setGoal(goal) {
    if (readOnly) return
    setState({ ...state, goal, force: true })
    setChangedProps([...changedProps, 'goal'])
  }

  function setTitle(layer, title) {
    if (readOnly) return
    titles[layer] = title
    setState({
      ...state,
      titles,

      force: true,
    })
    setChangedProps([...changedProps, 'titles'])
  }

  function setShow(showId, newData) {
    if (readOnly) return
    // If data is a string then it is just the 'userTitle'
    // If not then it is an object and will replace the entire record
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

  function setMovie(movieId, newData) {
    data.movies[movie] = newData
    setState({
      ...state,
      data,

      force: true,
    })
    setChangedProps([...changedProps, 'data'])
  }

  const scheduleData = generateSchedule(
    layers,
    mpSpacing,
    bookmark,
    setBookmark,
    data,
    setLayers,
    titles,
    setTitle,
    setShow,
    setCustom,
    streak,
    goal
  )

  return (
    <>
      <div id="loading-projects" className={isLoaded ? 'loaded' : 'loading'}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <span className="scanline"></span>
      </div>
      {isLoaded && (
        <div id="main" className={loadAnimation}>
          {readOnly && (
            <span
              style={{ color: 'white', display: 'block', textAlign: 'center' }}
            >
              READ-ONLY
            </span>
          )}
          {user && <button onClick={signOut}>Sign Out</button>}
          {user && scheduleData.schedule.length > 0 && (
            <button
              onClick={() =>
                navigator.share({
                  title: 'My Watching Schedule',
                  text: 'Check out my watching schedule on SeriesMingle!',
                  url: `${window.location.origin}${window.location.pathname}?id=${uid}`,
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
          <fieldset id="layerContainer">
            <legend>Layers</legend>
            {bookmark ? (
              <span>Layer editing locked while bookmark exists.</span>
            ) : (
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
                    />
                  ))}
                </SortableContext>
                <button onClick={() => setLayers([...layers, []])}>
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
            )}
          </fieldset>
          {/* Collapsible set (summary and details) */}
          <fieldset id='settings'>
            <details>
              <summary>
                <legend>
                  Schedule Settings
                </legend>
              </summary>
              <fieldset id="mp" onChange={(e) => setMpSpacing(e.target.value)}>
                <legend>Space Multi-Parters...</legend>
                {bookmark ? (
                  <span>Spacing adjustment locked while bookmark exists.</span>
                ) : (
                  ['Normally', 'Closer', 'Consecutively'].map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`mp-opt-${i}`}
                        value={option.toLowerCase().slice(0, 6)}
                        checked={mpSpacing === option.toLowerCase().slice(0, 6)}
                      />
                      <label htmlFor={`mp-opt-${i}`}>{option}</label>
                    </div>
                  ))
                )}
              </fieldset>
              <fieldset id="streak">
                <legend>Average Streak Duration (hours)</legend>
                {bookmark ? (
                  <span>Streak adjustment locked while bookmark exists.</span>
                ) : (
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={streak}
                    onChange={(e) => setStreak(Math.max(parseFloat(e.target.value), 0))}
                  />
                )}
              </fieldset>
              {streak !== 0 ? (
                <fieldset id="goal">
                  <legend>Average # of Streaks per Watch Session</legend>
                  {bookmark ? (
                    <span>Streak adjustment locked while bookmark exists.</span>
                  ) : (
                    <>
                      <input
                        type="number"
                        min="0"
                        max="25"
                        step="1"
                        value={goal}
                        onChange={(e) => setGoal(Math.max(parseInt(e.target.value), 0))}
                      />
                      {goal ? <>
                        <br />
                        <span>Making ~{Math.round([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1} watch sessions</span>
                        <br />
                        <span>Each with an average length of {Math.round((scheduleData.totalSpan / ([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1) / 6) / 10} hours</span>
                      </> : null}
                    </>
                  )}
                </fieldset>
              ) : (
                null
              )}
            </details></fieldset>
          {scheduleData.schedule.length > 0 && (
            <Schedule scheduleData={scheduleData} user={user} />
          )}
        </div>
      )}
    </>
  )

  function onDragStart(event: DragStartEvent) {
    console.log('drag start')
    setTempLayers(null)
    setActiveEntry({ ...event.active, ...event.active.data.current.entry })
  }

  function onDragEnd(event) {
    console.log('drag end')
    setActiveEntry(null)
    setOutlinePos(null)
    if (JSON.stringify(tempLayers) !== JSON.stringify(layers))
      setLayers(tempLayers, true)
    setTempLayers(null)
  }

  function onDragOver(event: DragOverEvent) {
    console.log('drag over')
    const { active, over } = event
    if (!over) return

    if (outlinePos === `${over.id.split('-')[0]}-${over.id.split('-')[1]}`)
      return

    setTempLayers(
      moveEntry(
        active.id.split('-')[0],
        active.id.split('-')[1],
        over.id.split('-')[0],
        over.id.split('-')[1],
      ),
    )
  }

  function moveEntry(oldLayer, oldIndex, newLayer, newIndex) {
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

export default Main
