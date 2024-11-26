import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1'

export default async function fetchSecret(passphrase: string) {
  const res = await request.get(`${rootUrl}/secret?passphrase=${passphrase}`)
  return res.text
}
