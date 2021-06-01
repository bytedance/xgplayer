import { createDom } from '../../utils/util'
import RotateIcon from '../assets/rotate.svg'
import '../style/controls/rotate.scss'

let s_rotate = function () {
  let player = this
  if (!player.config.rotate) { return }
  let btn = createDom('xg-rotate', `<xg-icon class="xgplayer-icon">${RotateIcon}</xg-icon>`, {}, 'xgplayer-rotate')

  let tipsText = player.lang.ROTATE_TIPS
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-rotate">${tipsText}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('rotateBtnClick')
    })
  })
}

export default {
  name: 's_rotate',
  method: s_rotate
}