import Plugin, { POSITIONS, Events } from '../../plugin'

export default class ScreenShot extends Plugin {
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
      name: '截图'
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.screenShot === 'boolean') {
      args.config.disable = !args.player.config.screenShot
    }
  }

  afterCreate () {
    this.appendChild('.xgplayer-icon', this.icons.screenshotIcon)
    const { config } = this
    this.initSize = (data) => {
      if (config.fitVideo) {
        config.width = data.vWidth
        config.height = data.vHeight
      }
    }
    this.once(Events.VIDEO_RESIZE, this.initSize)
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

  createCanvans (width, height) {
    const canvas = document.createElement('canvas')
    this.canvasCtx = canvas.getContext('2d')
    this.canvas = canvas
    canvas.width = width || this.config.width
    canvas.height = height || this.config.height
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
      if (!this.canvas) {
        this.createCanvans(width, height)
      } else {
        this.canvas.width = width || config.width
        this.canvas.height = height || config.height
      }
      this.canvasCtx.drawImage(player.video, 0, 0, width || config.width, height || config.height)
      let src = this.canvas.toDataURL(type, quality).replace(type, 'image/octet-stream')
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
