import { useState, useContext, useEffect } from 'react';
import { UserContext, LoadingContext } from './App.tsx';
import fetchUserProjects from '../apis/fetchUserProjects.ts';
import { Link, useNavigate } from 'react-router-dom';
import createProject from '../apis/createProject.ts';
import { signOut } from 'firebase/auth';
import { auth } from '../../server/firebase.ts';
import '../styles/dash.scss';

export default function Dashboard() {
  const { user } = useContext(UserContext)

  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  const [userProjects, setUserProjects] = useState([])

  const navigate = useNavigate();

  async function createProjectAndOpen() {
    // 1. Use API to create blank project linked to the user's account, returning the newly created project's id
    // 2. Redirect to the newly created project's page at '/project/:id'
    const newProject = await createProject(user.uid)
    console.log(newProject)
    navigate(`/project/${newProject.id}`)
  }

  useEffect(() => {
    const fetchProjectData = async () => {
      const projects = await fetchUserProjects(user.uid)
      setIsPageLoaded(true)
      console.log(projects)
      setUserProjects(projects)
    }

    fetchProjectData()
  }, [user, setIsPageLoaded])

  return (
    <div>
      <button onClick={() => signOut(auth)} >Sign Out</button>
      <h1>Dashboard</h1>
      {isPageLoaded && <><div id='your-projects' className='projects-list'>
        <h2>Your Projects</h2>
        {userProjects.length ? userProjects.map(
          (project) => <Link to={`/project/${project.id}`} key={project.id}>
            <div className="project-container">
              <h2>{project.title || 'Untitled Schedule'}</h2>
              <p>{project.description || 'No Description'}</p>
            </div>
          </Link>
        ) : <p>No Projects</p>}
        <button id='create-new' onClick={createProjectAndOpen}>Create Project</button></div>
        <div id='shared-projects' className='projects-list'>
          <h2>Shared Projects</h2>
          <p>Coming Soon</p>
        </div>
      </>}
    </div>
  )
}