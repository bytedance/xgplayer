'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smemoryPlay = function smemoryPlay() {
  var player = this;
  var util = _player2.default.util;
  var lastPlayTime = player.config.lastPlayTime || 0;
  var lastPlayTimeHideDelay = player.config.lastPlayTimeHideDelay || 3;
  var dom = null;
  if (lastPlayTime <= 0) {
    return;
  }
  dom = util.createDom('xg-memoryplay', '<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">\u60A8\u4E0A\u6B21\u89C2\u770B\u5230 <span class="xgplayer-lasttime">' + util.format(lastPlayTime) + '</span> \uFF0C\u4E3A\u60A8\u81EA\u52A8\u7EED\u64AD <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>', {}, 'xgplayer-memoryplay');
  dom.addEventListener('mouseover', function (e) {
    e.stopPropagation();
  });
  var removeFunc = function removeFunc() {
    dom && dom.parentNode.removeChild(dom);
    dom = null;
  };
  dom.querySelector('.xgplayer-progress-tip .btn-close').addEventListener('click', removeFunc);
  var handlePlay = function handlePlay() {
    player.root.appendChild(dom);
    player.emit('memoryPlayStart', lastPlayTime);
    if (lastPlayTimeHideDelay > 0) {
      setTimeout(function () {
        removeFunc();
      }, lastPlayTimeHideDelay * 1000);
    }
  };
  player.once('play', handlePlay);
  player.once('ended', removeFunc);
};

_player2.default.install('s_memoryPlay', smemoryPlay);