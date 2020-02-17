import HlsLivePlayer from 'xgplayer-hls-live';
import HlsVodPlayer from 'xgplayer-hls-vod';

class HlsPlayer {
  constructor (config) {
    if (config.isLive) {
      this.plugins = [HlsLivePlayer]
    } else {
      this.plugins = [HlsVodPlayer]
    }
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }
}

export default HlsPlayer
