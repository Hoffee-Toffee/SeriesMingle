import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './App.tsx';

import { ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.ts';

export default function ProtectedRoute({ children, ifLoggedIn = true, redirectTo = '/login', includeRedirect = false }: { children?: ReactNode, ifLoggedIn?: boolean, redirectTo?: string, includeRedirect?: boolean }) {
  const { user } = useContext(UserContext)

  const [searchParams] = useSearchParams();
  const from = searchParams.get('from')

  // If signed in and redirect is to 'logout', then log out and redirect to 'login'
  if (user && redirectTo == '/logout') {
    redirectTo = '/login'
    signOut(auth)
  }

  // Get the current path
  const location = useLocation();
  if (includeRedirect) redirectTo = `${redirectTo}?from=${location.pathname}`
  else if (from) redirectTo = from

  return ifLoggedIn == !user ? <Navigate to={redirectTo} /> : <>{children}</>
}