var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import volumeChange from '../assets/volumeChange.svg';

var Util = Plugin.Util,
    Events = Plugin.Events,
    POSITIONS = Plugin.POSITIONS;

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
        volumeChange: volumeChange
      };
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      if (this.config.disable) {
        return;
      }
      this.bar = this.find('.xgplayer-bar');
      this.drag = this.find('.xgplayer-drag');
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
      var player = this.player;

      player.video.muted = false;
      var drag = this.drag;
      var slider = this.find('.xgplayer-slider');
      slider.focus();
      Util.event(e);

      var barRect = this.bar.getBoundingClientRect();
      var pos = { x: e.clientX, y: e.clientY };
      var height = drag.getBoundingClientRect().height;
      var isMove = false;
      var onMove = function onMove(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        isMove = true;
        var w = height - e.clientY + pos.y;
        var now = w / barRect.height;
        drag.style.height = w + 'px';
        player.volume = Math.max(Math.min(now, 1), 0);
      };

      var onUp = function onUp(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);

        if (!isMove) {
          var w = barRect.height - (e.clientY - barRect.top);
          var now = w / barRect.height;
          drag.style.height = w + 'px';
          if (now <= 0) {
            if (player.volume > 0) {
              drag.volume = player.video.volume;
            } else {
              now = drag.volume;
            }
          }
          player.volume = Math.max(Math.min(now, 1), 0);
        }
        slider.volume = player.volume;
        isMove = false;
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
      console.log('mouseleave');
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

      this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '0px' : volume * 100 + '%';
      this.animate(muted, volume);
    }
  }, {
    key: 'animate',
    value: function animate(muted, volume) {
      var path = this.find('.path');
      var pathLarge = this.find('.path_large').getAttribute('d');
      var pathSmall = this.find('.path_small').getAttribute('d');
      var pathMuted = this.find('.path_muted').getAttribute('d');
      if (muted || volume === 0) {
        path.setAttribute('d', pathMuted);
      } else {
        volume >= 0.5 ? path.setAttribute('d', pathLarge) : path.setAttribute('d', pathSmall);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      var volume = this.player.volume;

      return '\n    <xg-icon class="xgplayer-volume">\n      <div class="xgplayer-icon">\n      ' + this.icons.volumeChange + '\n      </div>\n      <xg-slider class="xgplayer-slider">\n        <xg-bar class="xgplayer-bar">\n          <xg-drag class="xgplayer-drag" style="height: ' + volume * 100 + '%"></xg-drag>\n        </xg-bar>\n      </xg-slider>\n    </xg-icon>';
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
}(Plugin);

export default Volume;