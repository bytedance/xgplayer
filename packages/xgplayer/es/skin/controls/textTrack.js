import Player from '../../player';

var s_textTrack = function s_textTrack() {
  if (navigator.userAgent.indexOf('Chrome') < 0) {
    return;
  }
  var player = this;
  var root = player.root;
  var util = Player.util;
  var sniffer = Player.sniffer;
  var controls = player.controls;
  var container = util.createDom('xg-texttrack', '', { tabindex: 7 }, 'xgplayer-texttrack');
  var list = player.config.textTrack;
  if (list && Array.isArray(list) && list.length > 1) {
    util.addClass(player.root, 'xgplayer-is-texttrack');
    player.on('canplay', function () {
      var tmp = ['<ul>'];
      tmp.push('<li class=\'\'}\'>\u5173\u95ED</li>');
      list.forEach(function (item) {
        tmp.push('<li class=\'' + (item.default ? 'selected' : '') + '\'>' + item.label + '</li>');
      });
      var controlText = player.lang.TEXTTRACK;
      tmp.push('</ul><p class="name"><em>' + controlText + '</em></p>');

      var urlInRoot = root.querySelector('.xgplayer-texttrack');
      if (urlInRoot) {
        urlInRoot.innerHTML = tmp.join('');
        var cur = urlInRoot.querySelector('.name');
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          cur.addEventListener('mouseenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            util.addClass(root, 'xgplayer-texttrack-active');
            urlInRoot.focus();
          });
        }
      } else {
        container.innerHTML = tmp.join('');
        var _cur = container.querySelector('.name');
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          _cur.addEventListener('mouseenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            util.addClass(player.root, 'xgplayer-texttrack-active');
            container.focus();
          });
        }
        player.controls.appendChild(container);
      }
    });
  };

  ['touchend', 'click'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      var li = e.target || e.srcElement;
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
          util.removeClass(item, 'selected');
        });
        util.addClass(li, 'selected');
        var trackDoms = player.root.getElementsByTagName('Track');
        if (li.innerHTML === '关闭') {
          trackDoms[0].track.mode = 'hidden';
          util.removeClass(player.root, 'xgplayer-texttrack-active');
        } else {
          if (!util.hasClass(player.root, 'xgplayer-texttrack-active')) {
            util.addClass(player.root, 'xgplayer-texttrack-active');
          }
          trackDoms[0].track.mode = 'showing';

          list.some(function (item) {
            if (item.label === li.innerHTML) {
              trackDoms[0].src = item.src;
              if (item.kind) {
                trackDoms[0].kind = item.kind;
              }
              trackDoms[0].label = item.label;
              if (item.srclang) {
                trackDoms[0].srclang = item.srclang;
              }
              return true;
            }
          });
          player.emit('textTrackChange', li.innerHTML);
        }
      } else if (player.config.textTrackActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(player.root, 'xgplayer-texttrack-active');
        container.focus();
      }
    }, false);
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(player.root, 'xgplayer-texttrack-active');
  });
};

Player.install('s_textTrack', s_textTrack);