import {
  firestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
} from '../firebase.ts'
import { Router } from 'express'
const router = Router()

import { ProjectData, ScheduleStored } from '../../models/schedule.ts'

// Get and set project routes

// Get all user projects
router.get('/user/:user', async (req, res) => {
  const user = req.params.user
  // Get the project documents where the 'user' property matches the provided user ID
  const projectQuery = collection(firestore, 'projects')
  const querySnapshot = await getDocs(projectQuery)

  const projectArr = [] as ProjectData[]
  querySnapshot.forEach((doc) => {
    const data = doc.data() as ScheduleStored

    if (data.user === user) {
      projectArr.push({
        id: doc.id,
        ...data,
        state:
          data.state && typeof data.state === 'string'
            ? JSON.parse(data.state)
            : undefined,
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
    lastModified: new Date().getTime(),
  })
  res.send({ id: newProjectRef.id })
})

// Get project
router.get('/:id', async (req, res) => {
  const id = req.params.id
  // Get the project document where the ID matches the one provided
  const projectRef = doc(firestore, 'projects', id)
  const querySnapshot = await getDoc(projectRef)

  let projectData = null

  if (querySnapshot.exists()) {
    const data = querySnapshot.data()
    projectData = {
      ...data,
      state: data.state ? JSON.parse(data.state) : undefined,
    }
  }

  res.send(projectData)
})

// Set project
router.post('/', async (req, res) => {
  const projectData = await req.body
  const props = projectData.props
  const toUpdate = props.reduce(
    (obj: object, prop: string) => ({ ...obj, [prop]: projectData[prop] }),
    {
      lastModified: new Date().getTime(),
    },
  )

  // Check if the id is provided in the request body
  if (!projectData || !projectData.id) {
    return res.status(400)
  }

  try {
    const projectRef = doc(firestore, 'projects', projectData.id)
    if (projectData.state) {
      await setDoc(projectRef, {
        ...projectData,
        state: null,
        lastModified: new Date().getTime(),
      })
    } else {
      await updateDoc(projectRef, toUpdate)
    }
    res.send('Project updated successfully')
  } catch (error) {
    console.error('Error setting document: ', error)
    res.status(500).send('Error setting project data')
  }
})

// Delete project
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id

  // Check if the id is provided in the request body
  if (!id) {
    return res.status(400)
  }

  try {
    const projectRef = doc(firestore, 'projects', id)
    await deleteDoc(projectRef)
    res.send('Project deleted successfully')
  } catch (error) {
    console.error('Error deleting document: ', error)
    res.status(500).send('Error deleting project data')
  }
})

// Clone project
router.post('/clone', async (req, res) => {
  const data = await req.body
  const id = data.id

  // Check if the id is provided in the request body
  if (!id) {
    return res.status(400)
  }

  try {
    const projectRef = doc(firestore, 'projects', id)
    const projectSnapshot = await getDoc(projectRef)

    if (projectSnapshot.exists()) {
      const projectData = projectSnapshot.data()
      const newProjectRef = await addDoc(collection(firestore, 'projects'), {
        ...projectData,
        title: `Clone of '${projectData.title || 'Untitled Schedule'}'`,
        user: data.user,
      })
      res.send({ id: newProjectRef.id })
    } else {
      res.status(404).send('Project does not exist')
    }
  } catch (error) {
    console.error('Error cloning document: ', error)
    res.status(500).send('Error cloning project data')
  }
})

export default router
