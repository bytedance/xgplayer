'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pip = function pip() {
  var player = this;
  var util = _player2.default.util;
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

_player2.default.install('pip', pip);