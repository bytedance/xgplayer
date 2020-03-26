var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Player from 'xgplayer';
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import HlsLiveController from './hls-live';
var HlsAllowedEvents = EVENTS.HlsAllowedEvents;
var REMUX_EVENTS = EVENTS.REMUX_EVENTS;

var BasePlugin = Player.BasePlugin,
    Events = Player.Events;

var HlsLivePlayer = function (_BasePlugin) {
  _inherits(HlsLivePlayer, _BasePlugin);

  _createClass(HlsLivePlayer, null, [{
    key: 'pluginName',
    get: function get() {
      return 'hlsLive';
    }
  }]);

  function HlsLivePlayer(options) {
    _classCallCheck(this, HlsLivePlayer);

    var _this = _possibleConstructorReturn(this, (HlsLivePlayer.__proto__ || Object.getPrototypeOf(HlsLivePlayer)).call(this, options));

    _this.played = false;
    _this.handleUrlChange = _this.handleUrlChange.bind(_this);
    _this.destroy = _this.destroy.bind(_this);
    _this.play = _this.play.bind(_this);
    _this._context = new Context(HlsAllowedEvents);
    return _this;
  }

  _createClass(HlsLivePlayer, [{
    key: 'beforePlayerInit',
    value: function beforePlayerInit() {
      var _this2 = this;

      var url = this.player.config.url;

      this.hls = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({ player: this.player, preloadTime: this.player.config.preloadTime });
      this._context.init();
      this.hls.load(url);
      this._initEvents();
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
    key: '_initEvents',
    value: function _initEvents() {
      var _this3 = this;

      this.hls.once(REMUX_EVENTS.INIT_SEGMENT, function () {
        BasePlugin.Util.addClass(_this3.root, 'xgplayer-is-live');
      });

      this.on(Events.URL_CHANGE, this.handleUrlChange);
      this.on(Events.DESTROY, this.destroy);
      this.on(Events.PLAY, this.play);
    }
  }, {
    key: 'handleUrlChange',
    value: function handleUrlChange(url) {
      var _this4 = this;

      this.hls.mse.destroy().then(function () {
        _this4.player.config.url = url;
        _this4._context.destroy();
        _this4._context = null;
        _this4.video.currentTime = 0;

        if (!_this4.paused) {
          _this4.pause();
          _this4.once('canplay', function () {
            _this4.play();
          });
        } else {
          _this4.play();
        }

        _this4.player.started = false;
        _this4.player.start();
      });
    }
  }, {
    key: 'play',
    value: function play() {
      var _this5 = this;

      if (this.played && this.player.played.length) {
        this.played = false;
        return this._destroy().then(function () {
          _this5._context = new Context(HlsAllowedEvents);
          _this5.player.hasStart = false;
          _this5.player.start();
          _this5.player.onWaiting();
          _this5.player.once('canplay', function () {
            _this5.player.play();
          });
        });
      }
      this.played = true;
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      var _this6 = this;

      return this.hls.mse.destroy().then(function () {
        _this6._context.destroy();
        _this6.hls = null;
        _this6._context = null;
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), '_destroy', this).call(this);
      this._context.destroy();
    }
  }]);

  return HlsLivePlayer;
}(BasePlugin);

export default HlsLivePlayer;