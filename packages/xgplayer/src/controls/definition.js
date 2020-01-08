import Player from '../player'

let definition = function () {
  let player = this
  let root = player.root

  function onDestroy () {
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('definition', definition)
