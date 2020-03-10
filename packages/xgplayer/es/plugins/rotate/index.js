var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import RotateSvg from '../assets/rotate.svg';

var POSITIONS = Plugin.POSITIONS;

var Rotate = function (_Plugin) {
  _inherits(Rotate, _Plugin);

  _createClass(Rotate, null, [{
    key: 'pluginName',
    get: function get() {
      return 'rotate';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 6,
        innerRotate: false, // true为只有画面旋转，false为整个播放器旋转
        clockwise: false,
        rotateDeg: 0, // 初始旋转角度
        disable: false
      };
    }
  }]);

  function Rotate(args) {
    _classCallCheck(this, Rotate);

    var _this = _possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).call(this, args));

    _this.rotateDeg = _this.config.rotateDeg || 0;
    return _this;
  }

  _createClass(Rotate, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.rotate === 'boolean') {
        args.config.disable = !args.player.config.rotate;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      if (this.config.disable) {
        return;
      }
      this.onBtnClick = this.onBtnClick.bind(this);
      this.bind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick);
    }
  }, {
    key: 'onBtnClick',
    value: function onBtnClick(e) {
      this.rotate(this.config.clockwise, this.config.innerRotate, 1);
    }
  }, {
    key: 'updateRotateDeg',
    value: function updateRotateDeg() {
      var player = this.player;
      if (!this.rotateDeg) {
        this.rotateDeg = 0;
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
      if (this.rotateDeg === 0.25 || this.rotateDeg === 0.75) {
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
        player.video.style.transform = 'rotate(' + this.rotateDeg + 'turn) scale(' + scale + ')';
        player.video.style.webKitTransform = 'rotate(' + this.rotateDeg + 'turn) scale(' + scale + ')';
      } else {
        player.root.style.transformOrigin = 'center center';
        player.root.style.transform = 'rotate(' + this.rotateDeg + 'turn) scale(' + 1 + ')';
        player.root.style.webKitTransform = 'rotate(' + this.rotateDeg + 'turn) scale(' + 1 + ')';
      }
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var innerRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var player = this.player;
      if (!this.rotateDeg) {
        this.rotateDeg = 0;
      }
      var factor = clockwise ? 1 : -1;

      this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1;
      this.updateRotateDeg();
      player.emit('rotate', this.rotateDeg * 360);
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'rotate': RotateSvg
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
      if (this.config.disable) {
        return;
      }
      return '\n    <xg-icon class="xgplayer-rotate">\n      <div class="xgplayer-icon">\n        ' + this.icons.rotate + '\n      </div>\n      <div class="xg-tips">\n      ' + this.text.rotate + '\n      </div>\n    </xg-icon>';
    }
  }]);

  return Rotate;
}(Plugin);

export default Rotate;