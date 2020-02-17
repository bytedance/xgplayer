'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotate = function rotate() {
  var player = this;
  var rotateConfig = player.config.rotate;
  if (!rotateConfig) {
    return;
  }

  function onRotateBtnClick() {
    player.rotate(rotateConfig.clockwise, rotateConfig.innerRotate);
  }
  player.on('rotateBtnClick', onRotateBtnClick);

  function onDestroy() {
    player.off('rotateBtnClick', onRotateBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('rotate', rotate);