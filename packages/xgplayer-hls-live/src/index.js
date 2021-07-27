import { BasePlugin } from 'xgplayer'
import HlsMobileLivePlayer from './mobile'
import HlsMSELivePlayer from './mse'
import defaultConfig from './mse/config'

export default class HlsLivePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLiveWrapper'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      preloadTime: 5,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 0
    })
  }

  static isSupported (mediaType) {
    if (mediaType === 'live-video') {
      return HlsMobileLivePlayer.isSupported()
    }
    return HlsMSELivePlayer.isSupported()
  }

  constructor (options = {}) {
    super(options)
    const player = options.player
    if (!player) {
      console.error('player is', player)
      return
    }
    const mediaType = options.player.config.mediaType
    if (mediaType === 'live-video') {
      this.hlsLive = player.registerPlugin(HlsMobileLivePlayer)
    } else {
      this.hlsLive = player.registerPlugin(HlsMSELivePlayer)
    }
    if (!this.hlsLive) return
    this.hlsLive.wrapper = this
  }
}
