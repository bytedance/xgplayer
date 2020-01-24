import Player from '../../player'

let s_time = function () {
  let player = this
  let root = player.root
  let util = Player.util
  let container = util.createDom('xg-time', `<span>${player.currentTime || util.format(0)}</span>
                                           <em>${player.duration || util.format(0)}</em>`, {}, 'xgplayer-time')
  player.once('ready', () => {
    player.controls.appendChild(container)
  })
  let onTimeChange = function () {
    let liveText = player.lang.LIVE
    if(player.duration === Infinity) {
      util.addClass(player.root, 'xgplayer-is-live')
      if(!util.findDom(player.root, '.xgplayer-live')) {
        const live = util.createDom('xg-live', liveText, {}, 'xgplayer-live')
        player.controls.appendChild(live)
      }
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      container.innerHTML = `<span>${util.format(player.currentTime || 0)}</span>` + `<em>${util.format(player.duration)}</em>`
    }
  }
  player.on('durationchange', onTimeChange)
  player.on('timeupdate', onTimeChange)

  function onDestroy () {
    player.off('durationchange', onTimeChange)
    player.off('timeupdate', onTimeChange)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('s_time', s_time)
