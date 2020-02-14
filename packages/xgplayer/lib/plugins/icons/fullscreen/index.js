'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _fullscreenChange = require('../../assets/fullscreenChange.svg');

var _fullscreenChange2 = _interopRequireDefault(_fullscreenChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events;

var Fullscreen = function (_Plugin) {
  _inherits(Fullscreen, _Plugin);

  function Fullscreen() {
    _classCallCheck(this, Fullscreen);

    return _possibleConstructorReturn(this, (Fullscreen.__proto__ || Object.getPrototypeOf(Fullscreen)).apply(this, arguments));
  }

  _createClass(Fullscreen, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player;

      ['click', 'touchend'].forEach(function (event) {
        _this2.bind(event, function () {
          if (player.fullscreen) {
            player.exitFullscreen();
          } else {
            player.getFullscreen();
          }
        });
      });

      this.on(Events.FULLSCREEN_CHANGE, function (isFullScreen) {
        _this2.find('.xg-tips').innerHTML = isFullScreen ? _this2.text.exitFullscreen : _this2.text.fullscreen;
        _this2.animate(isFullScreen);
      });
    }
  }, {
    key: 'animate',
    value: function animate(isFullScreen) {
      var path = this.find('.path');
      var full = this.find('.path_full').getAttribute('d');
      var exit = this.find('.path_exitfull').getAttribute('d');
      isFullScreen ? path.setAttribute('d', exit) : path.setAttribute('d', full);
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        fullscreen: {
          jp: 'フルスクリーン',
          en: 'Fullscreen',
          zh: '进入全屏'
        },
        exitFullscreen: {
          jp: 'フルスクリーン',
          en: 'Exit fullscreen',
          zh: '退出全屏'
        }
      };
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        fullscreenChange: _fullscreenChange2.default
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class="xgplayer-fullscreen">\n    <div class="xgplayer-icon">\n    ' + this.icons.fullscreenChange + '\n    </div>\n    <div class="xg-tips">' + (this.player.isFullScreen ? this.text.exitFullscreen : this.text.fullscreen) + '</div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'fullscreen';
    }
  }]);

  return Fullscreen;
}(_plugin2.default);

exports.default = Fullscreen;