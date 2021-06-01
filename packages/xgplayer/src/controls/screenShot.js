let screenShot = function () {
  let player = this
  let screenShotOptions = player.config.screenShot
  if (!screenShotOptions) {
    return
  }

  player.video.setAttribute('crossOrigin', 'anonymous')

  let encoderOptions = 0.92
  if(screenShotOptions.quality || screenShotOptions.quality === 0) {
    encoderOptions = screenShotOptions.quality
  }
  let type = screenShotOptions.type === undefined ? 'image/png' : screenShotOptions.type
  let format = screenShotOptions.format === undefined ? '.png' : screenShotOptions.format

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

  player.screenShot = function (save = true) {
    save = screenShotOptions.saveImg === undefined ? save : screenShotOptions.saveImg
    canvas.width = player.video.videoWidth || 600
    canvas.height = player.video.videoHeight || 337.5
    img.onload = (function () {
      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height)
      img.src = canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream')
      let screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
      player.emit('screenShot', screenShotImg)
      save && saveScreenShot(screenShotImg, '截图' + format)
    })()
  }
  player.on('screenShotBtnClick', player.screenShot)

  function onDestroy () {
    player.off('screenShotBtnClick', player.screenShot)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'screenShot',
  method: screenShot
}