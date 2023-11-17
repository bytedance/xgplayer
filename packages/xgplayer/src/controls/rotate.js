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

  player.updateRotateDeg = function () {
    const player = this
    const {root, video} = player
    if (!player.rotateDeg) {
      player.rotateDeg = 0
    }

    let width = root.offsetWidth
    let height = root.offsetHeight
    let styleWidth = root.style.width || ''
    let styleHeight = root.style.height || ''

    let targetWidth = video.videoWidth
    let targetHeight = video.videoHeight

    let scale
    if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
      if (player.config.rotate.innerRotate) {
        if ((targetWidth / targetHeight) > (height / width)) { // 旋转后纵向撑满
          let videoWidth = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoWidth = height * targetWidth / targetHeight
          } else { // 旋转前是横向撑满
            videoWidth = width
          }
          scale = height / videoWidth
        } else { // 旋转后横向撑满
          let videoHeight = 0
          if ((targetHeight / targetWidth) > (height / width)) { // 旋转前是纵向撑满
            videoHeight = height
          } else { // 旋转前是横向撑满
            videoHeight = width * targetHeight / targetWidth
          }
          scale = width / videoHeight
        }
      } else {
        if (width >= height) {
          scale = width / height
        } else {
          scale = height / width
        }
      }
      scale = Number(scale.toFixed(5))
    } else {
      scale = 1
    }

    if (player.config.rotate.innerRotate) {
      video.style.transformOrigin = 'center center'
      video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
      video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
    } else {
      if (player.config.rotate.controlsFix) {
        video.style.transformOrigin = 'center center'
        video.style.transform = `rotate(${player.rotateDeg}turn) scale(${scale})`
        video.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${scale})`
      } else {
        root.style.transformOrigin = 'center center'
        root.style.transform = `rotate(${player.rotateDeg}turn) scale(${1})`
        root.style.webKitTransform = `rotate(${player.rotateDeg}turn) scale(${1})`
      }

      if (!player.config.rotate.innerRotate && player.config.rotate.controlsFix) {
        root.style.width = height + 'px'
        root.style.height = width + 'px'
      } else {
        if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
          // 超过视口宽高，则限制旋转后的宽高，以解决控制条不见的问题
          if (height > window.innerWidth) {
            root.style.height = window.innerWidth + 'px'
          }
          if (width > window.innerHeight) {
            root.style.width = window.innerHeight + 'px'
          }
        } else {
          // reset
          root.style.width = styleWidth || ''
          root.style.height = styleHeight || ''
        }
      }
    }
  }

  player.rotate = function (clockwise = false, innerRotate = true, times = 1) {
    let player = this
    if (!player.rotateDeg) {
      player.rotateDeg = 0
    }
    let factor = clockwise ? 1 : -1

    player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1
    this.updateRotateDeg()

    player.emit('rotate', player.rotateDeg * 360)
  }
}

export default {
  name: 'rotate',
  method: rotate
}
