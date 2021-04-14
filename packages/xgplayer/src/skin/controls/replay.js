import { createDom } from '../../utils/util'
import ReplayIcon from '../assets/replay.svg'
import '../style/controls/replay.scss'

let s_replay = function () {
  let player = this
  let root = player.root

  let replayText = player.lang.REPLAY
  let btn = createDom('xg-replay', `${ReplayIcon}
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

  function onBtnClick (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  btn.addEventListener('click', onBtnClick)

  let svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(item => {
    svg.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('replayBtnClick')
    })
  })

  function destroyFunc () {
    player.off('ended', onEnded)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

export default {
  name: 's_replay',
  method: s_replay
}