import Entry from './Entry.tsx'
import { SortableContext } from "@dnd-kit/sortable";

function Layer({
  id,
  entries,
  layers,
  setLayers,
  data,
  addData,
  outlinePos,
  setCustom,
  titles,
  setTitles,
}: {
  id: number
  entries: any[]
  layers: any[]
  setLayers: any
  data: object
  addData: any
  outlinePos: any,
  setCustom: any,
  titles: string[],
  setTitles: any,
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
    <fieldset className="layer" id={`layer-${id}`}>
      <details open>
        <summary><legend>
          <span contentEditable suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (!e.target.innerText.trim()) e.target.innerText = titles[id]
              else setTitles(id, e.target.innerText)
            }}
          >{titles[id]}</span>
        </legend></summary>
        <div className="options">
          <SortableContext items={Array(entries.length)}>
            {entries.map((entry, index) => (
              <Entry
                id={index}
                key={`${id}-${index}`}
                entry={entry}
                entries={entries}
                setEntries={setEntries}
                layer={id}
                data={data}
                addData={addData}
                setCustom={setCustom}
                className={outlinePos == `${id}-${index}` && 'outline'}
              />
            ))}
          </SortableContext>
        </div>
        <button onClick={() => setLayers(layers.filter((_, i) => i !== id), true)}>
          x
        </button>
      </details>
    </fieldset>
  )
}

export default Layer
