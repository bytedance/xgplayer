(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HlsPlayer = undefined;

  var _xgplayerHlsLive = require('xgplayer-hls-live');

  var _xgplayerHlsVod = require('xgplayer-hls-vod');

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var HlsPlayer = exports.HlsPlayer = function HlsPlayer(config) {
    _classCallCheck(this, HlsPlayer);

    if (config.isLive) {
      return new _xgplayerHlsLive.HlsLivePlayer(config);
    } else {
      return new _xgplayerHlsVod.HlsVodPlayer(config);
    }
  };

  module.exports = HlsPlayer;

})));
//# sourceMappingURL=index.js.map
