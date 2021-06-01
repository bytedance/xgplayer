import { createDom, createImgBtn } from '../../utils/util'
import PlayIcon from '../assets/play.svg'
import PauseIcon from '../assets/pause.svg'
import '../style/controls/play.scss'

let s_play = function () {
  let player = this
  let playBtn = player.config.playBtn ? player.config.playBtn : {}
  let btn
  if (playBtn.type === 'img') {
    btn = createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height)
  } else {
    btn = createDom('xg-play', `<xg-icon class="xgplayer-icon">
                                      <div class="xgplayer-icon-play">${PlayIcon}</div>
                                      <div class="xgplayer-icon-pause">${PauseIcon}</div>
                                     </xg-icon>`, {}, 'xgplayer-play')
  }

  let tipsText = {}
  tipsText.play = player.lang.PLAY_TIPS
  tipsText.pause = player.lang.PAUSE_TIPS
  let tips = createDom('xg-tips', `<span class="xgplayer-tip-play">${tipsText.play}</span>
                                        <span class="xgplayer-tip-pause">${tipsText.pause}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    if(player.controls) {
      player.controls.appendChild(btn)
    }
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('playBtnClick')
    })
  })
}

export default {
  name: 's_play',
  method: s_play
}