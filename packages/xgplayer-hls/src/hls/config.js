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
 *  preloadTime?: number,
 *  disconnectTime?: number,
 *  fetchOptions?: RequestInit
 *  onPreM3U8Parse?: (m3u8: string) => string | void
 *  decryptor?: Decryptor
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
    preloadTime: 30,
    softDecode: false,
    bufferBehind: 10,
    maxJumpDistance: 3,
    startTime: 0,
    targetLatency: 10,
    maxLatency: 20,
    allowedStreamTrackChange: true,
    manifest: '',
    ...cfg,
    media
  }
}
