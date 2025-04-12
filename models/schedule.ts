export interface BaseSchedule {
  // Base schedule data seen on both the client side and database
  title: string
  description: string
  lastModified: number
  user: string
  permissions: Permissions
  titles: (string | null)[]
  data: Data
  bookmark: string | null
  mpSpacing: 'normal' | 'closer' | 'consec'
  streak: number
  goal: number
  showStreaks: boolean
  groupStreaks: boolean
  keys: string[]
}

export interface ScheduleStored extends BaseSchedule {
  // Schedule data as stored in the database
  layers: { [key: number]: { [key: number]: LayerEntry[] } }
  state?: ScheduleState | boolean | string
}

export interface ScheduleState extends BaseSchedule {
  // Schedule data as seen on the client side
  layers: LayerEntry[][]
  force?: boolean
}

export interface Permissions {
  // Permissions {[user_id]: permission_level}
  [key: string]: number
}

export interface LayerMedia {
  ref: ['tv' | 'movie' | 'custom', number] // Reference to location in stored data
  start?: string
  end?: string
}

export interface Barrier {
  barrier: number | null // Percentage where the barrier sits

  mid?: number
  layer?: number
  posIndex?: number
  show?: boolean
}

export interface Data {
  tv: { [key: string]: ShowDetails }
  movie: { [key: string]: EntryDetails }
  custom: { [key: string]: CustomDetails }
}

export interface DetailsBase {
  id?: number
  title?: string
  userTitle?: string // Except Custom
  year?: string // Except Custom
  runtime?: number | null // Except Show

  // Generated on scheduling
  show?: boolean
  episodes?: EntryDetails[] // Except Custom
  indices?: number[] // Except Show
  mid?: number // Except Show
  layer?: number // Except Show
  layer_id?: number
  posIndex?: number // Except Show
  className?: string
  bookmark?: string
}

export interface ShowDetails extends DetailsBase {
  type: 'tv'
  seasons?: Season[]
  show_title?: string

  // Generated on scheduling
  show_id?: number
  episode_run_time?: number
}

export interface Season {
  season: number
  episodes: EntryDetails[]
}

export interface EntryDetails extends DetailsBase {
  type: 'movie' | 'tv' | 'multiple' | 'episode'
  overview?: string
  season?: number

  // Temporary
  part?: string

  // Generated on scheduling
  episode?: number
  show_id?: number
  show_title?: string
  premier?: boolean
  finale?: boolean
  average_run_time?: number
}

export interface CustomDetails extends DetailsBase {
  type?: 'custom'
  repeat?: number
  offset?: number
  term?: string

  // Generated on scheduling
  entries?: CustomDetails[]
  set?: number
}

export type MediaDetails = ShowDetails | EntryDetails | CustomDetails
export type LayerEntry =
  | string
  | LayerMedia
  | Barrier
  | (string | MediaResult)[]

export interface ScheduleData extends ScheduleState {
  schedule: (EntryDetails | CustomDetails | Barrier)[]
  colors: Colors
  seenSpan: number
  totalSpan: number
  streakEnds: number[]
  streakLengths: number[]
}

export interface Colors {
  movie: { [key: string]: Color }
  tv: { [key: string]: Color }
  custom: { [key: string]: Color }
}

export interface Color {
  color: number
  title?: string
  userTitle?: string

  indices?: number[]
  watched?: number
  span?: number
}

export interface ProjectData extends ScheduleStored {
  id: string
}

export interface MediaResult {
  id: number
  type: 'tv' | 'movie' | 'custom'
  userTitle?: string | null
  first_air_date?: string
  release_date?: string
  overview?: string
  title?: string
  name?: string
  media_type: 'tv' | 'movie'
  selected?: boolean
  runtime?: number
  number_of_seasons?: number
  episode_number?: number
}

export interface SeasonResult {
  season_number: number
  episodes: MediaResult[]
}

export interface IDsResult {
  imdb_id: string
}
