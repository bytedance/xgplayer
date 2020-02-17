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

      var util = _basePlugin2.default.Util;
      // let player = this
      var e = event || window.event;
      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
        player.emit('focus');
      }
      if (e && (e.keyCode === 40 || e.keyCode === 38)) {
        if (player.controls) {
          var volumeSlider = player.controls.querySelector('.xgplayer-slider');
          if (volumeSlider) {
            if (util.hasClass(volumeSlider, 'xgplayer-none')) {
              util.removeClass(volumeSlider, 'xgplayer-none');
            }
            if (player.sliderTimer) {
              clearTimeout(player.sliderTimer);
            }
            player.sliderTimer = setTimeout(function () {
              util.addClass(volumeSlider, 'xgplayer-none');
            }, player.config.inactive);
          }
        }
        if (e && e.keyCode === 40) {
          // 按 down
          if (player.volume - 0.1 >= 0) {
            player.volume = parseFloat((player.volume - 0.1).toFixed(1));
          } else {
            player.volume = 0;
          }
        } else if (e && e.keyCode === 38) {
          // 按 up
          if (player.volume + 0.1 <= 1) {
            player.volume = parseFloat((player.volume + 0.1).toFixed(1));
          } else {
            player.volume = 1;
          }
        }
      } else if (e && e.keyCode === 39) {
        // 按 right
        if (player.currentTime + 10 <= player.duration) {
          player.currentTime += 10;
        } else {
          player.currentTime = player.duration - 1;
        }
      } else if (e && e.keyCode === 37) {
        // 按 left
        if (player.currentTime - 10 >= 0) {
          player.currentTime -= 10;
        } else {
          player.currentTime = 0;
        }
      } else if (e && e.keyCode === 32) {
        // 按 spacebar
        if (player.paused) {
          // eslint-disable-next-line handle-callback-err
          player.play().catch(function (err) {});
        } else {
          player.pause();
        }
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
  }]);

  return Keyboard;
}(_basePlugin2.default);

exports.default = Keyboard;