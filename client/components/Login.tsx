import { useEffect } from 'react'
import '../styles/login.scss'
import {
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'

import icon from '../../icons/icon.png'
import { useContext } from 'react';
import { LoadingContext, UserContext } from './App.tsx';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.ts';
import { Navigate } from 'react-router-dom';

export default function LogIn({ logout = false }) {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (logout) {
      signOut(auth)
      setUser(null)
    }
  }, [logout, setUser])

  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  useEffect(() => {
    if (!isPageLoaded) setIsPageLoaded(true)
  }, [isPageLoaded, setIsPageLoaded])

  function signInWithGoogle() {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const googleAuth = new GoogleAuthProvider()
        signInWithRedirect(auth, googleAuth)
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }

  return (logout && !user ? <Navigate to="/login" /> :
    <main>
      <img src={icon} alt="Series Mingle logo" id="logo" />
      <h1>
        <span>Series</span>
        <span>Mingle</span>
      </h1>
      <fieldset id="login-form">
        <legend>
          <h2>Login / Signup</h2>
        </legend>
        <button className="google-sign-in" onClick={signInWithGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0//images/auth/google.svg"
            alt="Google logo"
          />
          <span>Continue with Google</span>
        </button>
      </fieldset>
    </main>
  )
}
