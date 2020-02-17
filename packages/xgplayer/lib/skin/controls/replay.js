'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _replay = require('../assets/replay.svg');

var _replay2 = _interopRequireDefault(_replay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_replay = function s_replay() {
  var player = this;
  var util = _player2.default.util;
  var root = player.root;

  var replayText = player.lang.REPLAY;
  var btn = util.createDom('xg-replay', _replay2.default + '\n                                         <xg-replay-txt class="xgplayer-replay-txt">' + replayText + '</xg-replay-txt>\n                                        ', {}, 'xgplayer-replay');
  player.once('ready', function () {
    root.appendChild(btn);
  });

  function onEnded() {
    var path = btn.querySelector('path');
    if (path) {
      var transform = window.getComputedStyle(path).getPropertyValue('transform');
      if (typeof transform === 'string' && transform.indexOf('none') > -1) {
        return;
      } else {
        path.setAttribute('transform', transform);
      }
    }
  }
  player.on('ended', onEnded);

  var svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(function (item) {
    svg.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('replayBtnClick');
    });
  });

  function destroyFunc() {
    player.off('ended', onEnded);
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

_player2.default.install('s_replay', s_replay);