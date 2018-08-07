import Player from '../player'

let time = function () {
  let player = this; let util = Player.util
  let format = util.format
  let curtime = util.createDom('xg-time', `<span>${player.currentTime || format(0)}</span><em>${player.duration || format(0)}</em>`, {}, 'xgplayer-time'); let root = player.controls
  root.appendChild(curtime)
  let handle = function () {
    curtime.innerHTML = `<span>${format(player.currentTime || 0)}</span><em>${format(player.duration)}`
  }
  player.on('durationchange', handle)
  player.on('timeupdate', handle)
  player.once('destroy', () => {
    player.off('durationchange', handle)
    player.off('timeupdate', handle)
    curtime = null
  })
}

Player.install('time', time)
