import Player from '../player';

var pip = function pip() {
  var player = this;
  var util = Player.util;
  var root = player.root;
  function onPipBtnClick() {
    if (util.hasClass(root, 'xgplayer-pip-active')) {
      player.exitPIP();
    } else {
      player.getPIP();
    }
  }
  player.on('pipBtnClick', onPipBtnClick);

  function onDestroy() {
    player.off('pipBtnClick', onPipBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('pip', pip);