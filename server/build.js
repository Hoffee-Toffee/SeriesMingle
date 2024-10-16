import * as esbuild from 'esbuild'
import fs from 'fs'
import * as Path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = Path.join(__dirname, '..')

esbuild
  .build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: 'dist/server.js',
    external: ['express', 'fs', 'path', 'url'],
  })
  .then(() => {
    console.log('Build complete')

    // Copy 'robots.txt' and 'sitemap.xml' to the 'dist' folder
    try {
      const robotsSrc = Path.join(rootDir, 'robots.txt')
      const robotsDest = Path.join(rootDir, 'dist/robots.txt')
      fs.copyFileSync(robotsSrc, robotsDest)
      console.log(`Copied robots.txt from ${robotsSrc} to ${robotsDest}`)

      const sitemapSrc = Path.join(rootDir, 'sitemap.xml')
      const sitemapDest = Path.join(rootDir, 'dist/sitemap.xml')
      fs.copyFileSync(sitemapSrc, sitemapDest)
      console.log(`Copied sitemap.xml from ${sitemapSrc} to ${sitemapDest}`)
    } catch (error) {
      console.error('Error copying files:', error)
    }
  })
  .catch((error) => {
    console.error('Build failed:', error)
    process.exit(1)
  })
