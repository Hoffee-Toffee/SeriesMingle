import dotenv from 'dotenv'
dotenv.config()
import server from './server.ts'

const PORT = process.env.PORT || 3000

// Start the server only if this module is the main module
server.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})

export default server
