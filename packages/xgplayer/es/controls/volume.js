import Player from '../player';

var volume = function volume() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  var container = void 0,
      slider = void 0,
      bar = void 0,
      selected = void 0,
      icon = void 0;
  function onCanplay() {
    player.volume = Player.sniffer.device === 'mobile' ? 1 : player.config.volume;
    container = player.controls.querySelector('.xgplayer-volume');
    slider = container.querySelector('.xgplayer-slider');
    bar = container.querySelector('.xgplayer-bar');
    selected = container.querySelector('.xgplayer-drag');
    icon = container.querySelector('.xgplayer-icon');
  }
  player.once('canplay', onCanplay);

  function onVolumeBarClick(e) {
    player.video.muted = false;
    slider.focus();
    util.event(e);

    var barRect = bar.getBoundingClientRect();
    var pos = { x: e.clientX, y: e.clientY };
    var height = selected.getBoundingClientRect().height;
    var isMove = false;
    var onMove = function onMove(e) {
      e.preventDefault();
      e.stopPropagation();
      util.event(e);
      isMove = true;
      var w = height - e.clientY + pos.y;
      var now = w / barRect.height;
      selected.style.height = w + 'px';
      player.volume = Math.max(Math.min(now, 1), 0);
    };
    var onUp = function onUp(e) {
      e.preventDefault();
      e.stopPropagation();
      util.event(e);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);

      if (!isMove) {
        var w = barRect.height - (e.clientY - barRect.top);
        var now = w / barRect.height;
        selected.style.height = w + 'px';
        if (now <= 0) {
          if (player.volume > 0) {
            selected.volume = player.video.volume;
          } else {
            now = selected.volume;
          }
        }
        player.volume = Math.max(Math.min(now, 1), 0);
      }
      slider.volume = player.volume;
      isMove = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return false;
  }
  player.on('volumeBarClick', onVolumeBarClick);

  function onVolumeIconClick() {
    if (Player.sniffer.device === 'mobile') {
      // util.removeClass(root, 'xgplayer-volume-muted')
      // util.removeClass(root, 'xgplayer-volume-large')
      if (player.video.muted) {
        player.video.muted = false;
        // util.addClass(root, 'xgplayer-volume-large')
      } else {
        player.video.muted = true;
        // util.addClass(root, 'xgplayer-volume-muted')
      }
    } else {
      player.video.muted = false;
      if (player.volume < 0.1) {
        player.volume = slider.volume;
      } else {
        player.volume = 0;
      }
    }
    // onVolumeChange ()
  }
  player.on('volumeIconClick', onVolumeIconClick);

  function onVolumeIconEnter() {
    util.addClass(root, 'xgplayer-volume-active');
    if (container) {
      container.focus();
    }
  }
  player.on('volumeIconEnter', onVolumeIconEnter);

  function onVolumeIconLeave() {
    util.removeClass(root, 'xgplayer-volume-active');
  }
  player.on('volumeIconLeave', onVolumeIconLeave);

  var _changeTimer = null;
  function onVolumeChange() {
    if (_changeTimer) {
      clearTimeout(_changeTimer);
    }
    _changeTimer = setTimeout(function () {
      if (Player.sniffer.device === 'mobile') {
        util.removeClass(root, 'xgplayer-volume-muted');
        util.removeClass(root, 'xgplayer-volume-large');
        if (player.video.muted) {
          util.addClass(root, 'xgplayer-volume-muted');
        } else {
          util.addClass(root, 'xgplayer-volume-large');
        }
      } else {
        util.removeClass(root, 'xgplayer-volume-muted');
        util.removeClass(root, 'xgplayer-volume-small');
        util.removeClass(root, 'xgplayer-volume-large');
        if (player.volume === 0) {
          util.addClass(root, 'xgplayer-volume-muted');
        } else if (player.volume < 0.5) {
          util.addClass(root, 'xgplayer-volume-small');
        } else {
          util.addClass(root, 'xgplayer-volume-large');
        }
        var containerHeight = bar.getBoundingClientRect().height || 76;
        selected.style.height = player.volume * containerHeight + 'px';
      }
    }, 50);
  }
  player.on('volumechange', onVolumeChange);

  function onDestroy() {
    player.off('canplay', onCanplay);
    player.off('volumeBarClick', onVolumeBarClick);
    player.off('volumeIconClick', onVolumeIconClick);
    player.off('volumeIconEnter', onVolumeIconEnter);
    player.off('volumeIconLeave', onVolumeIconLeave);
    player.off('volumechange', onVolumeChange);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('volume', volume);