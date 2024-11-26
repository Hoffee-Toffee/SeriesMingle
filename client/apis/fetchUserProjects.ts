import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/user'

export default async function fetchUserProjects(
  user: string,
): Promise<object[] | null> {
  const res = await request.get(`${rootUrl}/${user}`)
  if (!res.body) return null
  return res.body
}
