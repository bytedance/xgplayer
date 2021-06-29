import { hasClass, addClass, removeClass } from '../utils/util'

let fullscreen = function () {
  let player = this
  let root = player.root

  function onFullscreenBtnClick () {
    if(player.config.rotateFullscreen) {
      if(hasClass(root, 'xgplayer-rotate-fullscreen')) {
        player.exitRotateFullscreen()
      } else {
        player.getRotateFullscreen()
      }
    } else {
      if (hasClass(root, 'xgplayer-is-fullscreen')) {
        player.exitFullscreen(root)
      } else {
        player.getFullscreen(root)
      }
    }
  }
  player.on('fullscreenBtnClick', onFullscreenBtnClick)

  function onFullscreenChange () {
    let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    if (fullscreenEl && fullscreenEl === root) {
      addClass(root, 'xgplayer-is-fullscreen')
      player.emit('requestFullscreen')
    } else if (hasClass(root, 'xgplayer-is-fullscreen')) {
      removeClass(root, 'xgplayer-is-fullscreen')
      player.emit('exitFullscreen')
    }
    if(player.danmu && typeof player.danmu.resize === 'function') {
      player.danmu.resize()
    }
  };
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
    document.addEventListener(item, onFullscreenChange)
  })

  player.video.addEventListener("webkitbeginfullscreen", function(){
    addClass(root, 'xgplayer-is-fullscreen')
    player.emit('requestFullscreen')
  })

  player.video.addEventListener("webkitendfullscreen", function(){
    removeClass(root, 'xgplayer-is-fullscreen')
    player.emit('exitFullscreen')
  })

  function onDestroy () {
    player.off('fullscreenBtnClick', onFullscreenBtnClick);
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
      document.removeEventListener(item, onFullscreenChange)
    })
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)

  player.getFullscreen = function (el) {
    let player = this
    if (el.requestFullscreen) {
      let fullscreenPromise = el.requestFullscreen()
      if (fullscreenPromise) {
        fullscreenPromise.catch(function () {
          player.emit('fullscreen error')
        })
      }
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      addClass(el, 'xgplayer-is-cssfullscreen')
    }
  }

  player.exitFullscreen = function (el) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    removeClass(el, 'xgplayer-is-cssfullscreen')
  }

  player.getRotateFullscreen = function () {
    let player = this
    document.documentElement.style.width = '100%'
    document.documentElement.style.height = '100%'
    if (player.config.fluid) {
      player.root.style['padding-top'] = ''
      player.root.style['max-width'] = 'unset'
    }
    if (player.root && !hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      addClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('getRotateFullscreen')
  }

  player.exitRotateFullscreen = function () {
    let player = this
    document.documentElement.style.width = 'unset'
    document.documentElement.style.height = 'unset'
    if (player.config.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${player.config.height * 100 / player.config.width}%`
      player.root.style['max-width'] = '100%'
    }
    if (player.root && hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      removeClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('exitRotateFullscreen')
  }
}

export default {
  name: 'fullscreen',
  method: fullscreen
}