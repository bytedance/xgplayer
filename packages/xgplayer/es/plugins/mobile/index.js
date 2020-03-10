var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';

var MobilePlugin = function (_Plugin) {
  _inherits(MobilePlugin, _Plugin);

  _createClass(MobilePlugin, null, [{
    key: 'pluginName',
    get: function get() {
      return 'mobile';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        index: 0
      };
    }
  }]);

  function MobilePlugin(options) {
    _classCallCheck(this, MobilePlugin);

    var _this = _possibleConstructorReturn(this, (MobilePlugin.__proto__ || Object.getPrototypeOf(MobilePlugin)).call(this, options));

    _this.isTouchMove = false;
    return _this;
  }

  _createClass(MobilePlugin, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player;

      player.video.addEventListener('touchend', function (e) {
        _this2.onTouchEnd(e);
      }, false);

      player.video.addEventListener('touchstart', function () {
        _this2.isTouchMove = false;
      });

      player.video.addEventListener('touchmove', function () {
        _this2.isTouchMove = true;
      });
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      e.preventDefault();
      var util = Plugin.Util;
      e.stopPropagation();
      var player = this.player,
          playerConfig = this.playerConfig;

      if (util.hasClass(player.root, 'xgplayer-inactive')) {
        player.emit('focus');
      } else {
        player.emit('blur');
      }
      if (!playerConfig.closeVideoTouch && !player.isTouchMove) {
        if (util.hasClass(player.root, 'xgplayer-nostart')) {
          return false;
        } else if (!player.ended) {
          if (player.paused) {
            var playPromise = player.play();
            if (playPromise !== undefined && playPromise) {
              playPromise.catch(function (err) {});
            }
          } else {
            player.pause();
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n     <xg-trigger></xg-trigger>\n    ';
    }
  }]);

  return MobilePlugin;
}(Plugin);

export default MobilePlugin;