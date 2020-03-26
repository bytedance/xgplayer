'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    Util = _plugin2.default.Util;

var Enter = function (_Plugin) {
  _inherits(Enter, _Plugin);

  function Enter() {
    _classCallCheck(this, Enter);

    return _possibleConstructorReturn(this, (Enter.__proto__ || Object.getPrototypeOf(Enter)).apply(this, arguments));
  }

  _createClass(Enter, [{
    key: 'afterPlayerInit',
    value: function afterPlayerInit() {
      var _this2 = this;

      var player = this.player,
          playerConfig = this.playerConfig;

      if (!playerConfig.autoplay || !playerConfig.videoInit) {
        this.once(Events.CANPLAY, function () {
          _this2.isCanPlay = true;
        });
        this.on(Events.PLAY, function () {
          if (!_this2.isCanPlay) {
            player.addClass('xgplayer-is-enter');
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var innerHtml = this.config.innerHtml;

      var root = Util.createDom('xg-enter', '', {}, 'xgplayer-enter');

      if (innerHtml && innerHtml instanceof window.HTMLElement) {
        root.appendChild(innerHtml);
      } else if (innerHtml && typeof innerHtml === 'string') {
        root.innerHTML = innerHtml;
      } else {
        var barStr = '';
        for (var i = 1; i <= 12; i++) {
          barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
        }
        root.innerHTML = '<div class="xgplayer-enter-spinner">' + barStr + '</div>';
      }
      return root;
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'enter';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        innerHtml: '',
        logo: ''
      };
    }
  }]);

  return Enter;
}(_plugin2.default);

exports.default = Enter;