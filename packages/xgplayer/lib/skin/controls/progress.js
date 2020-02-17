'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_progress = function s_progress() {
  var player = this;
  var util = _player2.default.util;
  var container = util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer">\n                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>\n                                                   <xg-played class="xgplayer-progress-played">\n                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>\n                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n                                                   </xgplayer-played>\n                                                 </xg-outer>', { tabindex: 1 }, 'xgplayer-progress');
  var containerWidth = void 0;
  player.controls.appendChild(container);
  var progress = container.querySelector('.xgplayer-progress-played');
  var btn = container.querySelector('.xgplayer-progress-btn');
  var outer = container.querySelector('.xgplayer-progress-outer');
  var cache = container.querySelector('.xgplayer-progress-cache');
  var point = container.querySelector('.xgplayer-progress-point');
  var thumbnail = container.querySelector('.xgplayer-progress-thumbnail');
  player.dotArr = {};
  function dotEvent(dotItem, text) {
    dotItem.addEventListener('mouseenter', function (e) {
      if (text) {
        util.addClass(dotItem, 'xgplayer-progress-dot-show');
        util.addClass(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('mouseleave', function (e) {
      if (text) {
        util.removeClass(dotItem, 'xgplayer-progress-dot-show');
        util.removeClass(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('touchend', function (e) {
      // e.preventDefault()
      e.stopPropagation();
      if (text) {
        if (!util.hasClass(dotItem, 'xgplayer-progress-dot-show')) {
          Object.keys(player.dotArr).forEach(function (key) {
            if (player.dotArr[key]) {
              util.removeClass(player.dotArr[key], 'xgplayer-progress-dot-show');
            }
          });
        }
        util.toggleClass(dotItem, 'xgplayer-progress-dot-show');
        util.toggleClass(container, 'xgplayer-progress-dot-active');
      }
    });
  }
  function onCanplay() {
    if (player.config.progressDot && util.typeOf(player.config.progressDot) === 'Array') {
      player.config.progressDot.forEach(function (item) {
        if (item.time >= 0 && item.time <= player.duration) {
          var dot = util.createDom('xg-progress-dot', item.text ? '<span class="xgplayer-progress-tip">' + item.text + '</span>' : '', {}, 'xgplayer-progress-dot');
          dot.style.left = item.time / player.duration * 100 + '%';
          if (item.duration >= 0) {
            dot.style.width = Math.min(item.duration, player.duration - item.time) / player.duration * 100 + '%';
          }
          outer.appendChild(dot);
          player.dotArr[item.time] = dot;
          dotEvent(dot, item.text);
        }
      });
    }
  }
  player.once('canplay', onCanplay);
  player.addProgressDot = function (time, text, duration) {
    if (player.dotArr[time]) {
      return;
    }
    if (time >= 0 && time <= player.duration) {
      var dot = util.createDom('xg-progress-dot', '', {}, 'xgplayer-progress-dot');
      dot.style.left = time / player.duration * 100 + '%';
      if (duration >= 0) {
        dot.style.width = Math.min(duration, player.duration - time) / player.duration * 100 + '%';
      }
      outer.appendChild(dot);
      player.dotArr[time] = dot;
      dotEvent(dot, text);
    }
  };
  player.removeProgressDot = function (time) {
    if (time >= 0 && time <= player.duration && player.dotArr[time]) {
      var dot = player.dotArr[time];
      dot.parentNode.removeChild(dot);
      dot = null;
      player.dotArr[time] = null;
    }
  };
  player.removeAllProgressDot = function () {
    Object.keys(player.dotArr).forEach(function (key) {
      if (player.dotArr[key]) {
        var dot = player.dotArr[key];
        dot.parentNode.removeChild(dot);
        dot = null;
        player.dotArr[key] = null;
      }
    });
  };
  var tnailPicNum = 0;
  var tnailWidth = 0;
  var tnailHeight = 0;
  var tnailCol = 0;
  var tnailRow = 0;
  var interval = 0;
  var tnailUrls = [];
  if (player.config.thumbnail) {
    tnailPicNum = player.config.thumbnail.pic_num;
    tnailWidth = player.config.thumbnail.width;
    tnailHeight = player.config.thumbnail.height;
    tnailCol = player.config.thumbnail.col;
    tnailRow = player.config.thumbnail.row;
    tnailUrls = player.config.thumbnail.urls;
    thumbnail.style.width = tnailWidth + 'px';
    thumbnail.style.height = tnailHeight + 'px';
  };
  ['touchstart', 'mousedown'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      // e.preventDefault()
      e.stopPropagation();
      util.event(e);
      if (e._target === point || !player.config.allowSeekAfterEnded && player.ended) {
        return true;
      }
      container.focus();
      containerWidth = container.getBoundingClientRect().width;

      var _progress$getBounding = progress.getBoundingClientRect(),
          left = _progress$getBounding.left;

      var move = function move(e) {
        // e.preventDefault()
        e.stopPropagation();
        util.event(e);
        player.isProgressMoving = true;
        var w = e.clientX - left;
        if (w > containerWidth) {
          w = containerWidth;
        }
        var now = w / containerWidth * player.duration;
        progress.style.width = w * 100 / containerWidth + '%';

        if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
          player.currentTime = Number(now).toFixed(1);
        } else {
          var time = util.findDom(player.controls, '.xgplayer-time');
          if (time) {
            time.innerHTML = '<span>' + util.format(now || 0) + '</span><em>' + util.format(player.duration);
          }
        }
        player.emit('focus');
      };
      var up = function up(e) {
        // e.preventDefault()
        e.stopPropagation();
        util.event(e);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move, { passive: false });
        window.removeEventListener('mouseup', up);
        window.removeEventListener('touchend', up);
        container.blur();
        if (!player.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
          var w = e.clientX - left;
          if (w > containerWidth) {
            w = containerWidth;
          }
          var now = w / containerWidth * player.duration;
          progress.style.width = w * 100 / containerWidth + '%';
          player.currentTime = Number(now).toFixed(1);
        }
        player.emit('focus');
        player.isProgressMoving = false;
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move, { passive: false });
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
      return true;
    });
  });

  container.addEventListener('mouseenter', function (e) {
    if (!player.config.allowSeekAfterEnded && player.ended) {
      return true;
    }
    var containerLeft = container.getBoundingClientRect().left;
    var containerWidth = container.getBoundingClientRect().width;
    var compute = function compute(e) {
      var now = (e.clientX - containerLeft) / containerWidth * player.duration;
      now = now < 0 ? 0 : now;
      point.textContent = util.format(now);
      var pointWidth = point.getBoundingClientRect().width;
      if (player.config.thumbnail) {
        interval = player.duration / tnailPicNum;
        var index = Math.floor(now / interval);
        thumbnail.style.backgroundImage = 'url(' + tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1] + ')';
        var indexInPage = index + 1 - tnailCol * tnailRow * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1);
        var tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1;
        var tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1;
        thumbnail.style['background-position'] = '-' + tnaiColIndex * tnailWidth + 'px -' + tnaiRowIndex * tnailHeight + 'px';
        var left = e.clientX - containerLeft - tnailWidth / 2;
        left = left > 0 ? left : 0;
        left = left < containerWidth - tnailWidth ? left : containerWidth - tnailWidth;
        thumbnail.style.left = left + 'px';
        thumbnail.style.top = -10 - tnailHeight + 'px';
        thumbnail.style.display = 'block';
        point.style.left = left + tnailWidth / 2 - pointWidth / 2 + 'px';
      } else {
        var _left = e.clientX - containerLeft - pointWidth / 2;
        _left = _left > 0 ? _left : 0;
        _left = _left > containerWidth - pointWidth ? containerWidth - pointWidth : _left;
        point.style.left = _left + 'px';
      }
      if (util.hasClass(container, 'xgplayer-progress-dot-active')) {
        point.style.display = 'none';
      } else {
        point.style.display = 'block';
      }
    };
    var move = function move(e) {
      compute(e);
    };
    var leave = function leave(e) {
      container.removeEventListener('mousemove', move, false);
      container.removeEventListener('mouseleave', leave, false);
      compute(e);
      point.style.display = 'none';
      thumbnail.style.display = 'none';
    };
    container.addEventListener('mousemove', move, false);
    container.addEventListener('mouseleave', leave, false);
    compute(e);
  }, false);

  // let lastBtnLeft = false
  var onTimeupdate = function onTimeupdate() {
    if (!containerWidth && container) {
      containerWidth = container.getBoundingClientRect().width;
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      progress.style.width = player.currentTime * 100 / player.duration + '%';
    }
  };
  player.on('timeupdate', onTimeupdate);

  var onCacheUpdate = function onCacheUpdate() {
    var buffered = player.buffered;
    if (buffered && buffered.length > 0) {
      var end = buffered.end(buffered.length - 1);
      for (var i = 0, len = buffered.length; i < len; i++) {
        if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
          end = buffered.end(i);
          for (var j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1);
              break;
            }
          }
          break;
        }
      }
      cache.style.width = end / player.duration * 100 + '%';
    }
  };
  var cacheUpdateEvents = ['bufferedChange', 'cacheupdate', 'ended', 'timeupdate'];
  cacheUpdateEvents.forEach(function (item) {
    player.on(item, onCacheUpdate);
  });

  function destroyFunc() {
    player.removeAllProgressDot();
    player.off('canplay', onCanplay);
    player.off('timeupdate', onTimeupdate);
    cacheUpdateEvents.forEach(function (item) {
      player.off(item, onCacheUpdate);
    });
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

_player2.default.install('s_progress', s_progress);