import FlvLivePlayer from 'xgplayer-flv-live'
import FlvVodPlayer from 'xgplayer-flv-vod'

class FlvPlayer{
  constructor (config) {
    if (config.isLive) {
      return new FlvLivePlayer(config)
    } else {
      return new FlvVodPlayer(config)
    }
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }
}

export default FlvPlayer
