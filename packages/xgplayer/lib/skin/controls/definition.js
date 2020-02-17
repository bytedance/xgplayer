'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_definition = function s_definition() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var sniffer = _player2.default.sniffer;
  var paused = void 0;
  var container = util.createDom('xg-definition', '', { tabindex: 3 }, 'xgplayer-definition');
  if (sniffer.device === 'mobile') {
    player.config.definitionActive = 'click';
  }

  function onCanplayResourceReady() {
    var list = player.definitionList;
    var tmp = ['<ul>'],
        src = player.config.url,
        a = document.createElement('a');
    if (player.switchURL) {
      ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
        if (player[item]) {
          if (player[item].url) {
            a.href = player[item].url;
          }
          if (item === '__flv__') {
            if (player[item]._options) {
              a.href = player[item]._options.url;
            } else {
              a.href = player[item]._mediaDataSource.url;
            }
          }
          src = a.href;
          return false;
        } else {
          return true;
        }
      });
    } else {
      src = player.currentSrc || player.src;
    }
    if (player['hls']) {
      a.href = player['hls'].url;
      src = a.href;
    }
    list.forEach(function (item) {
      a.href = item.url;
      if (player.dash) {
        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.name + '</li>');
      } else {
        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (a.href === src ? 'selected' : '') + '\'>' + item.name + '</li>');
      }
    });
    var cursrc = list.filter(function (item) {
      a.href = item.url;
      if (player.dash) {
        return item.selected === true;
      } else {
        return a.href === src;
      }
    });
    tmp.push('</ul><p class=\'name\'>' + (cursrc[0] || { name: '' }).name + '</p>');
    var urlInRoot = root.querySelector('.xgplayer-definition');
    if (urlInRoot) {
      urlInRoot.innerHTML = tmp.join('');
      var cur = urlInRoot.querySelector('.name');
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.addClass(player.root, 'xgplayer-definition-active');
          urlInRoot.focus();
        });
      }
    } else {
      container.innerHTML = tmp.join('');
      var _cur = container.querySelector('.name');
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        _cur.addEventListener('mouseenter', function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.addClass(player.root, 'xgplayer-definition-active');
          container.focus();
        });
      }
      player.controls.appendChild(container);
    }
  }
  function onResourceReady(list) {
    player.definitionList = list;
    if (list && list instanceof Array && list.length > 1) {
      util.addClass(root, 'xgplayer-is-definition');
      player.on('canplay', onCanplayResourceReady);
    }
  }
  player.on('resourceReady', onResourceReady);

  function onCanplayChangeDefinition() {
    player.currentTime = player.curTime;
    if (!paused) {
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    }
  };
  ['touchend', 'click'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      var list = player.definitionList;
      var li = e.target || e.srcElement,
          a = document.createElement('a');
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        player.emit('beforeDefinitionChange', a.href);
        var from = void 0,
            to = void 0;
        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
          if (util.hasClass(item, 'selected')) {
            from = item.getAttribute('cname');
            util.removeClass(item, 'selected');
          }
        });
        if (player.dash) {
          list.forEach(function (item) {
            item.selected = false;
            if (item.name === li.innerHTML) {
              item.selected = true;
            }
          });
        }

        util.addClass(li, 'selected');
        to = li.getAttribute('cname');
        li.parentNode.nextSibling.innerHTML = '' + li.getAttribute('cname');
        a.href = li.getAttribute('url');
        if (player.switchURL) {
          var curRUL = document.createElement('a');
          ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
            if (player[item]) {
              if (player[item].url) {
                curRUL.href = player[item].url;
              }
              if (item === '__flv__') {
                if (player[item]._options) {
                  curRUL.href = player[item]._options.url;
                } else {
                  curRUL.href = player[item]._mediaDataSource.url;
                }
              }
              return false;
            } else {
              return true;
            }
          });
          if (curRUL.href !== a.href && !player.ended) {
            player.switchURL(a.href);
          }
        } else {
          if (player['hls']) {
            var _curRUL = document.createElement('a');
            _curRUL = player['hls'].url;
          }
          if (a.href !== player.currentSrc) {
            player.curTime = player.currentTime, paused = player.paused;
            if (!player.ended) {
              player.src = a.href;
              player.once('canplay', onCanplayChangeDefinition);
            }
          }
        }
        player.emit('definitionChange', { from: from, to: to });
        if (sniffer.device === 'mobile') {
          util.removeClass(player.root, 'xgplayer-definition-active');
        }
      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(player.root, 'xgplayer-definition-active');
        container.focus();
      }
      player.emit('focus');
    }, false);
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(root, 'xgplayer-definition-active');
  });

  function onDestroy() {
    player.off('resourceReady', onResourceReady);
    player.off('canplay', onCanplayResourceReady);
    player.off('canplay', onCanplayChangeDefinition);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_definition', s_definition);