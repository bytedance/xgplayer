(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var _xgplayerFlvLive = require('xgplayer-flv-live');

  var _xgplayerFlvLive2 = _interopRequireDefault(_xgplayerFlvLive);

  var _xgplayerFlvVod = require('xgplayer-flv-vod');

  var _xgplayerFlvVod2 = _interopRequireDefault(_xgplayerFlvVod);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  class FlvPlayer {
    constructor(config) {
      if (config.isLive) {
        return new _xgplayerFlvLive2.default(config);
      } else {
        return new _xgplayerFlvVod2.default(config);
      }
    }
  }

  module.exports = FlvPlayer;

})));
//# sourceMappingURL=index.js.map
