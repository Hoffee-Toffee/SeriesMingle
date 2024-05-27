import Main from './Main.tsx'
import LogIn from './Login.tsx'
import { auth } from '../../server/firebase.ts'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import favicon from '../files/favicon.ico'

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [loaded, setLoaded] = useState(false)

  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user || null)
      setLoaded(true)
    })
  }, [])

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
      {loaded &&
        (user || id ? (
          <Main user={user} id={id} signOut={() => auth.signOut()} />
        ) : (
          <LogIn setUser={setUser} />
        ))}
    </>
  )
}
