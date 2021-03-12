import Player from '../../player'
import '../style/controls/placeholder.scss'

let s_flex = function () {
  let player = this
  let util = Player.util
  let playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder')
  player.controls.appendChild(playceholder)
}

export default {
  name: 's_flex',
  method: s_flex
}