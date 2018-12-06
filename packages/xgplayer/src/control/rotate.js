import Player from '../player'

const rotate = function () {
  let player = this
  if (!this.config.rotate) { return }
  let util = Player.util
  let btn = util.createDom('xg-rotate', '<div class="xgplayer-rotate-img"></div>', {}, 'xgplayer-rotate')
  let root = player.root
  root.appendChild(btn)
  let rotateDeg = 0
  if (!player.rotate) {
    player.rotate = function () {
      let width = player.root.offsetWidth
      let height = player.root.offsetHeight

      player.root.style.width = height + 'px'
      player.root.style.height = width + 'px'

      rotateDeg = (rotateDeg + 0.25) % 1
      let scale
      if (rotateDeg === 0.25 || rotateDeg === 0.75) {
        if (width >= height) {
          scale = (width / height).toFixed(2)
        } else {
          scale = (height / width).toFixed(2)
        }
      } else {
        scale = 1
      }
      player.video.style.transform = `rotate(${rotateDeg}turn) scale(${scale})`
      player.video.style.webKitTransform = `rotate(${rotateDeg}turn) scale(${scale})`
      player.emit('rotate', rotateDeg * 360)
    }
  }
  btn.addEventListener('click', player.rotate)
}

Player.install('rotate', rotate)
