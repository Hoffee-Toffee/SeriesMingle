import cryptoPKG from 'crypto'
import fs from 'fs'

export default function decrypt(passphrase = 'test123') {
  // Must try it on all txt files in the directory, and return the one that works
  const encodedFiles = fs.readdirSync('server/eastereggs')
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
  const encodedFile = `server/eastereggs/${componentName}.txt`

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
