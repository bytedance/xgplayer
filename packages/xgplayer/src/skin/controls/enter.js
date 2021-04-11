import { createDom } from '../../utils/util'
import '../style/controls/enter.scss'

let s_enter = function () {
  let player = this
  let root = player.root

  let barStr = ''
  for(let i = 1; i <= 12; i++) {
    barStr += `<div class="xgplayer-enter-bar${i}"></div>`
  }
  let enter = createDom('xg-enter', `<div class="xgplayer-enter-spinner">
                                                  ${barStr}
                                                </div>`, {}, 'xgplayer-enter');
  root.appendChild(enter)
}

export default {
  name: 's_enter',
  method: s_enter
}