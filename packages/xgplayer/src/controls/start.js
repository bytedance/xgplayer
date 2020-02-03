import Player from '../player'

let start = function () {
  let player = this
  let root = player.root
  let util = Player.util

  function onCanplay () {
    util.removeClass(root, 'xgplayer-is-enter')
  }

  function onPlaying () {
    util.removeClass(root, 'xgplayer-is-enter')
  }

  function onStartBtnClick () {
    if (util.hasClass(root, 'xgplayer-nostart')) {
      util.removeClass(root, 'xgplayer-nostart') // for ie quick switch
      util.addClass(root, 'xgplayer-is-enter')
      player.on('canplay', onCanplay)
      player.once('playing', onPlaying)
      if (!root.querySelector('video')) {
        player.start()
      }
      setTimeout(() => {
		let playPromise = player.play()
		if (playPromise !== undefined && playPromise) {
		  playPromise.catch(err => {})
		}
	  }, 10)
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
    player.off('canplay', onCanplay)
    player.off('playing', onPlaying)
    player.off('startBtnClick', onStartBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('start', start)
