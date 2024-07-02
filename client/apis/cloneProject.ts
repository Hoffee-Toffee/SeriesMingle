import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/clone'

export default async function cloneProject(id: string, user: string) {
  try {
    const res = await request.post(`${rootUrl}/`).send({
      id,
      user,
    })
    return res.body
  } catch (error) {
    return console.error(error)
  }
}
