import Player from '../../player';

var s_poster = function s_poster() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  if (!player.config.poster) {
    return;
  }
  var poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
  poster.style.backgroundImage = 'url(' + player.config.poster + ')';
  root.appendChild(poster);
};

Player.install('s_poster', s_poster);