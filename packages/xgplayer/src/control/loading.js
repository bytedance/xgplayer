import Player from '../player'

let loading = function () {
  let player = this; let util = Player.util; let container = util.createDom('xg-loading', `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewbox="0 0 100 100">
      <path d="M100,50A50,50,0,1,1,50,0"></path>
    </svg>
    `, {}, 'xgplayer-loading')
  player.root.appendChild(container)
  player.once('destroy', () => {
    container = null
  })
}

Player.install('loading', loading)
