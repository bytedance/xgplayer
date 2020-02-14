import Player from '../player';

var cssFullscreen = function cssFullscreen() {
  var player = this;
  var root = player.root;
  var util = Player.util;

  function onCssFullscreenBtnClick() {
    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
      player.exitCssFullscreen();
    } else {
      player.getCssFullscreen();
    }
  }
  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);
  player.on('exitFullscreen', function () {
    util.removeClass(root, 'xgplayer-is-cssfullscreen');
  });

  function onDestroy() {
    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('cssFullscreen', cssFullscreen);