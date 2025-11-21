import { Router } from 'express'
import fetch from 'node-fetch'
import queueManager from '../queueManager'
import dotenv from 'dotenv'
import { MediaResult, SeasonResult, IDsResult } from '../../models/schedule'
import {
  firestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from '../firebase'
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
  queueManager
    .enqueue(() => fetch(url, api).then((r) => r.json()), 'high')
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
  queueManager
    .enqueue(
      () => fetch(url, api).then((r) => r.json() as Promise<MediaResult>),
      'high',
    )
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

// In-memory cache for background IMDB fetches
const tvImdbCache = new Map()

router.get('/tv', async (req, res) => {
  const url =
    'https://api.themoviedb.org/3/tv/' + req.query.id + '?language=en-US'
  try {
    const show = await queueManager.enqueue(
      () => fetch(url, api).then((r) => r.json() as Promise<MediaResult>),
      'high',
    )
    const numOfSeasons = show.number_of_seasons
    let withRuntime = 0

    // Fetch all seasons data (no IMDB IDs yet)
    const seasons = await Promise.all(
      Array(numOfSeasons)
        .fill(null)
        .map(async (_, season) => {
          const seasonUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}?language=en-US`
          const seasonData = await queueManager.enqueue(
            () =>
              fetch(seasonUrl, api).then(
                (r) => r.json() as Promise<SeasonResult>,
              ),
            'high',
          )
          // Remove imdb_id from episodes for initial response
          const episodes = seasonData.episodes.map((episode) => ({
            id: episode.id,
            type: 'episode',
            title: episode.name,
            runtime: episode.runtime,
            episode: episode.episode_number,
            overview: episode.overview,
            imdb_id: null, // placeholder
            still_path: episode.still_path,
          }))
          return {
            season: seasonData.season_number,
            episodes,
          }
        }),
    )

    // Respond immediately with core data (no IMDB IDs)
    const coreData = {
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
      imdb_pending: true,
    }
    res.json(coreData)

    // Start background IMDB fetch
    ;(async () => {
      const imdbSeasons = await Promise.all(
        Array(numOfSeasons)
          .fill(null)
          .map(async (_, season) => {
            const seasonUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}?language=en-US`
            const seasonData = await queueManager.enqueue(
              () =>
                fetch(seasonUrl, api).then(
                  (r) => r.json() as Promise<SeasonResult>,
                ),
              'low',
            )
            const episodes = await Promise.all(
              seasonData.episodes.map(async (episode) => {
                const idsUrl = `https://api.themoviedb.org/3/tv/${show.id}/season/${season + 1}/episode/${episode.episode_number}/external_ids`
                const ids = await queueManager.enqueue(
                  () =>
                    fetch(idsUrl, api).then(
                      (r) => r.json() as Promise<IDsResult>,
                    ),
                  'low',
                )
                return {
                  id: episode.id,
                  type: 'episode',
                  title: episode.name,
                  runtime: episode.runtime,
                  episode: episode.episode_number,
                  overview: episode.overview,
                  imdb_id: ids.imdb_id,
                  still_path: episode.still_path,
                }
              }),
            )
            return {
              season: seasonData.season_number,
              episodes,
            }
          }),
      )
      // Debug: log outgoing imdbSeasons structure
      console.log(
        'Updating Firestore with imdbSeasons:',
        JSON.stringify(imdbSeasons, null, 2),
      )

      // Save to cache
      tvImdbCache.set(String(show.id), {
        ...coreData,
        seasons: imdbSeasons,
        imdb_pending: false,
      })

      // Update Firestore: find all projects referencing this show and update data.tv[show.id]
      try {
        const projectsCol = collection(firestore, 'projects')
        const projectsSnap = await getDocs(projectsCol)
        for (const projectDoc of projectsSnap.docs) {
          const projectData = projectDoc.data()
          if (
            projectData &&
            projectData.data &&
            projectData.data.tv &&
            projectData.data.tv[show.id]
          ) {
            // Only update if the show is present in this project
            const tvData = projectData.data.tv
            // Only update the seasons and imdb_pending fields, preserve all other fields
            await updateDoc(doc(firestore, 'projects', projectDoc.id), {
              [`data.tv.${show.id}.seasons`]: imdbSeasons,
              [`data.tv.${show.id}.imdb_pending`]: false,
            })
          }
        }
      } catch (err) {
        console.error('Failed to update Firestore with IMDB data:', err)
      }
    })()
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
})

// Endpoint to get updated TV data with IMDB IDs
router.get('/tv/imdb', (req, res) => {
  const id = String(req.query.id)
  if (tvImdbCache.has(id)) {
    res.json(tvImdbCache.get(id))
  } else {
    res.status(404).json({ message: 'No IMDB data available yet.' })
  }
})

export default router
