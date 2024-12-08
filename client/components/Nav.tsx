import { Link } from "react-router-dom";

export default function Nav({ page = "home", user }) {
  console.log(page)
  return <nav>
    {page === 'home' && <>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </>
    }
    {
      user ?
        page != 'dashboard' && <Link to="/dashboard">Dashboard</Link> :
        page != 'login' && <Link to="/login">Login or Register</Link>
    }
    {
      user && <Link to="/logout">Logout</Link>
    }
  </nav>
}