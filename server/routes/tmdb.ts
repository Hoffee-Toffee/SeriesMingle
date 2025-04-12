import { Router } from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { MediaResult, SeasonResult, IDsResult } from '../../models/schedule'
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
    'https://api.themoviedb.org/3/movie/' +
    req.query.id +
    '?append_to_response=external_ids&language=en-US'
  await fetch(url, api)
    .then((response) => response.json() as Promise<MediaResult>)
    .then((movie) =>
      res.json({
        id: movie.id,
        type: 'movie',
        title: movie.title,
        year: (movie.release_date || '').split('-')[0],
        runtime: movie.runtime,
        overview: movie.overview,
        imdb_id: movie.external_ids.imdb_id,
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
    .then((response) => response.json() as Promise<MediaResult>)
    .then(async (show) => {
      const numOfSeasons = show.number_of_seasons
      let withRuntime = 0

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
            const seasonData = (await seasonRes.json()) as SeasonResult

            const episodes = await Promise.all(
              seasonData.episodes.map(async (episode) => {
                const idsRes = await fetch(
                  `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}/episode/${episode.episode_number}/external_ids`,
                  api,
                )
                const ids = (await idsRes.json()) as IDsResult

                return {
                  id: episode.id,
                  type: 'episode',
                  title: episode.name,
                  runtime: episode.runtime,
                  episode: episode.episode_number,
                  overview: episode.overview,
                  imdb_id: ids.imdb_id,
                }
              }),
            )
            return {
              season: seasonData.season_number,
              episodes,
            }
          }),
      )

      res.json({
        id: show.id,
        type: 'tv',
        title: show.name,
        year: (show.first_air_date || '').split('-')[0],
        episode_run_time: Math.round(
          seasons.reduce(
            (grandTotal, season) =>
              grandTotal +
              season.episodes.reduce((seasonTotal, episode) => {
                if ((episode.runtime || 0) > 0) withRuntime++
                return seasonTotal + (episode.runtime || 0)
              }, 0),
            0,
          ) / Math.max(withRuntime, 1),
        ),
        seasons,
      })
    })
    .catch((error) =>
      res.status(500).json({ message: 'Something went wrong', error }),
    )
})

export default router
