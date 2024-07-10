import { useState, useContext, useEffect } from 'react';
import { UserContext, LoadingContext } from './App.tsx';
import fetchUserProjects from '../apis/fetchUserProjects.ts';
import { useNavigate } from 'react-router-dom';
import createProject from '../apis/createProject.ts';
import { signOut } from 'firebase/auth';
import { auth } from '../../server/firebase.ts';
import ProjectCard from '../components/ProjectCard.tsx';
import '../styles/dash.scss';
import cloneProject from '../apis/cloneProject.ts';
import deleteProject from '../apis/deleteProject.ts';

export default function Dashboard() {
  const { user } = useContext(UserContext)

  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  const [userProjects, setUserProjects] = useState([])

  const navigate = useNavigate();

  async function createProjectAndOpen(project = null) {
    // 1. Use API to create blank project linked to the user's account, returning the newly created project's id
    // 2. Redirect to the newly created project's page at '/project/:id'
    // If 'project' is defined, then clone that project instead

    let newProject

    console.log(project)

    if (project) newProject = await cloneProject(project, user.uid)
    else newProject = await createProject(user.uid)

    console.log(newProject)
    navigate(`/project/${newProject.id}`)
  }

  async function deleteProjectAndRemove(project: string) {
    // 1. Use API to delete the project
    // 2. Remove the project's card from the user's list of projects
    await deleteProject(project)
    setUserProjects(userProjects.filter((p) => p.id !== project))
  }


  useEffect(() => {
    const fetchProjectData = async () => {
      const projects = await fetchUserProjects(user.uid)
      setIsPageLoaded(true)
      setUserProjects(projects.sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0)))
    }

    fetchProjectData()
  }, [user, setIsPageLoaded])

  return (
    <div>
      <button onClick={() => signOut(auth)} >Sign Out</button>
      <h1>Dashboard</h1>
      <div id='contextMenu'>
        <button onClick={() => document.getElementById('deletePopup').classList.add('show')}>Delete</button>
        <button onClick={(e) => createProjectAndOpen(e.target.parentElement.getAttribute('data-id'))}>Clone</button>
      </div>
      <div id='deletePopup'>
        <div>
          <p>Delete <span />?</p>
          <button onClick={() => {
            deleteProjectAndRemove(document.getElementById('contextMenu').getAttribute('data-id'))
            document.getElementById('deletePopup').classList.remove('show')
          }}>Yes</button>
          <button onClick={() => document.getElementById('deletePopup').classList.remove('show')}>No</button>
        </div>
      </div>
      {isPageLoaded && <><div id='your-projects' className='projects-list'>
        <h2>Your Projects</h2>
        {userProjects.length ? userProjects.map(
          (project) => <ProjectCard key={project.id} project={project} />
        ) : <p>No Projects</p>}
        <button id='create-new' onClick={() => createProjectAndOpen()}>Create Project</button></div>
        <div id='shared-projects' className='projects-list'>
          <h2>Shared Projects</h2>
          <p>Coming Soon</p>
        </div>
      </>}
    </div>
  )
}