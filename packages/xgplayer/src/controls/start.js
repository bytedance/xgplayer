import { addClass, hasClass, removeClass } from '../utils/util'

let start = function () {
  let player = this
  let root = player.root

  function onCanPlay () {
    player.off('canplay', onCanPlay)
    let playPromise = player.play()
    if (playPromise !== undefined && playPromise) {
      playPromise.catch(err => {})
    }
  }

  function onStartBtnClick () {
    if (hasClass(root, 'xgplayer-nostart')) {
      removeClass(root, 'xgplayer-nostart') // for ie quick switch
      addClass(root, 'xgplayer-is-enter')

      if(typeof root.contains === 'function') {
        if((player.video && player.video.nodeType === 1 && !root.contains(player.video)) || (player.video && player.video.nodeType !== 1 && player.video.mediaSource === undefined)) {
          player.once('canplay', onCanPlay)
          player.start()
        } else {
          onCanPlay()
        }
      } else {
        if((player.video && player.video.nodeType === 1 && !root.querySelector(this.videoConfig.mediaType)) || (player.video && player.video.nodeType !== 1 && player.video.mediaSource === undefined)) {
          player.once('canplay', onCanPlay)
          player.start()
        } else {
          onCanPlay()
        }
      }
    } else {
      if (player.paused) {
        removeClass(root, 'xgplayer-nostart xgplayer-isloading')
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

export default {
  name: 'start',
  method: start
}