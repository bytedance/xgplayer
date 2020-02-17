'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = function definition() {
  var player = this;
  var root = player.root;

  function onDestroy() {
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('definition', definition);