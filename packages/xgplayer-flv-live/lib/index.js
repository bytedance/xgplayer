'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerContext = require('xgplayer-transmuxer-context');

var _xgplayerTransmuxerContext2 = _interopRequireDefault(_xgplayerTransmuxerContext);

var _flvLive = require('./flv-live');

var _flvLive2 = _interopRequireDefault(_flvLive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var flvAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.FlvAllowedEvents;

var FlvPlayer = function (_Player) {
  _inherits(FlvPlayer, _Player);

  function FlvPlayer(config) {
    _classCallCheck(this, FlvPlayer);

    var _this = _possibleConstructorReturn(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).call(this, config));

    _this.context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);
    _this.initEvents();
    _this.loaderCompleteTimer = null;
    // const preloadTime = player.config.preloadTime || 15
    return _this;
  }

  _createClass(FlvPlayer, [{
    key: 'start',
    value: function start() {
      this.initFlv();
      this.context.init();
      _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'start', this).call(this, this.flv.mse.url);
      this.loadData();
    }
  }, {
    key: 'initFlvEvents',
    value: function initFlvEvents(flv) {
      var _this2 = this;

      var player = this;
      flv.once(_xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS.INIT_SEGMENT, function () {
        _xgplayer2.default.util.addClass(player.root, 'xgplayer-is-live');
        if (!_xgplayer2.default.util.findDom(_this2.root, 'xg-live')) {
          var live = _xgplayer2.default.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
          player.controls.appendChild(live);
        }
      });

      flv.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!player.paused) {
          _this2.loaderCompleteTimer = setInterval(function () {
            var end = player.getBufferedRange()[1];
            if (Math.abs(player.currentTime - end) < 0.5) {
              player.emit('ended');
              window.clearInterval(_this2.loaderCompleteTimer);
            }
          }, 200);
        } else {
          player.emit('ended');
        }
      });
    }
  }, {
    key: 'initFlvBackupEvents',
    value: function initFlvBackupEvents(flv, ctx) {
      var _this3 = this;

      var mediaLength = 3;
      flv.on(_xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS.MEDIA_SEGMENT, function () {
        mediaLength -= 1;
        if (mediaLength === 0) {
          // ensure switch smoothly
          _this3.flv = flv;
          _this3.mse.resetContext(ctx);
          _this3.context.destroy();
          _this3.context = ctx;
        }
      });

      flv.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!_this3.paused) {
          _this3.loaderCompleteTimer = setInterval(function () {
            var end = _this3.getBufferedRange()[1];
            if (Math.abs(_this3.currentTime - end) < 0.5) {
              _this3.emit('ended');
              window.clearInterval(_this3.loaderCompleteTimer);
            }
          }, 200);
        } else {
          _this3.emit('ended');
        }
      });

      flv.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this4 = this;

      this.on('seeking', function () {
        var time = _this4.currentTime;
        var range = _this4.getBufferedRange();
        if (time > range[1] || time < range[0]) {
          _this4.flv.seek(_this4.currentTime);
        }
      });
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var flv = this.context.registry('FLV_CONTROLLER', _flvLive2.default)(this);
      this.initFlvEvents(flv);
      this.flv = flv;
      this.mse = flv.mse;
      return flv;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this5 = this;

      if (this._hasStart) {
        return this._destroy().then(function () {
          _this5.context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);
          _this5.start();
          return _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'play', _this5).call(_this5);
        });
      } else {
        return _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'play', this).call(this);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'pause', this).call(this);
      if (this.flv) {
        this.flv.pause();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTime;

      if (this.flv) {
        this.flv.seek(time);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this6 = this;

      this._destroy().then(function () {
        _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'destroy', _this6).call(_this6);
      });
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      var _this7 = this;

      return this.flv.mse.destroy().then(function () {
        _this7.context.destroy();
        _this7.flv = null;
        _this7.context = null;
        if (_this7.loaderCompleteTimer) {
          window.clearInterval(_this7.loaderCompleteTimer);
        }
      });
    }
  }, {
    key: 'switchURL',
    value: function switchURL(url) {
      var context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);
      var flv = context.registry('FLV_CONTROLLER', _flvLive2.default)(this, this.mse);
      context.init();
      this.initFlvBackupEvents(flv, context);
      flv.loadData(url);
    }
  }, {
    key: 'src',
    get: function get() {
      return this.currentSrc;
    },
    set: function set(url) {
      this.switchURL(url);
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);

  return FlvPlayer;
}(_xgplayer2.default);

exports.default = FlvPlayer;