let pip = function () {
  let player = this
  function onPipBtnClick () {
    if (player.video !== document.pictureInPictureElement) {
      player.video.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  }
  player.on('pipBtnClick', onPipBtnClick)

  function onDestroy () {
    player.off('pipBtnClick', onPipBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'pip',
  method: pip
}