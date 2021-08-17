import { BasePlugin } from 'xgplayer'
import HlsMobileLivePlayer from './mobile'
import HlsMSELivePlayer from './mse'

export default class HlsLivePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLiveWrapper'
  }

  static get defaultConfig () {
    return {
      options: {},
      loadTimeout: 10000,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 1000,
      innerDegrade: 0
    }
  }

    /** @type {HlsMSELivePlayer | HlsMobileLivePlayer} */
    hlsLive = null

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

    static isSupported (mediaType) {
      if (mediaType === 'live-video') {
        return HlsMobileLivePlayer.isSupported()
      }
      return HlsMSELivePlayer.isSupported()
    }
}
