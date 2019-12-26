var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Player from 'xgplayer';
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-vod';

var flvAllowedEvents = EVENTS.FlvAllowedEvents;

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

var FlvVodPlayer = function (_Player) {
  _inherits(FlvVodPlayer, _Player);

  function FlvVodPlayer(config) {
    _classCallCheck(this, FlvVodPlayer);

    var _this = _possibleConstructorReturn(this, (FlvVodPlayer.__proto__ || Object.getPrototypeOf(FlvVodPlayer)).call(this, config));

    _this.context = new Context(flvAllowedEvents);
    _this.initEvents();
    // const preloadTime = player.config.preloadTime || 15
    return _this;
  }

  _createClass(FlvVodPlayer, [{
    key: 'start',
    value: function start() {
      var flv = this.initFlv();

      flv.loadMeta();
      _get(FlvVodPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvVodPlayer.prototype), 'start', this).call(this, flv.mse.url);
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var flv = this.context.registry('FLV_CONTROLLER', FLV)(this);
      this.context.init();
      this.flv = flv;
      this.mse = flv.mse;
      return flv;
    }
  }, {
    key: 'initFlvBackupEvents',
    value: function initFlvBackupEvents(flv, ctx) {
      var _this2 = this;

      flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, function () {
        var mediaLength = 3;
        flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, function () {
          mediaLength -= 1;
          if (mediaLength === 0) {
            // ensure switch smoothly
            _this2.flv = flv;
            _this2.mse.resetContext(ctx);
            _this2.context.destroy();
            _this2.context = ctx;
          }
        });
      });

      flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on('timeupdate', this.handleTimeUpdate.bind(this));

      this.on('seeking', this.handleSeek.bind(this));

      this.once('destroy', this._destroy.bind(this));
    }
  }, {
    key: 'handleTimeUpdate',
    value: function handleTimeUpdate() {
      this.loadData();
      isEnded(this, this.flv);
    }
  }, {
    key: 'handleSeek',
    value: function handleSeek() {
      var time = this.currentTime;
      var range = this.getBufferedRange();
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.currentTime);
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.context.destroy();
      this.context = null;
      this.flv = null;
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTime;

      var range = this.getBufferedRange();
      if (range[1] - time < (this.config.preloadTime || 15) - 5) {
        this.flv.loadNext(range[1] + 1);
      }
    }
  }, {
    key: 'swithURL',
    value: function swithURL(url) {
      this.config.url = url;
      var context = new Context(flvAllowedEvents);
      var flv = context.registry('FLV_CONTROLLER', FLV)(this, this.mse);
      context.init();
      var remuxer = context.getInstance('MP4_REMUXER');
      remuxer._dtsBase = 0;
      this.initFlvBackupEvents(flv, context);
      flv.loadMeta();
    }
  }, {
    key: 'remuxer',
    get: function get() {
      return this.context.getInstance('MP4_REMUXER');
    }
  }, {
    key: 'src',
    get: function get() {
      return this.currentSrc;
    },
    set: function set(url) {
      return this.swithURL(url);
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);

  return FlvVodPlayer;
}(Player);

export default FlvVodPlayer;