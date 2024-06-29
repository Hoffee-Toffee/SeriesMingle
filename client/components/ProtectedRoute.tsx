import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './App.tsx';

export default function ProtectedRoute({ children, ifLoggedIn = true, redirectTo = '/login' }) {
  const { user } = useContext(UserContext)

  return ifLoggedIn == !user ? <Navigate to={redirectTo} /> : <>{children}</>
}