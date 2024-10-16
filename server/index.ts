import dotenv from 'dotenv'
dotenv.config()
import server from './server.ts'

import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as Path from 'node:path'

const __dirname = Path.join(dirname(fileURLToPath(import.meta.url)), '..')

;['robots.txt', 'sitemap.xml'].forEach((file) =>
  fs.copyFileSync(
    Path.resolve(__dirname, file),
    Path.resolve(__dirname, 'dist', file),
  ),
)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})

export default server
