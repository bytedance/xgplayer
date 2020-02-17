import Player from '../../player';
import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';

var s_play = function s_play() {
  var player = this;
  var util = Player.util;
  var playBtn = player.config.playBtn ? player.config.playBtn : {};
  var btn = void 0,
      iconPlay = void 0,
      iconPause = void 0;
  if (playBtn.type === 'img') {
    btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
  } else {
    btn = util.createDom('xg-play', '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + PlayIcon + '</div>\n                                      <div class="xgplayer-icon-pause">' + PauseIcon + '</div>\n                                     </xg-icon>', {}, 'xgplayer-play');
  }

  var tipsText = {};
  tipsText.play = player.lang.PLAY_TIPS;
  tipsText.pause = player.lang.PAUSE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-play">' + tipsText.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + tipsText.pause + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('playBtnClick');
    });
  });
};

Player.install('s_play', s_play);