import Player from '../player'

let flex = function () {
  let player = this; let util = Player.util
  let playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder')
  player.controls.appendChild(playceholder)
}

Player.install('__flex__', flex)
