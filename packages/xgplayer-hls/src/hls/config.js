/**
 * @typedef {{
 *  media: HTMLMediaElement,
 *  url?: string,
 *  isLive?: boolean,
 *  softDecode?: boolean,
 *  targetLatency?: number,
 *  maxPlaylistSize?: number,
 *  maxLatency?: number,
 *  bufferBehind?: number,
 *  maxJumpDistance?: number,
 *  startTime?: number,
 *  retryCount?: number,
 *  retryDelay?: number,
 *  loadTimeout?: number,
 *  manifestLoadTimeout?:number,
 *  preloadTime?: number,
 *  disconnectTime?: number,
 *  allowedStreamTrackChange?: boolean,
 *  seiInTime?: boolean,
 *  manifestList?: Array<{url: string, manifest: string}>
 *  fetchOptions?: RequestInit
 *  onPreM3U8Parse?: (m3u8: string) => string | void
 *  decryptor?: Decryptor,
 *  minSegmentsStartPlay?: number
 *  preferMMS?: boolean
 *  preferMMSStreaming?: boolean
 * }} HlsOption
 */

/**
 * @param {HlsOption} cfg
 * @returns {HlsOption}
 */
export function getConfig (cfg) {
  const media = cfg?.media || document.createElement('video')
  return {
    maxPlaylistSize: 50,
    retryCount: 3,
    retryDelay: 1000,
    pollRetryCount: 2,
    loadTimeout: 10000,
    manifestLoadTimeout:10000,
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
    manifestList: [],
    minSegmentsStartPlay: 3,
    preferMMS: false,
    preferMMSStreaming: false,
    ...cfg,
    media
  }
}
