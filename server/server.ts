import express from 'express'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

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
  res.send(decrypt(req.query.passphrase))
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve(__dirname, 'assets')))
  server.get('*', (req, res) => {
    let title = ['SeriesMingle']
    let description =
      'Create and edit your own TV and Movie schedules with SeriesMingle.'

    const path = req.path.split('/')[1].toLowerCase()

    if (['login, dashboard', 'project'].includes(path))
      title.unshift(path.charAt(0).toUpperCase() + path.slice(1))

    if (path === 'project')
      description = 'Check out my TV and movie schedule on SeriesMingle!'

    title = title.join(' | ')

    res.setHeader('Content-Type', 'text/html')
    res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      src="https://kit.fontawesome.com/251912c541.js"
      crossorigin="anonymous"
    ></script>
    <title>${title}</title>
    <link
      href="./client/files/favicon.ico"
      rel="shortcut icon"
      type="image/x-icon"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta
      property="og:description"
      content="${description}"
    />
    <meta
      property="og:url"
      content="https://seriesmingle.com"
    />
    <meta
      property="og:image"
      content="https://seriesmingle.com/assets/icon.png"
    />
  </head>
  <body>
    <div id="app"></div>
    <script src="./client/index.tsx" type="module"></script>
  </body>
</html>`)
  })
}

export default server
