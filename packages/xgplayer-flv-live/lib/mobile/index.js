'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerTransmuxerContext = require('xgplayer-transmuxer-context');

var _xgplayerTransmuxerContext2 = _interopRequireDefault(_xgplayerTransmuxerContext);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _flvLiveMobile = require('./flv-live-mobile');

var _flvLiveMobile2 = _interopRequireDefault(_flvLiveMobile);

require('xgplayer-mobilevideo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var flvAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.FlvAllowedEvents;
var BasePlugin = _xgplayer2.default.BasePlugin;

var FlvPlayer = function (_BasePlugin) {
  _inherits(FlvPlayer, _BasePlugin);

  function FlvPlayer() {
    _classCallCheck(this, FlvPlayer);

    return _possibleConstructorReturn(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).apply(this, arguments));
  }

  _createClass(FlvPlayer, [{
    key: 'beforePlayerInit',
    value: function beforePlayerInit() {
      this.context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);
      this.initFlv();
      this.context.init();
      this.loadData();
      this.initEvents();
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _player = this.player,
          video = _player.video,
          config = _player.config;

      video.width = Number.parseInt(config.width || 600);
      video.height = Number.parseInt(config.height || 337.5);
      video.style.outline = 'none';
    }
  }, {
    key: 'initFlvEvents',
    value: function initFlvEvents(flv) {
      var player = this.player;


      flv.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!player.paused) {
          var timer = setInterval(function () {
            var end = player.getBufferedRange()[1];
            if (Math.abs(player.currentTime - end) < 0.5) {
              player.emit('ended');
              window.clearInterval(timer);
            }
          }, 200);
        }
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this2 = this;

      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);

      var player = this.player;


      player.on('seeking', function () {
        var time = _this2.currentTime;
        var range = _this2.getBufferedRange();
        if (time > range[1] || time < range[0]) {
          _this2.flv.seek(_this2.currentTime);
        }
      });

      player.on('play', this.play);
      player.on('pause', this.pause);
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var player = this.player;

      var flv = this.context.registry('FLV_CONTROLLER', _flvLiveMobile2.default)(player);
      this.initFlvEvents(flv);
      this.flv = flv;
    }
  }, {
    key: 'play',
    value: function play() {
      var player = this.player;

      if (this.played) {
        this._destroy();
        player.hasStart = false;
        player.start();
      } else {
        this.addLiveFlag();
      }
      this.played = true;
    }
  }, {
    key: 'pause',
    value: function pause() {
      var player = this.player;

      if (this.flv) {
        this.flv.pause();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.currentTime;
      var player = this.player;

      if (this.flv) {
        this.flv.seek(time);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroy();
    }
  }, {
    key: 'addLiveFlag',
    value: function addLiveFlag() {
      var player = this.player;

      _xgplayer2.default.util.addClass(player.root, 'xgplayer-is-live');
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.context.destroy();
      this.flv = null;
      this.context = null;
    }
  }, {
    key: 'switchURL',
    value: function switchURL(url) {
      var context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);
      var flv = context.registry('FLV_CONTROLLER', _flvLiveMobile2.default)(this.player);
      context.init();
      this.this.flv = flv;
      this.initFlvBackupEvents(flv, context);
      flv.loadData(url);
    }
  }, {
    key: 'src',
    get: function get() {
      return this.player.currentSrc;
    },
    set: function set(url) {
      this.switchURL(url);
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      var wasmSupported = 'WebAssembly' in window;
      var WebComponentSupported = 'customElements' in window && window.customElements.define;
      return wasmSupported && WebComponentSupported;
    }
  }, {
    key: 'pluginName',
    get: function get() {
      return 'flvLiveMobile';
    }
  }]);

  return FlvPlayer;
}(BasePlugin);

exports.default = FlvPlayer;