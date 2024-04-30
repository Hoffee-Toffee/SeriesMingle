import express from 'express'
import * as Path from 'node:path'
import dotenv from 'dotenv'
dotenv.config()

import tmdbRoutes from './routes/tmdb.ts'

const server = express()

server.use(express.json())

server.use('/api/v1', tmdbRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use(
    '/assets',
    express.static(Path.resolve(__dirname, 'dist', 'assets')),
  )
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, 'dist', 'index.html'))
  })
}

export default server
