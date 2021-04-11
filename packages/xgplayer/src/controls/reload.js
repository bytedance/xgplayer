import { removeClass } from '../utils/util'

let reload = function () {
  let player = this
  let reloadConfig = player.config.reload
  if (!reloadConfig) { return }

  function onReloadBtnClick () {
    removeClass(player.root, 'xgplayer-is-error')
    player.src = player.config.url
  }
  player.on('reloadBtnClick', onReloadBtnClick)

  function onDestroy () {
    player.off('reloadBtnClick', onReloadBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'reload',
  method: reload
}