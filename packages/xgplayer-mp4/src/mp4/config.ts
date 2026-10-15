import type { MP4Config, MP4MediaElement, MP4Options } from '../types'

/**
 * MP4 插件配置。
 *
 * 为兼容旧版 xgplayer-mp4（单文件实现）的配置项，这里保留了旧键名并做一次别名映射：
 * - `maxBufferLength` / `minBufferLength`：驱动预加载窗口（播放态用 max，暂停态用 min）。
 * - `tickInSeconds`（秒） → `tickInterval`（毫秒）。
 * - `retryCount` → `retry`。
 * - `reqOptions`：透传给 loader 的请求配置（headers/method/mode/credentials 等）。
 */
export function getConfig(cfg: MP4Options = {}): MP4Config {
  const media = cfg.media || (document.createElement('video') as MP4MediaElement)

  const config: MP4Config = {
    softDecode: false,
    // 预加载窗口（秒）
    maxBufferLength: 40,
    minBufferLength: 5,
    // 向后保留的 buffer（秒），超出部分清除
    bufferBehind: 10,
    // 驱动下载的 timer 间隔（毫秒）
    tickInterval: 500,
    url: '',

    // 网络请求：重试 / 超时 / 自定义请求配置
    retry: 3,
    retryDelay: 1000,
    timeout: 3000,
    onProcessMinLen: 1024,
    reqOptions: null,

    // 卡顿检测 / seek 自救
    disableBufferBreakCheck: false,
    waitingTimeOut: 15000,
    waitingInBufferTimeOut: 5000,
    waitJampBufferMaxCnt: 3,

    // 降级到原生 video
    closeDowngrade: false,

    // ManagedMediaSource（MMS，iOS 17.1+）
    preferMMS: false,
    mseAttachMode: 'auto',

    // Worker 转封装
    enableWorker: false,

    ...cfg,
    media
  }

  // 旧配置键名兼容映射（旧键存在时覆盖新键）
  if (cfg.retryCount != null) config.retry = cfg.retryCount
  if (cfg.tickInterval == null && cfg.tickInSeconds != null) {
    config.tickInterval = cfg.tickInSeconds * 1000
  }

  return config
}
