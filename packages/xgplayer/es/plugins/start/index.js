var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import pasition from 'pasition';
import Plugin from '../../plugin';
import StartIcon from '../assets/start.svg';

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
        // this.setInterval()
        _this2.animate();
      });
      this.on(Events.AUTOPLAY_PREVENTED, function () {
        _this2.show('inline-block');
        // this.clearInterval()
        _this2.animate(true);
      });
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'start': StartIcon
      };
    }
  }, {
    key: 'animate',
    value: function animate(isShowEnded) {
      var _this3 = this;

      var path = this.find('.path');
      var pathPlay = this.find('.path_play').getAttribute('d');
      var pathPause = this.find('.path_pause').getAttribute('d');
      var paused = this.player.paused;
      pasition.animate({
        from: path.getAttribute('d'),
        to: paused ? pathPause : pathPlay,
        time: 400,
        begin: function begin(shapes) {
          _this3.show();
          Util.addClass(_this3.el, 'interact');
        },
        end: function end(shapes) {
          Util.removeClass(_this3.el, 'interact');
          if (!_this3.player.paused) {
            _this3.hide();
            path.setAttribute('d', pathPause);
          } else {
            !_this3.config.isShowPause && !isShowEnded && _this3.hide();
            path.setAttribute('d', pathPlay);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n    <xg-start class="xgplayer-start" >\n      ' + this.icons.start + '\n    </xg-start>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'startplugin';
    }
  }]);

  return Start;
}(Plugin);

export default Start;