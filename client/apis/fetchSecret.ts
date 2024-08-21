import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1'

export default function fetchSecret(passphrase: string) {
  return request
    .get(`${rootUrl}/secret?passphrase=${passphrase}`)
    .then((res) => {
      console.log(res)
      return res.text
    })
}
