import { POSITIONS, Events } from '../../plugin'
import IconPlugin from '../common/iconPlugin'
import './index.scss'

export default class ScreenShot extends IconPlugin {
  static get pluginName () {
    return 'screenShot'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 5,
      quality: 0.92,
      type: 'image/png',
      format: '.png',
      width: 600,
      height: 337,
      fitVideo: true,
      disable: false,
      name: 'screenshot'
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.screenShot === 'boolean') {
      args.config.disable = !args.player.config.screenShot
    }
  }

  afterCreate () {
    super.afterCreate()
    this.appendChild('.xgplayer-icon', this.icons.screenshotIcon)
    const { config } = this
    this.initSize = (data) => {
      if (config.fitVideo) {
        config.width = data.vWidth
        config.height = data.vHeight
      }
    }
    this.once(Events.VIDEO_RESIZE, this.initSize)
    // fix 截图下载报错问题
    if (this.player) {
      this.player.crossOrigin = 'anonymous'
    }
  }

  onPluginsReady () {
    this.show()
    this.onClickBtn = this.onClickBtn.bind(this)
    this.bind(['click', 'touchend'], this.onClickBtn)
  }

  saveScreenShot (data, filename) {
    const saveLink = document.createElement('a')
    saveLink.href = data
    saveLink.download = filename
    const event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    saveLink.dispatchEvent(event)
  }

  createCanvas (width, height) {
    const canvas = document.createElement('canvas')
    const canvasCtx = canvas.getContext('2d')

    this.canvasCtx = canvasCtx
    this.canvas = canvas

    canvas.width = width || this.config.width
    canvas.height = height || this.config.height

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality
    canvasCtx.imageSmoothingEnabled = true
    if (canvasCtx.imageSmoothingEnabled) {
      canvasCtx.imageSmoothingQuality = 'high'
    }
  }

  onClickBtn (e) {
    e.preventDefault()
    e.stopPropagation()
    this.emitUserAction(e, 'shot')
    this.shot().then((data) => {
      this.emit(Events.SCREEN_SHOT, data)
      this.saveScreenShot(data, this.config.name + this.config.format)
    })
  }

  shot (width, height, option = { quality: 0.92, type: 'image/png' }) {
    const { config, player } = this
    const quality = option.quality || config.quality
    const type = option.type || config.type
    return new Promise((resolve, reject) => {
      let canvas = null
      let canvasCtx

      if (player.media.canvas) {
        canvas = player.media.canvas
      } else {
        if (!this.canvas) {
          this.createCanvas(width, height)
        } else {
          this.canvas.width = width || config.width
          this.canvas.height = height || config.height
        }
        canvas = this.canvas
        canvasCtx = this.canvasCtx

        const mediaRatio = player.media.videoWidth / player.media.videoHeight
        const canvasRatio = canvas.width / canvas.height
        const sx = 0, sy = 0, sw = player.media.videoWidth, sh = player.media.videoHeight
        let dx, dy, dw, dh

        if (mediaRatio > canvasRatio) {
          dw = canvas.width
          dh = canvas.width / mediaRatio
          dx = 0
          dy = Math.round((canvas.height - dh) / 2)
        } else if (mediaRatio === canvasRatio) {
          dw = canvas.width
          dh = canvas.height
          dx = 0
          dy = 0
        } else if (mediaRatio < canvasRatio) {
          dw = canvas.height * mediaRatio
          dh = canvas.height
          dx = Math.round((canvas.width - dw) / 2)
          dy = 0
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        canvasCtx.drawImage(player.media, sx, sy, sw, sh, dx, dy, dw, dh)
      }
      let src = canvas.toDataURL(type, quality).replace(type, 'image/octet-stream')
      src = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
      resolve(src)
    })
  }

  registerIcons () {
    return {
      screenshotIcon: null
    }
  }

  destroy () {
    super.destroy()
    this.unbind(['click', 'touchend'], this.onClickBtn)
    this.off(Events.VIDEO_RESIZE, this.initSize)
  }

  render () {
    if (this.config.disable) {
      return
    }
    const className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-text'
    const langKey = 'SCREENSHOT'
    return `
      <xg-icon class="xgplayer-shot">
      <div class="${className}">
      ${this.icons.screenshotIcon ? '' : `<span lang-key="${this.i18nKeys[langKey]}">${this.i18n[langKey]}</span>`}
      </div>
    </xg-icon>`
  }
}
