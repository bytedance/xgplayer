/**
 * @callback m3u8ParseCallback
 * @param {string} m3u8
 * @returns {string?}
 */

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
 *  onPreM3U8Parse?: m3u8ParseCallback,
 *  decryptor?: Decryptor,
 *  minSegmentsStartPlay?: number,
 *  preferMMS?: boolean,
 *  preferMMSStreaming?: boolean,
 *  mseAttachMode?: 'auto' | 'src' | 'source-element',
 *  mseLowLatency?: boolean,
 * forceFixLargeGap?:boolean,
 * }} HlsOption
 */

/**
 * @param {HlsOption} cfg
 * @returns {HlsOption}
 */
export function getConfig(cfg) {
  const media = cfg?.media || document.createElement('video')
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
    manifestList: [],
    minSegmentsStartPlay: 3,
    preferMMS: false,
    preferMMSStreaming: false,
    // MSE object URL 绑定方式：
    // - 'auto': ManagedMediaSource 或 AirPlay-capable WebKit 使用 'source-element'，其他 MediaSource 使用 'src'
    // - 'source-element': 通过生成的 <source> 挂载，便于 AirPlay fallback source 共存
    // - 'src': 通过 video.src 挂载
    mseAttachMode: 'auto',
    mseLowLatency: true, // mse 低延迟模式渲染 https://issues.chromium.org/issues/41161663
    fixerConfig: {
      forceFixLargeGap: false, // 强制修复音视频PTS LargeGap, PTS从0开始
      largeGapThreshold: 5 // 单位s
    },
    ...cfg,
    media
  }
}
