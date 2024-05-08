import { useState, useEffect } from 'react'
import Layer from './Layer.tsx'
import { generateSchedule } from '../functions/generateSchedule.ts'
import Schedule from './Schedule.tsx'
import example from '../files/example.json'
import fetchProject from '../apis/fetchProject.ts'
import setProject from '../apis/setProject.ts'

function Main({ user, signOut }) {
  // Layers as a state
  const [state, setState] = useState({
    layers: [[]],
    mpSpacing: 'normal',
    data: { tv: {}, movie: {} },
    bookmark: null,
    force: false,
    saved: true,
  })

  useEffect(() => {
    const fetchProjectData = async () => {
      const fromCloud = await fetchProject(user.uid)
      console.log(fromCloud)
      if (fromCloud) setState(fromCloud)
    }

    fetchProjectData()
  }, [user.uid])

  const { layers, mpSpacing, data, bookmark, saved } = state

  useEffect(() => {
    if (state.force) {
      console.log('force rerender')
      setProject({ ...state, force: false }, user.uid)
      setState({
        mpSpacing,
        layers,
        data,
        bookmark,
        saved: false,
        force: false,
      })
    }
  }, [bookmark, data, layers, mpSpacing, state, state.force, user.uid])

  function addData(entry, layerId: number, entryId: number) {
    data[entry.type][entry.id] = entry
    layers[layerId][entryId] = entry
    setState({ ...state, layers, data, force: true, saved: false })
  }

  function setBookmark(newBookmark) {
    setState({ ...state, bookmark: newBookmark, saved: false, force: true })
  }

  function setLayers(newLayers, force = false) {
    setState({ ...state, layers: newLayers, saved: false, force })
  }

  function setMpSpacing(mpSpacing) {
    setState({ ...state, mpSpacing, saved: false, force: true })
  }

  return (
    <div id="main">
      <button onClick={signOut}>Sign Out</button>
      <button
        onClick={() => {
          // Fetch from example.json
          setState(example)
        }}
      >
        Load Example
      </button>
      {/* <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          try {
            // Load as JSON into state
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = (e) => {
              const text = e.target.result
              setState(JSON.parse(text))
            }
          } catch (e) {
            console.error(e)
          }
        }}
      /> */}
      <fieldset id="layerContainer">
        <legend>Layers</legend>
        {layers.map((entries, index) => (
          <Layer
            key={index}
            id={index}
            entries={entries}
            layers={layers}
            setLayers={setLayers}
            data={data}
            addData={addData}
          />
        ))}
        <button onClick={() => setLayers([...layers, []])}>Add Layer</button>
      </fieldset>
      <fieldset id="mp" onChange={(e) => setMpSpacing(e.target.value)}>
        <legend>Space Multi-Parters...</legend>
        {['Normally', 'Closer', 'Consecutively'].map((option, i) => (
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
      </fieldset>
      {/* <button
        onClick={() => {
          // Save as JSON, with saved set to true
          const text = JSON.stringify({ ...state, saved: true })
          const blob = new Blob([text], { type: 'text/plain' })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'schedule.txt'
          a.click()
          setState({ ...state, saved: true })
        }}
      >
        Export Schedule
      </button> */}
      <Schedule
        scheduleData={generateSchedule(
          layers,
          mpSpacing,
          bookmark,
          setBookmark,
        )}
      />
    </div>
  )
}

export default Main
