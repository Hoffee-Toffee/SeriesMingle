import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects'

export default function fetchProject(user: string): Promise<object | null> {
  return request.get(`${rootUrl}/${user}`).then((res) => {
    return res.body
  })
}
