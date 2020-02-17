import Player from '../../player';

var s_error = function s_error() {
  var player = this;
  var root = player.root;
  var util = Player.util;

  var error = util.createDom('xg-error', '<em class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</em>', {}, 'xgplayer-error');
  player.once('ready', function () {
    root.appendChild(error);
  });

  var text = error.querySelector('.xgplayer-error-text');
  var refresh = null;

  function onError() {
    // player.controls.style.display = 'none'
    if (player.error) {
      text.innerHTML = player.error;
    } else {
      if (player.config.lang && player.config.lang === 'zh-cn') {
        text.innerHTML = player.lang.ERROR + '\uFF0C\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5';
      } else {
        text.innerHTML = player.lang.ERROR + '\uFF0Cplease try to <span class="xgplayer-error-refresh">refresh</span>';
      }
    }
    util.addClass(player.root, 'xgplayer-is-error');
    refresh = error.querySelector('.xgplayer-error-refresh');
    if (refresh) {
      ['touchend', 'click'].forEach(function (item) {
        refresh.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          var p = e.target || e.srcElement;
          if (p && p.tagName.toLocaleLowerCase() === 'span') {
            player.controls.style.display = 'flex';
            player.reload();
          }
        });
      });
    }
  }
  player.on('error', onError);
  function onDestroy() {
    player.off('error', onError);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('s_error', s_error);