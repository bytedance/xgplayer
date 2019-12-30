import { HlsLivePlayer } from 'xgplayer-hls-live';
import { HlsVodPlayer } from 'xgplayer-hls-vod';

export class HlsPlayer {
  constructor (config) {
    if (config.isLive) {
      return new HlsLivePlayer(config)
    } else {
      return new HlsVodPlayer(config)
    }
  }
}

module.exports = HlsPlayer;
