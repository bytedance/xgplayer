import { BasePlugin } from 'xgplayer'
import FlvLiveMsePlayer from './mse/index'
import FlvLiveMobilePlayer from './mobile/index'

export default class FlvLiveWrapperPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLiveWrapper'
  }

  static get defaultConfig () {
    return {
      preloadTime: 5,
      options: {},
      loadTimeout: 10000,
      retryCount: 3,
      retryDelay: 0,
      backupURL: '',
      backupConstructor: null,
      decodeMode: 0,
      innerDegrade: 0,
      seiOnDemand: false
    }
  }

  /** @type {FlvLiveMsePlayer | FlvLiveMobilePlayer} */
  flvLive = null

  constructor (config) {
    super(config)

    const player = config.player

    if (player.config.mediaType === 'live-video') {
      this.flvLive = player.registerPlugin(FlvLiveMobilePlayer)
    } else {
      this.flvLive = player.registerPlugin(FlvLiveMsePlayer)
    }
    if (!this.flvLive) return
    this.flvLive.wrapper = this
  }

  static isSupported (mediaType) {
    if (mediaType === 'live-video') {
      return FlvLiveMobilePlayer.isSupported()
    }
    return FlvLiveMsePlayer.isSupported()
  }
}
