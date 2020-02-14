import Player from '../../player';
import Loading from '../assets/loading.svg';

var s_loading = function s_loading() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  var container = util.createDom('xg-loading', '' + Loading, {}, 'xgplayer-loading');
  player.once('ready', function () {
    root.appendChild(container);
  });
};

Player.install('s_loading', s_loading);