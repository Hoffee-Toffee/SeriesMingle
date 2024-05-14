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
import { createPortal } from 'react-dom'
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

  // Layers as a state
  const [state, setState] = useState({
    layers: [[]],
    mpSpacing: 'normal',
    data: { tv: {}, movie: {} },
    bookmark: null,
    force: false,
    saved: true,
  })

  const [activeEntry, setActiveEntry] = useState(null)
  const [tempLayers, setTempLayers] = useState(null)
  const [outlinePos, setOutlinePos] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  useEffect(() => {
    const fetchProjectData = async () => {
      const fromCloud = await fetchProject(id || uid)
      console.log(fromCloud)
      if (fromCloud) setState(fromCloud)
    }

    fetchProjectData()
  }, [uid, id])

  const { layers, mpSpacing, data, bookmark, saved } = state
  const shown = tempLayers || layers

  useEffect(() => {
    if (state.force && !readOnly) {
      console.log('force rerender')
      setProject({ ...state, force: false }, uid)
      setState({
        mpSpacing,
        layers,
        data,
        bookmark,
        saved: false,
        force: false,
      })
    }
  }, [bookmark, data, layers, mpSpacing, readOnly, state, state.force, uid])

  function addData(entry, layerId: number, entryId: number) {
    if (readOnly) return
    data[entry.type][entry.id] = entry
    layers[layerId][entryId] = { ref: [entry.type, entry.id] }
    setState({ ...state, layers, data, force: true, saved: false })
  }

  function setBookmark(newBookmark) {
    if (readOnly) return
    setState({ ...state, bookmark: newBookmark, saved: false, force: true })
  }

  function setLayers(newLayers, force = false) {
    if (readOnly) return
    setState({
      ...state,
      layers: newLayers,
      saved: false,
      force,
      bookmark: undefined,
    })
  }

  function setMpSpacing(mpSpacing) {
    if (readOnly) return
    setState({ ...state, mpSpacing, saved: false, force: true })
  }

  return (
    <div id="main">
      {readOnly && (
        <span style={{ color: 'white', display: 'block', textAlign: 'center' }}>
          READ-ONLY
        </span>
      )}
      {user && <button onClick={signOut}>Sign Out</button>}
      <button
        onClick={() => {
          if (readOnly) return
          setState(example)
        }}
      >
        Load Example
      </button>
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
            <SortableContext items={shown.flatMap((layer, li) => layer.map((_, ei) => ({ id: `${li}-${ei}` })))}>
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
                />
              ))}
            </SortableContext>

            <button onClick={() => setLayers([...layers, []])}>
              Add Layer
            </button>
            <DragOverlay dropAnimation={null}>
              {activeEntry && <Entry entry={activeEntry} data={data} className="overlay" />}
            </DragOverlay>
          </DndContext>
        )}
      </fieldset>
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
      <Schedule
        scheduleData={generateSchedule(
          layers,
          mpSpacing,
          bookmark,
          setBookmark,
          data,
          setLayers,
        )}
      />
    </div>
  )

  function onDragStart(event: DragStartEvent) {
    console.log('drag start')
    setTempLayers(null)
    setActiveEntry({ ...event.active, ...event.active.data.current.entry });
  }

  function onDragEnd(event) {
    console.log('drag end')
    setActiveEntry(null);
    setOutlinePos(null)
    if (JSON.stringify(tempLayers) !== JSON.stringify(layers)) setLayers(tempLayers, true)
    setTempLayers(null)
  }

  function onDragOver(event: DragOverEvent) {
    console.log('drag over')
    const { active, over } = event;
    if (!over) return;

    if (outlinePos === `${over.id.split('-')[0]}-${over.id.split('-')[1]}`) return;

    setTempLayers(moveEntry(active.id.split('-')[0], active.id.split('-')[1], over.id.split('-')[0], over.id.split('-')[1]))
  }

  function moveEntry(oldLayer, oldIndex, newLayer, newIndex) {
    const clone = JSON.parse(JSON.stringify(layers))
    const entry = layers[oldLayer][oldIndex]

    clone[oldLayer].splice(oldIndex, 1)
    clone[newLayer].splice(Math.min(clone[newLayer].length - 1, newIndex), 0, entry)
    setOutlinePos(`${newLayer}-${Math.min(clone[newLayer].length - 2, newIndex)}`)
    return clone
  }
}

export default Main
