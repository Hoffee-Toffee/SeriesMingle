<main>
      <h1>Dashboard</h1>
      <div id='contextMenu'>
        <button id="deleteProjectButton" wire:click="document.getElementById('deletePopup')?.classList.add('show')">Delete Project</button>
        <button id="leaveProjectButton" wire:click="document.getElementById('leavePopup')?.classList.add('show')">Leave Project</button>
        <button wire:click="(e) => {
          const projectId = (e.target as HTMLElement).parentElement?.getAttribute('data-id');
          createProjectAndOpen(projectId);
        "}>Clone Project</button>
      </div>
      <div id='deletePopup'>
        <div>
          <p>Delete <span />?</p>
          <button wire:click="{
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu) deleteProjectAndRemove(contextMenu.getAttribute('data-id'));
            document.getElementById('deletePopup')?.classList.remove('show');
          "}>Yes</button>
          <button wire:click="document.getElementById('deletePopup')?.classList.remove('show')">No</button>
        </div>
      </div>
      <div id='leavePopup'>
        <div>
          <p>Leave <span />?</p>
          <button wire:click="{
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu) leaveProjectAndRemove(contextMenu.getAttribute('data-id'));
            document.getElementById('leavePopup')?.classList.remove('show');
          "}>Yes</button>
          <button wire:click="document.getElementById('leavePopup')?.classList.remove('show')">No</button>
        </div>
      </div>
      {isPageLoaded &&
        <div id='your-projects' class='projects-list'>
          <h2>Your Projects</h2>
          {ownedProjects.length ? ownedProjects.map(
            (project) => <ProjectCard key={project.id} project={project} owner={true} />
          ) : <p>No Projects</p>}
          <button id='create-new' wire:click="createProjectAndOpen()">Create Project</button>
        </div>
        <div id='shared-projects' class='projects-list'>
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
      }
    </main>