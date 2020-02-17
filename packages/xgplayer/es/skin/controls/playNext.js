import Player from '../../player';
import PlayNextIcon from '../assets/playNext.svg';

var s_playNext = function s_playNext() {
  var player = this;
  var util = Player.util;
  var nextBtn = player.config.playNext;
  if (!nextBtn || !nextBtn.urlList) {
    return;
  }
  var btn = util.createDom('xg-playnext', '<xg-icon class="xgplayer-icon">' + PlayNextIcon + '</xg-icon>', {}, 'xgplayer-playnext');
  var tipsText = player.lang.PLAYNEXT_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-playnext">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('playNextBtnClick');
    });
  });
};

Player.install('s_playNext', s_playNext);