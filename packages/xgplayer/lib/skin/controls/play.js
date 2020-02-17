'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _play = require('../assets/play.svg');

var _play2 = _interopRequireDefault(_play);

var _pause = require('../assets/pause.svg');

var _pause2 = _interopRequireDefault(_pause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_play = function s_play() {
  var player = this;
  var util = _player2.default.util;
  var playBtn = player.config.playBtn ? player.config.playBtn : {};
  var btn = void 0,
      iconPlay = void 0,
      iconPause = void 0;
  if (playBtn.type === 'img') {
    btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
  } else {
    btn = util.createDom('xg-play', '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + _play2.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + _pause2.default + '</div>\n                                     </xg-icon>', {}, 'xgplayer-play');
  }

  var tipsText = {};
  tipsText.play = player.lang.PLAY_TIPS;
  tipsText.pause = player.lang.PAUSE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-play">' + tipsText.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + tipsText.pause + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('playBtnClick');
    });
  });
};

_player2.default.install('s_play', s_play);