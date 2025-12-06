
import { useEffect, useRef, useState } from 'react';
import Entry from './Entry.tsx';
import AddEntryButton from './AddEntryButton';
import SearchModal, { SearchResult } from './SearchModal';
import fetchMedia from '../apis/fetchMedia.ts';
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
    layers[id] = newEntries;
    setLayers([...layers], force);
  }

  // Modal state for AddEntryButton/SearchModal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  // Classic add logic (mirrors Entry)
  async function handleModalSelect(result: SearchResult) {
    setModalLoading(true);
    try {
      // TV/Movies: fetch media, then addData
      if (result.media_type === 'tv' || result.media_type === 'movie') {
        const mediaId = typeof result.id === 'string' ? parseInt(result.id, 10) : result.id;
        if (isNaN(mediaId)) throw new Error('Invalid media id');
        const res = await fetchMedia(result.media_type, mediaId);
        addData(res, id, entries.length - 1); // Add to last (blank) entry
      } else if (result.media_type === 'custom') {
        // Only pass as CustomDetails if id is a number
        if (typeof result.id === 'number') {
          setCustom(result as any, id, entries.length - 1);
        } else {
          setCustom(result.title, id, entries.length - 1);
        }
      } else if (result.barrier !== undefined) {
        // Barrier logic: add a barrier entry
        const newEntries = [...entries];
        newEntries[entries.length - 1] = { barrier: null };
        setEntries(newEntries, true);
      } else {
        // Fallback: treat as custom string
        setCustom(result.title, id, entries.length - 1);
      }
      setModalOpen(false);
    } catch (err) {
      // Optionally handle error
    } finally {
      setModalLoading(false);
    }
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


  // Filter out legacy entry types (string search, dropdown array)
  const filteredEntries = entries.filter(
    (entry) => typeof entry === 'object' && !Array.isArray(entry)
  );
  // If no valid entries, add a blank entry (to allow AddEntryButton to work)
  if (filteredEntries.length === 0) {
    filteredEntries.push({ barrier: null }); // Add a dummy barrier to keep structure
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
                e.target.innerText = `Layer ${id + 1}`;
                e.target.classList.add('placeholder');
              }
              else e.target.classList.remove('placeholder');
            }}
          >{titles[id] || `Layer ${id + 1}`}</span>
        </legend></summary>
        <div className="options">
          <SortableContext items={Array(filteredEntries.length)}>
            {filteredEntries.map((entry, index) => (
              <Entry
                id={index}
                key={`${id}-${index}`}
                entry={entry}
                entries={filteredEntries}
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
          <AddEntryButton onClick={() => setModalOpen(true)} />
        </div>
        <button onClick={() => runAfterConfirm(() => setLayers(layers.filter((_, i) => i !== id), true))}>
          &times;
        </button>
        {modalOpen && (
          <SearchModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSelect={handleModalSelect}
            loading={modalLoading}
          />
        )}
      </details>
    </fieldset>
  );
}