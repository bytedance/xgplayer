import Player from '../player'

let memoryPlay = function () {
  let player = this
  player.on('memoryPlayStart', (lastPlayTime) => {
    player.currentTime = lastPlayTime
  })
}

Player.install('memoryPlay', memoryPlay)
