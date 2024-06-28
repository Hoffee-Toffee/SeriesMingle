import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App.tsx'
import Project from './components/Project.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Project />} />
      <Route path="ping" element={<p>Pong!</p>} />
    </Route>
  </>,
)
