import Player from '../music'

const cover = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const poster = util.createDom('xg-cover', `<img src="${player.config.poster || player.config.url[0].poster}">`, {}, 'xgplayer-cover')
  controlEl.appendChild(poster)
  player.on('change', item => {
    poster.innerHTML = `<img src="${item.poster}">`
  })
}

Player.install('cover', cover)
