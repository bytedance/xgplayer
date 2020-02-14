'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_pip = function s_pip() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.pip) {
    return;
  }
  var pip = player.lang.PIP;
  var btn = util.createDom('xg-pip', '<p class="name"><span>' + pip + '</span></p>', { tabindex: 9 }, 'xgplayer-pip');

  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('pipBtnClick');
    });
  });
};

_player2.default.install('s_pip', s_pip);