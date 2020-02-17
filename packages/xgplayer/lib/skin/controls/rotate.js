'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _rotate = require('../assets/rotate.svg');

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_rotate = function s_rotate() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.rotate) {
    return;
  }
  var btn = util.createDom('xg-rotate', '<xg-icon class="xgplayer-icon">' + _rotate2.default + '</xg-icon>', {}, 'xgplayer-rotate');

  var tipsText = player.lang.ROTATE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-rotate">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('rotateBtnClick');
    });
  });
};

_player2.default.install('s_rotate', s_rotate);