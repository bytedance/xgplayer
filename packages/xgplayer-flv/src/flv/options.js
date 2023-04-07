/**
 * @typedef {{
 *  media: HTMLMediaElement,
 *  url?: string,
 *  isLive?: boolean,
 *  softDecode?: boolean,
 *  analyzeDuration?: number,
 *  maxJumpDistance?: number,
 *  maxLatency?: number,
 *  targetLatency?: number,
 *  bufferBehind?: number,
 *  retryCount?: number,
 *  retryDelay?: number,
 *  loadTimeout?: number,
 *  maxReaderInterval?: number,
 *  preloadTime?: number,
 *  disconnectTime?: number,
 *  fetchOptions?: RequestInit,
 *  seamlesslyReload: boolean
 * }} FlvOption
 */

/**
 * @param {FlvOption} opts
 * @returns {FlvOption}
 */
export function getOption (opts) {
  const ret = {
    retryCount: 3,
    retryDelay: 1000,
    loadTimeout: 10000,
    maxReaderInterval: 5000,
    preloadTime: 5,
    isLive: false,
    softDecode: false,
    bufferBehind: 10,
    maxJumpDistance: 3,
    analyzeDuration: 20000,
    seamlesslyReload: false,
    ...opts
  }

  if (ret.isLive) {
    if (ret.preloadTime) {
      // compat old

      if (!ret.maxLatency) {
        ret.maxLatency = ret.preloadTime * 2
      }
      if (!ret.targetLatency) {
        ret.targetLatency = ret.preloadTime
      }

      if (ret.disconnectTime === null || ret.disconnectTime === undefined) {
        ret.disconnectTime = ret.maxLatency
      }
    }
  }

  return ret
}
