import Main from './Main.tsx'
import LogIn from './Login.tsx'
import { auth } from '../../server/firebase.ts'
import { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user || null)
      setLoaded(true)
    })
  }, [])

  if (!loaded) return <p style={{ color: 'white' }}>Loading...</p>

  return user ? (
    <Main user={user} signOut={() => auth.signOut()} />
  ) : (
    <LogIn setUser={setUser} />
  )
}
