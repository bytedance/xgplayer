import { createDom } from '../../utils/util'
import '../style/controls/pip.scss'

let s_pip = function () {
  let player = this
  if (!player.config.pip || typeof player.video.requestPictureInPicture !== 'function') { return }
  let pip = player.lang.PIP
  let btn = createDom('xg-pip', `<p class="name"><span>${pip}</span></p>`, {tabindex: 9}, 'xgplayer-pip')

  player.once('ready', () => {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('pipBtnClick')
    })
  })
}

export default {
  name: 's_pip',
  method: s_pip
}