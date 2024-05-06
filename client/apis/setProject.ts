import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects'

export default async function setProject(state: object, user: string) {
  try {
    const res = await request
      .post(`${rootUrl}/`)
      .send({ user, state: JSON.stringify(state) })
    return console.log(res.body)
  } catch (error) {
    return console.error(error)
  }
}
