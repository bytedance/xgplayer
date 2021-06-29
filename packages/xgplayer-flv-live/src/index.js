import FlvLiveMsePlayer from './mse'
import FlvLiveMobilePlayer from './mobile'

export default class FlvLivePlayer {
  static get pluginName () {
    return FlvLiveMsePlayer.pluginName
  }

  static get defaultConfig () {
    return FlvLiveMsePlayer.defaultConfig
  }

  constructor (config) {
    if (FlvLiveMobilePlayer.isSupported() && config.player.config.mediaType === 'mobile-video') {
      return new FlvLiveMobilePlayer(config)
    } if (FlvLiveMsePlayer.isSupported()) {
      return new FlvLiveMsePlayer(config)
    }
  }

  static isSupported () {
    return FlvLiveMsePlayer.isSupported() || FlvLiveMobilePlayer.isSupported()
  }
}

export {
  FlvLiveMsePlayer,
  FlvLiveMobilePlayer
}
