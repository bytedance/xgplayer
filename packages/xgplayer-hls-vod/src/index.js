import { BasePlugin } from 'xgplayer'
import HlsVodMsePlayer from './mse/index'
import HlsVodMobilePlayer from './mobile/index'

export default class HlsVodWrapperPlayer extends BasePlugin {
  static get pluginName () {
    return 'HlsVodWrapper'
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
