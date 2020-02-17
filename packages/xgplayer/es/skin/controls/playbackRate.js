import Player from '../../player';

var s_playbackRate = function s_playbackRate() {
  var player = this;
  var util = Player.util;
  if (player.config.playbackRate) {
    player.config.playbackRate.sort(function (a, b) {
      return b - a;
    });
  } else {
    return false;
  }
  var ul = util.createDom('xg-playbackrate', " ", {}, 'xgplayer-playbackrate');
  var list = [];
  player.config.playbackRate.forEach(function (item) {
    list.push({ name: '' + item, rate: item + 'x', selected: false });
  });
  var selectedSpeed = 1;
  var tmp = ['<ul>'];
  list.forEach(function (item) {
    if (player.config.defaultPlaybackRate && player.config.defaultPlaybackRate.toString() === item.name) {
      item.selected = true;
      selectedSpeed = player.config.defaultPlaybackRate;
      player.once('playing', function () {
        player.video.playbackRate = player.config.defaultPlaybackRate;
      });
    } else if (item.name === '1.0' || item.name === '1') {
      if (!player.config.defaultPlaybackRate || player.config.defaultPlaybackRate === 1) {
        item.selected = true;
      }
    }
    tmp.push('<li cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.rate + '</li>');
  });
  tmp.push('</ul><p class=\'name\'>' + selectedSpeed + 'x</p>');
  var playbackDom = player.root.querySelector('.xgplayer-playbackrate');
  if (playbackDom) {
    playbackDom.innerHTML = tmp.join('');
    var cur = void 0;
    if (playbackDom) {
      cur = playbackDom.querySelector('.name');
    } else return;
    cur.addEventListener('mouseenter', function (e) {
      e.preventDefault();
      e.stopPropagation();
      util.addClass(player.root, 'xgplayer-playbackrate-active');
      playbackDom.focus();
    });
  } else {
    ul.innerHTML = tmp.join('');
    var _cur = void 0;
    if (ul) {
      _cur = ul.querySelector('.name');
    } else return;
    _cur.addEventListener('mouseenter', function (e) {
      e.preventDefault();
      e.stopPropagation();
      util.addClass(player.root, 'xgplayer-playbackrate-active');
      ul.focus();
    });
    player.once('ready', function () {
      player.controls.appendChild(ul);
    });
  }

  var ev = ['touchend', 'click'];
  ev.forEach(function (item) {
    ul.addEventListener(item, function (e) {
      e.stopPropagation();
      e.preventDefault();
      var li = e.target;
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        var from = void 0,
            to = void 0;
        list.forEach(function (item) {
          item.selected = false;
          if (li.textContent.replace(/\s+/g, "") === item.rate) {
            Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
              if (util.hasClass(item, 'selected')) {
                from = parseFloat(item.getAttribute('cname'));
                util.removeClass(item, 'selected');
              }
            });
            item.selected = true;
            player.video.playbackRate = item.name * 1;
            selectedSpeed = item.name * 1;
          }
        });
        util.addClass(li, 'selected');
        to = parseFloat(li.getAttribute('cname'));
        li.parentNode.nextSibling.innerHTML = li.getAttribute('cname') + 'x';
        player.emit('playbackrateChange', { from: from, to: to });
      } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
        util.addClass(player.root, 'xgplayer-playbackrate-active');
        ul.focus();
      }
      player.emit('focus');
    }, false);
  });
  ul.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(player.root, 'xgplayer-playbackrate-active');
  });
  player.on('play', function () {
    if (player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1)) {
      player.video.playbackRate = selectedSpeed;
    }
  });
};

Player.install('s_playbackRate', s_playbackRate);