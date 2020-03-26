var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Player from 'xgplayer';
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-live';

var flvAllowedEvents = EVENTS.FlvAllowedEvents;
var BasePlugin = Player.BasePlugin,
    Events = Player.Events;

var FlvPlayer = function (_BasePlugin) {
  _inherits(FlvPlayer, _BasePlugin);

  _createClass(FlvPlayer, null, [{
    key: 'pluginName',
    get: function get() {
      return 'flvLive';
    }
  }]);

  function FlvPlayer(config) {
    _classCallCheck(this, FlvPlayer);

    var _this = _possibleConstructorReturn(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).call(this, config));

    _this.context = new Context(flvAllowedEvents);
    _this.loaderCompleteTimer = null;
    _this.play = _this.play.bind(_this);
    _this.pause = _this.pause.bind(_this);
    _this.destroy = _this.destroy.bind(_this);
    _this.switchURL = _this.switchURL.bind(_this);

    _this.played = false;
    _this.initEvents();
    return _this;
  }

  _createClass(FlvPlayer, [{
    key: 'beforePlayerInit',
    value: function beforePlayerInit() {
      var _this2 = this;

      this.initFlv();
      this.context.init();
      this.loadData();
      this.player.swithURL = this.swithURL;
      try {
        BasePlugin.defineGetterOrSetter(this.player, {
          '__url': {
            get: function get() {
              return _this2.mse.url;
            }
          }
        });
      } catch (e) {
        // NOOP
      }
    }
  }, {
    key: 'initFlvEvents',
    value: function initFlvEvents(flv) {
      var _this3 = this;

      var player = this.player;
      flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, function () {
        BasePlugin.Util.addClass(player.root, 'xgplayer-is-live');
      });

      flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!player.paused) {
          _this3.loaderCompleteTimer = setInterval(function () {
            var end = player.getBufferedRange()[1];
            if (Math.abs(player.currentTime - end) < 0.5) {
              player.emit('ended');
              window.clearInterval(_this3.loaderCompleteTimer);
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
      var _this4 = this;

      var mediaLength = 3;
      flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, function () {
        mediaLength -= 1;
        if (mediaLength === 0) {
          // ensure switch smoothly
          _this4.flv = flv;
          _this4.mse.resetContext(ctx);
          _this4.context.destroy();
          _this4.context = ctx;
        }
      });

      flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, function () {
        // 直播完成，待播放器播完缓存后发送关闭事件
        if (!_this4.paused) {
          _this4.loaderCompleteTimer = setInterval(function () {
            var end = _this4.getBufferedRange()[1];
            if (Math.abs(_this4.player.currentTime - end) < 0.5) {
              _this4.emit('ended');
              window.clearInterval(_this4.loaderCompleteTimer);
            }
          }, 200);
        } else {
          _this4.emit('ended');
        }
      });

      flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this5 = this;

      this.on('seeking', function () {
        var time = _this5.player.currentTime;
        var range = _this5.player.getBufferedRange();
        if (time > range[1] || time < range[0]) {
          _this5.flv.seek(_this5.player.currentTime);
        }
      });

      this.on(Events.PLAY, this.play);
      this.on(Events.PAUSE, this.pause);
      this.on(Events.DESTROY, this.destroy);
      this.on(Events.URL_CHANGE, this.switchURL);
    }
  }, {
    key: 'initFlv',
    value: function initFlv() {
      var flv = this.context.registry('FLV_CONTROLLER', FLV)(this.player);
      this.initFlvEvents(flv);
      this.player.flv = flv;
      this.flv = flv;
      this.mse = flv.mse;
      return flv;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this6 = this;

      if (this.played && this.player.played.length) {
        this.played = false;
        return this._destroy().then(function () {
          _this6.context = new Context(flvAllowedEvents);
          _this6.player.hasStart = false;
          _this6.player.start();
          _this6.player.onWaiting();
          _this6.player.once('canplay', function () {
            _this6.player.play();
          });
        });
      }
      this.played = true;
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.flv) {
        this.flv.pause();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.currentTime;

      if (this.player.flv) {
        this.player.flv.seek(time);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), '_destroy', this).call(this);
      return this._destroy();
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
      var context = new Context(flvAllowedEvents);
      var flv = context.registry('FLV_CONTROLLER', FLV)(this.player, this.mse);
      context.init();
      this.initFlvBackupEvents(flv, context);
      flv.loadData(url);
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);

  return FlvPlayer;
}(BasePlugin);

export default FlvPlayer;