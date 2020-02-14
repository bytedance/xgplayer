'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events;

var ScreenShotIcon = function (_Plugin) {
  _inherits(ScreenShotIcon, _Plugin);

  function ScreenShotIcon() {
    _classCallCheck(this, ScreenShotIcon);

    return _possibleConstructorReturn(this, (ScreenShotIcon.__proto__ || Object.getPrototypeOf(ScreenShotIcon)).apply(this, arguments));
  }

  _createClass(ScreenShotIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.once(Events.READY, function () {
        _this2.show();
        _this2.onClickBtn = _this2.onClickBtn.bind(_this2);
        ['click', 'touchend'].forEach(function (event) {
          _this2.bind(event, _this2.onClickBtn);
        });
      });
    }
  }, {
    key: 'saveScreenShot',
    value: function saveScreenShot(data, filename) {
      var saveLink = document.createElement('a');
      saveLink.href = data;
      saveLink.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      saveLink.dispatchEvent(event);
    }
  }, {
    key: 'createCanvans',
    value: function createCanvans() {
      var canvas = document.createElement('canvas');
      this.canvasCtx = canvas.getContext('2d');
      this.canvas = canvas;
      canvas.width = this.config.width || 600;
      canvas.height = this.config.height || 337.5;
    }
  }, {
    key: 'onClickBtn',
    value: function onClickBtn(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('onClickBtn');
      if (!this.canvas) {
        this.createCanvans();
      }
      var img = new window.Image();
      this.canvasCtx.drawImage(this.player.video, 0, 0, this.canvas.width, this.canvas.height);
      var encoderOptions = this.config.quality;
      var type = this.config.type;
      var format = this.config.format;
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = this.canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream');
      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      this.emit('screenShot', screenShotImg);
      this.saveScreenShot(screenShotImg, '截图' + format);
      img.onload = function () {
        console.log('img.onload');
        img = null;
      };
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'screenshot': {
          jp: 'play',
          en: 'play',
          zh: '截图'
        }
      };
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'screenshotIcon': null
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-definition';
      return '\n      <xg-icon class="xgplayer-shot">\n      <div class="' + className + '">\n      ' + (this.icons.screenshotIcon ? '' + this.icons.screenshotIcon : '<span>' + this.text.screenshot + '</span>') + ' \n      </div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'ScreenShotIcon';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        quality: 0.92,
        type: 'image/png',
        format: '.png',
        width: 600,
        height: 337
      };
    }
  }]);

  return ScreenShotIcon;
}(_plugin2.default);

exports.default = ScreenShotIcon;