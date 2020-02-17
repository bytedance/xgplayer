'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _requestCssFull = require('../assets/requestCssFull.svg');

var _requestCssFull2 = _interopRequireDefault(_requestCssFull);

var _exitCssFull = require('../assets/exitCssFull.svg');

var _exitCssFull2 = _interopRequireDefault(_exitCssFull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_cssFullscreen = function s_cssFullscreen() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.cssFullscreen) {
    return;
  }
  var btn = util.createDom('xg-cssfullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + _requestCssFull2.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + _exitCssFull2.default + '</div>\n                                           </xg-icon>', {}, 'xgplayer-cssfullscreen');

  var tipsText = {};
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('cssFullscreenBtnClick');
    });
  });
};

_player2.default.install('s_cssFullscreen', s_cssFullscreen);