import { Outlet, useLocation, useOutlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import useScroll from '../functions/scroll.ts'
import { auth } from '../../server/firebase.ts'
import '../styles/app.scss'

export default function App() {
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
      if (!showLoading && typeof loader == "number") clearTimeout(loader)
    })
  }, [loader, showLoading])

  // Reset the loading on location change
  useEffect(() => {
    return () => {
      setIsPageLoaded(false)
    }
  }, [location])

  // Log the outlet component element name
  const page = useOutlet()?.props.children.props.routeContext.matches.at(-1).pathname.split('/')[1] || 'home'

  if (!isPageLoaded) {
    // Set the page title
    document.title = "SeriesMingle"
    if (page !== 'home') document.title = `${page.charAt(0).toUpperCase()}${page.slice(1)} | ${document.title}`
  }

  // Scroll logic
  useScroll(isPageLoaded)

  return (
    <>
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
            <div id={page}>
              <Outlet />
            </div>
          </LoadingContext.Provider>
        </UserContext.Provider>}
    </>
  )
}

export const UserContext = createContext({})
export const LoadingContext = createContext({})