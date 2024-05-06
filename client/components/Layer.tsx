import Entry from './Entry.tsx'

function Layer({
  id,
  entries,
  layers,
  setLayers,
  data,
  addData,
}: {
  id: number
  entries: any[]
  layers: any[]
  setLayers: any
  data: object
  addData: any
}) {
  function setEntries(newEntries, force = false) {
    layers[id] = newEntries
    setLayers([...layers], force)
  }

  // If no entries exist, or all entries are objects (but not arrays) then add a blank entry
  if (
    entries.length === 0 ||
    entries.every((entry) => typeof entry === 'object' && !Array.isArray(entry))
  ) {
    entries.push('')
  }

  return (
    <div className="layer" id={`layer-${id}`}>
      <div className="options">
        {entries.map((entry, index) => (
          <Entry
            id={index}
            key={index}
            entry={entry}
            entries={entries}
            setEntries={setEntries}
            layer={id}
            data={data}
            addData={addData}
          />
        ))}
      </div>
      <button onClick={() => setLayers(layers.filter((_, i) => i !== id))}>
        x
      </button>
    </div>
  )
}

export default Layer
