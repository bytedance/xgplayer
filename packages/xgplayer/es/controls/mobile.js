import Player from '../player';

var mobile = function mobile() {
  var player = this;
  var util = Player.util;var controls = player.controls;var root = player.root;

  player.onElementTouchend = function (e, element) {
    e.preventDefault();
    e.stopPropagation();
    var player = this;
    if (util.hasClass(root, 'xgplayer-inactive')) {
      player.emit('focus');
    } else {
      player.emit('blur');
    }
    if (!player.config.closeVideoTouch && !player.isTouchMove) {
      if (util.hasClass(player.root, 'xgplayer-nostart')) {
        return false;
      } else if (!player.ended) {
        if (player.paused) {
          var playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(function (err) {});
          }
        } else {
          player.pause();
        }
      }
    }
  };
  player.video.addEventListener('touchend', function (e) {
    player.onElementTouchend(e, player.video);
  }, false);

  player.video.addEventListener('touchstart', function () {
    player.isTouchMove = false;
  });

  player.video.addEventListener('touchmove', function () {
    player.isTouchMove = true;
  });

  function onReady(e) {
    if (player.config.autoplay) {
      player.start();
    }
  }
  player.once('ready', onReady);

  function onDestroy() {
    player.off('ready', onReady);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('mobile', mobile);