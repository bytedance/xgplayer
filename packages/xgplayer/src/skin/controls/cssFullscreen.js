import Player from '../../player'
import RequestCssFullIcon from '../assets/requestCssFull.svg'
import ExitCssFullIcon from '../assets/exitCssFull.svg'

let s_cssFullscreen = function () {
  let player = this
  let util = Player.util
  if (!player.config.cssFullscreen) { return }
  let btn = util.createDom('xg-cssfullscreen', `<xg-icon class="xgplayer-icon">
                                             <div class="xgplayer-icon-requestfull">${RequestCssFullIcon}</div>
                                             <div class="xgplayer-icon-exitfull">${ExitCssFullIcon}</div>
                                           </xg-icon>`, {}, 'xgplayer-cssfullscreen')

  let tipsText = {}
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS
  let tips = util.createDom('xg-tips', `<span class="xgplayer-tip-requestfull">${tipsText.requestfull}</span>
                                        <span class="xgplayer-tip-exitfull">${tipsText.exitfull}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.emit('cssFullscreenBtnClick')
    })
  })
}

Player.install('s_cssFullscreen', s_cssFullscreen)
