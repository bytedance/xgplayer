import Player from '../../player'
import StartPlayIcon from '../assets/startPlay.svg'
import StartPauseIcon from '../assets/startPause.svg'

let s_start = function () {
  let player = this
  let root = player.root
  let util = Player.util
  let btn = util.createDom('xg-start', `<div class="xgplayer-icon-play">${StartPlayIcon}</div>
                                      <div class="xgplayer-icon-pause">${StartPauseIcon}</div>`, {}, 'xgplayer-start')
  player.once('ready', () => {
    root.appendChild(btn)
  });

  btn.onclick = e => {
    e.preventDefault()
    e.stopPropagation()
    player.emit('startBtnClick')
  }

  player.once('ready', () => {
    // if(!Object.keys(Player.plugins).some(item => { return item.indexOf('xgplayer-skin-') > -1 })) {
    // }
    util.addClass(player.root, 'xgplayer-skin-default')
    if(player.config.lang && player.config.lang === 'en') {
      util.addClass(player.root, 'lang-is-en')
    } else if(player.config.lang === 'jp') {
      util.addClass(player.root, 'lang-is-jp')
    }
  })
}

Player.install('s_start', s_start)
