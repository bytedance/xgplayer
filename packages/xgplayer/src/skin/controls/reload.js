import { createDom } from '../../utils/util'
import ReloadIcon from '../assets/reload.svg'
import '../style/controls/reload.scss'

let s_reload = function () {
  let player = this
  if (!player.config.reload) { return }
  let btn = createDom('xg-reload', `<xg-icon class="xgplayer-icon">${ReloadIcon}</xg-icon>`, {}, 'xgplayer-reload')

  let tipsText = player.lang.RELOAD_TIPS
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-reload">${tipsText}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('reloadBtnClick')
    })
  })
}

export default {
  name: 's_reload',
  method: s_reload
}