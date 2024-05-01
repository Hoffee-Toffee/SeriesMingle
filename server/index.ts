import server from './server.ts'

const PORT = process.env.PORT || 3000

// Check if this module is the main module
if (import.meta.url === `file:///${process.argv[1].replaceAll('\\', '/')}`) {
  // Start the server only if this module is the main module
  server.listen(PORT, () => {
    console.log('Server listening on port', PORT)
  })
}

export default server
