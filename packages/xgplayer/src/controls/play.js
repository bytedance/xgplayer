let play = function () {
  let player = this

  function onPlayBtnClick () {
    if (!player.config.allowPlayAfterEnded && player.ended) {
      return
    }
    if (player.paused) {
      let playPromise = player.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => {})
      }
    } else {
      player.pause()
    }
  }
  player.on('playBtnClick', onPlayBtnClick)

  function onDestroy () {
    player.off('playBtnClick', onPlayBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'play',
  method: play
}