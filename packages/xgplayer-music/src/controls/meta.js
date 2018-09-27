import Player from '../music'

const meta = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const name = util.createDom('xg-name', `${player.config.name || player.config.url[0].name}`, {}, 'xgplayer-name')
  controlEl.appendChild(name)
  player.on('change', item => {
    name.innerHTML = `${item.name}`
  })
}

Player.install('meta', meta)
