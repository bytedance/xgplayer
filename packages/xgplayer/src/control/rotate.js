import Player from '../player'

const rotate = function () {
  let player = this
  if (!this.config.rotate) { return }
  if (this.config.rotate === true) {
    this.config.rotate = {}
  }
  let util = Player.util
  let btn = util.createDom('xg-rotate', '<xg-icon class="xgplayer-icon xgplayer-rotate-img"></xg-icon>', {}, 'xgplayer-rotate')
  let tipsRotate = player.config.lang && player.config.lang === 'zh-cn' ? '旋转' : 'Rotate'
  let tips = util.createDom('xg-tips', tipsRotate, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  let root = player.controls
  root.appendChild(btn)

  let rotateDeg = 0
  player.rotate = function () {
    let width = player.root.offsetWidth
    let height = player.root.offsetHeight

    if (!player.config.rotate.innerRotate) {
      player.root.style.width = height + 'px'
      player.root.style.height = width + 'px'
    }

    let factor = player.config.rotate.clockwise ? 1 : -1

    rotateDeg = (rotateDeg + 1 + factor * 0.25) % 1
    let scale
    if (rotateDeg === 0.25 || rotateDeg === 0.75) {
      if (player.config.rotate.innerRotate) {
        if (width >= height) { scale = (height / width).toFixed(2) } else { scale = (width / height).toFixed(2) }
      } else {
        if (width >= height) { scale = (width / height).toFixed(2) } else { scale = (height / width).toFixed(2) }
      }
    } else {
      scale = 1
    }
    
    player.video.style.transformOrigin = 'center center'
    player.video.style.transform = `rotate(${rotateDeg}turn) scale(${scale})`
    player.video.style.webKitTransform = `rotate(${rotateDeg}turn) scale(${scale})`
    player.emit('rotate', rotateDeg * 360)
  }

  btn.addEventListener('mouseenter', (e) => {
    e.preventDefault()
    e.stopPropagation()
    tips.style.left = '50%'
    let rect = tips.getBoundingClientRect()
    let rootRect = player.root.getBoundingClientRect()
    if (rect.right > rootRect.right) {
      tips.style.left = `${-rect.right + rootRect.right + 16}px`
    }
  })

  btn.addEventListener('click', player.rotate)
  player.once('destroy', function () {
    player.rotate = null
    btn = null
  })
}

Player.install('rotate', rotate)
