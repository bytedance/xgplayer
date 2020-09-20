import Player from '../../player'
import ReplayIcon from '../assets/replay.svg'

let s_replay = function () {
  let player = this
  let util = Player.util
  let root = player.root

  let replayText = player.lang.REPLAY
  let btn = util.createDom('xg-replay', `${ReplayIcon}
                                         <xg-replay-txt class="xgplayer-replay-txt">${replayText}</xg-replay-txt>
                                        `, {}, 'xgplayer-replay')
  player.once('ready', () => {
    root.appendChild(btn)
  })

  function onEnded () {
    let path = btn.querySelector('path')
    if(path) {
      let transform = window.getComputedStyle(path).getPropertyValue('transform')
      if(typeof transform === 'string' && transform.indexOf('none') > -1) {
        return
      } else {
        path.setAttribute('transform', transform)
      }
    }
  }
  player.on('ended', onEnded)

  let svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(item => {
    svg.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.emit('replayBtnClick')
    })
  })

  function destroyFunc () {
    player.off('ended', onEnded)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('s_replay', s_replay)
