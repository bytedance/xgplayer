import Player from '../music'

class Meta {
  constructor (player) {
    const util = Player.util
    const progressEl = player.controls.querySelector('.xgplayer-progress')
    const name = util.createDom('xg-name', `${player.config.name || player.config.url[0].name}`, {}, 'xgplayer-name')
    progressEl.appendChild(name)
    player.on('change', item => {
      name.innerHTML = `${item.name}`
    })
  }
}

export default Meta;
