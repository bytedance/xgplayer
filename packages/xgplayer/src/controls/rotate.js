import Player from '../player'

let rotate = function () {
  let player = this
  let rotateConfig = player.config.rotate
  if (!rotateConfig) { return }

  function onRotateBtnClick () {
    player.rotate(rotateConfig.clockwise, rotateConfig.innerRotate)
  }
  player.on('rotateBtnClick', onRotateBtnClick)

  function onDestroy () {
    player.off('rotateBtnClick', onRotateBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('rotate', rotate)
