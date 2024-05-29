import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1'

export default function search(query: string): Promise<object[]> {
  return request.get(rootUrl + '/search?q=' + query).then((res) => {
    return [
      query,
      ...res.body.results.filter((result) =>
        ['tv', 'movie'].includes(result.media_type),
      ),
    ]
  })
}
