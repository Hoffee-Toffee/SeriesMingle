import { useContext, useEffect, useState } from 'react'
import { UserContext, LoadingContext } from './App.tsx'
import Example from './Example.tsx'
import tmdb from '../../icons/tmdb.svg'

import '../styles/home.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!isPageLoaded) setIsPageLoaded(true);
  }, [isPageLoaded, setIsPageLoaded]);

  const [, setRefresh] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh((prev) => !prev)
    }, 50) // 20ms, time between re-renders

    return () => clearInterval(intervalId)
  }, [])

  return (
    <main>
      <span id="overlay">
        <Link to={user ? "/dashboard" : "/login"} className="button">
          <h3>
            {user ? "Go to Dashboard" : "Get Started"}
          </h3>
        </Link>
        <span className="scroll-indicator">
          <i className="fa fa-chevron-down" aria-hidden="true" />
        </span>
      </span>
      <div id="about">
        <div className="content">
          <h1>
            <span>Series</span>
            <span>Mingle</span>
          </h1>
          <h2>
            Create your own TV and movie schedules.
          </h2>
          <Example id="main" />
        </div>
      </div>
      <div>
        <div className="content">
          <h2>
            Bookmark your progress.
          </h2>
          <Example id="bookmark" />
        </div>
      </div>
      <div>
        <div className="content">
          <h2>
            Use layers to watch sets of shows and movies in order.
          </h2>
          <Example id="layers" />
        </div>
      </div>
      <div>
        <div className="content">
          <h2>Choose starting points for shows to start where you left off.</h2>
          <Example id="start-points" />
        </div>
      </div>
      <div>
        <div className="content">
          <h2>Share and edit your schedule with friends.</h2>
          <Example id="share" />
        </div>
      </div>
      <div>
        <div className="content">
          <h2>Customize your schedule with advanced settings.</h2>
          <Example id="custom" />
        </div>
      </div>
      <div id="contact">
        <div className="content">
          <h2>Contact</h2>
          <div className="bg">
            <p>
              Send feedback and personal inquiries to <a href="mailto:contact@seriesmingle.com">contact@seriesmingle.com</a>.
            </p>
            <p>
              Send bug reports, issues, and help requests to <a href="mailto:support@seriesmingle.com">support@seriesmingle.com</a>.
            </p>
          </div>
        </div>
      </div >
      <div>
        <div className="content">
          <h2>Get started with SeriesMingle today!</h2>
          <span id="overlay">
            <Link to={user ? "/dashboard" : "/login"} className="button">
              <h3>
                {user ? "Go to Dashboard" : "Get Started"}
              </h3>
            </Link>
          </span>
          <footer>
            <p>
              <img src={tmdb} alt="TMDB logo" />
              This website uses <a href="https://www.themoviedb.org/about" target="_blank" rel="noreferrer">TMDB</a> and the <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noreferrer">TMDB APIs</a> but is not endorsed, certified, or otherwise approved by TMDB.
            </p>
            <p>
              &copy; <a href="https://github.com/Hoffee-Toffee"
                target="_blank" rel="noreferrer">Tristan Bulmer</a>, 2025.
            </p>
          </footer>
        </div>
      </div >
    </main>
  )
}