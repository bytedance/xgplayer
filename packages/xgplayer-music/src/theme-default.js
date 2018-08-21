import Player from '../music'

const defualtTheme = function (player) {
  const config = player.config
  const util = player.constructor.util
  const controlEl = player.controls

  if (!config.controls) {
    player.root.style.display = 'none'
    return
  }
  util.addClass(player.root, 'xgplayer-music-default')
  if (!config.theme || config.theme === 'default') {
    if (!config.width) {
      player.config.width = '100%'
      player.root.style.width = '100%'
    }
    if (!config.height) {
      player.config.height = '50px'
      player.root.style.height = '50px'
    }
  }
  const prev = util.createDom('xg-prev', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform = "scale(0.025 0.025)"
            d="M600 1140v-768h128v352l320-320v704l-320-320v352zz"></path>
        </svg></xg-icon>`, {}, 'xgplayer-prev')
  controlEl.appendChild(prev)
  const ev = ['click', 'touchstart']
  ev.forEach(item => {
    prev.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.prev()
    }, false)
  })
  const next = util.createDom('xg-next', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform="scale(0.025 0.025)"
            d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>
        </svg></xg-icon>`, {}, 'xgplayer-next')
  controlEl.appendChild(next)
  ev.forEach(item => {
    next.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.next()
    }, false)
  })

  const name = util.createDom('xg-name', `${player.config.name}`, {}, 'xgplayer-name')
  controlEl.appendChild(name)

  const poster = util.createDom('xg-poster', `<img src="${player.config.poster}">`, {}, 'xgplayer-poster')
  controlEl.appendChild(poster)
}

Player.install('theme-default', defualtTheme)
