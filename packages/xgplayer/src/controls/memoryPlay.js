let memoryPlay = function () {
  let player = this
  player.on('memoryPlayStart', (lastPlayTime) => {
    setTimeout(() => {
      console.log('memoryPlayStart', lastPlayTime, player.readyState, 11)
      player.currentTime = lastPlayTime
    },)
  })
}

export default {
  name: 'memoryPlay',
  method: memoryPlay
}