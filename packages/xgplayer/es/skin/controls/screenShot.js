import Player from '../../player';

var s_screenShot = function s_screenShot() {
  var player = this;
  var util = Player.util;
  if (!player.config.screenShot) {
    return;
  }
  var screenShotText = player.lang.SCREENSHOT;
  var btn = util.createDom('xg-screenshot', '<p class="name"><span>' + screenShotText + '</span></p>', { tabindex: 11 }, 'xgplayer-screenshot');
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('screenShotBtnClick');
    });
  });
};

Player.install('s_screenShot', s_screenShot);