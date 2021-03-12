import Player from '../player'

let fullscreen = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onFullscreenBtnClick () {
    if(player.config.rotateFullscreen) {
      if(util.hasClass(root, 'xgplayer-rotate-fullscreen')) {
        player.exitRotateFullscreen()
      } else {
        player.getRotateFullscreen()
      }
    } else {
      if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
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
      util.addClass(root, 'xgplayer-is-fullscreen')
      player.emit('requestFullscreen')
    } else if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
      util.removeClass(root, 'xgplayer-is-fullscreen')
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
    util.addClass(root, 'xgplayer-is-fullscreen')
    player.emit('requestFullscreen')
  })

  player.video.addEventListener("webkitendfullscreen", function(){
    util.removeClass(root, 'xgplayer-is-fullscreen')
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
      util.addClass(el, 'xgplayer-is-cssfullscreen')
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
    util.removeClass(el, 'xgplayer-is-cssfullscreen')
  }

  player.getRotateFullscreen = function () {
    let player = this
    document.documentElement.style.width = '100%'
    document.documentElement.style.height = '100%'
    if (player.root && !Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      Player.util.addClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('getRotateFullscreen')
  }

  player.exitRotateFullscreen = function () {
    let player = this
    document.documentElement.style.width = 'unset'
    document.documentElement.style.height = 'unset'
    if (player.root && Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
      Player.util.removeClass(player.root, 'xgplayer-rotate-fullscreen')
    }
    player.emit('exitRotateFullscreen')
  }
}

export default {
  name: 'fullscreen',
  method: fullscreen
}