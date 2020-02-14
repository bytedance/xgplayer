'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullscreen = function fullscreen() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onFullscreenBtnClick() {
    if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
      player.exitFullscreen(root);
    } else {
      player.getFullscreen(root);
    }
  }
  player.on('fullscreenBtnClick', onFullscreenBtnClick);

  function onFullscreenChange() {
    var fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenEl && fullscreenEl === root) {
      util.addClass(root, 'xgplayer-is-fullscreen');
      player.emit('requestFullscreen');
    } else {
      util.removeClass(root, 'xgplayer-is-fullscreen');
      player.emit('exitFullscreen');
    }
  };
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
    document.addEventListener(item, onFullscreenChange);
  });

  function onDestroy() {
    player.off('fullscreenBtnClick', onFullscreenBtnClick);
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
      document.removeEventListener(item, onFullscreenChange);
    });
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('fullscreen', fullscreen);