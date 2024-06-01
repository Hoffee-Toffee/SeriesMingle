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

// Get project
router.get('/:user', async (req, res) => {
  const user = req.params.user
  // Get the project document where the 'user' property matches the provided user ID
  const projectQuery = collection(firestore, 'projects')
  const querySnapshot = await getDocs(projectQuery)

  let projectData
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data.user === user) {
      projectData = {
        ...data,
        state: data.state ? JSON.parse(data.state) : undefined,
      }
    }
  })

  // Check if the project exists
  if (!projectData) {
    return res.send(null)
  }

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

  // Check if the user property is provided in the request body
  if (!projectData || !projectData.user) {
    return res.status(400)
  }

  const projectQuery = collection(firestore, 'projects')
  const querySnapshot = await getDocs(projectQuery)

  let existingProjectId

  // Check if a project already exists for the user
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data.user === projectData.user) {
      existingProjectId = doc.id
      return
    }
  })

  try {
    // If a project exists, update it; otherwise, create a new project
    if (existingProjectId) {
      const projectRef = doc(firestore, 'projects', existingProjectId)
      if (projectData.state) {
        await setDoc(projectRef, { ...projectData, state: null })
      } else {
        await updateDoc(projectRef, toUpdate)
      }
      res.send('Project updated successfully')
    } else {
      const newProjectRef = await addDoc(
        collection(firestore, 'projects'),
        projectData,
      )
      res.send('Project created successfully with ID: ' + newProjectRef.id)
    }
  } catch (error) {
    console.error('Error setting document: ', error)
    res.status(500).send('Error setting project data')
  }
})

export default router
