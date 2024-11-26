import { useEffect, useRef } from 'react';
import Entry from './Entry.tsx'
import { SortableContext } from "@dnd-kit/sortable";
import { CustomDetails, Data, LayerEntry } from '../../models/schedule.ts';

export default function Layer({
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
  entries: LayerEntry[]
  layers: LayerEntry[][]
  setLayers: (layers: LayerEntry[][], force: boolean) => void
  data: Data
  addData: (entry: LayerEntry, layer: number, id: number) => void
  outlinePos: string | null
  setCustom: (entry: CustomDetails | string, layer?: number, id?: number) => void
  titles: string[],
  setTitles: (id: number, title: string | null) => void,
  setShow: () => void,
  setMovie: () => void,
  runAfterConfirm: (func: () => void) => void
  bookmark?: string | null
}) {
  function setEntries(newEntries: LayerEntry[], force = false) {
    layers[id] = newEntries
    setLayers([...layers], force)
  }

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const event = (e: KeyboardEvent | MouseEvent) => {
      const span = ref.current?.querySelector('span')

      if (("key" in e && e.key === ' ') || (!("key" in e) && (e.target as HTMLElement)?.tagName !== 'SUMMARY')) e.preventDefault()

      if (("key" in e && e.key === ' ') && ref.current && span) {
        // Change the span text to replace the selected text with a space
        const start = span.innerText.slice(0, window.getSelection()?.anchorOffset) || ''
        const end = span.innerText.slice(window.getSelection()?.focusOffset) || ''
        span.innerHTML = start + '&nbsp;' + end
        // Move the cursor to the end of the space
        const range = document.createRange()
        range.setStart(span.childNodes[0], start.length + 1)
        range.collapse(true)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }

    const currentRef = ref.current;
    currentRef?.addEventListener('keydown', event)
    currentRef?.addEventListener('click', event)

    return () => {
      currentRef?.removeEventListener('keydown', event)
      currentRef?.removeEventListener('click', event)
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
                setTitle={typeof entry === 'object' && 'ref' in entry && entry.ref ? entry.ref[0] == 'tv' ? setShow : setMovie : undefined}
                runAfterConfirm={runAfterConfirm}
                bookmark={bookmark}
                className={outlinePos == `${id}-${index}` ? 'outline' : ''}
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