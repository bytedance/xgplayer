'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _rotate = require('../../assets/rotate.svg');

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rotate = function (_Plugin) {
  _inherits(Rotate, _Plugin);

  function Rotate() {
    _classCallCheck(this, Rotate);

    return _possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).apply(this, arguments));
  }

  _createClass(Rotate, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.updateRotateDeg = this.updateRotateDeg.bind(this);
      this.rotate = this.rotate.bind(this);
      ['click', 'touchend'].forEach(function (event) {
        _this2.bind('.xgplayer-icon', event, _this2.rotate);
      });
      // this.bind('.xgplayer-icon', 'click', this.rotate)
      // this.bind('.xgplayer-icon', 'touchend', this.rotate)
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      var _this3 = this;

      ['click', 'touchend'].forEach(function (event) {
        _this3.unbind('.xgplayer-icon', event, _this3.rotate);
      });
      // this.unbind('.xgplayer-icon', 'click', this.rotate)
      // this.unbind('.xgplayer-icon', 'touchend', this.rotate)
      _get(Rotate.prototype.__proto__ || Object.getPrototypeOf(Rotate.prototype), '_destroy', this).call(this);
    }
  }, {
    key: 'updateRotateDeg',
    value: function updateRotateDeg() {
      var player = this.player;
      if (!player.rotateDeg) {
        player.rotateDeg = 0;
      }

      var width = player.root.offsetWidth;
      var height = player.root.offsetHeight;
      var targetWidth = player.video.videoWidth;
      var targetHeight = player.video.videoHeight;

      if (!this.config.innerRotate) {
        // player.root.style.width = height + 'px'
        // player.root.style.height = width + 'px'
      }

      var scale = void 0;
      if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
        if (this.config.innerRotate) {
          if (targetWidth / targetHeight > height / width) {
            // 旋转后纵向撑满
            var videoWidth = 0;
            if (targetHeight / targetWidth > height / width) {
              // 旋转前是纵向撑满
              videoWidth = height * targetWidth / targetHeight;
            } else {
              // 旋转前是横向撑满
              videoWidth = width;
            }
            scale = height / videoWidth;
          } else {
            // 旋转后横向撑满
            var videoHeight = 0;
            if (targetHeight / targetWidth > height / width) {
              // 旋转前是纵向撑满
              videoHeight = height;
            } else {
              // 旋转前是横向撑满
              videoHeight = width * targetHeight / targetWidth;
            }
            scale = width / videoHeight;
          }
        } else {
          if (width >= height) {
            scale = width / height;
          } else {
            scale = height / width;
          }
        }
        scale = parseFloat(scale.toFixed(5));
      } else {
        scale = 1;
      }

      if (this.config.innerRotate) {
        player.video.style.transformOrigin = 'center center';
        player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
        player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
      } else {
        player.root.style.transformOrigin = 'center center';
        player.root.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
        player.root.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
      }
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var innerRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var player = this.player;
      if (!player.rotateDeg) {
        player.rotateDeg = 0;
      }
      var factor = clockwise ? 1 : -1;

      player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1;
      this.updateRotateDeg();

      player.emit('rotate', player.rotateDeg * 360);
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'rotate': _rotate2.default
      };
    }

    // 扩展语言

  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'rotate': {
          jp: '日文text',
          en: 'rotate',
          zh: '旋转屏幕'
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n    <xg-icon class="xgplayer-rotate">\n      <div class="xgplayer-icon">\n        ' + _rotate2.default + '\n      </div>\n      <div class="xg-tips">\n      ' + this.text.rotate + '\n      </div>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'rotate';
    }
  }]);

  return Rotate;
}(_plugin2.default);

exports.default = Rotate;