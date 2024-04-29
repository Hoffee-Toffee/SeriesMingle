import request from 'superagent'

const rootUrl = '/api/v1'

export default function fetchMedia(
  type: string,
  id: number,
): Promise<object[]> {
  return request.get(`${rootUrl}/${type}?id=${id}`).then((res) => {
    return res.body
  })
}
