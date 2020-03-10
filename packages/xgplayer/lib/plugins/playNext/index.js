'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _playNext = require('../assets/playNext.svg');

var _playNext2 = _interopRequireDefault(_playNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 下一个按钮组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import Next from '../assets/mPlayNext.svg';
// console.log(MPlayNext)
var POSITIONS = _plugin2.default.POSITIONS,
    Sniffer = _plugin2.default.Sniffer;

var PlayNextIcon = function (_Plugin) {
  _inherits(PlayNextIcon, _Plugin);

  _createClass(PlayNextIcon, null, [{
    key: 'pluginName',
    get: function get() {
      return 'PlayNext';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 1,
        url: null,
        urlList: []
      };
    }
  }]);

  function PlayNextIcon(options) {
    _classCallCheck(this, PlayNextIcon);

    var _this = _possibleConstructorReturn(this, (PlayNextIcon.__proto__ || Object.getPrototypeOf(PlayNextIcon)).call(this, options));

    _this.idx = -1;
    return _this;
  }

  _createClass(PlayNextIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      if (!this.config.urlList || this.config.urlList.length === 0) {
        return;
      }
      this.initEvents();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.playNext = this.playNext.bind(this);
      var event = Sniffer.device === 'mobile' ? 'touchend' : 'click';
      this.bind(event, this.playNext);
      this.show();
    }
  }, {
    key: 'playNext',
    value: function playNext() {
      var player = this.player;

      if (this.idx + 1 < this.config.urlList.length) {
        this.idx++;
        player.video.pause();
        player.currentTime = 0;
        player.video.autoplay = true;
        player.src = this.config.urlList[this.idx];
        player.emit('playerNext', this.idx + 1);
      } else {
        player.emit('urlList last');
      }
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        playNext: _playNext2.default
      };
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'playNext': {
          jp: 'play',
          en: 'play',
          zh: '播放'
        }
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['touchend', 'click'], this.playNext);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.config.urlList || this.config.urlList.length === 0) {
        return;
      }
      return '\n     <xg-icon class="xgplayer-playnext">\n      <div class="xgplayer-icon">\n        ' + this.icons.playNext + '\n      </div>\n      <div class="xg-tips">' + this.text.playNext + '</div>\n     </xg-icon>\n    ';
    }
  }]);

  return PlayNextIcon;
}(_plugin2.default);

exports.default = PlayNextIcon;