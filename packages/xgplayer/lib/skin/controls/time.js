'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_time = function s_time() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = util.createDom('xg-time', '<span>' + (player.currentTime || util.format(0)) + '</span>\n                                           <em>' + (player.duration || util.format(0)) + '</em>', {}, 'xgplayer-time');
  player.once('ready', function () {
    player.controls.appendChild(container);
  });
  var onTimeChange = function onTimeChange() {
    if (player.duration === Infinity) {
      util.addClass(player.root, 'xgplayer-is-live');
      if (!util.findDom(player.root, '.xgplayer-live')) {
        var live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        player.controls.appendChild(live);
      }
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      container.innerHTML = '<span>' + util.format(player.currentTime || 0) + '</span>' + ('<em>' + util.format(player.duration) + '</em>');
    }
  };
  player.on('durationchange', onTimeChange);
  player.on('timeupdate', onTimeChange);

  function onDestroy() {
    player.off('durationchange', onTimeChange);
    player.off('timeupdate', onTimeChange);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_time', s_time);