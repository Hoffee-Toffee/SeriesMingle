import { Link } from 'react-router-dom'

export default function StaticExample() {
  return (
    <main className="page">
      <Link to="/about" className="link">About</Link>
      <input disabled={true} aria-hidden={false} data-value={true} />
      <span style={{ backgroundColor: 'var(--bgMain)' }}>Original text</span>
      <p>@endverbatim {'{{ example }}'}</p>
    </main>
  )
}
