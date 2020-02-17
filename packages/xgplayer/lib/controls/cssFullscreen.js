'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssFullscreen = function cssFullscreen() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onCssFullscreenBtnClick() {
    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
      player.exitCssFullscreen();
    } else {
      player.getCssFullscreen();
    }
  }
  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);
  player.on('exitFullscreen', function () {
    util.removeClass(root, 'xgplayer-is-cssfullscreen');
  });

  function onDestroy() {
    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('cssFullscreen', cssFullscreen);