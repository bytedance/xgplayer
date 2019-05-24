import Player from '../../player'
import ReplayIcon from '../assets/replay.svg'

let s_replay = function () {
  let player = this
  let util = Player.util
  let root = player.root
  if (navigator.userAgent.indexOf('iPhone OS 9') > -1) {
    return
  }
  let replayText = player.lang.REPLAY
  let btn = util.createDom('xg-replay', `${ReplayIcon}
                                         <xg-replay-txt class="xgplayer-replay-txt">${replayText}</xg-replay-txt>
                                        `, {}, 'xgplayer-replay')
  player.once('ready', () => {
    root.appendChild(btn)
  })
  let svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(item => {
    svg.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.emit('replayBtnClick')
    })
  })
}

Player.install('s_replay', s_replay)
