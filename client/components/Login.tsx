import { useRef, useState } from 'react'
import '../styles/login.scss'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

export default function LogIn({ setUser }) {
  const [error, setError] = useState('')

  const [creatingEmail, setCreatingEmail] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  function onSubmit(e) {
    e.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    console.log({ email, password, confirmPassword })

    if (creatingEmail && password != confirmPassword) {
      return setError("Passwords don't match.")
    }

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
            case 'auth/email-already-exists':
              setError('Email already in use.')
              break
            case 'auth/invalid-email':
              setError('Invalid email.')
              break
            case 'auth/missing-password':
            case 'auth/invalid-password':
              setError('Invalid password.')
              break
            case 'auth/invalid-login-credentials':
              setError('Email or password is incorrect.')
              break
            default:
              setError('An unknown error has occurred, please try again.')
              break
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
    <div id="login">
      <h1>{creatingEmail ? 'Sign Up' : 'Sign In'}</h1>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        maxLength={30}
        ref={passwordRef}
      />
      {creatingEmail && (
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Confirm password"
          maxLength={30}
          ref={confirmPasswordRef}
        />
      )}
      <button onClick={onSubmit} id="submit" type="submit" value="Submit">
        <h2>Sign In</h2>
      </button>
      {!creatingEmail && (
        <>
          <button className="google-sign-in" onClick={SignInWithGoogle}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0//images/auth/google.svg"
              alt="Google logo"
            />
            <span>Sign in with Google</span>
          </button>
        </>
      )}
      {error ? <p className="error-message">{error}</p> : <br />}
      <a href="#" onClick={() => setCreatingEmail(!creatingEmail)}>
        {creatingEmail ? 'Log In' : 'Sign Up'}
      </a>
    </div>
  )
}
