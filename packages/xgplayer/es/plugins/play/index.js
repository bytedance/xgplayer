var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import PlaySvg from '../assets/play.svg';
import PauseSvg from '../assets/pause.svg';

var Events = Plugin.Events,
    POSITIONS = Plugin.POSITIONS,
    Sniffer = Plugin.Sniffer;

var Play = function (_Plugin) {
  _inherits(Play, _Plugin);

  function Play() {
    _classCallCheck(this, Play);

    return _possibleConstructorReturn(this, (Play.__proto__ || Object.getPrototypeOf(Play)).apply(this, arguments));
  }

  _createClass(Play, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player,
          config = this.config;

      if (config.disable) {
        return;
      }
      this.btnClick = this.btnClick.bind(this);
      var event = Sniffer.device === 'mobile' ? 'touchend' : 'click';
      this.bind(event, this.btnClick);

      this.on(Events.PAUSE, function () {
        _this2.animate(player.paused);
      });
      this.on(Events.PLAY, function () {
        _this2.animate(player.paused);
      });
    }
  }, {
    key: 'btnClick',
    value: function btnClick(e) {
      var player = this.player;

      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }

    // 扩展语言

  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'play': {
          jp: 'play',
          en: 'play',
          zh: '播放'
        },
        'pause': {
          jp: 'pause',
          en: 'pause',
          zh: '暂停'
        }
      };
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
    value: function animate(paused) {
      if (paused) {
        this.find('.xgplayer-icon').innerHTML = this.icons.play;
        this.find('.xg-tips').innerHTML = this.text.play;
      } else {
        this.find('.xgplayer-icon').innerHTML = this.icons.pause;
        this.find('.xg-tips').innerHTML = this.text.pause;
      }
      // const path = this.find('.path')
      // const pathPlay = this.find('.path_play').getAttribute('d')
      // const pathPause = this.find('.path_pause').getAttribute('d')
      // !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay)
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['touchend', 'click'], this.btnClick);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '<xg-icon class="xgplayer-play">\n    <div class="xgplayer-icon">\n    ' + this.icons.play + '\n    </div>\n    <div class="xg-tips">' + (this.player.paused ? this.text.play : this.text.pause) + '</div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Play';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 0,
        disable: false
      };
    }
  }]);

  return Play;
}(Plugin);

export default Play;