import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects'

export default async function setProject(
  state: object,
  id: string,
  props: string[],
) {
  try {
    const res = await request.post(`${rootUrl}/`).send({
      id,
      ...state,
      props,
      layers: {
        ...state.layers.flatMap((layer: object[], i: number) => ({
          [i]: layer,
        })),
      },
    })
    return res.body
  } catch (error) {
    return console.error(error)
  }
}
