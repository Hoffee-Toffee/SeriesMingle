import request from 'superagent'

const rootUrl = '/api/v1'

export default function search(query: string): Promise<object[]> {
  return request.get(rootUrl + '/search?q=' + query).then((res) => {
    return res.body.results.filter((result) =>
      ['tv', 'movie'].includes(result.media_type),
    )
  })
}
