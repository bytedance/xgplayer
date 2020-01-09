'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerHlsLive = require('xgplayer-hls-live');

var _xgplayerHlsLive2 = _interopRequireDefault(_xgplayerHlsLive);

var _xgplayerHlsVod = require('xgplayer-hls-vod');

var _xgplayerHlsVod2 = _interopRequireDefault(_xgplayerHlsVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HlsPlayer = function HlsPlayer(config) {
  _classCallCheck(this, HlsPlayer);

  if (config.isLive) {
    return new _xgplayerHlsLive2.default(config);
  } else {
    return new _xgplayerHlsVod2.default(config);
  }
};

exports.default = HlsPlayer;