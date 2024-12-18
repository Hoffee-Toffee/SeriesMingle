import { useState, useContext, useEffect } from 'react';
import { UserContext, LoadingContext } from './App.tsx';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.tsx';
import '../styles/dash.scss';
import createProject from '../apis/createProject.ts';
import cloneProject from '../apis/cloneProject.ts';
import deleteProject from '../apis/deleteProject.ts';
import leaveProject from '../apis/leaveProject.ts';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { ProjectData, ScheduleStored } from '../../models/schedule.ts';

export default function Dashboard() {
  const { user } = useContext(UserContext) as {
    user: {
      uid: string,
    }
  };

  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext) as { isPageLoaded: boolean, setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>> };
  const [ownedProjects, setOwnedProjects] = useState<ProjectData[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<ProjectData[]>([]);

  const navigate = useNavigate();
  const db = getFirestore();

  async function createProjectAndOpen(projectId: string | null = null) {
    let newProject;
    if (projectId) newProject = await cloneProject(projectId, user.uid);
    else newProject = await createProject(user.uid);
    navigate(`/project/${newProject.id}`);
  }

  async function deleteProjectAndRemove(projectId: string | null) {
    if (!projectId) return;
    await deleteProject(projectId);
    setOwnedProjects(ownedProjects.filter((p: { id: string }) => p.id !== projectId));
  }

  async function leaveProjectAndRemove(projectId: string | null) {
    if (!projectId) return;
    await leaveProject(projectId, user.uid);
    setJoinedProjects(joinedProjects.filter((p: { id: string }) => p.id !== projectId));
  }

  useEffect(() => {
    const ownedProjectsQuery = query(collection(db, 'projects'), where('user', '==', user.uid));
    const joinedProjectsQuery = query(collection(db, 'projects'), where(`permissions.${user.uid}`, '>=', 1));

    const ownedProjectsListener = onSnapshot(ownedProjectsQuery, (querySnapshot) => {
      const projectsArray: ProjectData[] = [];
      querySnapshot.forEach((doc) => {
        projectsArray.push({ ...doc.data() as ScheduleStored, id: doc.id });
      });
      setOwnedProjects(projectsArray.sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0)))
    });

    const joinedProjectsListener = onSnapshot(joinedProjectsQuery, (querySnapshot) => {
      const projectsArray: ProjectData[] = [];
      querySnapshot.forEach((doc) => {
        projectsArray.push({ ...doc.data() as ScheduleStored, id: doc.id });
      });
      setJoinedProjects(projectsArray.sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0)))
    });

    setIsPageLoaded(true);

    return () => {
      ownedProjectsListener();
      joinedProjectsListener();
    };
  }, [user, db, setIsPageLoaded]);

  return (
    <main>
      <h1>Dashboard</h1>
      <div id='contextMenu'>
        <button id="deleteProjectButton" onClick={() => document.getElementById('deletePopup')?.classList.add('show')}>Delete Project</button>
        <button id="leaveProjectButton" onClick={() => document.getElementById('leavePopup')?.classList.add('show')}>Leave Project</button>
        <button onClick={(e) => {
          const projectId = (e.target as HTMLElement).parentElement?.getAttribute('data-id');
          createProjectAndOpen(projectId);
        }}>Clone Project</button>
      </div>
      <div id='deletePopup'>
        <div>
          <p>Delete <span />?</p>
          <button onClick={() => {
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu) deleteProjectAndRemove(contextMenu.getAttribute('data-id'));
            document.getElementById('deletePopup')?.classList.remove('show');
          }}>Yes</button>
          <button onClick={() => document.getElementById('deletePopup')?.classList.remove('show')}>No</button>
        </div>
      </div>
      <div id='leavePopup'>
        <div>
          <p>Leave <span />?</p>
          <button onClick={() => {
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu) leaveProjectAndRemove(contextMenu.getAttribute('data-id'));
            document.getElementById('leavePopup')?.classList.remove('show');
          }}>Yes</button>
          <button onClick={() => document.getElementById('leavePopup')?.classList.remove('show')}>No</button>
        </div>
      </div>
      {isPageLoaded && <>
        <div id='your-projects' className='projects-list'>
          <h2>Your Projects</h2>
          {ownedProjects.length ? ownedProjects.map(
            (project) => <ProjectCard key={project.id} project={project} owner={true} />
          ) : <p>No Projects</p>}
          <button id='create-new' onClick={() => createProjectAndOpen()}>Create Project</button>
        </div>
        <div id='shared-projects' className='projects-list'>
          <h2>Shared Projects</h2>
          {joinedProjects.length ? joinedProjects.map(
            (project) => (
              <ProjectCard
                key={project.id}
                project={project}
                owner={false}
              />
            )
          ) : <p>No Shared Projects</p>}
        </div>
      </>}
    </main>
  );
}