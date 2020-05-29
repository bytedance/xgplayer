import Plugin from '../../plugin'

const { POSITIONS } = Plugin
export default class ScreenShot extends Plugin {
  static get pluginName () {
    return 'screenShot'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 5,
      quality: 0.92,
      type: 'image/png',
      format: '.png',
      width: 600,
      height: 337,
      disable: false
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.screenShot === 'boolean') {
      args.config.disable = !args.player.config.screenShot
    }
  }

  afterCreate () {
    this.appendChild('xgplayer-icon', this.icons.screenshotIcon)
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
    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    saveLink.dispatchEvent(event)
  }

  createCanvans () {
    const canvas = document.createElement('canvas')
    this.canvasCtx = canvas.getContext('2d')
    this.canvas = canvas
    canvas.width = this.config.width || 600
    canvas.height = this.config.height || 337.5
  }

  onClickBtn (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.canvas) {
      this.createCanvans();
    }
    let img = new window.Image();
    this.canvasCtx.drawImage(this.player.video, 0, 0, this.canvas.width, this.canvas.height)
    const encoderOptions = this.config.quality
    const type = this.config.type
    const format = this.config.format
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = this.canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream')
    const screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
    this.emit('screenShot', screenShotImg)
    this.saveScreenShot(screenShotImg, '截图' + format)
    img.onload = () => {
      img = null;
    }
  }

  registerLangauageTexts () {
    return {
      'screenshot': {
        jp: 'screenshot',
        en: 'screenshot',
        zh: '截图'
      }
    }
  }

  registerIcons () {
    return {
      'screenshotIcon': null
    }
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.onClickBtn)
  }

  render () {
    if (this.config.disable) {
      return;
    }
    const className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-text'
    return `
      <xg-icon class="xgplayer-shot">
      <div class="${className}">
      ${this.icons.screenshotIcon ? `` : `<span lang-key="screenshot">${this.langText.screenshot}</span>`} 
      </div>
    </xg-icon>`
  }
}
