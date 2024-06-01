import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCTwrQr6gu3sPRyL1QHGEJb0s_vxbkj9Rg',
  authDomain: 'series-mingle.firebaseapp.com',
  projectId: 'series-mingle',
  storageBucket: 'series-mingle.appspot.com',
  messagingSenderId: '823676525510',
  appId: '1:823676525510:web:653fcb2efeac7c78b930c7',
  measurementId: 'G-92TJZLM50Z',
}

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app)

export { firestore, auth, collection, getDocs, doc, addDoc, setDoc, updateDoc }
