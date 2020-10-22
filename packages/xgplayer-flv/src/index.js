import FlvLivePlayer from 'xgplayer-flv-live'
import FlvVodPlayer from 'xgplayer-flv-vod'

class FlvPlayer{
  constructor (config) {
    if (config.isLive) {
      return new FlvLivePlayer(config)
    } else {
      return new FlvVodPlayer(config)
    }
    flv.load()
  }
}

module.exports = FlvPlayer
