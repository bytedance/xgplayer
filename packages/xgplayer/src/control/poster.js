import Player from '../player'

let poster = function () {
  let player = this; let util = Player.util
  let poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
  let root = player.root
  if (player.config.poster) {
    poster.style.backgroundImage = `url(${player.config.poster})`
    root.appendChild(poster)
  }
  player.on('play', () => {
    poster.style.display = 'none'
  })
}

Player.install('poster', poster)
