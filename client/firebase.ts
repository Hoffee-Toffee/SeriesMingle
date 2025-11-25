import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'series-mingle.firebaseapp.com',
  projectId: 'series-mingle',
  storageBucket: 'series-mingle.appspot.com',
  messagingSenderId: '823676525510',
  appId: '1:823676525510:web:653fcb2efeac7c78b930c7',
  measurementId: 'G-92TJZLM50Z',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
