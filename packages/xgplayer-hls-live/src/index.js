import HlsLiveMsePlayer from './mse'
import HlsLiveMobilePlayer from './mobile'

export default class HlsLivePlayer {
  static get pluginName () {
    return HlsLiveMsePlayer.pluginName;
  }

  constructor (config) {
    if (HlsLiveMobilePlayer.isSupported() && config.useWASM) {
      return new HlsLiveMobilePlayer(config)
    }
    return new HlsLiveMsePlayer(config)
  }
}
