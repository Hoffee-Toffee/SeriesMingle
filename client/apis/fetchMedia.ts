import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1'
import { MediaResult } from '../../models/schedule.ts'

export default async function fetchMedia(
  type: string,
  id: number,
): Promise<MediaResult[]> {
  const res = await request.get(`${rootUrl}/${type}?id=${id}`)
  return res.body
}
