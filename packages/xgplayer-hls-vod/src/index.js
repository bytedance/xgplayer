import { BasePlugin } from 'xgplayer'
import HlsVodMsePlayer from './mse/index'
import HlsVodMobilePlayer from './mobile/index'

export default class HlsVodWrapperPlayer extends BasePlugin {
  static get pluginName () {
    return 'HlsVodWrapper'
  }

  static get defaultConfig () {
    return {
      options: {},
      loadTimeout: 10000,
      preloadTime: 5,
      retryCount: 3,
      retryDelay: 1000,
      retryTimes: 3,
      innerDegrade: 0
    }
  }

  constructor (config) {
    super(config)

    const player = config.player

    if (player.config.mediaType === 'live-video') {
      this.hlsVod = player.registerPlugin(HlsVodMobilePlayer)
    } else {
      this.hlsVod = player.registerPlugin(HlsVodMsePlayer)
    }

    this.hlsVod.wrapper = this
  }

  static isSupported (mediaType) {
    if (mediaType === 'live-video') {
      return HlsVodMobilePlayer.isSupported()
    }
    return HlsVodMsePlayer.isSupported()
  }
}
