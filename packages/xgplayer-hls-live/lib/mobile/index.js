'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerContext = require('xgplayer-transmuxer-context');

var _xgplayerTransmuxerContext2 = _interopRequireDefault(_xgplayerTransmuxerContext);

var _hlsLiveMobile = require('./hls-live-mobile');

var _hlsLiveMobile2 = _interopRequireDefault(_hlsLiveMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'xgplayer-mobilevideo'
var HlsAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.HlsAllowedEvents;

var HlsLivePlayer = function (_Player) {
  _inherits(HlsLivePlayer, _Player);

  _createClass(HlsLivePlayer, null, [{
    key: 'isSupported',
    value: function isSupported() {
      var wasmSupported = 'WebAssembly' in window;
      var WebComponentSupported = 'customElements' in window && window.customElements.define;
      var isComponentDefined = false;
      if (WebComponentSupported) {
        isComponentDefined = window.customElements.get('mobile-video');
      }
      return wasmSupported && isComponentDefined;
    }
  }]);

  function HlsLivePlayer(options) {
    _classCallCheck(this, HlsLivePlayer);

    if (!options.mediaType) {
      options.mediaType = 'mobile-video';
    }

    var _this = _possibleConstructorReturn(this, (HlsLivePlayer.__proto__ || Object.getPrototypeOf(HlsLivePlayer)).call(this, options));

    _this.hlsOps = {};
    _this.util = _xgplayer2.default.util;
    _this.util.deepCopy(_this.hlsOps, options);
    if (!_this.playerInited) {
      _this.initPlayer();
    }
    // this.started = false;
    return _this;
  }

  _createClass(HlsLivePlayer, [{
    key: 'initPlayer',
    value: function initPlayer() {
      this.video.width = Number.parseInt(this.hlsOps.width || 600);
      this.video.height = Number.parseInt(this.hlsOps.height || 337.5);
      this.video.style.outline = 'none';
      this.playerInited = true;
    }
  }, {
    key: '_initEvents',
    value: function _initEvents() {
      var _this2 = this;

      this.once('canplay', function () {
        _this2.video.play();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.hlsOps.url;

      if (!url || this.started) {
        return;
      }

      if (!this.playerInited) {
        this.initPlayer();
      }

      if (!this._context) {
        this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
      }

      this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLiveMobile2.default)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
      this._context.init();
      this.url = url;
      this.__core__.load(url);
      _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'start', this).call(this, url);
      this._initEvents();
      this.started = true;
    }
  }, {
    key: 'play',
    value: function play() {
      if (this.started) {
        this._context.destroy();
        this._context = new _xgplayerTransmuxerContext2.default(HlsAllowedEvents);
        this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', _hlsLiveMobile2.default)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
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

      var isDelDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      return new Promise(function (resolve) {
        _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'destroy', _this3).call(_this3);
        var video = _this3.video,
            root = _this3.root;

        _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'destroy', _this3).call(_this3, isDelDOM);
        if (video && video.remove) {
          video.remove();
        } else if (root) {
          root.removeChild(video);
        }
        if (video) {
          video.destroy();
        }
        setTimeout(function () {
          resolve();
        }, 50);
      });
    }
  }, {
    key: 'src',
    set: function set(url) {
      this.onWaiting = this.onWaiting.bind(this);
      this._context.destroy();
      this._context = null;
      this.started = false;
      this.video.currentTime = 0;

      this.start(url);
    }
  }], [{
    key: 'install',
    value: function install(name, plugin) {
      return _xgplayer2.default.install(name, plugin);
    }
  }]);

  return HlsLivePlayer;
}(_xgplayer2.default);

exports.default = HlsLivePlayer;


HlsLivePlayer.install = _xgplayer2.default.install.bind(_xgplayer2.default);