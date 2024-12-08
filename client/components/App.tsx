import { Outlet, useLocation, useOutlet } from 'react-router-dom'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { auth } from '../../server/firebase.ts'
import Nav from './Nav.tsx'
import icon from '../../icons/icon.png'
import '../styles/app.scss'
import CacheBuster from 'react-cache-buster'
import { version } from '../../package.json'
import { User as FirebaseUser, UserInfo } from 'firebase/auth';

interface User extends FirebaseUser {
  providerData: UserInfo[];
}

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
  let page = useOutlet()?.props.children.props.routeContext.matches.at(-1).pathname.split('/')[1] || 'home'
  if (page == 'logout') page = 'login'

  if (!(isPageLoaded && page == "project")) {
    // Set the page title
    document.title = "SeriesMingle"
    if (page !== 'home') document.title = `${page.charAt(0).toUpperCase()}${page.slice(1)} | ${document.title}`
  }

  const loading = (hasLoaded: boolean) => <div id="loading" className={hasLoaded ? 'loaded' : 'loading'}>
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <span className="scanline"></span>
  </div>

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={process.env.NODE_ENV === 'production'}
      reloadOnDowngrade={true}
      isVerboseMode={true}
      loadingComponent={loading(hasLoaded)}
    >
      {showLoading && loading(hasLoaded)}
      {isAuthLoaded &&
        <UserContext.Provider value={{ user, setUser }}>
          <LoadingContext.Provider value={{ isPageLoaded, setIsPageLoaded }}>
            <div id={page}>
              <header id="nav-bar">
                <a href="/" id="home-link" aria-label="Home Page">
                  <img src={icon} alt="SeriesMingle Logo" id="logo" />
                </a>
                <input type="checkbox" id="nav-toggle" />
                <label htmlFor="nav-toggle" id="nav-toggle-label" aria-label="Toggle Navigation">
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
                <Nav page={page} user={user} />
              </header>
              <Outlet />
            </div>
          </LoadingContext.Provider>
        </UserContext.Provider>}
    </CacheBuster>
  )
}

export const UserContext = createContext({} as { user: User | null, setUser: Dispatch<SetStateAction<User | null>> })
export const LoadingContext = createContext({} as { isPageLoaded: boolean, setIsPageLoaded: Dispatch<SetStateAction<boolean>> })