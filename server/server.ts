import express from 'express'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'
// import ReactDOMServer from 'react-dom/server'
// import { Outlet, useOutlet } from 'react-router-dom'

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url))

import dotenv from 'dotenv'
dotenv.config()

import tmdbRoutes from './routes/tmdb.ts'
import projectRoutes from './routes/projects.ts'
import decrypt from './eastereggs/decrypt.ts'

const server = express()

server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true, limit: '50mb' }))

server.use('/api/v1', tmdbRoutes)
server.use('/api/v1/projects', projectRoutes)
server.get('/api/v1/secret', (req, res) => {
  if (typeof req.query.passphrase !== 'string') {
    return res.status(400).send('Invalid passphrase')
  }
  const decryption = decrypt(req.query.passphrase)
  console.log(decryption)
  res.send(decryption)
})

if (process.env.NODE_ENV === 'production') {
  server.use(
    express.static(Path.resolve('public'), {
      maxAge: '1y',
      immutable: true,
    }),
  )

  server.use('/assets', express.static(Path.resolve(__dirname, 'assets')))
  server.use(
    '/icons/:icon',
    (req, res) =>
      ['512.png', '192.png'].includes(req.params.icon) &&
      res.sendFile(Path.resolve(__dirname, 'icons', req.params.icon)),
  )
  ;['favicon.ico', 'robots.txt', 'sitemap.xml'].forEach((file) =>
    server.get(`/${file}`, (_, res) =>
      res.sendFile(Path.resolve(__dirname, file)),
    ),
  )

  server.get('*', (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')

    const index = fs.readFileSync(
      Path.resolve(__dirname, 'index.html'),
      'utf-8',
    )

    const page = req.url.split('/')[1].toLowerCase()

    const data = {
      title: 'SeriesMingle',
      description: 'Create your own TV and movie schedules with SeriesMingle.',
      long_description:
        'Create your own watch schedules for shows and movies! Define layers of shows and movies, with each layer watched in order, but all layers watched simultaneously. Select start and end points for shows, so you can watch only the range you want. Bookmark your progress, seeing statistics on your progress. Add custom entries such as books or activities to your schedule. Share and create schedules with friends. And much more with SeriesMingle!',
      url: 'https://seriesmingle.com',
      image:
        'https://repository-images.githubusercontent.com/792981103/55633c4f-81a0-407d-99a2-baa5621836a0',
      // app: `<div id="${page || 'home'}">${ReactDOMServer.renderToString(Outlet({}))}</div>`,
    }

    if (['login', 'dashboard', 'project'].includes(page)) {
      data.title = `${page.charAt(0).toUpperCase()}${page.slice(1)} | ${data.title}`

      if (page === 'project') {
        data.description = 'Check out my TV and movie schedule on SeriesMingle!'
      }
    }

    // replace all occurrences of '%KEY%' with the corresponding data value
    const html = Object.entries(data).reduce(
      (acc, [key, value]) =>
        acc.replace(new RegExp(`%${key.toUpperCase()}%`, 'g'), value),
      index,
    )

    res.contentType('text/html')
    res.send(html)
  })
}

export default server
