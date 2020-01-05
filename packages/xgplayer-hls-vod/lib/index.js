'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerContext = require('xgplayer-transmuxer-context');

var _xgplayerTransmuxerContext2 = _interopRequireDefault(_xgplayerTransmuxerContext);

var _xgplayerUtils = require('xgplayer-utils');

var _hlsVod = require('./hls-vod');

var _hlsVod2 = _interopRequireDefault(_hlsVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HlsAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.HlsAllowedEvents;
var REMUX_EVENTS = _xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS;
var HLS_EVENTS = _xgplayerTransmuxerConstantEvents2.default.HLS_EVENTS;

var HlsVodPlayer = function (_Player) {
  _inherits(HlsVodPlayer, _Player);

  function HlsVodPlayer(options) {
    _classCallCheck(this, HlsVodPlayer);

    var _this = _possibleConstructorReturn(this, (HlsVodPlayer.__proto__ || Object.getPrototypeOf(HlsVodPlayer)).call(this, options));

    _this.hlsOps = {};
    _this.util = _xgplayer2.default.util;
    _this.util.deepCopy(_this.hlsOps, options);
    _this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
    _this._handleSetCurrentTime = (0, _xgplayerUtils.debounce)(_this._handleSetCurrentTime.bind(_this), 200);
    _this.onWaiting = _this.onWaiting.bind(_this);
    _this.started = false;
    return _this;
  }

  _createClass(HlsVodPlayer, [{
    key: '_handleSetCurrentTime',
    value: function _handleSetCurrentTime(time) {
      time = parseFloat(time);
      _set(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'currentTime', parseInt(time), this);
      if (this._context) {
        this.__core__.seek(time);
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      return this.video.play().catch(function (e) {
        if (e && e.code === 20) {
          // fix: chrome The play() request was interrupted by a new load request.
          _this2.once('canplay', function () {
            _this2.video.play();
          });
        }
      });
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      var _this3 = this;

      this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, function () {
        var mse = _this3.__core__.mse;
        _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'start', _this3).call(_this3, mse.url);
      });

      this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, function () {
        _this3.emit('error', new _xgplayer2.default.Errors('network', _this3.config.url));
      });

      this.once('canplay', function () {
        if (_this3.config.autoplay) {
          _this3.play();
        }
      });
    }
  }, {
    key: 'initHlsBackupEvents',
    value: function initHlsBackupEvents(hls, ctx) {
      var _this4 = this;

      hls.once(_xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS.MEDIA_SEGMENT, function () {
        _this4.__core__ = hls;
        _this4.__core__.mse.cleanBuffers().then(function () {
          _this4.__core__.mse.resetContext(ctx);
          _this4.__core__.mse.doAppend();
          _this4._context.destroy();
          _this4._context = ctx;
        });
      });

      hls.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      var _this5 = this;

      var _self = this;
      _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'onWaiting', this).call(this);
      var retryTime = 10;
      var timer = setInterval(function () {
        if (_xgplayer2.default.util.hasClass(_self.root, 'xgplayer-isloading')) {
          var _detectBufferGap = _this5.detectBufferGap(),
              gap = _detectBufferGap.gap,
              start = _detectBufferGap.start,
              method = _detectBufferGap.method;

          if (gap) {
            _this5.currentTime = Math[method](start);
          }
        }
        if (retryTime-- <= 0) {
          clearInterval(timer);
        }
      }, 500);
    }
  }, {
    key: 'start',
    value: function start() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      if (!url || this.started) {
        return;
      }

      this.__core__ = this._context.registry('HLS_VOD_CONTROLLER', _hlsVod2.default)({ player: this, container: this.video });
      this._context.init();
      this.__core__.load(url);
      this._initEvents();

      this.started = true;
    }
  }, {
    key: 'swithURL',
    value: function swithURL(url) {
      this.config.url = url;
      var context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
      var hls = context.registry('HLS_VOD_CONTROLLER', _hlsVod2.default)({
        player: this,
        container: this.video,
        mse: this.__core__.mse
      });
      context.init();
      this.initHlsBackupEvents(hls, context);
      hls.load(url);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._context.destroy();
      _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'detectBufferGap',
    value: function detectBufferGap() {
      var video = this.video;

      var result = {
        gap: false,
        start: -1
      };
      for (var i = 0; i < video.buffered.length; i++) {
        var bufferStart = video.buffered.start(i);
        var startGap = bufferStart - this.currentTime;
        if (startGap > 0.1 && startGap <= 2) {
          result = {
            gap: true,
            start: bufferStart,
            method: 'ceil'
          };
        }
      }

      return result;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'currentTime', this);
    },
    set: function set(time) {
      this._handleSetCurrentTime(time);
    }
  }, {
    key: 'src',
    get: function get() {
      return this.currentSrc;
    },
    set: function set(url) {
      var _this6 = this;

      this.currentTime = 0;
      this.__core__.destroy();
      this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
      this.onWaiting = this.onWaiting.bind(this);
      this.started = false;
      this.start(url);
      if (!this.paused) {
        this.pause();
        this.once('canplay', function () {
          _this6.play();
        });
      } else {
        this.play();
      }
      // this.swithURL(url)
    }
  }]);

  return HlsVodPlayer;
}(_xgplayer2.default);

exports.default = HlsVodPlayer;