import Player from '../player'

let mobile = function () {
  let player = this
  let util = Player.util; let controls = player.controls; let root = player.root

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

  function onReady (e) {
    player.video.addEventListener('touchend', function (e) {
      player.onElementTouchend(e, player.video)
    })
    player.video.addEventListener('touchstart', () => {
      player.isTouchMove = false
    })
    player.video.addEventListener('touchmove', () => {
      player.isTouchMove = true
    })
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
