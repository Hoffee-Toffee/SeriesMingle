import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects'

export default function fetchProject(user: string): Promise<object | null> {
  return request.get(`${rootUrl}/${user}`).then((res) => {
    if (!res.body) return null

    return {
      ...res.body,
      ...(res.body.state || {}),
      state: res.body.state ? true : undefined,
      layers: res.body.state
        ? res.body.state.layers
        : res.body.layers
          ? Object.values(res.body.layers).map((layer, i) => layer[i])
          : [[]],
    }
  })
}
