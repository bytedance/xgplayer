var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Player from 'xgplayer';
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import { debounce } from 'xgplayer-utils';
import HlsVodController from './hls-vod';

var Events = Player.Events,
    BasePlugin = Player.BasePlugin;


var HlsAllowedEvents = EVENTS.HlsAllowedEvents;
var REMUX_EVENTS = EVENTS.REMUX_EVENTS;
var HLS_EVENTS = EVENTS.HLS_EVENTS;
var MSE_EVENTS = EVENTS.MSE_EVENTS;

var HlsVodPlayer = function (_BasePlugin) {
  _inherits(HlsVodPlayer, _BasePlugin);

  _createClass(HlsVodPlayer, null, [{
    key: 'pluginName',
    get: function get() {
      return 'hlsVod';
    }
  }]);

  function HlsVodPlayer(options) {
    _classCallCheck(this, HlsVodPlayer);

    var _this = _possibleConstructorReturn(this, (HlsVodPlayer.__proto__ || Object.getPrototypeOf(HlsVodPlayer)).call(this, options));

    _this._handleSetCurrentTime = debounce(_this._handleSetCurrentTime.bind(_this), 200);
    _this.destroy = _this.destroy.bind(_this);
    _this.handleUrlChange = _this.handleUrlChange.bind(_this);
    return _this;
  }

  _createClass(HlsVodPlayer, [{
    key: 'beforePlayerInit',
    value: function beforePlayerInit() {
      var _this2 = this;

      if (!this._context) {
        this._context = new Context(HlsAllowedEvents);
      }
      this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)({ player: this.player, preloadTime: this.player.config.preloadTime });
      this._context.init();
      this.hls.load(this.player.config.url);
      this.__initEvents();

      try {
        BasePlugin.defineGetterOrSetter(this.player, {
          '__url': {
            get: function get() {
              return _this2.hls.mse.url;
            }
          }
        });
      } catch (e) {
        // NOOP
      }
    }
  }, {
    key: 'handleUrlChange',
    value: function handleUrlChange(url) {
      var _this3 = this;

      this.hls.mse.destroy().then(function () {
        _this3.player.config.url = url;
        _this3._context.destroy();
        _this3._context = null;
        _this3.player.started = false;
        _this3.video.currentTime = 0;

        if (!_this3.paused) {
          _this3.pause();
          _this3.once('canplay', function () {
            _this3.play();
          });
        } else {
          _this3.play();
        }
        _this3.player.start();
      });
    }
  }, {
    key: '_handleSetCurrentTime',
    value: function _handleSetCurrentTime(time) {
      time = parseFloat(time);
      if (this._context) {
        this.hls.seek(time);
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this4 = this;

      return this.player.play().catch(function (e) {
        if (e && e.code === 20) {
          // fix: chrome The play() request was interrupted by a new load request.
          _this4.player.once('canplay', function () {
            _this4.player.play();
          });
        }
      });
    }
  }, {
    key: '__initEvents',
    value: function __initEvents() {
      var _this5 = this;

      this.hls.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, function () {
        _this5.emit('error', new Player.Errors('network', _this5.config.url));
      });

      this.hls.on(MSE_EVENTS.SOURCE_UPDATE_END, function () {
        _this5._onSourceUpdateEnd();
      });

      this.once('canplay', function () {
        if (_this5.config.autoplay) {
          _this5.play();
        }
      });

      this.on(Events.SEEKING, this._handleSetCurrentTime);
      this.on(Events.URL_CHANGE, this.handleUrlChange);
      this.on(Events.DESTROY, this.destroy);
    }
  }, {
    key: 'initHlsBackupEvents',
    value: function initHlsBackupEvents(hls, ctx) {
      var _this6 = this;

      hls.once(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, function () {
        _this6.hls = hls;
        _this6.hls.mse.cleanBuffers().then(function () {
          _this6.hls.mse.resetContext(ctx);
          _this6.hls.mse.doAppend();
          _this6._context.destroy();
          _this6._context = ctx;
        });
      });

      hls.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, function () {
        ctx.destroy();
      });
    }
  }, {
    key: '_onSourceUpdateEnd',
    value: function _onSourceUpdateEnd() {
      if (this.player.video.readyState === 1 || this.player.video.readyState === 2) {
        var _detectBufferGap = this.detectBufferGap(),
            gap = _detectBufferGap.gap,
            start = _detectBufferGap.start,
            method = _detectBufferGap.method;

        if (gap) {
          if (method === 'ceil' && this.player.currentTime < Math[method](start)) {
            this.player.currentTime = Math[method](start);
          } else if (method === 'floor' && this.player.currentTime > Math[method](start)) {
            this.player.currentTime = Math[method](start);
          }
        }
      }
    }
  }, {
    key: 'swithURL',
    value: function swithURL(url) {
      this.config.url = url;
      var context = new Context(HlsAllowedEvents);
      var hls = context.registry('HLS_VOD_CONTROLLER', HlsVodController)({
        player: this,
        container: this.video,
        mse: this.hls.mse,
        preloadTime: this.config.preloadTime
      });
      context.init();
      this.initHlsBackupEvents(hls, context);
      hls.load(url);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this7 = this;

      return new Promise(function (resolve) {
        if (_this7.hls.mse) {
          _this7.hls.mse.destroy().then(function () {
            if (_this7._context) {
              _this7._context.destroy();
            }
            _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'destroy', _this7).call(_this7);
            setTimeout(function () {
              resolve();
            }, 50);
          });
        } else {
          _get(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'destroy', _this7).call(_this7);
          setTimeout(function () {
            resolve();
          }, 50);
        }
      });
    }
  }, {
    key: 'detectBufferGap',
    value: function detectBufferGap() {
      var video = this.player.video;

      var result = {
        gap: false,
        start: -1
      };
      for (var i = 0; i < video.buffered.length; i++) {
        var bufferStart = video.buffered.start(i);
        var bufferEnd = video.buffered.end(i);
        if (!video.played.length || bufferStart <= this.currentTime && bufferEnd - this.currentTime >= 0.5) {
          break;
        }
        var startGap = bufferStart - this.currentTime;
        var endGap = this.currentTime - bufferEnd;
        if (startGap > 0.01 && startGap <= 2) {
          result = {
            gap: true,
            start: bufferStart,
            method: 'ceil'
          };
          break;
        } else if (endGap > 0.1 && endGap <= 2) {
          result = {
            gap: true,
            start: bufferEnd,
            method: 'floor'
          };
        } else {
          result = {
            gap: false,
            start: -1
          };
        }
      }

      return result;
    }
  }]);

  return HlsVodPlayer;
}(BasePlugin);

export default HlsVodPlayer;