'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_poster = function s_poster() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  if (!player.config.poster) {
    return;
  }
  var poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
  poster.style.backgroundImage = 'url(' + player.config.poster + ')';
  root.appendChild(poster);
};

_player2.default.install('s_poster', s_poster);