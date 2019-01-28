import Player from '../player'

let saveScreenShot = function (data, filename) {
  let saveLink = document.createElement('a')
  saveLink.href = data
  saveLink.download = filename
  let event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  saveLink.dispatchEvent(event)
}

let screenShot = function () {
  let player = this
  let util = Player.util
  if (!player.config.screenShot) {
    return
  }
  let btn = util.createDom('xg-screenShot', '<p class="name"><span>截图</span></p>', {tabindex: 11}, 'xgplayer-screenShot')
  let canvas = document.createElement('canvas')
  let canvasCtx = canvas.getContext('2d')
  let img = new Image()
  canvas.width = this.config.width || 600
  canvas.height = this.config.height || 337.5
  let root = player.controls
  root.appendChild(btn)
  let array = ['click', 'touchstart']
  array.forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      img.onload = (function () {
        canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height)
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
        saveScreenShot(screenShotImg, '截图.png')
      })()
    })
  })
}

Player.install('screenShot', screenShot)
