var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../../plugin';
import volumeChange from '../../assets/volumeChange.svg';
import './index.scss';

var Util = Plugin.Util,
    Events = Plugin.Events;

var VolumeIcon = function (_Plugin) {
  _inherits(VolumeIcon, _Plugin);

  function VolumeIcon() {
    _classCallCheck(this, VolumeIcon);

    return _possibleConstructorReturn(this, (VolumeIcon.__proto__ || Object.getPrototypeOf(VolumeIcon)).apply(this, arguments));
  }

  _createClass(VolumeIcon, [{
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        volumeChange: volumeChange
      };
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.find('.xgplayer-icon').addEventListener('mouseenter', function () {
        console.log('mouseenter');
        Util.addClass(_this2.el, 'slide-show');
      });
      this.el.addEventListener('mouseleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('mouseleave');
        Util.removeClass(_this2.el, 'slide-show');
      });

      this.changeMuted = this.changeMuted.bind(this);
      this.bind('click', this.changeMuted);

      this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this));
    }
  }, {
    key: 'changeMuted',
    value: function changeMuted() {
      var player = this.player;

      player.muted = !player.muted;
    }
  }, {
    key: 'changeVolume',
    value: function changeVolume() {}
  }, {
    key: 'onVolumeChange',
    value: function onVolumeChange() {
      var _player = this.player,
          muted = _player.muted,
          volume = _player.volume;

      console.log('muted: ' + muted + ' volume: ' + volume);
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
      var volume = this.player.volume;

      return '\n    <xg-icon class="xgplayer-volume">\n      <div class="xgplayer-icon">\n      ' + this.icons.volumeChange + '\n      </div>\n      <xg-slider class="xgplayer-slider">\n        <xg-bar class="xgplayer-bar">\n          <xg-drag class="xgplayer-drag" style="height: ' + volume * 100 + '%"></xg-drag>\n        </xg-bar>\n      </xg-slider>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'VolumeIcon';
    }
  }]);

  return VolumeIcon;
}(Plugin);

export default VolumeIcon;