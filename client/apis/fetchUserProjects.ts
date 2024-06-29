import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/user'

export default function fetchUserProjects(user: string): Promise<object[]> {
  return request.get(`${rootUrl}/${user}`).then((res) => {
    if (!res.body) return null

    return res.body
  })
}
