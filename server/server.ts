import express from 'express'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { Outlet, useOutlet } from 'react-router-dom'

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
  server.get('/robots.txt', (req, res) =>
    res.sendFile(Path.resolve(__dirname, 'robots.txt')),
  )
  server.get('/sitemap.xml', (req, res) =>
    res.sendFile(Path.resolve(__dirname, 'sitemap.xml')),
  )
  server.get('*', (req, res) => {
    const index = fs.readFileSync(
      Path.resolve(__dirname, 'index.html'),
      'utf-8',
    )

    const page = req.url.split('/')[1].toLowerCase()

    const data = {
      title: 'SeriesMingle',
      description: 'Create your own TV and movie schedules with SeriesMingle.',
      app: `<div id="${page || 'home'}">${ReactDOMServer.renderToString(Outlet({}))}</div>`,
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
