import cryptoPKG from 'crypto'
import fs from 'fs'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

export default function decrypt(passphrase = 'test123') {
  // Must try it on all txt files in the directory, and return the one that works
  const encodedFiles = fs.readdirSync(Path.resolve(__dirname))
  for (const file of encodedFiles) {
    if (file.endsWith('.txt')) {
      try {
        return decryptFile(file.split('.')[0], passphrase)
      } catch (e) {
        continue
      }
    }
  }
  return null
}

function decryptFile(componentName = 'test', passphrase = 'test123') {
  const encodedFile = Path.resolve(__dirname, `${componentName}.txt`)

  const encrypted = fs.readFileSync(encodedFile, 'utf8')
  const decipher = cryptoPKG.createDecipher('aes-256-ctr', passphrase)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  // All correct decryptions begin with '// Code: {fileName}'
  if (!decrypted.startsWith(`// Code: ${componentName}`)) {
    throw new Error('Invalid passphrase')
  }

  return decrypted
}
