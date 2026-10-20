import type { MP3Config, MP3Options } from './types'

export function getConfig(options: MP3Options = {}): MP3Config {
  const media = options.media || document.createElement('audio')
  const config: MP3Config = {
    media,
    url: '',
    vid: '',
    maxBufferLength: 40,
    minBufferLength: 5,
    bufferBehind: 30,
    segmentDuration: 10,
    tickInterval: 500,
    probeSize: 128 * 1024,
    maxProbeSize: 1024 * 1024,
    syncSearchSize: 4096,
    retry: 3,
    retryDelay: 1000,
    timeout: 5000,
    reqOptions: null,
    closeDowngrade: false,
    preferMMS: false,
    mseAttachMode: 'auto',
    ...options
  }

  if (options.retryCount != null) config.retry = options.retryCount
  config.maxProbeSize = Math.max(1024, config.maxProbeSize)
  config.probeSize = Math.max(1024, Math.min(config.probeSize, config.maxProbeSize))
  config.segmentDuration = Math.max(0.1, config.segmentDuration)
  config.syncSearchSize = Math.max(4, config.syncSearchSize)
  return config
}
