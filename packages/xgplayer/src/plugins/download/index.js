import downloadUtil from 'downloadjs'
import Plugin from '../../plugin'
import DownloadSvg from '../assets/download.svg'
const {POSITIONS} = Plugin

export default class Download extends Plugin {
  static get pluginName () {
    return 'DownloadIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 3,
      disable: false
    }
  }

  constructor (args) {
    super(args)
    this.timer = null
    this.isLock = false
  }

  beforeCreate (args) {
    if (typeof args.player.config.download === 'boolean') {
      args.config.disable = !args.player.config.download
    }
  }

  afterCreate () {
    if (!this.config.download) {
      return;
    }
    this.download = this.download.bind(this)
    this.bind(['click', 'touchend'], this.download)
  }

  registerLangauageTexts () {
    return {
      download: {
        jp: 'フルスクリーン',
        en: 'download',
        zh: '下载'
      }
    }
  }

  registerIcons () {
    return {
      download: DownloadSvg
    }
  }

  download () {
    if (!this.isLock) {
      return
    }
    const url = this.getAbsoluteURL(this.player.src)
    downloadUtil(url)
    this.isLock = true
    this.timer = window.setTimeout(() => {
      this.isLock = false
      window.clearTimeout(this.timer)
      this.timer = null
    }, 300)
  }

  getAbsoluteURL (url) {
    // Check if absolute URL
    if (!url.match(/^https?:\/\//)) {
      const div = document.createElement('div')
      div.innerHTML = `<a href="${url}">x</a>`
      url = div.firstChild.href
    }
    return url
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.download)
    window.clearTimeout(this.timer)
    this.timer = null
  }

  render () {
    if (!this.config.download) {
      return;
    }
    return `<xg-icon class="xgplayer-download">
      <div class="xgplayer-icon">
      ${this.icons.download}
      </div>
      <div class="xg-tips">${this.text.download}</div>
    </xg-icon>`
  }
}
