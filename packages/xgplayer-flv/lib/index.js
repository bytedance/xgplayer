'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerFlvLive = require('xgplayer-flv-live');

var _xgplayerFlvLive2 = _interopRequireDefault(_xgplayerFlvLive);

var _xgplayerFlvVod = require('xgplayer-flv-vod');

var _xgplayerFlvVod2 = _interopRequireDefault(_xgplayerFlvVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlvPlayer = function () {
  _createClass(FlvPlayer, null, [{
    key: 'pluginName',
    get: function get() {
      return 'FlvPlayer';
    }
  }]);

  function FlvPlayer(config) {
    _classCallCheck(this, FlvPlayer);

    if (config.isLive) {
      this.plugins = [_xgplayerFlvLive2.default];
    } else {
      this.plugins = [_xgplayerFlvVod2.default];
    }
  }

  _createClass(FlvPlayer, null, [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);

  return FlvPlayer;
}();

exports.default = FlvPlayer;