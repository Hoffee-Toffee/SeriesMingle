import Main from './Main.tsx'
import LogIn from './Login.tsx'
import { auth } from '../../server/firebase.ts'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  return user ? <Main user={user} /> : <LogIn setUser={setUser} />
}
