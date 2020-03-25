'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _requestCssFull = require('../assets/requestCssFull.svg');

var _requestCssFull2 = _interopRequireDefault(_requestCssFull);

var _exitCssFull = require('../assets/exitCssFull.svg');

var _exitCssFull2 = _interopRequireDefault(_exitCssFull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    POSITIONS = _plugin2.default.POSITIONS;

var CssFullScreen = function (_Plugin) {
  _inherits(CssFullScreen, _Plugin);

  function CssFullScreen() {
    _classCallCheck(this, CssFullScreen);

    return _possibleConstructorReturn(this, (CssFullScreen.__proto__ || Object.getPrototypeOf(CssFullScreen)).apply(this, arguments));
  }

  _createClass(CssFullScreen, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.cssFullscreen === 'boolean') {
        args.config.disable = !args.player.config.cssFullscreen;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.initIcons();
      this.on(Events.CSS_FULLSCREEN_CHANGE, function (isCssfullScreen) {
        _this2.animate(isCssfullScreen);
      });
      // 退出全屏的时候会同时退出网页全屏
      this.on(Events.FULLSCREEN_CHANGE, function (isFullScreen) {
        !isFullScreen && _this2.animate(isFullScreen);
      });
    }
  }, {
    key: 'initIcons',
    value: function initIcons() {
      var icons = this.icons;

      var contentIcon = this.find('.xgplayer-icon');
      contentIcon.appendChild(icons.cssFullscreen);
      contentIcon.appendChild(icons.exitCssFullscreen);
    }
  }, {
    key: 'afterPlayerInit',
    value: function afterPlayerInit() {
      this.btnClick = this.btnClick.bind(this);
      this.bind(['click', 'touchend'], this.btnClick);
    }
  }, {
    key: 'btnClick',
    value: function btnClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.player.isCssfullScreen) {
        this.player.getCssFullscreen();
      } else {
        this.player.exitCssFullscreen();
      }
    }
  }, {
    key: 'animate',
    value: function animate(isFullScreen) {
      if (!this.root) {
        return;
      }
      // const path = this.find('.path')
      // const full = this.find('.path_full').getAttribute('d')
      // const exit = this.find('.path_exitfull').getAttribute('d')
      isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal');
    }
  }, {
    key: 'switchTips',
    value: function switchTips() {
      this.find('.xg-tips').innerHTML = this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen;
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        cssFullscreen: { icon: _requestCssFull2.default, class: 'xg-get-cssfull' },
        exitCssFullscreen: { icon: _exitCssFull2.default, class: 'xg-exit-cssfull' }
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
      if (!this.playerConfig.cssFullscreen) {
        return;
      }
      return '<xg-icon class=\'xgplayer-cssfullscreen\'>\n    <div class="xgplayer-icon">\n    </div>\n    <div class="xg-tips">' + (this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen) + '</div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'cssFullscreen';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 1,
        disable: false
      };
    }
  }]);

  return CssFullScreen;
}(_plugin2.default);

exports.default = CssFullScreen;