import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App.tsx'
import Dashboard from './components/Dashboard.tsx'
import Project from './components/Project.tsx'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import NotFound from './components/NotFound.tsx'

import ProtectedRoute from './components/ProtectedRoute.tsx'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route index element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} /> */}
      <Route path="login" element={<ProtectedRoute ifLoggedIn={false} redirectTo="/dashboard">
        <Login />
      </ProtectedRoute>} />
      <Route path="logout" element={<Login logout />} />
      <Route path="dashboard" element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} />
      <Route path="project/:id" element={<ProtectedRoute includeRedirect={true}>
        <Project />
      </ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </>,
)
