'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _volumeMuted = require('../assets/volumeMuted.svg');

var _volumeMuted2 = _interopRequireDefault(_volumeMuted);

var _volumeSmall = require('../assets/volumeSmall.svg');

var _volumeSmall2 = _interopRequireDefault(_volumeSmall);

var _volumeLarge = require('../assets/volumeLarge.svg');

var _volumeLarge2 = _interopRequireDefault(_volumeLarge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_volume = function s_volume() {
  var player = this;
  var util = _player2.default.util;
  var container = util.createDom('xg-volume', '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + _volumeLarge2.default + '</div>\n                                         <div class="xgplayer-icon-small">' + _volumeSmall2.default + '</div>\n                                         <div class="xgplayer-icon-muted">' + _volumeMuted2.default + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, 'xgplayer-volume');
  player.once('ready', function () {
    player.controls.appendChild(container);
  });
  var slider = container.querySelector('.xgplayer-slider');
  var bar = container.querySelector('.xgplayer-bar');
  var selected = container.querySelector('.xgplayer-drag');
  var icon = container.querySelector('.xgplayer-icon');
  selected.style.height = player.config.volume * 100 + '%';
  slider.volume = player.config.volume;

  bar.addEventListener('mousedown', function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.emit('volumeBarClick', e);
  });

  ['click', 'touchend'].forEach(function (item) {
    icon.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('volumeIconClick');
    });
  });

  icon.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.emit('volumeIconEnter');
  });

  ['blur', 'mouseleave'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('volumeIconLeave');
    });
  });
};

_player2.default.install('s_volume', s_volume);