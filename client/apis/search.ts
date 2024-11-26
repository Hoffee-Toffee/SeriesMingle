import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1'
import { MediaResult } from '../../models/schedule.ts'

export default async function search(
  query: string,
): Promise<(string | MediaResult)[]> {
  const res = await request.get(rootUrl + '/search?q=' + query)
  return [
    query, // return query, incase the user wishes to change it
    ...res.body.results.filter((result: { media_type: string }) =>
      ['tv', 'movie'].includes(result.media_type),
    ),
  ]
}
