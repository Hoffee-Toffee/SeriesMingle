import { Helmet } from 'react-helmet'
import favicon from '../files/favicon.ico'
import { Outlet, useLocation } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'

import { auth } from '../../server/firebase.ts'

export default function App() {
  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')
  const location = useLocation().key

  const [user, setUser] = useState(auth.currentUser)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const [showLoading, setShowLoading] = useState(false)
  const hasLoaded = isAuthLoaded && isPageLoaded

  const loader = hasLoaded ? null : setTimeout(() => {
    setShowLoading(true)
  }, 2000)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user || null)
      setIsAuthLoaded(true)
      if (!showLoading) clearTimeout(loader)
    })
  }, [loader, showLoading])

  // Reset the loading on location change
  useEffect(() => {
    return () => {
      setIsPageLoaded(false)
    }
  }, [location])

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={`${window.location.origin}${window.location.pathname}`}
        />
        <meta
          property="og:image"
          content={favicon}
        />
        {id &&
          <meta
            property="og:description"
            content="Check out my TV and movie schedule on SeriesMingle!"
          />
        }
      </Helmet>
      {showLoading &&
        <div id="loading" className={hasLoaded ? 'loaded' : 'loading'}>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <span className="scanline"></span>
        </div>}
      {isAuthLoaded &&
        <UserContext.Provider value={{ user, setUser }}>
          <LoadingContext.Provider value={{ isPageLoaded, setIsPageLoaded }}>
            <Outlet />
          </LoadingContext.Provider>
        </UserContext.Provider>}
    </>
  )
}

export const UserContext = createContext({})
export const LoadingContext = createContext({})