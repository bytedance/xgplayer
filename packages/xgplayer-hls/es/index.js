var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HlsLivePlayer from 'xgplayer-hls-live';
import HlsVodPlayer from 'xgplayer-hls-vod';

var HlsPlayer = function () {
  function HlsPlayer(config) {
    _classCallCheck(this, HlsPlayer);

    if (config.isLive) {
      this.plugins = [HlsLivePlayer];
    } else {
      this.plugins = [HlsVodPlayer];
    }
  }

  _createClass(HlsPlayer, null, [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);

  return HlsPlayer;
}();

export default HlsPlayer;