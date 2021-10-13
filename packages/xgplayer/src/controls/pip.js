
import { PresentationMode, checkWebkitSetPresentationMode } from '../utils/util'

let pip = function () {
  let player = this
  function onPipBtnClick () {
    if (player.video !== document.pictureInPictureElement) {
      player.video.requestPictureInPicture()
    } else {
      document.exitPictureInPicture()
    }
  }
  player.on('pipBtnClick', onPipBtnClick)

  const onWebkitpresentationmodechanged = (e) => {
    const mode = player.video.webkitPresentationMode
    this.pMode = mode
    if (mode === PresentationMode.PIP) {
      // 进入pip模式
      player.emit('requestPictureInPicture', e.pictureInPictureWindow)
    } else if (mode === PresentationMode.INLINE) {
      // 退出pip，进去inline模式
      player.emit('exitPictureInPicture')
    }
  }

  player.video.addEventListener('enterpictureinpicture', function (pipWindow) {
    player.emit('requestPictureInPicture', pipWindow)
  })

  player.video.addEventListener('leavepictureinpicture', function () {
    player.emit('exitPictureInPicture')
  })

  checkWebkitSetPresentationMode(player.video) &&
  player.video.addEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged)

  function onDestroy () {
    player.off('pipBtnClick', onPipBtnClick)
    player.off('destroy', onDestroy)
    checkWebkitSetPresentationMode(player.video) &&
    player.video.removeEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'pip',
  method: pip
}
