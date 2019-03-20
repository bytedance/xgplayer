import Player from '../player'

let poster = function () {
  let player = this; let util = Player.util
  let poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
  let root = player.root
  if (player.config.poster) {
    poster.style.backgroundImage = `url(${player.config.poster})`
    root.appendChild(poster)
  }

  function playFunc () {
    poster.style.display = 'none'
  }
  player.on('play', playFunc)

  function destroyFunc () {
    player.off('play', playFunc)
    player.off('destroy', destroyFunc)
  }
  player.once('destroy', destroyFunc)
}

Player.install('poster', poster)
