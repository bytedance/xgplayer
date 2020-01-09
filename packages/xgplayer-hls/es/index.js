function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HlsLivePlayer from 'xgplayer-hls-live';
import HlsVodPlayer from 'xgplayer-hls-vod';

var HlsPlayer = function HlsPlayer(config) {
  _classCallCheck(this, HlsPlayer);

  if (config.isLive) {
    return new HlsLivePlayer(config);
  } else {
    return new HlsVodPlayer(config);
  }
};

export default HlsPlayer;