import Player from '../player'

let error = function () {
  let player = this; let util = Player.util; let error = util.createDom('xg-error', '<em class="xgplayer-error-text"></em>，请<span class="xgplayer-error-refresh">刷新</span>试试 ', {}, 'xgplayer-error')
  player.root.appendChild(error)
  let text = error.querySelector('.xgplayer-error-text')
  let refresh = error.querySelector('.xgplayer-error-refresh')
  player.on('error', function () {
    text.textContent = player.lang[player.video.error.message] || player.lang.ERROR
    util.addClass(player.root, 'xgplayer-is-error')
  });

  ['touchstart', 'click'].forEach(item => {
    refresh.addEventListener(item, function (e) {
      player.reload()
    })
  })

  player.once('destroy', () => {
    refresh = null
    error = null
  })
}

Player.install('error', error)
