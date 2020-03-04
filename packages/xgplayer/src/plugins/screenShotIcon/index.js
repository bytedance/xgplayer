import Plugin from '../../plugin'

const { Events, POSITIONS, ROOT_TYPES } = Plugin
export default class ScreenShotIcon extends Plugin {
  static get pluginName () {
    return 'ScreenShotIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.LEFT,
      rootType: ROOT_TYPES.CONTROLS,
      index: 5,
      quality: 0.92,
      type: 'image/png',
      format: '.png',
      width: 600,
      height: 337
    }
  }

  afterCreate () {
    this.once(Events.READY, () => {
      this.show()
      this.onClickBtn = this.onClickBtn.bind(this);
      this.bind(['click', 'touchend'], this.onClickBtn)
    })
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
    console.log('onClickBtn')
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
      console.log('img.onload')
      img = null;
    }
  }

  registerLangauageTexts () {
    return {
      'screenshot': {
        jp: 'play',
        en: 'play',
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
    this.bind(['click', 'touchend'], this.onClickBtn)
  }

  render () {
    const className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-definition'
    return `
      <xg-icon class="xgplayer-shot">
      <div class="${className}">
      ${this.icons.screenshotIcon ? `${this.icons.screenshotIcon}` : `<span>${this.text.screenshot}</span>`} 
      </div>
    </xg-icon>`
  }
}
