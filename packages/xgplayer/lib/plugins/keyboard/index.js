'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basePlugin = require('../../plugin/basePlugin');

var _basePlugin2 = _interopRequireDefault(_basePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keyboard = function (_BasePlugin) {
  _inherits(Keyboard, _BasePlugin);

  function Keyboard() {
    _classCallCheck(this, Keyboard);

    return _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).apply(this, arguments));
  }

  _createClass(Keyboard, [{
    key: 'mergekeyCodeMap',
    value: function mergekeyCodeMap() {
      var _this2 = this;

      var extendkeyCodeMap = this.config.keyCodeMap;
      if (extendkeyCodeMap) {
        Object.keys(extendkeyCodeMap).map(function (key) {
          if (!_this2.keyCodeMap[key]) {
            _this2.keyCodeMap[key] = extendkeyCodeMap[key];
          } else {
            ['keyCode', 'action', 'disable', 'isBodyTarget'].map(function (key1) {
              extendkeyCodeMap[key][key1] && (_this2.keyCodeMap[key][key1] = extendkeyCodeMap[key][key1]);
            });
          }
        });
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      this.config.disable = !this.playerConfig.keyShortcut;
      this.seekStep = 10;
      this.keyCodeMap = {
        'space': {
          keyCode: 32,
          action: 'playPause',
          disable: false,
          noBodyTarget: false // 默认在body上触发
        },
        'up': {
          keyCode: 38,
          action: 'upVolume',
          disable: false
        },
        'down': {
          keyCode: 40,
          action: 'downVolume',
          disable: false
        },
        'left': {
          keyCode: 37,
          action: 'seekBack',
          disable: false
        },
        'right': {
          keyCode: 39,
          action: 'seek',
          disable: false
        },
        'esc': {
          keyCode: 27,
          action: 'exitFullscreen',
          disable: false
        }
      };
      this.mergekeyCodeMap();
      this.onKeydown = this.onKeydown.bind(this);
      this.onBodyKeyDown = this.onBodyKeyDown.bind(this);
      this.player.root.addEventListener('keydown', this.onKeydown);
      document.addEventListener('keydown', this.onBodyKeyDown);
    }
  }, {
    key: 'afterPlayerInit',
    value: function afterPlayerInit() {
      var seekStep = typeof this.config.seekStep === 'function' ? this.config.seekStep(this.player) : this.config.seekStep;
      if (!seekStep || typeof seekStep !== 'number') {
        this.seekStep = seekStep;
      }
    }
  }, {
    key: 'checkCode',
    value: function checkCode(code, isBodyTarget) {
      var _this3 = this;

      var flag = false;
      Object.keys(this.keyCodeMap).map(function (key) {
        if (_this3.keyCodeMap[key] && code === _this3.keyCodeMap[key].keyCode) {
          flag = !isBodyTarget || isBodyTarget && !_this3.keyCodeMap[key].noBodyTarget;
        }
      });
      return flag;
    }
  }, {
    key: 'downVolume',
    value: function downVolume() {
      var player = this.player;

      if (player.volume - 0.1 >= 0) {
        player.volume = parseFloat((player.volume - 0.1).toFixed(1));
      } else {
        player.volume = 0;
      }
    }
  }, {
    key: 'upVolume',
    value: function upVolume() {
      var player = this.player;

      if (player.volume + 0.1 <= 1) {
        player.volume = parseFloat((player.volume + 0.1).toFixed(1));
      } else {
        player.volume = 1;
      }
    }
  }, {
    key: 'seek',
    value: function seek() {
      var player = this.player;

      if (player.currentTime + this.seekStep <= player.duration) {
        player.currentTime += this.seekStep;
      } else {
        player.currentTime = player.duration - 1;
      }
    }
  }, {
    key: 'seekBack',
    value: function seekBack() {
      var player = this.player;

      if (player.currentTime - this.seekStep >= 0) {
        player.currentTime -= this.seekStep;
      } else {
        player.currentTime = 0;
      }
    }
  }, {
    key: 'playPause',
    value: function playPause() {
      var player = this.player;

      if (player.paused) {
        // eslint-disable-next-line handle-callback-err
        player.play().catch(function (err) {});
      } else {
        player.pause();
      }
    }
  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen() {
      var player = this.player;

      if (player.fullscreen) {
        player.exitFullscreen();
      }
      if (player.isCssfullScreen) {
        player.exitCssFullscreen();
      }
    }

    // TODO: 多播放器实例存在的情况下，body下的快捷键会触发所有实例的逻辑，需改进

  }, {
    key: 'onBodyKeyDown',
    value: function onBodyKeyDown(event) {
      if (this.config.disable) {
        return;
      }
      var e = event || window.event;
      var keyCode = e.keyCode;
      if (e.target === document.body && this.checkCode(keyCode, true)) {
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        this.handleKeyCode(keyCode);
        return false;
      }
      return false;
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(event) {
      if (this.config.disable) {
        return;
      }
      var player = this.player;
      var e = event || window.event;
      if (e && (e.keyCode === 37 || this.checkCode(e.keyCode)) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
        player.emit('focus');
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
      } else {
        return true;
      }
      this.handleKeyCode(e.keyCode);
    }
  }, {
    key: 'handleKeyCode',
    value: function handleKeyCode(keyCode) {
      var _this4 = this;

      var player = this.player;

      if (keyCode === 40 || keyCode === 38) {
        if (player.controls) {
          // let volumeSlider = player.controls.querySelector('.xgplayer-slider')
          // if (volumeSlider) {
          //   if (Util.hasClass(volumeSlider, 'xgplayer-none')) {
          //     Util.removeClass(volumeSlider, 'xgplayer-none')
          //   }
          //   if (player.sliderTimer) {
          //     clearTimeout(player.sliderTimer)
          //   }
          //   player.sliderTimer = setTimeout(function () {
          //     Util.addClass(volumeSlider, 'xgplayer-none')
          //   }, player.config.inactive)
          // }
        }
      }
      Object.keys(this.keyCodeMap).map(function (key) {
        if (_this4.keyCodeMap[key].keyCode === keyCode && !_this4.keyCodeMap[key].disable) {
          if (typeof _this4.keyCodeMap[key].action === 'function') {
            _this4.keyCodeMap[key].action();
          } else if (typeof _this4.keyCodeMap[key].action === 'string') {
            var funKey = _this4.keyCodeMap[key].action;
            if (typeof _this4[funKey] === 'function') {
              _this4[funKey]();
            }
          }
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.player.root.removeEventListener('keydown', this.onKeydown);
      document.removeEventListener('keydown', this.onBodyKeyDown);
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Keyboard';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        seekStep: 10,
        keyCodeMap: {},
        disable: false
      };
    }
  }]);

  return Keyboard;
}(_basePlugin2.default);

exports.default = Keyboard;