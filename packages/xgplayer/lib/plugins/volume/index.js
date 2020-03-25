'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _volumeLarge = require('../assets/volumeLarge.svg');

var _volumeLarge2 = _interopRequireDefault(_volumeLarge);

var _volumeSmall = require('../assets/volumeSmall.svg');

var _volumeSmall2 = _interopRequireDefault(_volumeSmall);

var _volumeMuted = require('../assets/volumeMuted.svg');

var _volumeMuted2 = _interopRequireDefault(_volumeMuted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = _plugin2.default.Util,
    Events = _plugin2.default.Events,
    POSITIONS = _plugin2.default.POSITIONS;

var Volume = function (_Plugin) {
  _inherits(Volume, _Plugin);

  function Volume() {
    _classCallCheck(this, Volume);

    return _possibleConstructorReturn(this, (Volume.__proto__ || Object.getPrototypeOf(Volume)).apply(this, arguments));
  }

  _createClass(Volume, [{
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        volumeSmall: { icon: _volumeSmall2.default, class: 'xg-volume-small' },
        volumeLarge: { icon: _volumeLarge2.default, class: 'xg-volume' },
        volumeMuted: { icon: _volumeMuted2.default, class: 'xg-volume-mute' }
      };
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      if (this.config.disable) {
        return;
      }

      this.initIcons();

      this.changeMuted = this.changeMuted.bind(this);
      this.onBarMousedown = this.onBarMousedown.bind(this);
      this.onMouseenter = this.onMouseenter.bind(this);
      this.onMouseleave = this.onMouseleave.bind(this);

      this.bind('mouseenter', this.onMouseenter);

      this.bind(['blur', 'mouseleave'], this.onMouseleave);

      this.bind('.xgplayer-bar', 'mousedown', this.onBarMousedown);

      this.bind('.xgplayer-icon', ['click', 'touched'], this.changeMuted);

      this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this));
    }
  }, {
    key: 'onBarMousedown',
    value: function onBarMousedown(e) {
      var _this2 = this;

      var player = this.player;

      var drag = this.find('.xgplayer-drag');
      var slider = this.find('.xgplayer-slider');
      var bar = this.find('.xgplayer-bar');
      slider.focus();
      Util.event(e);

      var barRect = bar.getBoundingClientRect();
      var pos = { x: e.clientX, y: e.clientY };
      var height = drag.getBoundingClientRect().height;
      this.isMoveing = false;
      var onMove = function onMove(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        _this2.isMoveing = true;
        var w = height - e.clientY + pos.y;
        if (w > barRect.height) {
          return;
        }
        var now = w / barRect.height;
        drag.style.height = w + 'px';
        player.volume = Math.max(Math.min(now, 1), 0);
        player.muted = false;
      };

      var onUp = function onUp(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);

        if (!_this2.isMoveing) {
          var w = barRect.height - (e.clientY - barRect.top);
          var now = w / barRect.height;
          drag.style.height = w + 'px';
          player.volume = Math.max(Math.min(now, 1), 0);
          player.muted = false;
        }
        _this2.isMoveing = false;
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
      return false;
    }
  }, {
    key: 'onMouseenter',
    value: function onMouseenter(e) {
      e.preventDefault();
      e.stopPropagation();
      Util.addClass(this.root, 'slide-show');
    }
  }, {
    key: 'onMouseleave',
    value: function onMouseleave(e) {
      e.preventDefault();
      e.stopPropagation();
      Util.removeClass(this.root, 'slide-show');
    }
  }, {
    key: 'changeMuted',
    value: function changeMuted() {
      var player = this.player;

      player.muted = !player.muted;
    }
  }, {
    key: 'onVolumeChange',
    value: function onVolumeChange() {
      var _player = this.player,
          muted = _player.muted,
          volume = _player.volume;

      if (!this.isMoveing) {
        this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '0px' : volume * 100 + '%';
      }
      this.animate(muted, volume);
    }
  }, {
    key: 'animate',
    value: function animate(muted, volume) {
      if (muted || volume === 0) {
        this.setAttr('data-state', 'mute');
      } else if (volume < 0.5 && this.icons.volumeSmall) {
        this.setAttr('data-state', 'small');
      } else {
        this.setAttr('data-state', 'normal');
      }
    }
  }, {
    key: 'initIcons',
    value: function initIcons() {
      var icons = this.icons;

      this.appendChild('.xgplayer-icon', icons.volumeSmall);
      this.appendChild('.xgplayer-icon', icons.volumeLarge);
      this.appendChild('.xgplayer-icon', icons.volumeMuted);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      var volume = this.player.volume;

      return '\n    <xg-icon class="xgplayer-volume" data-state="normal">\n      <div class="xgplayer-icon">\n      </div>\n      <xg-slider class="xgplayer-slider">\n        <div class="xgplayer-bar">\n          <xg-drag class="xgplayer-drag" style="height: ' + volume * 100 + '%"></xg-drag>\n        </div>\n      </xg-slider>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Volume';
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

  return Volume;
}(_plugin2.default);

exports.default = Volume;