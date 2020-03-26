var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import PlaySvg from '../assets/play.svg';
import PauseSvg from '../assets/pause.svg';

var AnimateMap = {};
function addAnimate(key, seconds) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { start: null, end: null };

  if (AnimateMap[key]) {
    window.clearTimeout(AnimateMap[key].id);
  }
  AnimateMap[key] = {};
  callback.start && callback.start();
  AnimateMap[key].id = window.setTimeout(function () {
    callback.end && callback.end();
    window.clearTimeout(AnimateMap[key].id);
    delete AnimateMap[key];
  }, seconds);
}

var Util = Plugin.Util,
    Events = Plugin.Events,
    Sniffer = Plugin.Sniffer;

var Start = function (_Plugin) {
  _inherits(Start, _Plugin);

  function Start() {
    _classCallCheck(this, Start);

    return _possibleConstructorReturn(this, (Start.__proto__ || Object.getPrototypeOf(Start)).apply(this, arguments));
  }

  _createClass(Start, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player,
          playerConfig = this.playerConfig;

      this.initIcons();
      if (Sniffer.device === 'mobile') {
        this.config.isShowPause = true;
      }
      this.once(Events.READY, function () {
        if (playerConfig) {
          if (playerConfig.lang && playerConfig.lang === 'en') {
            Util.addClass(player.root, 'lang-is-en');
          } else if (playerConfig.lang === 'jp') {
            Util.addClass(player.root, 'lang-is-jp');
          }
        }
      });

      if (!playerConfig.autoplay) {
        this.show();
      }

      this.onClick = this.onClick.bind(this);

      this.bind('click', this.onClick);

      this.on([Events.PLAY, Events.PAUSE], function () {
        _this2.player.isPlaying ? _this2.animate() : _this2.hide();
      });
      this.on(Events.AUTOPLAY_PREVENTED, function () {
        _this2.show();
      });
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        startPlay: { icon: PlaySvg, class: 'xg-icon-play' },
        startPause: { icon: PauseSvg, class: 'xg-icon-pause' }
      };
    }
  }, {
    key: 'initIcons',
    value: function initIcons() {
      var icons = this.icons;

      this.appendChild('.icon', icons.startPlay);
      this.appendChild('.icon', icons.startPause);
    }
  }, {
    key: 'animate',
    value: function animate(isEnded) {
      var _this3 = this;

      if (this.config.isShowPause && this.player.paused && !this.player.ended || this.player.ended || isEnded) {
        if (this.player.ended && !this.config.isShowEnd) {
          return;
        }
        this.show();
        this.setAttr('data-state', this.player.paused ? 'pause' : 'play');
        return;
      }
      if (this.player.disableAmimate) {
        return;
      }
      addAnimate('pauseplay', 400, {
        start: function start() {
          Util.addClass(_this3.root, 'interact');
          _this3.show();
          _this3.setAttr('data-state', _this3.player.paused ? 'pause' : 'play');
        },
        end: function end() {
          Util.removeClass(_this3.root, 'interact');
          if (_this3.config.isShowPause && (_this3.player.paused || isEnded)) {
            return;
          }
          _this3.hide();
        }
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      var player = this.player;

      e.preventDefault();
      e.stopPropagation();
      if (!player.isReady) {
        return;
      }
      var paused = this.player.paused;
      if (!player.hasStart) {
        player.start();
        player.once('complete', function () {
          player.play();
        });
      } else {
        if (!paused) {
          player.pause();
        } else {
          player.play();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind('click', this.onClick);
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n    <xg-start class="xgplayer-start" >\n      <div class="icon">\n      </div>\n    </xg-start>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'start';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        isShowPause: false,
        isShowEnd: false,
        disableAmimate: false
      };
    }
  }]);

  return Start;
}(Plugin);

export default Start;