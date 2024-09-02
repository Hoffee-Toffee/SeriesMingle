import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScroll = (isPageLoaded) => {
  const location = useLocation()

  // Doesn't update when 'isPageLoaded' changes, but it should
  useEffect(() => {
    const onHome = location.pathname === '/'
    if (!isPageLoaded || !onHome) return

    // Close menu after navigating to a new page
    if (document.getElementById('nav-toggle'))
      document.getElementById('nav-toggle').checked = false

    const scrollingBody = document.getElementById('home')
    const scheduleContainers = document.querySelectorAll('#timelineContainer')

    const loopTime = 1000 * 60 * 30 // 30 minutes

    // Timeline Container should constantly scroll downwards, resetting at the top when it reaches the bottom
    const scheduleScroll = () => {
      scheduleContainers.forEach((scheduleContainer, i) => {
        // Return if the element has overflown its container
        const top =
          scheduleContainer.parentElement.parentElement.parentElement.getBoundingClientRect()
            .top
        // from range scrollingBody.clientHeight / 1.2 to
        if (
          top >= Math.floor(scrollingBody.clientHeight / 1.2) ||
          top <= Math.ceil(scrollingBody.clientHeight / -1.2)
        )
          return

        const highlightID = `${scheduleContainer.getAttribute('data-id')}-highlighted`
        // Use the current time and height of the container to determine the scroll position (in pixels)
        scheduleContainer.scrollTop =
          (Date.now() % loopTime) *
          ((scheduleContainer.scrollHeight - scheduleContainer.clientHeight) /
            loopTime)

        if (i > 1) return

        // Find the first element (if any) that is within the 2/3 vertical line of the container
        const toHighlight = Array.from(
          scheduleContainer.children[0].children,
        ).find(
          (el) =>
            // If bottom is after halfway point, and top is before halfway point
            el.offsetTop - scheduleContainer.clientHeight / 2 <
              scheduleContainer.scrollTop &&
            el.offsetTop +
              el.clientHeight -
              scheduleContainer.clientHeight / 2 >
              scheduleContainer.scrollTop,
        )

        const highlighted = document.getElementById(highlightID)
        if (toHighlight && toHighlight !== highlighted) {
          if (highlighted) {
            highlighted.classList.remove('highlighted')
            if (i !== 1) highlighted.removeAttribute('id')
            setTimeout(() => {
              if (i == 1) highlighted.removeAttribute('id')
              toHighlight.querySelector('i')?.classList.remove('fa-regular')
              toHighlight.querySelector('i')?.classList.add('fa-solid')
            }, 2000)
          }
          toHighlight.classList.add('highlighted')
          toHighlight.id = highlightID
          if (i == 1) {
            setTimeout(() => {
              highlighted.querySelector('i')?.classList.add('fa-regular')
              highlighted.querySelector('i')?.classList.remove('fa-solid')
            }, 2000)
          }
        } else if (!toHighlight && highlighted) {
          highlighted.classList.remove('highlighted')
          if (i !== 1) highlighted.removeAttribute('id')
        }
      })
    }
    const scheduleInterval = setInterval(scheduleScroll, 50)

    document.getElementById('app').style.overflowX = 'hidden'

    const handleScroll = () => {
      if (!onHome) return

      document.getElementById('nav-toggle').checked = false
      const scroll = scrollingBody.scrollTop

      const content = document.querySelectorAll('.content')
      content.forEach((el) => {
        const container = el.parentElement
        let offset =
          scroll -
          Math.floor(
            container.offsetTop +
              container.clientHeight / 2 -
              scrollingBody.clientHeight / 3,
          )
        offset = offset / (scrollingBody.clientHeight / 2)

        // Use the offset for the set of transition pairs
        el.style.transform = `translateY(${(offset * scrollingBody.clientHeight) / 2}px)`
      })
    }

    scrollingBody.addEventListener('scroll', handleScroll)
    window.onresize = () => handleScroll()
    handleScroll()

    return () => {
      if (!onHome) return
      scrollingBody.removeEventListener('scroll', handleScroll)
      window.onresize = null
      document.getElementById('app').style.overflowX = null
      clearInterval(scheduleInterval)
    }
  }, [location.pathname, isPageLoaded])
}

export default useScroll
