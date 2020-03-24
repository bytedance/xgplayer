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

var _hlsLive = require('./hls-live');

var _hlsLive2 = _interopRequireDefault(_hlsLive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HlsAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.HlsAllowedEvents;
var REMUX_EVENTS = _xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS;

var HlsLivePlayer = function (_Player) {
  _inherits(HlsLivePlayer, _Player);

  function HlsLivePlayer(options) {
    _classCallCheck(this, HlsLivePlayer);

    var _this = _possibleConstructorReturn(this, (HlsLivePlayer.__proto__ || Object.getPrototypeOf(HlsLivePlayer)).call(this, options));

    _this.hlsOps = {};
    _this.util = _xgplayer2.default.util;
    _this.util.deepCopy(_this.hlsOps, options);
    // this.started = false;
    return _this;
  }

  _createClass(HlsLivePlayer, [{
    key: '_initEvents',
    value: function _initEvents() {
      var _this2 = this;

      this.__core__.once(REMUX_EVENTS.INIT_SEGMENT, function () {
        var mse = _this2._context.getInstance('MSE');
        if (!_this2.started) {
          var live = _this2.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
          _this2.util.addClass(_this2.root, 'xgplayer-is-live');
          _this2.controls.appendChild(live);
        }
        _this2.started = true;
        _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'start', _this2).call(_this2, mse.url);
      });

      this.once('canplay', function () {
        _this2.video.play();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      if (!url || this.started) {
        return;
      }

      if (!this._context) {
        this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
      }

      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLive2.default)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
      this._context.init();
      this.url = url;
      this.__core__.load(url);
      this._initEvents();
      this.started = true;
    }
  }, {
    key: 'play',
    value: function play() {
      if (this.started) {
        this._context.destroy();
        this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
        this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLive2.default)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
        this._context.init();
        this._initEvents();
        this.__core__.load(this.url);
      }
      _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'play', this).call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      return new Promise(function (resolve) {
        if (_this3.__core__ && _this3.__core__.mse) {
          _this3.__core__.mse.destroy().then(function () {
            if (_this3._context) {
              _this3._context.destroy();
            }
            _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'destroy', _this3).call(_this3);
            setTimeout(function () {
              resolve();
            }, 50);
          });
        } else {
          _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'destroy', _this3).call(_this3);
          setTimeout(function () {
            resolve();
          }, 50);
        }
      });
    }
  }, {
    key: 'src',
    set: function set(url) {
      var _this4 = this;

      this.onWaiting = this.onWaiting.bind(this);
      this.__core__.mse.destroy().then(function () {
        _this4._context.destroy();
        _this4._context = null;
        _this4.started = false;
        _this4.video.currentTime = 0;

        _this4.start(url);
      });
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }, {
    key: 'install',
    value: function install(name, plugin) {
      return _xgplayer2.default.install(name, plugin);
    }
  }]);

  return HlsLivePlayer;
}(_xgplayer2.default);

exports.default = HlsLivePlayer;


HlsLivePlayer.install = _xgplayer2.default.install.bind(_xgplayer2.default);