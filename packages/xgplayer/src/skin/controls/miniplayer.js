import { createDom } from '../../utils/util'
import '../style/controls/miniplayer.scss'

let s_miniplayer = function () {
  let player = this
  if (!player.config.miniplayer) { return }
  let miniplayer = player.lang.MINIPLAYER
  let btn = createDom('xg-miniplayer', `<p class="name"><span>${miniplayer}</span></p>`, {tabindex: 9}, 'xgplayer-miniplayer')

  player.once('ready', () => {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('miniplayerBtnClick')
    })
  })
}

export default {
  name: 's_miniplayer',
  method: s_miniplayer
}