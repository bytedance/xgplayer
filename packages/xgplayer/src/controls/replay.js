import Player from '../player'

let replay = function () {
  let player = this
  let util = Player.util
  let root = player.root

  function onReplayBtnClick () {
    util.removeClass(root, 'replay')
    player.replay()
  }
  player.on('replayBtnClick', onReplayBtnClick)

  function onEnded () {
    if (!player.config.loop) {
      util.addClass(root, 'replay')
    }
  }
  player.on('ended', onEnded)

  function onDestroy () {
    player.off('replayBtnClick', onReplayBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('replay', replay)
