import Player from '../../player';

var s_enter = function s_enter() {
  var player = this;
  var root = player.root;
  var util = Player.util;

  var barStr = '';
  for (var i = 1; i <= 12; i++) {
    barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
  }
  var enter = util.createDom('xg-enter', '<div class="xgplayer-enter-spinner">\n                                                  ' + barStr + '\n                                                </div>', {}, 'xgplayer-enter');
  root.appendChild(enter);
};

Player.install('s_enter', s_enter);