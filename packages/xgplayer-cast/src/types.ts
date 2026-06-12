export type CastProtocol = 'airplay' | 'chromecast' | string

export type CastAvailability = 'available' | 'not-available' | string

export type AnyRecord = Record<string, any>

export type CastPlayer = AnyRecord

export type CastPluginLike = AnyRecord

export interface CastRouteState {
  protocol?: CastProtocol
  paused: boolean
  currentTime: number
}

export interface CastMediaInfo extends AnyRecord {
  url: string
  contentType: string
}

export interface CastMediaResolveContext {
  protocol: CastProtocol
}

export interface ChromecastConfig extends AnyRecord {
  enabled: boolean
  sdkUrl: string
  sdkLoader: (() => unknown | Promise<unknown>) | null
  loadSdkTimeout: number
  receiverApplicationId: string
  autoJoinPolicy: string
}

export interface ChromecastRemoteState extends AnyRecord {
  protocol: 'chromecast'
  available: boolean
  connected: boolean
  mediaLoaded: boolean
  playerState?: string
  paused?: boolean
  currentTime?: number
  duration?: number
  volume?: number
  muted?: boolean
  title?: string
  contentId?: string
}
