import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/delete'

export default async function deleteProject(projectId: string) {
  const res = await request.get(`${rootUrl}/${projectId}`)
  if (!res.body) return null
  return res.body.success
}
