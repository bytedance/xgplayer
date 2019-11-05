import Player from '../player'

let play = function () {
  let player = this

  function onPlayBtnClick () {
    if (player.ended) {
      return
    }
    if (player.paused) {
      player.play().catch(err => {})
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

Player.install('play', play)
