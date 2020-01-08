import Player from '../player'

let playNext = function () {
  let player = this
  let root = player.root
  let nextBtn = player.config.playNext
  player.currentVideoIndex = -1

  function onPlayNextBtnClick () {
    if(player.currentVideoIndex + 1 < nextBtn.urlList.length) {
      player.currentVideoIndex++
      player.video.autoplay = true
      player.src = nextBtn.urlList[player.currentVideoIndex]
      player.emit('playerNext', player.currentVideoIndex+1)
    } else {
      player.emit('urlList last')
    }
  }
  player.on('playNextBtnClick', onPlayNextBtnClick)

  function onDestroy () {
    player.off('playNextBtnClick', onPlayNextBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('playNext', playNext)
