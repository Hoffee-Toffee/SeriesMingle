import request from 'superagent';

const rootUrl = '/api/v1/search/books';

export default async function fetchBooks(query: string) {
  const res = await request.get(rootUrl).query({ q: query });
  return res.body;
}
