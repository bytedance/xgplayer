import { createDom } from '../../utils/util'
import '../style/controls/poster.scss'

let s_poster = function () {
  let player = this
  let root = player.root
  if (!player.config.poster) {
    return
  }
  let poster = createDom('xg-poster', '', {}, 'xgplayer-poster')
  poster.style.backgroundImage = `url(${player.config.poster})`
  root.appendChild(poster)
}

export default {
  name: 's_poster',
  method: s_poster
}