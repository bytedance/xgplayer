import HlsLivePlayer from 'xgplayer-hls-live/es';
import HlsVodPlayer from 'xgplayer-hls-vod/es';

export default class HlsPlayer {
  constructor (config) {
    if (config.isLive) {
      return new HlsLivePlayer(config)
    } else {
      return new HlsVodPlayer(config)
    }
  }
}
