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
    Events = Plugin.Events;

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
          root = this.root,
          playerConfig = this.playerConfig;

      this.once(Events.READY, function () {
        if (playerConfig) {
          if (playerConfig.lang && playerConfig.lang === 'en') {
            Util.addClass(root, 'lang-is-en');
          } else if (playerConfig.lang === 'jp') {
            Util.addClass(root, 'lang-is-jp');
          }
        }
      });

      if (!player.config.autoplay) {
        this.show();
      }

      this.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!player.isReady) {
          return;
        }
        var paused = _this2.player.paused;
        if (!_this2.player.hasStart) {
          _this2.player.start();
          _this2.player.once('complete', function () {
            _this2.player.play();
          });
        } else {
          if (!paused) {
            _this2.player.pause();
          } else {
            _this2.player.play();
          }
        }
      });
      this.on([Events.PLAY, Events.PAUSE], function () {
        _this2.animate();
      });
      this.on(Events.AUTOPLAY_PREVENTED, function () {
        _this2.show('inline-block');
        _this2.animate(true);
      });
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        play: PlaySvg,
        pause: PauseSvg
      };
    }
  }, {
    key: 'animate',
    value: function animate(isShowEnded) {
      var _this3 = this;

      if (this.config.isShowPause && (isShowEnded || this.player.paused)) {
        this.show();
        this.root.innerHTML = this.icons.play;
        return;
      }
      addAnimate('pauseplay', 400, {
        start: function start() {
          Util.addClass(_this3.root, 'interact');
          _this3.show();
          _this3.root.innerHTML = _this3.player.paused ? _this3.icons.pause : _this3.icons.play;
        },
        end: function end() {
          Util.removeClass(_this3.root, 'interact');
          if (_this3.config.isShowPause && (_this3.player.paused || isShowEnded)) {
            return;
          }
          _this3.hide();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n    <xg-start class="xgplayer-start" >\n      <div class="play">\n      ' + this.icons.play + '\n      </div>\n    </xg-start>';
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
        isShowPause: false
      };
    }
  }]);

  return Start;
}(Plugin);

export default Start;