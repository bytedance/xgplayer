import Player from '../../player'
import StartPlayIcon from '../assets/startPlay.svg'
import StartPauseIcon from '../assets/startPause.svg'

let s_start = function () {
  let player = this
  let root = player.root
  let util = Player.util
  let btn = util.createDom('xg-start', `<div class="xgplayer-icon-play">${StartPlayIcon}</div>
                                      <div class="xgplayer-icon-pause">${StartPauseIcon}</div>`, {}, 'xgplayer-start')
  function onPlayerReady(player) {
    util.addClass(player.root, 'xgplayer-skin-default')
    if (player.config) {
      player.config.autoplay && !util.isWeiXin() && util.addClass(player.root, 'xgplayer-is-enter')
      if (player.config.lang && player.config.lang === 'en') {
        util.addClass(player.root, 'lang-is-en')
      } else if (player.config.lang === 'jp') {
        util.addClass(player.root, 'lang-is-jp')
      }
      if(!player.config.enableContextmenu) {
        player.video.addEventListener('contextmenu', e => {
          e.preventDefault()
          e.stopPropagation()
        })
      }
    }
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
    util.removeClass(player.root, 'xgplayer-is-enter')
    util.addClass(player.root, 'xgplayer-nostart')
  })

  player.once('canplay', () => {
    util.removeClass(player.root, 'xgplayer-is-enter')
  })

  btn.onclick = e => {
    e.preventDefault()
    e.stopPropagation()
    player.emit('startBtnClick')
  }
}

Player.install('s_start', s_start)
