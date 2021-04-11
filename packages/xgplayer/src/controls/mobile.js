import { hasClass } from '../utils/util'

let mobile = function () {
  let player = this
  let root = player.root
  let clk = 0; let _click_
  let clickedTime = {
    first: '',
    second: ''
  }

  player.onElementTouchend = function (e, element) {
    if(!this.config.closeVideoPreventDefault) {
      e.preventDefault()
    }
    if(!this.config.closeVideoStopPropagation) {
      e.stopPropagation()
    }
    let player = this
    if (hasClass(root, 'xgplayer-inactive')) {
      player.emit('focus')
    } else {
      player.emit('blur')
    }
    if (!player.config.closeVideoTouch && !player.isTouchMove) {
      function onTouch() {
        _click_ = setTimeout(function () {
          if (hasClass(player.root, 'xgplayer-nostart')) {
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
      }
      if (!player.config.closeVideoClick) {
        clk++
        if (_click_) {
          clearTimeout(_click_)
        }
        if (clk === 1) {
          if(player.config.enableVideoDbltouch) {
            clickedTime.first = new Date()
          } else {
            onTouch()
          }
        } else if (clk === 2) {
          if(player.config.enableVideoDbltouch) {
            clickedTime.second = new Date()
            if (Math.abs(clickedTime.first - clickedTime.second) < 400) {
              // 双击
              onTouch()
            } else {
              clickedTime.first = new Date()
              clk = 1
            }
          } else {
            clk = 0
          }
        } else {
          clk = 0
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

export default {
  name: 'mobile',
  method: mobile
}