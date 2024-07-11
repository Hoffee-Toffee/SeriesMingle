import { Link } from "react-router-dom";


export default function ProjectCard({ project, owner }) {
  const contextMenu = document.getElementById('contextMenu')
  const deletePopup = document.getElementById('deletePopup')

  function positionContextMenu(target) {
    contextMenu.setAttribute('data-id', project.id)
    deletePopup.setAttribute('data-id', project.id)

    const posX = window.scrollX + target.getBoundingClientRect().left + 25
    const posY = window.scrollY + target.getBoundingClientRect().top

    const windowWidth = window.innerWidth + window.scrollX
    const windowHeight = window.innerHeight + window.scrollY

    // Get the width and height of the context menu
    const cmWidth = contextMenu.offsetWidth
    const cmHeight = contextMenu.offsetHeight

    // Determine which side of the mouse the context menu should be on
    const xQuadrant = windowWidth - posX - cmWidth < 5 ? 'right' : 'left'
    const yQuadrant = windowHeight - posY - cmHeight < 5 ? 'bottom' : 'top'

    // Position the context menu
    if ([xQuadrant, yQuadrant].join() == 'left,top') {
      contextMenu.style.left = posX + 'px'
      contextMenu.style.top = posY + 'px'
    }
    if ([xQuadrant, yQuadrant].join() == 'right,top') {
      contextMenu.style.left = posX - cmWidth - 25 + 'px'
      contextMenu.style.top = posY + 'px'
    }
    if ([xQuadrant, yQuadrant].join() == 'left,bottom') {
      contextMenu.style.left = posX + 'px'
      contextMenu.style.top = posY - cmHeight + 'px'
    }
    if ([xQuadrant, yQuadrant].join() == 'right,bottom') {
      contextMenu.style.left = posX - cmWidth - 25 + 'px'
      contextMenu.style.top = posY - cmHeight + 'px'
    }
  }

  return <Link to={`/project/${project.id}`} key={project.id}>
    <div className="project-container">
      <h2>{project.title || 'Untitled Schedule'}
        <i className="fa-solid fa-ellipsis-vertical" onClick={(e) => {
          e.stopPropagation();
          e.preventDefault()
        }}
          onMouseEnter={(e) => {
            positionContextMenu(e.target)
            contextMenu.classList.add("show")
            contextMenu.setAttribute("data-isOwner", owner)
            document.querySelector("#leavePopup > div > p > span").innerHTML = project.title || 'Untitled Schedule'
            document.querySelector("#deletePopup > div > p > span").innerHTML = project.title || 'Untitled Schedule'
          }}
          onMouseLeave={(_) => {
            contextMenu.classList.remove("show")
            contextMenu.removeAttribute("data-isOwner")
          }}
        >
        </i>
      </h2>
      <p>{project.description || 'No Description'}</p>
    </div>
  </Link >
}