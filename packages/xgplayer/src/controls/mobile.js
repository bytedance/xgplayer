import Player from '../player'

let whitelistPass = (list) => {
  let util = Player.util
  return list.some(item => {
    if (util.typeOf(item) === 'Function') {
      return item.call(this, navigator.userAgent)
    } else if (util.typeOf(item) === 'RegExp') {
      return item.test(navigator.userAgent)
    } else if (util.typeOf(item) === 'String') {
      return navigator.userAgent.indexOf(item) > -1
    } else {
      return false
    }
  })
}

let mobile = function () {
  let player = this
  let util = Player.util; let controls = player.controls; let root = player.root

  let whitelist = player.config.whitelist
  let pass = whitelistPass(whitelist)
  player.mobilePass = pass

  if (pass) {
    player.onElementTouchend = function (e, element) {
      e.preventDefault()
      e.stopPropagation()
      let player = this
      if (util.hasClass(root, 'xgplayer-inactive')) {
        player.emit('focus')
      } else {
        player.emit('blur')
      }
      if (!player.config.closeVideoTouch && !player.isTouchMove) {
        if (util.hasClass(player.root, 'xgplayer-nostart')) {
          return false
        } else if (!player.ended) {
          if (player.paused) {
            let playPromise = player.play()
            if (playPromise !== undefined && playPromise) {
              playPromise.catch(err => {})
            }
          } else {
            player.pause()
          }
        }
      }
    }
    player.video.addEventListener('touchend', function (e) { player.onElementTouchend(e, player.video) }, false)

    player.video.addEventListener('touchstart', () => {
      player.isTouchMove = false
    })

    player.video.addEventListener('touchmove', () => {
      player.isTouchMove = true
    })
  } else {
    util.addClass(root, 'xgplayer-mobile-npassed')
    player.once('ready', function () {
      player.video.controls = player.config.controls
      player.video.controlsList = player.config.controlsList.join(' ')
      if (player.config.poster) {
        player.video.poster = player.config.poster
      }
    })
  }

  function onReady (e) {
    if (player.config.autoplay) {
      player.start()
    }
  }
  player.once('ready', onReady)

  function onDestroy () {
    player.off('ready', onReady)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('mobile', mobile)
