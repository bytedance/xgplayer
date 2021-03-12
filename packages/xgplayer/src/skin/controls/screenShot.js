import Player from '../../player'
import '../style/controls/screenShot.scss'

let s_screenShot = function () {
  let player = this
  let util = Player.util
  if (!player.config.screenShot || player.config.screenShot.hideButton) {
    return
  }
  let screenShotText = player.lang.SCREENSHOT
  let btn = util.createDom('xg-screenshot', `<p class="name"><span>${screenShotText}</span></p>`, {tabindex: 11}, 'xgplayer-screenshot')
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.emit('screenShotBtnClick')
    })
  })
}

export default {
  name: 's_screenShot',
  method: s_screenShot
}