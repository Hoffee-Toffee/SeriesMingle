import {
  firestore,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  setDoc,
} from '../firebase.ts'
import { Router } from 'express'
const router = Router()

// Get and set project routes

// Get all user projects
router.get('/user/:user', async (req, res) => {
  const user = req.params.user
  // Get the project documents where the 'user' property matches the provided user ID
  const projectQuery = collection(firestore, 'projects')
  const querySnapshot = await getDocs(projectQuery)

  const projectArr = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data.user === user) {
      projectArr.push({
        id: doc.id,
        ...data,
        state: data.state ? JSON.parse(data.state) : undefined,
      })
    }
  })

  res.send(projectArr)
})

// Create project
router.post('/create', async (req, res) => {
  const data = await req.body
  const userId = data.user

  const newProjectRef = await addDoc(collection(firestore, 'projects'), {
    user: userId,
  })
  res.send({ id: newProjectRef.id })
})

// Get project
router.get('/:id', async (req, res) => {
  const id = req.params.id
  // Get the project document where the ID matches the one provided
  const projectQuery = collection(firestore, 'projects')
  const querySnapshot = await getDocs(projectQuery)

  let projectData = null
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (doc.id === id) {
      projectData = {
        ...data,
        state: data.state ? JSON.parse(data.state) : undefined,
      }
    }
  })

  res.send(projectData)
})

// Set project
router.post('/', async (req, res) => {
  const projectData = await req.body
  const props = projectData.props
  const toUpdate = props.reduce(
    (obj, prop) => ({ ...obj, [prop]: projectData[prop] }),
    {},
  )

  // Check if the id is provided in the request body
  if (!projectData || !projectData.id) {
    return res.status(400)
  }

  try {
    const projectRef = doc(firestore, 'projects', projectData.id)
    if (projectData.state) {
      await setDoc(projectRef, { ...projectData, state: null })
    } else {
      await updateDoc(projectRef, toUpdate)
    }
    res.send('Project updated successfully')
  } catch (error) {
    console.error('Error setting document: ', error)
    res.status(500).send('Error setting project data')
  }
})

export default router
