'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = _plugin2.default.Util;

var MiniScreen = function (_Plugin) {
  _inherits(MiniScreen, _Plugin);

  function MiniScreen() {
    _classCallCheck(this, MiniScreen);

    return _possibleConstructorReturn(this, (MiniScreen.__proto__ || Object.getPrototypeOf(MiniScreen)).apply(this, arguments));
  }

  _createClass(MiniScreen, [{
    key: 'afterCreate',
    value: function afterCreate() {
      this.getMini = this.getMini.bind(this);
      this.exitMini = this.exitMini.bind(this);
      this.bind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: 'getMini',
    value: function getMini() {
      var _this2 = this;

      var _player = this.player;
      // let ro = this.root.getBoundingClientRect()
      // let Top = ro.top
      // let Left = ro.left
      var dragLay = Util.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay');
      _player.root.appendChild(dragLay);
      var dragHandle = Util.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', { tabindex: 9 }, 'xgplayer-pip-drag');
      _player.root.appendChild(dragHandle);
      Util.addClass(this.root, 'xgplayer-pip-active');
      _player.root.style.right = 0;
      _player.root.style.bottom = '200px';
      _player.root.style.top = '';
      _player.root.style.left = '';
      _player.root.style.width = '320px';
      _player.root.style.height = '180px';
      if (_player.config.pipConfig) {
        if (_player.config.pipConfig.top !== undefined) {
          _player.root.style.top = _player.config.pipConfig.top + 'px';
          _player.root.style.bottom = '';
        }
        if (_player.config.pipConfig.bottom !== undefined) {
          _player.root.style.bottom = _player.config.pipConfig.bottom + 'px';
        }
        if (_player.config.pipConfig.left !== undefined) {
          _player.root.style.left = _player.config.pipConfig.left + 'px';
          _player.root.style.right = '';
        }
        if (_player.config.pipConfig.right !== undefined) {
          _player.root.style.right = _player.config.pipConfig.right + 'px';
        }
        if (_player.config.pipConfig.width !== undefined) {
          _player.root.style.width = _player.config.pipConfig.width + 'px';
        }
        if (_player.config.pipConfig.height !== undefined) {
          _player.root.style.height = _player.config.pipConfig.height + 'px';
        }
      }
      if (_player.config.fluid) {
        _player.root.style['padding-top'] = '';
      }
      ['click', 'touchend'].forEach(function (item) {
        dragLay.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          _this2.exitMini();
          // player.root.style.top = `${Top}px`
          // player.root.style.left = `${Left}px`
        });
      });
    }
  }, {
    key: 'exitMini',
    value: function exitMini() {
      var player = this.player;
      Util.removeClass(this.root, 'xgplayer-pip-active');
      player.root.style.right = '';
      player.root.style.bottom = '';
      player.root.style.top = '';
      player.root.style.left = '';
      if (player.config.fluid) {
        player.root.style['width'] = '100%';
        player.root.style['height'] = '0';
        player.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
      } else {
        if (player.config.width) {
          if (typeof this.config.width !== 'number') {
            player.root.style.width = player.config.width;
          } else {
            player.root.style.width = player.config.width + 'px';
          }
        }
        if (player.config.height) {
          if (typeof player.config.height !== 'number') {
            player.root.style.height = player.config.height;
          } else {
            player.root.style.height = player.config.height + 'px';
          }
        }
      }

      var dragLay = Util.findDom(player.root, '.xgplayer-pip-lay');
      if (dragLay && dragLay.parentNode) {
        dragLay.parentNode.removeChild(dragLay);
      }
      var dragHandle = Util.findDom(player.root, '.xgplayer-pip-drag');
      if (dragHandle && dragHandle.parentNode) {
        dragHandle.parentNode.removeChild(dragHandle);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }

    // 扩展语言

  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'miniscreen': {
          jp: '日文text',
          en: 'miniscreen',
          zh: '小屏幕'
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.text.miniscreen;
      return '\n      <xg-icon class="xgplayer-miniicon">\n       <p class="name"><span>' + text + '</span></p>\n      </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'miniscreen';
    }
  }]);

  return MiniScreen;
}(_plugin2.default);

exports.default = MiniScreen;