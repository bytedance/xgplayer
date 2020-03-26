'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerContext = require('xgplayer-transmuxer-context');

var _xgplayerTransmuxerContext2 = _interopRequireDefault(_xgplayerTransmuxerContext);

var _flvVod = require('./flv-vod');

var _flvVod2 = _interopRequireDefault(_flvVod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasePlugin = _xgplayer2.default.BasePlugin,
    Events = _xgplayer2.default.Events;


var flvAllowedEvents = _xgplayerTransmuxerConstantEvents2.default.FlvAllowedEvents;

var isEnded = function isEnded(player, flv) {
  if (!player.config.isLive) {
    if (player.duration - player.currentTime < 2) {
      var range = player.getBufferedRange();
      if (player.currentTime - range[1] < 0.1) {
        player.emit('ended');
        flv.mse.endOfStream();
      }
    }
  }
};

var FlvVodPlayer = function (_BasePlugin) {
  _inherits(FlvVodPlayer, _BasePlugin);

  function FlvVodPlayer() {
    _classCallCheck(this, FlvVodPlayer);

    return _possibleConstructorReturn(this, (FlvVodPlayer.__proto__ || Object.getPrototypeOf(FlvVodPlayer)).apply(this, arguments));
  }

  _createClass(FlvVodPlayer, [{
    key: 'beforePlayerInit',
    value: function beforePlayerInit() {
      var _this2 = this;

      this.context = new _xgplayerTransmuxerContext2.default(flvAllowedEvents);

      this.initEvents();
      var flv = this.initFlv();
      this.context.init();
      var remuxer = this.remuxer;
      remuxer._dtsBase = 0;
      flv.loadMeta();
      this.player.swithURL = this.swithURL;
      try {
        BasePlugin.defineGetterOrSetter(this.player, {
          '__url': {
            get: function get() {
              return _this2.flv.mse.url;
            }
          }
        });
      } catch (e) {
        // NOOP
      }
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var player = this.player;

      var flv = this.context.registry('FLV_CONTROLLER', _flvVod2.default)(player);

      this.flv = flv;
      this.mse = flv.mse;
      return flv;
    }
  }, {
    key: 'initFlvBackupEvents',
    value: function initFlvBackupEvents(flv, ctx) {
      var _this3 = this;

      flv.once(_xgplayerTransmuxerConstantEvents2.default.REMUX_EVENTS.INIT_SEGMENT, function () {
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
      });

      flv.once(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on(Events.TIME_UPDATE, this.handleTimeUpdate.bind(this));

      this.on(Events.SEEKING, this.handleSeek.bind(this));
      this.on(Events.URL_CHANGE, this.swithURL.bind(this));

      this.once(Events.DESTROY, this._destroy.bind(this));
    }
  }, {
    key: 'handleTimeUpdate',
    value: function handleTimeUpdate() {
      this.loadData();
      isEnded(this.player, this.flv);
    }
  }, {
    key: 'handleSeek',
    value: function handleSeek() {
      var time = this.player.currentTime;
      var range = this.player.getBufferedRange();
      if (time > range[1] || time < range[0]) {
        this.flv.seek(time);
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.context.destroy();
      this.context = null;
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.currentTime;
      var player = this.player;

      var range = player.getBufferedRange();
      if (range[1] - time < (player.config.preloadTime || 15) - 5) {
        this.flv.loadNext(range[1] + 1);
      }
    }
  }, {
    key: 'swithURL',
    value: function swithURL(url) {
      var player = this.player;

      player.config.url = url;
      player.hasStart = false;
      if (!player.paused) {
        player.pause();
        player.once('pause', function () {
          player.start();
        });
        player.once('canplay', function () {
          player.play();
        });
      } else {
        player.start();
      }
      player.once('canplay', function () {
        player.currentTime = 0;
      });
    }
  }, {
    key: 'remuxer',
    get: function get() {
      return this.context.getInstance('MP4_REMUXER');
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }, {
    key: 'pluginName',
    get: function get() {
      return 'flvVod';
    }
  }]);

  return FlvVodPlayer;
}(BasePlugin);

exports.default = FlvVodPlayer;