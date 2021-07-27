import { BasePlugin } from 'xgplayer'
import FlvLiveMsePlayer from './mse/index'
import FlvLiveMobilePlayer from './mobile/index'

export default class FlvLiveWrapperPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLiveWrapper'
  }

  constructor (config) {
    super(config)

    const player = config.player

    if (player.config.mediaType === 'live-video') {
      this.flvLive = player.registerPlugin(FlvLiveMobilePlayer)
    } else {
      this.flvLive = player.registerPlugin(FlvLiveMsePlayer)
    }
    if (!this.hlsLive) return
    this.flvLive.wrapper = this
  }

  static isSupported (mediaType) {
    if (mediaType === 'live-video') {
      return FlvLiveMobilePlayer.isSupported()
    }
    return FlvLiveMsePlayer.isSupported()
  }
}
