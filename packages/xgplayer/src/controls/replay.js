import { addClass, removeClass } from '../utils/util'

let replay = function () {
  let player = this
  let root = player.root

  function onReplayBtnClick () {
    removeClass(root, 'xgplayer-is-replay')
    player.replay()
  }
  player.on('replayBtnClick', onReplayBtnClick)

  function onEnded () {
    if (!player.config.loop) {
      addClass(root, 'xgplayer-is-replay')
    }
  }
  player.on('ended', onEnded)

  function onDestroy () {
    player.off('replayBtnClick', onReplayBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'replay',
  method: replay
}