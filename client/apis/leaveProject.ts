import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects/leave'

export default async function leaveProject(projectId: string, userId: string) {
  try {
    const res = await request.post(`${rootUrl}/${projectId}`).send({
      userId,
    })

    return res.body.success
  } catch (error) {
    return console.error(error)
  }
}
