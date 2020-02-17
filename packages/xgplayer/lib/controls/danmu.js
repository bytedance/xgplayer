'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var danmu = function danmu() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onInitDanmu(danmujs) {
    var container = player.root.querySelector('xg-danmu');
    util.addClass(container, 'xgplayer-has-danmu');
    if (!player.config.danmu.closeDefaultBtn) {
      var onTimeupdate = function onTimeupdate() {
        danmujs.start();
      };

      var onPause = function onPause() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.pause();
        }
      };

      var onPlay = function onPlay() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.play();
        }
      };

      var onSeeked = function onSeeked() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.stop();
          danmujs.start();
        }
      };

      var onDestroy = function onDestroy() {
        player.off('timeupdate', onTimeupdate);
        player.off('pause', onPause);
        player.off('play', onPlay);
        player.off('seeked', onSeeked);
        player.off('destroy', onDestroy);
      };

      player.danmuBtn = util.copyDom(danmujs.bulletBtn.createSwitch(true));
      player.controls.appendChild(player.danmuBtn);

      ['click', 'touchend'].forEach(function (item) {
        player.danmuBtn.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.toggleClass(player.danmuBtn, 'danmu-switch-active');
          if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
            util.addClass(container, 'xgplayer-has-danmu');
            player.once('timeupdate', onTimeupdate);
          } else {
            util.removeClass(container, 'xgplayer-has-danmu');
            danmujs.stop();
          }
        });
      });

      player.onElementClick && container.addEventListener('click', function (e) {
        player.onElementClick(e, container);
      }, false);
      player.onElementDblclick && container.addEventListener('dblclick', function (e) {
        player.onElementDblclick(e, container);
      }, false);

      player.on('pause', onPause);

      player.on('play', onPlay);

      player.on('seeked', onSeeked);

      player.once('destroy', onDestroy);
    }
  }
  player.on('initDefaultDanmu', onInitDanmu);
};

_player2.default.install('danmu', danmu);