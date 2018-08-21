import Player from '../music'

const meta = (player) => {
  const util = Player.util
  const controlEl = player.controls
  const name = util.createDom('xg-name', `${player.config.name}`, {}, 'xgplayer-name')
  controlEl.appendChild(name)
}

Player.install('meta', meta)
