import Player from '../player';

var definition = function definition() {
  var player = this;
  var root = player.root;

  function onDestroy() {
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('definition', definition);