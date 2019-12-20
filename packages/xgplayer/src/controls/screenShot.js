import Player from '../player'

let screenShot = function () {
  let player = this
  let root = player.root
  if (!player.config.screenShot) {
    return
  }

  let canvas = document.createElement('canvas')
  let canvasCtx = canvas.getContext('2d')
  let img = new Image()
  canvas.width = this.config.width || 600
  canvas.height = this.config.height || 337.5

  let saveScreenShot = function (data, filename) {
    let saveLink = document.createElement('a')
    saveLink.href = data
    saveLink.download = filename
    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    saveLink.dispatchEvent(event)
  }

  function onScreenShotBtnClick (save = true) {
    img.onload = (function () {
      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height)
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      let screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
      player.emit('screenShot', screenShotImg)
      save && saveScreenShot(screenShotImg, '截图.png')
    })()
  }
  player.on('screenShotBtnClick', onScreenShotBtnClick)

  function onDestroy () {
    player.off('screenShotBtnClick', onScreenShotBtnClick)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('screenShot', screenShot)
