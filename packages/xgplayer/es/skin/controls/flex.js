import Player from '../../player';

var s_flex = function s_flex() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  var playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder');
  player.controls.appendChild(playceholder);
};

Player.install('s_flex', s_flex);