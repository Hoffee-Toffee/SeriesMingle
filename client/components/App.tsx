import { Helmet } from 'react-helmet'
import favicon from '../files/favicon.ico'
import { Outlet } from 'react-router-dom'

export default function App() {
  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={`${window.location.origin}${window.location.pathname}`}
        />
        <meta
          property="og:image"
          content={favicon}
        />
        {id &&
          <meta
            property="og:description"
            content="Check out my TV and movie schedule on SeriesMingle!"
          />
        }
      </Helmet>
      <Outlet />
      {/* Try without outlet */}
    </>
  )
}
