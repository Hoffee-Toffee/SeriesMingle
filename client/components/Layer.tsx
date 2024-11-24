import { useEffect, useRef } from 'react';
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
  setShow,
  setMovie,
  runAfterConfirm,
  bookmark,
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
  setShow: any,
  setMovie: any,
  runAfterConfirm: any,
  bookmark: string | null
}) {
  function setEntries(newEntries, force = false) {
    layers[id] = newEntries
    setLayers([...layers], force)
  }

  const ref = useRef(null)

  useEffect(() => {
    const event = (e) => {
      if (e.key === ' ' || (!e.key && e.target.tagName !== 'SUMMARY')) e.preventDefault()

      if (e.key === " ") {
        // Change the span text to replace the selected text with a space
        console.log(ref.current.querySelector('span').innerText)
        const start = ref.current.querySelector('span').innerText.slice(0, window.getSelection().anchorOffset) || ''
        const end = ref.current.querySelector('span').innerText.slice(window.getSelection().focusOffset) || ''
        ref.current.querySelector('span').innerHTML = start + '&nbsp;' + end
        // Move the cursor to the end of the space
        const range = document.createRange()
        range.setStart(ref.current.querySelector('span').childNodes[0], start.length + 1)
        range.collapse(true)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }

    ref.current.addEventListener('keydown', event)
    ref.current.addEventListener('click', event)

    return () => {
      if (!ref.current) return
      ref.current.removeEventListener('keydown', event)
      ref.current.removeEventListener('click', event)
    }
  }, [ref])

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
        <summary ref={ref}><legend>
          <span contentEditable suppressContentEditableWarning={true}
            className={titles[id] ? '' : 'placeholder'}
            onBlur={(e) => {
              setTitles(id, e.target.innerText.trim() ? e.target.innerText : null)
              if (!e.target.innerText.trim()) {
                e.target.innerText = `Layer ${id + 1}`
                e.target.classList.add('placeholder')
              }
              else e.target.classList.remove('placeholder')
            }}
          >{titles[id] || `Layer ${id + 1}`}</span>
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
                setTitle={entry.ref ? entry.ref[0] == 'tv' ? setShow : setMovie : null}
                runAfterConfirm={runAfterConfirm}
                bookmark={bookmark}
                className={outlinePos == `${id}-${index}` && 'outline'}
              />
            ))}
          </SortableContext>
        </div>
        <button onClick={() => runAfterConfirm(() => setLayers(layers.filter((_, i) => i !== id), true))}>
          x
        </button>
      </details>
    </fieldset>
  )
}

export default Layer
