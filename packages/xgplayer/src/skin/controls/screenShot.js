import { createDom } from '../../utils/util'
import '../style/controls/screenShot.scss'

let s_screenShot = function () {
  let player = this
  if (!player.config.screenShot || player.config.screenShot.hideButton) {
    return
  }
  let screenShotText = player.lang.SCREENSHOT
  let btn = createDom('xg-screenshot', `<p class="name"><span>${player.config.screenShot.iconText || screenShotText}</span></p>`, {tabindex: 11}, 'xgplayer-screenshot')
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('screenShotBtnClick')
    })
  })
}

export default {
  name: 's_screenShot',
  method: s_screenShot
}