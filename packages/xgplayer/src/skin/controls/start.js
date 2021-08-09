import { createDom, addClass, removeClass, isWeiXin, isUc } from '../../utils/util'
import StartPlayIcon from '../assets/startPlay.svg'
import StartPauseIcon from '../assets/startPause.svg'
import '../style/controls/start.scss'

let s_start = function () {
  let player = this
  let root = player.root
  let btn = createDom('xg-start', `<div class="xgplayer-icon-play">${StartPlayIcon}</div>
                                      <div class="xgplayer-icon-pause">${StartPauseIcon}</div>`, {}, 'xgplayer-start')
  function onPlayerReady(player) {
    addClass(player.root, 'xgplayer-skin-default')
    if (player.config) {
      player.config.autoplay && !isWeiXin() && !isUc() && addClass(player.root, 'xgplayer-is-enter')
      if (player.config.lang && player.config.lang === 'en') {
        addClass(player.root, 'xgplayer-lang-is-en')
      } else if (player.config.lang === 'jp') {
        addClass(player.root, 'xgplayer-lang-is-jp')
      }
      if(!player.config.enableContextmenu) {
        player.video.addEventListener('contextmenu', e => {
          e.preventDefault()
          e.stopPropagation()
        })
      }
    }
  }

  if(player.config && player.config.hideStartBtn) {
    addClass(root, 'xgplayer-start-hide')
  }

  if (player.isReady) {
    root.appendChild(btn)
    onPlayerReady(player)
  } else {
    player.once('ready', () => {
      root.appendChild(btn)
      onPlayerReady(player)
    });
  }

  player.once('autoplay was prevented', () => {
    removeClass(player.root, 'xgplayer-is-enter')
    addClass(player.root, 'xgplayer-nostart')
  })

  player.once('canplay', () => {
    removeClass(player.root, 'xgplayer-is-enter')
  })

  btn.onclick = e => {
    e.preventDefault()
    e.stopPropagation()
    player.userGestureTrigEvent('startBtnClick')
  }
}

export default {
  name: 's_start',
  method: s_start
}