import { Router } from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

const api = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.TMDB_API_KEY,
  },
}
console.log(api)

router.get('/search', async (req, res) => {
  const url =
    'https://api.themoviedb.org/3/search/multi?language=en-US&query=' +
    req.query.q +
    '&page=1&include_adult=false'
  await fetch(url, api)
    .then((response) => response.json())
    .then((results) => res.json(results))
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
})

router.get('/movie', async (req, res) => {
  const url =
    'https://api.themoviedb.org/3/movie/' + req.query.id + '?language=en-US'
  await fetch(url, api)
    .then((response) => response.json())
    .then((movie) =>
      res.json({
        id: movie.id,
        type: 'movie',
        title: movie.title,
        year: (movie.release_date || '').split('-')[0],
        runtime: movie.runtime,
      }),
    )
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
})

router.get('/tv', async (req, res) => {
  const url =
    'https://api.themoviedb.org/3/tv/' + req.query.id + '?language=en-US'
  await fetch(url, api)
    .then((response) => response.json())
    .then(async (show) => {
      const numOfSeasons = show.number_of_seasons

      // Fetch all seasons data
      const seasons = await Promise.all(
        Array(numOfSeasons)
          .fill(null)
          .map(async (_, season) => {
            // Return the season data
            const seasonRes = await fetch(
              `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}?language=en-US`,
              api,
            )
            const seasonData = await seasonRes.json()
            return {
              season: seasonData.season_number,
              episodes: seasonData.episodes.map((episode) => ({
                id: episode.id,
                type: 'episode',
                title: episode.name,
                runtime: episode.runtime,
                episode: episode.episode_number,
                start:
                  seasonData.season_number + ':' + episode.episode_number ==
                  '1:1',
              })),
            }
          }),
      )

      res.json({
        id: show.id,
        type: 'tv',
        title: show.name,
        year: (show.first_air_date || '').split('-')[0],
        seasons,
      })
    })
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
})

export default router
