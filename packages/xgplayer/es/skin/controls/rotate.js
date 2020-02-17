import Player from '../../player';
import RotateIcon from '../assets/rotate.svg';

var s_rotate = function s_rotate() {
  var player = this;
  var util = Player.util;
  if (!player.config.rotate) {
    return;
  }
  var btn = util.createDom('xg-rotate', '<xg-icon class="xgplayer-icon">' + RotateIcon + '</xg-icon>', {}, 'xgplayer-rotate');

  var tipsText = player.lang.ROTATE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-rotate">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('rotateBtnClick');
    });
  });
};

Player.install('s_rotate', s_rotate);