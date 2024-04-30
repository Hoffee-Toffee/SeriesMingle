import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const rootUrl = packageJson.config.assets_dir + '/api/v1'

export default function fetchMedia(
  type: string,
  id: number,
): Promise<object[]> {
  return request.get(`${rootUrl}/${type}?id=${id}`).then((res) => {
    return res.body
  })
}
