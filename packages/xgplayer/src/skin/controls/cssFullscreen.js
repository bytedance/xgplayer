import { createDom } from '../../utils/util'
import RequestCssFullIcon from '../assets/requestCssFull.svg'
import ExitCssFullIcon from '../assets/exitCssFull.svg'
import '../style/controls/cssfullscreen.scss'

let s_cssFullscreen = function () {
  let player = this
  if (!player.config.cssFullscreen) { return }
  let btn = createDom('xg-cssfullscreen', `<xg-icon class="xgplayer-icon">
                                             <div class="xgplayer-icon-requestfull">${RequestCssFullIcon}</div>
                                             <div class="xgplayer-icon-exitfull">${ExitCssFullIcon}</div>
                                           </xg-icon>`, {}, 'xgplayer-cssfullscreen')

  let tipsText = {}
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-requestfull">${tipsText.requestfull}</span>
                                        <span class="xgplayer-tip-exitfull">${tipsText.exitfull}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('cssFullscreenBtnClick')
    })
  })
}

export default {
  name: 's_cssFullscreen',
  method: s_cssFullscreen
}