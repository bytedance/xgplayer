import Player from '../../player'

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

Player.install('s_poster', s_poster)
