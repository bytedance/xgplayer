import type { MSEAttachMode } from 'xgplayer-streaming-shared'
import type { TsFixerConfig } from 'xgplayer-transmuxer'
import type { IExternalDecryptor } from './buffer-service/decrypt'

export type m3u8ParseCallback = (
  m3u8: string,
  isAudioOrSubtitle?: boolean
) => string | null

export type HlsFixerConfig = TsFixerConfig

export interface HlsOption {
  media?: HTMLMediaElement
  url?: string
  isLive?: boolean
  softDecode?: boolean
  targetLatency?: number
  maxPlaylistSize?: number
  maxLatency?: number
  bufferBehind?: number
  maxJumpDistance?: number
  startTime?: number
  retryCount?: number
  retryDelay?: number
  pollRetryCount?: number
  loadTimeout?: number
  manifestLoadTimeout?: number
  preloadTime?: number
  disconnectTime?: number
  allowedStreamTrackChange?: boolean
  useLowLatency?: boolean
  seiInTime?: boolean
  manifestList?: Array<{ url: string; manifest: string }>
  fetchOptions?: RequestInit
  onPreM3U8Parse?: m3u8ParseCallback
  decryptor?: IExternalDecryptor
  minSegmentsStartPlay?: number
  preferMMS?: boolean
  preferMMSStreaming?: boolean
  mseAttachMode?: MSEAttachMode
  mseLowLatency?: boolean
  forceFixLargeGap?: boolean
  fixerConfig?: HlsFixerConfig
}

const DEFAULT_MSE_ATTACH_MODE: NonNullable<HlsOption['mseAttachMode']> = 'auto'

function createDefaultConfig() {
  const manifestList: NonNullable<HlsOption['manifestList']> = []
  const fixerConfig: HlsFixerConfig = {
    forceFixLargeGap: false,
    largeGapThreshold: 5,
    fixHevcDiscontinuity: false
  }

  return {
    maxPlaylistSize: 50,
    retryCount: 3,
    retryDelay: 1000,
    pollRetryCount: 2,
    loadTimeout: 10000,
    manifestLoadTimeout: 10000,
    preloadTime: 30,
    softDecode: false,
    bufferBehind: 10,
    maxJumpDistance: 3,
    startTime: 0,
    useLowLatency: true,
    targetLatency: 10,
    maxLatency: 20,
    allowedStreamTrackChange: true,
    seiInTime: false,
    manifestList,
    minSegmentsStartPlay: 3,
    preferMMS: false,
    preferMMSStreaming: false,
    // 'auto' uses a source element for MMS or AirPlay-capable WebKit.
    mseAttachMode: DEFAULT_MSE_ATTACH_MODE,
    mseLowLatency: true,
    fixerConfig
  }
}

type DefaultHlsConfig = ReturnType<typeof createDefaultConfig>

export type HlsConfig = Omit<HlsOption, keyof DefaultHlsConfig | 'media'> &
  Omit<DefaultHlsConfig, 'startTime' | 'mseAttachMode'> & {
    media: HTMLMediaElement
    startTime: HlsOption['startTime']
    mseAttachMode: NonNullable<HlsOption['mseAttachMode']>
  }

export function getConfig(cfg: HlsOption = {}): HlsConfig {
  const media = cfg.media || document.createElement('video')
  const overrides = { ...cfg }
  for (const key of Object.keys(overrides) as Array<keyof HlsOption>) {
    if (overrides[key] === undefined) delete overrides[key]
  }
  return {
    ...createDefaultConfig(),
    ...overrides,
    media
  }
}
