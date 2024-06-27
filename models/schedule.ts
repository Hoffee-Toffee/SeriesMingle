export interface EntryDetails {
  id: number
  overview: string
  title: string
  type: 'episode' | 'movie'
  runtime: number
  episode?: number
  average_run_time: number
  season?: number
  show_id?: number
  show_title?: string
  premier?: boolean
  finale?: boolean
  layer_id: number
  layer: number
  set?: number
  mid: number
  posIndex: number
  show: boolean
  part?: string
  year?: string
}

export interface State {
  streak: number
  goal: number
  mpSpacing: string
  saved: boolean
  data: Data
  showStreaks: boolean
  props: string[]
  titles: string[]
  bookmark: null
  groupStreaks: boolean
  user: string
  force: boolean
  layers: EntryRef[][]
}

export interface Data {
  movie: { [key: string]: EntryDetails }
  custom: { [key: string]: Custom }
  tv: { [key: string]: Show }
}

export interface Custom {
  id: number
  runtime: number
  type: string
  offset: number
  title: string
  term: string
  repeat: number
}

export interface Show {
  title: string
  year: string
  id: number
  episode_run_time: number
  seasons: Season[]
  type: string
}

export interface Season {
  episodes: EntryDetails[]
  season: number
}

export type EntryRef = Ref | string | string[]

interface Ref {
  ref: (number | string)[]
  start?: string
  end?: string
}
