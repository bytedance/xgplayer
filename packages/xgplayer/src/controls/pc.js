import Player from '../player'

let pc = function () {
  let player = this
  let util = Player.util; let controls = player.controls; let root = player.root
  let clk = 0; let _click_

  player.onElementClick = function (e, element) {
    e.preventDefault()
    if(!this.config.closeVideoStopPropagation) {
      e.stopPropagation()
    }
    let player = this
    if (!player.config.closeVideoClick) {
      clk++
      if (_click_) {
        clearTimeout(_click_)
      }
      if (clk === 1) {
        _click_ = setTimeout(function () {
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
          clk = 0
        }, 200)
      } else {
        clk = 0
      }
    }
  }
  player.video.addEventListener('click', function (e) { player.onElementClick(e, player.video) }, false)

  player.onElementDblclick = function (e, element) {
    e.preventDefault()
    e.stopPropagation()
    let player = this
    if (!player.config.closeVideoDblclick) {
      let fullscreen = controls.querySelector('.xgplayer-fullscreen')
      if (fullscreen) {
        let clk
        if (document.createEvent) {
          clk = document.createEvent('Event')
          clk.initEvent('click', true, true)
        } else {
          clk = new Event('click')
        }
        fullscreen.dispatchEvent(clk)
      }
    }
  }
  player.video.addEventListener('dblclick', function (e) { player.onElementDblclick(e, player.video) }, false)

  function onMouseEnter () {
    clearTimeout(player.leavePlayerTimer)
    player.emit('focus', player)
  }
  root.addEventListener('mouseenter', onMouseEnter)

  function onMouseLeave () {
    if(!player.config.closePlayerBlur) {
      player.leavePlayerTimer = setTimeout(function () {
        player.emit('blur', player)
      }, player.config.leavePlayerTime || 0)
    }
  }
  root.addEventListener('mouseleave', onMouseLeave)

  function onControlMouseEnter (e) {
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
  }
  controls.addEventListener('mouseenter', onControlMouseEnter, false)

  function onControlMouseLeave (e) {
    if(!player.config.closeControlsBlur) {
      player.emit('focus', player)
    }
  }
  controls.addEventListener('mouseleave', onControlMouseLeave, false)

  function onReady (e) {
    if (player.config.autoplay) {
      player.start()
    }
  }
  player.once('ready', onReady)

  function onDestroy () {
    root.removeEventListener('mouseenter', onMouseEnter)
    root.removeEventListener('mouseleave', onMouseLeave)
    player.off('ready', onReady)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('pc', pc)
