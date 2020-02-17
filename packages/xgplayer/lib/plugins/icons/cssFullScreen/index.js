'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _cssFullscreenChange = require('../../assets/cssFullscreenChange.svg');

var _cssFullscreenChange2 = _interopRequireDefault(_cssFullscreenChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    Util = _plugin2.default.Util;

var CssFullScreen = function (_Plugin) {
  _inherits(CssFullScreen, _Plugin);

  _createClass(CssFullScreen, null, [{
    key: 'pluginName',
    get: function get() {
      return 'cssFullscreen';
    }
  }]);

  function CssFullScreen(args) {
    _classCallCheck(this, CssFullScreen);

    var _this = _possibleConstructorReturn(this, (CssFullScreen.__proto__ || Object.getPrototypeOf(CssFullScreen)).call(this, args));

    _this.isCssfullScreen = false;
    return _this;
  }

  _createClass(CssFullScreen, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.on(Events.READY, function () {
        _this2.btnClick = _this2.btnClick.bind(_this2);
        _this2.bind(['click', 'touchend'], _this2.btnClick);
      });
    }
  }, {
    key: 'btnClick',
    value: function btnClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.isCssfullScreen) {
        this.getCssFullscreen();
      } else {
        this.exitCssFullscreen();
      }
      this.animate(this.isCssfullScreen);
      this.emit(Events.CSS_FULLSCREEN_CHANGE, this.isCssfullScreen);
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
    key: 'getCssFullscreen',
    value: function getCssFullscreen() {
      var player = this.player;

      if (player.config.fluid) {
        player.root.style['padding-top'] = '';
      }
      Util.addClass(player.root, 'xgplayer-is-cssfullscreen');
      this.isCssfullScreen = true;
      player.emit('cssFullscreen_change', this.isCssfullScreen);
    }
  }, {
    key: 'exitCssFullscreen',
    value: function exitCssFullscreen() {
      var player = this.player;

      if (player.config.fluid) {
        player.root.style['width'] = '100%';
        player.root.style['height'] = '0';
        player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
      }
      Util.removeClass(player.root, 'xgplayer-is-cssfullscreen');
      this.isCssfullScreen = false;
      player.emit('cssFullscreen_change', this.isCssfullScreen);
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        cssFullscreen: _cssFullscreenChange2.default
      };
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'cssFullscreen': {
          jp: 'Cssfullscreen',
          en: 'Cssfullscreen',
          zh: '进入样式全屏'
        },
        exitCssFullscreen: {
          jp: 'Exit cssfullscreen',
          en: 'Exit cssfullscreen',
          zh: '退出样式全屏'
        }
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.btnClick);
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class=\'xgplayer-cssfullscreen\'>\n    <div class="xgplayer-icon">\n    ' + this.icons.cssFullscreen + '\n    </div>\n    <div class="xg-tips">' + (this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen) + '</div>\n    </xg-icon>';
    }
  }]);

  return CssFullScreen;
}(_plugin2.default);

exports.default = CssFullScreen;