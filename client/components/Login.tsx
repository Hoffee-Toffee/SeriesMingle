import { useRef, useState } from 'react'
import '../styles/login.scss'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

import favicon from '../files/favicon.ico'
import { useContext } from 'react';
import { LoadingContext, UserContext } from './App.tsx';

export default function LogIn() {
  const { setUser } = useContext(UserContext)
  const [error, setError] = useState('')

  const [creatingEmail, setCreatingEmail] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  if (!isPageLoaded) setIsPageLoaded(true)

  function onSubmit(e) {
    e.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    console.log({ email, password, confirmPassword })

    if (creatingEmail && password != confirmPassword) {
      return setError("Passwords don't match.")
    }

    setError('')

    if (creatingEmail) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((user) => {
          setUser(user.user)
        })
        .catch((error) => {
          console.error(error)
          switch (error.code) {
            case 'auth/email-already-exists':
            case 'auth/email-already-in-use':
              setError('Email already in use.')
              break
            case 'auth/invalid-email':
              setError('Invalid email: Must be a valid email address.')
              break
            case 'auth/invalid-password':
            case 'auth/weak-password':
              setError(
                'Invalid password: Must contain at least six characters.',
              )
              break
            default:
              setError('An unknown error has occurred, please try again.')
              console.log(error.code)
          }
        })
    } else {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((user) => {
          setUser(user.user)
        })
        .catch((error) => {
          console.error(error)
          switch (error.code) {
            case 'auth/invalid-email':
              setError('Invalid email.')
              break
            case 'auth/missing-password':
              setError('Invalid password.')
              break
            case 'auth/invalid-credential':
              setError('Email or password is incorrect.')
              break
            default:
              setError('An unknown error has occurred, please try again.')
              console.log(error.code)
          }
        })
    }
  }

  function SignInWithGoogle() {
    const googleAuth = new GoogleAuthProvider()

    signInWithPopup(getAuth(), googleAuth)
      .then((user) => {
        setUser(user.user)
      })
      .catch((error) => {
        alert(`Error Signing in: ${error.code}`)
        console.error(error)
      })

    return googleAuth
  }

  return (
    <>
      <img src={favicon} alt="Series Mingle logo" id="logo" />
      <h1>
        <span>Series</span>
        <span>Mingle</span>
      </h1>
      <fieldset id="login-form">
        <legend>
          <h2>{creatingEmail ? 'Create Account' : 'Sign In'}</h2>
        </legend>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          onChange={() => {
            setError('')
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          maxLength={30}
          ref={passwordRef}
          onChange={() => {
            setError('')
          }}
        />
        {creatingEmail && (
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm password"
            maxLength={30}
            ref={confirmPasswordRef}
            onChange={() => {
              setError('')
            }}
          />
        )}
        {error ? <p className="error-message">{error}</p> : <></>}
        <button onClick={onSubmit} id="submit" type="submit" value="Submit">
          <h3>{creatingEmail ? "Create Account" : "Sign In"}</h3>
        </button>
        <div className="separator">
          <hr className="line" />
          <span className="text">or</span>
          <hr className="line" />
        </div>
        <button className="google-sign-in" onClick={SignInWithGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0//images/auth/google.svg"
            alt="Google logo"
          />
          <span>Continue with Google</span>
        </button>
      </fieldset>
      <span>
        {`${creatingEmail ? 'Already' : "Don't"} have an account?`}
        <a href="#" onClick={() => {
          setCreatingEmail(!creatingEmail)
          setError('')
        }}>
          {creatingEmail ? 'Sign In' : 'Create Account'}
        </a>
      </span>
    </>
  )
}
