import Player from '../player'

let miniplayer = function () {
  let player = this
  let util = Player.util
  let root = player.root
  function onMiniplayerBtnClick () {
    if (util.hasClass(root, 'xgplayer-miniplayer-active')) {
      player.exitMiniplayer()
    } else {
      player.getMiniplayer()
    }
  }
  player.on('miniplayerBtnClick', onMiniplayerBtnClick)

  function onDestroy () {
    player.off('miniplayerBtnClick', onMiniplayerBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('miniplayer', miniplayer)
