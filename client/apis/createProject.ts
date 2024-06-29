import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/create'

export default async function createProject(user: string) {
  try {
    const res = await request.post(`${rootUrl}/`).send({
      user,
    })
    return res.body
  } catch (error) {
    return console.error(error)
  }
}
