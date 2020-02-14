'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _playNext = require('../../assets/playNext.svg');

var _playNext2 = _interopRequireDefault(_playNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 下一个按钮组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// const { Events } = Plugin
var PlayNextIcon = function (_Plugin) {
  _inherits(PlayNextIcon, _Plugin);

  function PlayNextIcon() {
    _classCallCheck(this, PlayNextIcon);

    return _possibleConstructorReturn(this, (PlayNextIcon.__proto__ || Object.getPrototypeOf(PlayNextIcon)).apply(this, arguments));
  }

  _createClass(PlayNextIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var playerConfig = this.playerConfig;

      console.log('playerConfig', playerConfig);
      if (this.config.url) {
        this.initEvents();
      }
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.playNext = this.playNext.bind(this);
      this.bind(['touchend', 'click'], this.playNext);
      this.show();
    }
  }, {
    key: 'playNext',
    value: function playNext() {
      // TODO 根据配置信息进行下一个视频的切换 或者 根据参数中的回调函数进行调用
      this.emit('playNext');
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        playNext: _playNext2.default
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n     <xg-icon class="xgplayer-playnext">\n      <div class="xgplayer-icon">\n        ' + this.icons.playNext + '\n      </div>\n     </xg-icon>\n    ';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'PlayNextIcon';
    }
  }]);

  return PlayNextIcon;
}(_plugin2.default);

exports.default = PlayNextIcon;