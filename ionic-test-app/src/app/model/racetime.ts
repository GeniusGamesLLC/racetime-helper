export interface Race {
  version: number
  name: string
  slug: string
  status: Status
  url: string
  data_url: string
  websocket_url: string
  websocket_bot_url: string
  websocket_oauth_url: string
  category: Category
  goal: Goal
  info: string
  info_bot: string
  info_user: string
  team_race: boolean
  entrants_count: number
  entrants_count_finished: number
  entrants_count_inactive: number
  entrants: Entrant[]
  opened_at: string
  start_delay: string
  started_at: string
  ended_at: any
  cancelled_at: any
  unlisted: boolean
  time_limit: string
  time_limit_auto_complete: boolean
  require_even_teams: boolean
  streaming_required: boolean
  auto_start: boolean
  opened_by: OpenedBy
  monitors: Monitor[]
  recordable: boolean
  recorded: boolean
  recorded_by: any
  allow_comments: boolean
  hide_comments: boolean
  allow_prerace_chat: boolean
  allow_midrace_chat: boolean
  allow_non_entrant_chat: boolean
  chat_message_delay: string
}

export interface Status {
  value: string
  verbose_value: string
  help_text: string
}

export interface Category {
  name: string
  short_name: string
  slug: string
  url: string
  data_url: string
  image: string
}

export interface Goal {
  name: string
  custom: boolean
}

export interface Entrant {
  user: User
  team: any
  status: Status2
  finish_time: any
  finished_at: any
  place: any
  place_ordinal: any
  score?: number
  score_change: any
  comment: any
  has_comment: boolean
  stream_live: boolean
  stream_override: boolean
  actions: string[]
}

export interface User {
  id: string
  full_name: string
  name: string
  discriminator?: string
  url: string
  avatar?: string
  pronouns?: string
  flair: string
  twitch_name: string
  twitch_display_name: string
  twitch_channel: string
  can_moderate: boolean
}

export interface Status2 {
  value: string
  verbose_value: string
  help_text: string
}

export interface OpenedBy {
  id: string
  full_name: string
  name: string
  discriminator: string
  url: string
  avatar: any
  pronouns: string
  flair: string
  twitch_name: string
  twitch_display_name: string
  twitch_channel: string
  can_moderate: boolean
}

export interface Monitor {
  id: string
  full_name: string
  name: string
  discriminator: string
  url: string
  avatar?: string
  pronouns?: string
  flair: string
  twitch_name: string
  twitch_display_name: string
  twitch_channel: string
  can_moderate: boolean
}
