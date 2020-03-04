'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
    key: 'afterCreate',
    value: function afterCreate() {
      this.onKeydown = this.onKeydown.bind(this);
      this.player.root.addEventListener('keydown', this.onKeydown);
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(event) {
      var player = this.player;
      var e = event || window.event;
      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
        player.emit('focus');
      }
      var keyCode = e && e.keyCode;
      console.log('keyCode', keyCode);
      if (keyCode === 40 || keyCode === 38) {
        console.log('切换声音');
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
      switch (keyCode) {
        // down
        case 40:
          if (player.volume - 0.1 >= 0) {
            player.volume = parseFloat((player.volume - 0.1).toFixed(1));
          } else {
            player.volume = 0;
          }
          break;
        // up
        case 38:
          if (player.volume + 0.1 <= 1) {
            player.volume = parseFloat((player.volume + 0.1).toFixed(1));
          } else {
            player.volume = 1;
          }
          break;
        // right
        case 39:
          if (player.currentTime + this.config.seekStep <= player.duration) {
            player.currentTime += this.config.seekStep;
          } else {
            player.currentTime = player.duration - 1;
          }
          break;
        // left
        case 37:
          if (player.currentTime - this.config.seekStep >= 0) {
            player.currentTime -= this.config.seekStep;
          } else {
            player.currentTime = 0;
          }
          break;
        // tab
        case 32:
          if (player.paused) {
            // eslint-disable-next-line handle-callback-err
            player.play().catch(function (err) {});
          } else {
            player.pause();
          }
          break;
        default:
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      _get(Keyboard.prototype.__proto__ || Object.getPrototypeOf(Keyboard.prototype), '_destroy', this).call(this);
      this.player.root.removeEventListener('keydown', this.onKeydown);
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
        seekStep: 10
      };
    }
  }]);

  return Keyboard;
}(_basePlugin2.default);

exports.default = Keyboard;