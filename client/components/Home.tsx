import { useContext } from 'react'
import { LoadingContext } from './App.tsx'

export default function Home() {
  const { isPageLoaded, setIsPageLoaded } = useContext(LoadingContext)
  if (!isPageLoaded) setIsPageLoaded(true)

  return (
    <div>
      <h1>SeriesMingle</h1>
    </div>
  )
}