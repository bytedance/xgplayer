import Player from '../../player'
import '../style/controls/enter.scss'

let s_enter = function () {
  let player = this
  let root = player.root
  let util = Player.util

  let barStr = ''
  for(let i = 1; i <= 12; i++) {
    barStr += `<div class="xgplayer-enter-bar${i}"></div>`
  }
  let enter = util.createDom('xg-enter', `<div class="xgplayer-enter-spinner">
                                                  ${barStr}
                                                </div>`, {}, 'xgplayer-enter');
  root.appendChild(enter)
}

export default {
  name: 's_enter',
  method: s_enter
}