import Player from '../player'

let fullscreen = function () {
  let player = this; let util = Player.util
  let scale = 0.03
  let iconPath = {
    active: 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z',
    default: 'M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z'
  }
  let btn = util.createDom('xg-fullscreen', `<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
            <path transform="scale(${scale} ${scale})" d="${iconPath.default}"></path>
        </svg></xg-icon>`, {}, 'xgplayer-fullscreen')
  let tipsFull = player.config.lang && player.config.lang === 'zh-cn' ? '全屏' : 'Full screen'
  let tipsExitFull = player.config.lang && player.config.lang === 'zh-cn' ? '退出全屏' : 'Exit full screen'
  let root = player.controls; let container = player.root
  let tips = util.createDom('xg-tips', tipsFull, {}, 'xgplayer-tips')
  let path = btn.querySelector('path')
  btn.appendChild(tips)
  let getFullscreen = function (el) {
    path.setAttribute('d', iconPath.active)
    tips.textContent = tipsExitFull
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      util.addClass(el, 'xgplayer-fullscreen-active')
    }
  }
  let exitFullscreen = function (el) {
    path.setAttribute('d', iconPath.default)
    tips.textContent = tipsFull
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else {
      util.removeClass(el, 'xgplayer-fullscreen-active')
    }
  }
  root.appendChild(btn);
  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (util.hasClass(container, 'xgplayer-fullscreen-active') || util.hasClass(container, 'xgplayer-is-fullscreen')) {
        exitFullscreen(container)
      } else {
        getFullscreen(container)
      }
    })
  })
  player.video.addEventListener('webkitendfullscreen', () => {
    player.emit('exitFullscreen')
    path.setAttribute('d', iconPath.default)
  })

  let handle = function (e) {
    let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    if (fullscreenEl && fullscreenEl === container) {
      util.addClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.active)
      tips.textContent = tipsExitFull
      player.emit('requestFullscreen')
    } else {
      util.removeClass(container, 'xgplayer-is-fullscreen')
      path.setAttribute('d', iconPath.default)
      tips.textContent = tipsFull
      player.emit('exitFullscreen')
    }
  }

  btn.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = container.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  });

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
    document.addEventListener(item, handle)
  })

  function destroyFunc () {
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, handle)
    })
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('fullscreen', fullscreen)
