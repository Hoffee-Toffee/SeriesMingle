import { useContext, useEffect } from 'react'
import { UserContext, LoadingContext } from './App.tsx'
import Example from './Example.tsx'

import favicon from '../../favicon.ico'
import '../styles/home.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!isPageLoaded) setIsPageLoaded(true);
  }, [isPageLoaded, setIsPageLoaded]);

  return (
    <>
      <section id="nav-bar">
        <header>
          <img src={favicon} alt="SeriesMingle Logo" id="logo" />
          <h1>
            <span>Series</span>
            <span>Mingle</span>
          </h1>
        </header>
        <input type="checkbox" id="nav-toggle" />
        <label htmlFor="nav-toggle" id="nav-toggle-label">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav>
          <a href="#about">About</a>
          <a href="#upcoming-features">Upcoming Features</a>
          {user ?
            <Link to="/dashboard">Dashboard</Link> :
            <Link to="/login">Login or Register</Link>
          }
        </nav>
      </section>
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
          <h2>
            Create your own TV and movie schedules with SeriesMingle!
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
      <div id="upcoming-features">
        <div className="content">
          <h2>Upcoming Features</h2>
          <div className="bg">
            <p>
              SeriesMingle is in <strong>early</strong> development.
              <br />
              Here are some features that are planned for the future:
            </p>
            <p>
              <strong>Schedule Stats</strong> - Track your progress and see predictions on when you'll finish your schedule.
            </p>
            <p>
              <strong>Mobile App</strong> - A mobile app for Android and iOS.
            </p>
          </div>
        </div>
      </div>
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
        </div>
      </div>
    </>
  )
}