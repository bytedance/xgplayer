import Player from '../../player';
import MutedIcon from '../assets/volumeMuted.svg';
import SmallIcon from '../assets/volumeSmall.svg';
import LargeIcon from '../assets/volumeLarge.svg';

var s_volume = function s_volume() {
  var player = this;
  var util = Player.util;
  var container = util.createDom('xg-volume', '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + LargeIcon + '</div>\n                                         <div class="xgplayer-icon-small">' + SmallIcon + '</div>\n                                         <div class="xgplayer-icon-muted">' + MutedIcon + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, 'xgplayer-volume');
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

Player.install('s_volume', s_volume);