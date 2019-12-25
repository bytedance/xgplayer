'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerUtils = require('xgplayer-utils');

var _hlsVod = require('./hls-vod');

var _hlsVod2 = _interopRequireDefault(_hlsVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HlsAllowedEvents = _xgplayerUtils.EVENTS.HlsAllowedEvents;
var REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;
var HLS_EVENTS = _xgplayerUtils.EVENTS.HLS_EVENTS;

var HlsVodPlayer = function (_Player) {
  _inherits(HlsVodPlayer, _Player);

  function HlsVodPlayer(options) {
    _classCallCheck(this, HlsVodPlayer);

    var _this2 = _possibleConstructorReturn(this, (HlsVodPlayer.__proto__ || Object.getPrototypeOf(HlsVodPlayer)).call(this, options));

    _this2.hlsOps = {};
    _this2.util = _xgplayer2.default.util;
    _this2.util.deepCopy(_this2.hlsOps, options);
    _this2._context = new _xgplayerUtils.Context(HlsAllowedEvents);
    _this2._handleSetCurrentTime = (0, _xgplayerUtils.debounce)(_this2._handleSetCurrentTime.bind(_this2), 500);
    return _this2;
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
      var _this3 = this;

      return this.video.play().catch(function (e) {
        if (e && e.code === 20) {
          // fix: chrome The play() request was interrupted by a new load request.
          _this3.once('canplay', function () {
            _this3.video.play();
          });
        }
      });
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      var _this4 = this;

      this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, function () {
        var mse = _this4._context.getInstance('MSE');
        _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'start', _this4).call(_this4, mse.url);
      });

      this.__core__.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, function () {
        _this4.emit('error', new _xgplayer2.default.Errors('network', _this4.config.url));
      });

      this.once('canplay', function () {
        if (_this4.config.autoplay) {
          _this4.play();
        }
      });
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'onWaiting', this).call(this);

      var _detectBufferGap = this.detectBufferGap(),
          gap = _detectBufferGap.gap,
          start = _detectBufferGap.start,
          method = _detectBufferGap.method;

      if (gap) {
        this.currentTime = Math[method](start);
      }
    }
  }, {
    key: '_initSrcChangeHandler',
    value: function _initSrcChangeHandler() {
      var _this = this;
      Object.defineProperty(this, 'src', {
        get: function get() {
          return _this.currentSrc;
        },
        set: function set(url) {
          _this.config.url = url;
          if (!_this.paused) {
            _this.pause();
            _this.once('pause', function () {
              _this.start(url);
            });
            _this.once('canplay', function () {
              _this.play();
            });
          } else {
            _this.start(url);
          }
          _this.once('canplay', function () {
            _this.currentTime = 0;
          });
        },

        configurable: true
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      if (!url) {
        return;
      }
      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsVod2.default)({ player: this, container: this.video });
      this._context.init();
      this.__core__.load(url);
      this._initEvents();
      this._initSrcChangeHandler();
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
  }]);

  return HlsVodPlayer;
}(_xgplayer2.default);

exports.default = HlsVodPlayer;