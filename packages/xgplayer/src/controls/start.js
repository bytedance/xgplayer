import Player from '../player'

let start = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onCanPlay () {
    player.off('canplay', onCanPlay)
    let playPromise = player.play()
    if (playPromise !== undefined && playPromise) {
      playPromise.catch(err => {})
    }
  }

  function onStartBtnClick () {
    if (util.hasClass(root, 'xgplayer-nostart')) {
      util.removeClass(root, 'xgplayer-nostart') // for ie quick switch
      util.addClass(root, 'xgplayer-is-enter')

      if(typeof root.contains === 'function') {
        if((player.video && player.video.nodeType === 1 && !root.contains(player.video)) && !root.querySelector('canvas')) {
          player.once('canplay', onCanPlay)
          player.start()
        } else {
          onCanPlay()
        }
      } else {
        if (!root.querySelector(this.videoConfig.mediaType) && !root.querySelector('canvas')) {
          player.once('canplay', onCanPlay)
          player.start()
        } else {
          onCanPlay()
        }
      }
    } else {
      if (player.paused) {
        util.removeClass(root, 'xgplayer-nostart xgplayer-isloading')
        setTimeout(() => {
          let playPromise = player.play()
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(err => {})
          }
        }, 10)
      }
    }
  }
  player.on('startBtnClick', onStartBtnClick)

  function onDestroy () {
    player.off('startBtnClick', onStartBtnClick)
    player.off('canplay', onCanPlay)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('start', start)
