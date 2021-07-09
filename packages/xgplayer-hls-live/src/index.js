import HlsLiveMsePlayer from './mse'
import HlsLiveMobilePlayer from './mobile'

export default class HlsLivePlayer {
  static get pluginName () {
    return HlsLiveMsePlayer.pluginName
  }

  static get defaultConfig () {
    return HlsLiveMsePlayer.defaultConfig
  }

  constructor (config) {
    if (HlsLiveMobilePlayer.isSupported() && config.player.config.mediaType === 'live-video') {
      return new HlsLiveMobilePlayer(config)
    }
    return new HlsLiveMsePlayer(config)
  }
}

export {
  HlsLiveMsePlayer,
  HlsLiveMobilePlayer
}
