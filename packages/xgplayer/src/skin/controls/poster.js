import Player from '../../player'
import '../style/controls/poster.scss'

let s_poster = function () {
  let player = this
  let root = player.root
  let util = Player.util
  if (!player.config.poster) {
    return
  }
  let poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster')
  poster.style.backgroundImage = `url(${player.config.poster})`
  root.appendChild(poster)
}

export default {
  name: 's_poster',
  method: s_poster
}