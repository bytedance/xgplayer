'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _playNext = require('../assets/playNext.svg');

var _playNext2 = _interopRequireDefault(_playNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_playNext = function s_playNext() {
  var player = this;
  var util = _player2.default.util;
  var nextBtn = player.config.playNext;
  if (!nextBtn || !nextBtn.urlList) {
    return;
  }
  var btn = util.createDom('xg-playnext', '<xg-icon class="xgplayer-icon">' + _playNext2.default + '</xg-icon>', {}, 'xgplayer-playnext');
  var tipsText = player.lang.PLAYNEXT_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-playnext">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('playNextBtnClick');
    });
  });
};

_player2.default.install('s_playNext', s_playNext);