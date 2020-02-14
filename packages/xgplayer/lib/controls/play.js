'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var play = function play() {
  var player = this;

  function onPlayBtnClick() {
    if (player.ended) {
      return;
    }
    if (player.paused) {
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    } else {
      player.pause();
    }
  }
  player.on('playBtnClick', onPlayBtnClick);

  function onDestroy() {
    player.off('playBtnClick', onPlayBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('play', play);