import Player from '../../player'

let s_error = function () {
  let player = this
  let root = player.root
  let util = Player.util

  let error = util.createDom('xg-error', '<span class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</span>', {}, 'xgplayer-error')
  player.once('ready', () => {
    root.appendChild(error)
  });

  let text = error.querySelector('.xgplayer-error-text')
  let refresh = null

  function onError () {
    // player.controls.style.display = 'none'
    // if (player.error) {
    //   text.innerHTML = player.error
    // } else {
    if (player.config.lang && player.config.lang === 'zh-cn') {
      text.innerHTML = player.config.errorTips || `请<span class="xgplayer-error-refresh">刷新</span>试试`
    } else {
      text.innerHTML = player.config.errorTips || `please try to <span class="xgplayer-error-refresh">refresh</span>`
    }
    // }
    util.addClass(player.root, 'xgplayer-is-error')
    refresh = error.querySelector('.xgplayer-error-refresh')
    if (refresh) {
      ['touchend', 'click'].forEach(item => {
        refresh.addEventListener(item, function (e) {
          e.preventDefault()
          e.stopPropagation()
          player.autoplay = true
          player.once('playing', () => {
            util.removeClass(player.root, 'xgplayer-is-error')
          })
          player.src = player.config.url
        })
      })
    }
  }
  player.on('error', onError)
  function onDestroy () {
    player.off('error', onError)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('s_error', s_error)
