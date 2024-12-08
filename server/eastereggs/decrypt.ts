import cryptoPKG from 'crypto'
import fs from 'fs'
import * as Path from 'node:path'
import { fileURLToPath } from 'url'
import { join } from 'node:path'

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '../../server/eastereggs')

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
  const data = fs.readFileSync(encodedFile, 'utf8')

  const [ivHex, encrypted] = data.split(':::')
  const iv = Buffer.from(ivHex, 'hex')
  const key = cryptoPKG.scryptSync(passphrase, 'salt', 32)
  const decipher = cryptoPKG.createDecipheriv('aes-256-ctr', key, iv)

  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  // All correct decryptions begin with '// Code: {fileName}'
  if (!decrypted.startsWith(`// Code: ${componentName}`)) {
    throw new Error('Invalid passphrase')
  }

  return decrypted
}
