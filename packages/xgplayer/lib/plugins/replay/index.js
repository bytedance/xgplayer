'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _replay = require('../../skin/assets/replay.svg');

var _replay2 = _interopRequireDefault(_replay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Replay = function (_Plugin) {
  _inherits(Replay, _Plugin);

  function Replay() {
    _classCallCheck(this, Replay);

    return _possibleConstructorReturn(this, (Replay.__proto__ || Object.getPrototypeOf(Replay)).apply(this, arguments));
  }

  _createClass(Replay, [{
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'replay': _replay2.default
      };
    }

    // 扩展语言

  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'replay': {
          jp: '日文text',
          en: 'rePlay',
          zh: '重播'
        }
      };
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.bind('svg', 'click', function (e) {
        e.preventDefault();
        _this2.player.replay();
        _plugin2.default.Util.removeClass(_this2.player.root, 'replay');
      });

      this.on(_plugin2.default.Events.ENDED, function () {
        if (!_this2.playerConfig.loop) {
          _plugin2.default.Util.addClass(_this2.player.root, 'replay');
        }
        var path = _this2.el.querySelector('path');
        if (path) {
          var transform = window.getComputedStyle(path).getPropertyValue('transform');
          if (typeof transform === 'string' && transform.indexOf('none') > -1) {
            return null;
          } else {
            path.setAttribute('transform', transform);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-replay class="xgplayer-replay">\n      ' + this.icons.replay + '\n      <xg-replay-txt class="xgplayer-replay-txt">' + this.text.replay + '</xg-replay-txt>\n    </xg-replay>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Replay';
    }
  }]);

  return Replay;
}(_plugin2.default);

exports.default = Replay;