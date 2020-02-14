'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _download = require('../assets/download.svg');

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_download = function s_download() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.download) {
    return;
  }
  var btn = util.createDom('xg-download', '<xg-icon class="xgplayer-icon">' + _download2.default + '</xg-icon>', {}, 'xgplayer-download');

  var tipsText = player.lang.DOWNLOAD_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-download">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('downloadBtnClick');
    });
  });
};

_player2.default.install('s_download', s_download);