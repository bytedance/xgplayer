'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_enter = function s_enter() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  var barStr = '';
  for (var i = 1; i <= 12; i++) {
    barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
  }
  var enter = util.createDom('xg-enter', '<div class="xgplayer-enter-spinner">\n                                                  ' + barStr + '\n                                                </div>', {}, 'xgplayer-enter');
  root.appendChild(enter);
};

_player2.default.install('s_enter', s_enter);