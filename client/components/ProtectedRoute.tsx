import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './App.tsx';

export default function ProtectedRoute({ children, ifLoggedIn = true, redirectTo = '/login', includeRedirect = false }) {
  const { user } = useContext(UserContext)

  const [searchParams] = useSearchParams();
  const from = searchParams.get('from')

  console.log(from)

  // Get the current path
  if (includeRedirect) redirectTo = `${redirectTo}?from=${useLocation().pathname}`
  else if (from) redirectTo = from


  return ifLoggedIn == !user ? <Navigate to={redirectTo} /> : <>{children}</>
}