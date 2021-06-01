import { createDom } from '../../utils/util'
import '../style/controls/placeholder.scss'

let s_flex = function () {
  let player = this
  let playceholder = createDom('xg-placeholder', '', {}, 'xgplayer-placeholder')
  player.controls.appendChild(playceholder)
}

export default {
  name: 's_flex',
  method: s_flex
}