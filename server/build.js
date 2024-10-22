import * as esbuild from 'esbuild'

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
  })
  .catch((error) => {
    console.error('Build failed:', error)
    process.exit(1)
  })
