import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />} />
  </>,
)
