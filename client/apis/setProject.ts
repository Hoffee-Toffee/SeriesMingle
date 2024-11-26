import request from 'superagent'

// get root from package.json config
import packageJson from '../../package.json'
const base = packageJson.config.base
const rootUrl = (base == '/' ? '' : base) + '/api/v1/projects'

import { ScheduleState, LayerEntry } from '../../models/schedule.ts'

export default async function setProject(
  state: ScheduleState,
  id: string,
  props: string[],
) {
  try {
    const res = await request.post(`${rootUrl}/`).send({
      ...state,
      id,
      props,
      layers: {
        ...state.layers.flatMap((layer: LayerEntry[], i: number) => ({
          [i]: layer,
        })),
      },
    })
    return res.body
  } catch (error) {
    return console.error(error)
  }
}
