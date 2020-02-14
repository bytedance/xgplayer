'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_flex = function s_flex() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder');
  player.controls.appendChild(playceholder);
};

_player2.default.install('s_flex', s_flex);