import { useContext } from 'react'
import { LoadingContext } from './App.tsx'

export default function Home() {
  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  if (!isPageLoaded) setIsPageLoaded(true)

  return (
    <div>
      <h1>SeriesMingle</h1>
      <p>
        Create your own schedule of TV shows and movies how you see fit.
        <br />
        Features include...
      </p>
      <ul>
        <li>Easily add shows and movies</li>
        <li>Share your schedule with friends</li>
        <li>Track your progress</li>
        <li>Add custom entries for books, activities, or more</li>
        <li>Set start and end points for shows</li>
        <li>Watch certain shows and movies in order, while also watching other media</li>
        <li>Binge shows for a set time before switching to another</li>
        <li>Split your schedule into watch sessions</li>
        <li>And more...</li>
      </ul>
      <p>
        <a href="/login">Login or Register</a>
      </p>

      <p>
        <small>This is a demo version, and features may not be fully implemented.</small>
      </p>
    </div>
  )
}