import express from 'express'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url))

import dotenv from 'dotenv'
dotenv.config()

import tmdbRoutes from './routes/tmdb.ts'

const server = express()

server.use(express.json())

server.use('/api/v1', tmdbRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve(__dirname, 'assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, 'index.html'))
  })
}

export default server
