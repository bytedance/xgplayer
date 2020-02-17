'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _Plugin2 = require('../../Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorPlugin = function (_Plugin) {
  _inherits(ErrorPlugin, _Plugin);

  function ErrorPlugin() {
    _classCallCheck(this, ErrorPlugin);

    return _possibleConstructorReturn(this, (ErrorPlugin.__proto__ || Object.getPrototypeOf(ErrorPlugin)).apply(this, arguments));
  }

  _createClass(ErrorPlugin, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.bind('.xgplayer-error-refresh', 'click', function (e) {
        e.preventDefault();
        _this2.player.replay();
        _Plugin3.default.Util.removeClass(_this2.player.root, 'replay');
      });
      this.on(_xgplayer2.default.Events.CANPLAY, this.handleCanPlay.bind(this));
      this.on(_xgplayer2.default.Events.ERROR, this.handleError.bind(this));
    }
  }, {
    key: 'handleCanPlay',
    value: function handleCanPlay() {
      _Plugin3.default.Util.removeClass(this.player.root, 'xgplayer-is-error');
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var player = this.player;

      var textDOM = this.find('.xgplayer-error-text');
      if (player.error) {
        textDOM.innerHTML = player.error;
      } else {
        if (player.config.lang && player.config.lang === 'zh-cn') {
          textDOM.innerHTML = player.lang.ERROR;
        } else {
          this.el.innerHTML = player.lang.ERROR + '\uFF0Cplease try to <span class="xgplayer-error-refresh">refresh</span>';
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-error class="xgplayer-error">\n      <em class="xgplayer-error-text"></em>\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5\n    </xg-error>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'error';
    }
  }]);

  return ErrorPlugin;
}(_Plugin3.default);

exports.default = ErrorPlugin;