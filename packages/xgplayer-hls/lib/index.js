'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerHlsLive = require('xgplayer-hls-live');

var _xgplayerHlsLive2 = _interopRequireDefault(_xgplayerHlsLive);

var _xgplayerHlsVod = require('xgplayer-hls-vod');

var _xgplayerHlsVod2 = _interopRequireDefault(_xgplayerHlsVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HlsPlayer = function () {
  function HlsPlayer(config) {
    _classCallCheck(this, HlsPlayer);

    if (config.isLive) {
      this.plugins = [_xgplayerHlsLive2.default];
    } else {
      this.plugins = [_xgplayerHlsVod2.default];
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

exports.default = HlsPlayer;