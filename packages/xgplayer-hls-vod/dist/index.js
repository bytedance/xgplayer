(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HlsVodPlayer = undefined;

  var _xgplayer = require('xgplayer');

  var _xgplayer2 = _interopRequireDefault(_xgplayer);

  var _xgplayerUtils = require('xgplayer-utils');

  var _hlsVod = require('./hls-vod');

  var _hlsVod2 = _interopRequireDefault(_hlsVod);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const HlsAllowedEvents = _xgplayerUtils.EVENTS.HlsAllowedEvents;
  const REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;
  const HLS_EVENTS = _xgplayerUtils.EVENTS.HLS_EVENTS;

  class HlsVodPlayer extends _xgplayer2.default {
    constructor(options) {
      super(options);
      this.hlsOps = {};
      this.util = _xgplayer2.default.util;
      this.util.deepCopy(this.hlsOps, options);
      this._context = new _xgplayerUtils.Context(HlsAllowedEvents);
    }

    get currentTime() {
      return super.currentTime;
    }

    set currentTime(time) {
      time = parseFloat(time);
      super.currentTime = parseInt(time);
      if (this._context) {
        this.__core__.seek(time);
      }
    }

    _initEvents() {
      this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
        const mse = this._context.getInstance('MSE');
        super.start(mse.url);
      });

      this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
        this.emit('error', new _xgplayer2.default.Errors('network', this.config.url));
      });

      this.once('canplay', () => {
        this.play();
      });
    }

    _initSrcChangeHandler() {
      let _this = this;
      Object.defineProperty(this, 'src', {
        get() {
          return _this.currentSrc;
        },
        set(url) {
          _this.config.url = url;
          if (!_this.paused) {
            _this.pause();
            _this.once('pause', () => {
              _this.start(url);
            });
            _this.once('canplay', () => {
              _this.play();
            });
          } else {
            _this.start(url);
          }
          _this.once('canplay', () => {
            _this.currentTime = 0;
          });
        },
        configurable: true
      });
    }

    start() {
      let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      if (!url) {
        return;
      }
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsVod2.default)({ player: this, container: this.video });
      this._context.init();
      this.__core__.load(url);
      this._initEvents();
      this._initSrcChangeHandler();
    }

    destroy() {
      this._context.destroy();
      super.destroy();
    }
  }
  exports.HlsVodPlayer = HlsVodPlayer;
  module.exports = HlsVodPlayer;

})));
//# sourceMappingURL=index.js.map
