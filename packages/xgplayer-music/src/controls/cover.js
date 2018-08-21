import Player from '../music'

const cover = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const poster = util.createDom('xg-poster', `<img src="${player.config.poster}">`, {}, 'xgplayer-poster')
  controlEl.appendChild(poster)
}

Player.install('cover', cover)
