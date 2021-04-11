import { createDom, format } from '../../utils/util'
import '../style/controls/time.scss'

let s_time = function () {
  let player = this
  let container = createDom('xg-time', `<span class="xgplayer-time-current">${player.currentTime || format(0)}</span>
                                           <span>${player.duration || format(0)}</span>`, {}, 'xgplayer-time')
  player.once('ready', () => {
    if(player.controls) {
      player.controls.appendChild(container)
    }
  })
  let onTimeChange = function () {
    // let liveText = player.lang.LIVE
    // if(player.duration === Infinity) {
    //   addClass(player.root, 'xgplayer-is-live')
    //   if(!findDom(player.root, '.xgplayer-live')) {
    //     const live = createDom('xg-live', liveText, {}, 'xgplayer-live')
    //     player.controls.appendChild(live)
    //   }
    // }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      container.innerHTML = `<span class="xgplayer-time-current">${format(player.currentTime || 0)}</span>` + `<span>${format(player.duration)}</span>`
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

export default {
  name: 's_time',
  method: s_time
}