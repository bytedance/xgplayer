(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HlsLivePlayer = undefined;

  var _xgplayer = require('xgplayer');

  var _xgplayer2 = _interopRequireDefault(_xgplayer);

  var _xgplayerUtils = require('xgplayer-utils');

  var _hlsLive = require('./hls-live');

  var _hlsLive2 = _interopRequireDefault(_hlsLive);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const HlsAllowedEvents = _xgplayerUtils.EVENTS.HlsAllowedEvents;
  const REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;

  class HlsLivePlayer extends _xgplayer2.default {
    constructor(options) {
      super(options);
      this.hlsOps = {};
      this.util = _xgplayer2.default.util;
      this.util.deepCopy(this.hlsOps, options);
      this._context = new _xgplayerUtils.Context(HlsAllowedEvents);
      this._hasStarted = false;
    }

    _initEvents() {
      this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, () => {
        const mse = this._context.getInstance('MSE');
        if (!this._hasStarted) {
          const live = this.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
          this.util.addClass(this.root, 'xgplayer-is-live');
          this.controls.appendChild(live);
        }
        this._hasStarted = true;
        super.start(mse.url);
      });

      this.once('canplay', () => {
        this.video.play();
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
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLive2.default)({ player: this, container: this.video });
      this._context.init();
      this.url = url;
      this.__core__.load(url);
      this._initEvents();
      this._initSrcChangeHandler();
    }

    play() {
      if (this._hasStarted) {
        this._context.destroy();
        this._context = new _xgplayerUtils.Context(HlsAllowedEvents);
        this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLive2.default)({ container: this.video });
        this._context.init();
        this._initEvents();
        this.__core__.load(this.url);
      }
      super.play();
    }

    destroy() {
      this._context.destroy();
      super.destroy();
    }
  }
  exports.HlsLivePlayer = HlsLivePlayer;
  module.exports = HlsLivePlayer;

})));
//# sourceMappingURL=index.js.map
