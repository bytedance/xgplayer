'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _playPause = require('../../assets/playPause.svg');

var _playPause2 = _interopRequireDefault(_playPause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    POSITIONS = _plugin2.default.POSITIONS,
    ROOT_TYPES = _plugin2.default.ROOT_TYPES;

var PlayIcon = function (_Plugin) {
  _inherits(PlayIcon, _Plugin);

  function PlayIcon() {
    _classCallCheck(this, PlayIcon);

    return _possibleConstructorReturn(this, (PlayIcon.__proto__ || Object.getPrototypeOf(PlayIcon)).apply(this, arguments));
  }

  _createClass(PlayIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player;

      this.btnClick = this.btnClick.bind(this);
      this.bind(['touchend', 'click'], this.btnClick);

      this.on(Events.PAUSE, function () {
        _this2.find('.xg-tips').innerHTML = _this2.text.play;
        _this2.animate(player.paused);
      });
      this.on(Events.PLAY, function () {
        _this2.find('.xg-tips').innerHTML = _this2.text.pause;
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
        playIcon: _playPause2.default
      };
    }
  }, {
    key: 'animate',
    value: function animate(paused) {
      var path = this.find('.path');
      var pathPlay = this.find('.path_play').getAttribute('d');
      var pathPause = this.find('.path_pause').getAttribute('d');
      !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['touchend', 'click'], this.btnClick);
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class="xgplayer-play">\n    <div class="xgplayer-icon">\n    ' + this.icons.playIcon + '\n    </div>\n    <div class="xg-tips">' + (this.player.paused ? this.text.play : this.text.pause) + '</div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'PlayIcon';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.LEFT,
        rootType: ROOT_TYPES.CONTROLS,
        index: 0
      };
    }
  }]);

  return PlayIcon;
}(_plugin2.default);

exports.default = PlayIcon;