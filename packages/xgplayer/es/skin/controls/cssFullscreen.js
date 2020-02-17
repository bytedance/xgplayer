import Player from '../../player';
import RequestCssFullIcon from '../assets/requestCssFull.svg';
import ExitCssFullIcon from '../assets/exitCssFull.svg';

var s_cssFullscreen = function s_cssFullscreen() {
  var player = this;
  var util = Player.util;
  if (!player.config.cssFullscreen) {
    return;
  }
  var btn = util.createDom('xg-cssfullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + RequestCssFullIcon + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + ExitCssFullIcon + '</div>\n                                           </xg-icon>', {}, 'xgplayer-cssfullscreen');

  var tipsText = {};
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('cssFullscreenBtnClick');
    });
  });
};

Player.install('s_cssFullscreen', s_cssFullscreen);