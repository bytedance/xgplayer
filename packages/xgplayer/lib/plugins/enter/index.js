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

var EnterPlugin = function (_Plugin) {
  _inherits(EnterPlugin, _Plugin);

  function EnterPlugin() {
    _classCallCheck(this, EnterPlugin);

    return _possibleConstructorReturn(this, (EnterPlugin.__proto__ || Object.getPrototypeOf(EnterPlugin)).apply(this, arguments));
  }

  _createClass(EnterPlugin, [{
    key: 'render',
    value: function render() {
      var barStr = '';
      for (var i = 1; i <= 12; i++) {
        barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
      }

      return '<xg-enter class="xgplayer-enter"><div class="xgplayer-enter-spinner">\n      ' + barStr + '\n    </div></xg-enter>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'index.scss';
    }
  }]);

  return EnterPlugin;
}(_plugin2.default);

exports.default = EnterPlugin;