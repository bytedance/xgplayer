import downloadUtil from 'downloadjs'
import Plugin from '../../plugin'

const {POSITIONS, ROOT_TYPES} = Plugin

export default class DownloadIcon extends Plugin {
  static get pluginName () {
    return 'DownloadIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.RIGHT,
      rootType: ROOT_TYPES.CONTROLS,
      index: 3
    }
  }

  constructor (args) {
    super(args)
    this.timer = null
    this.isLock = false
  }

  afterCreate () {
    this.download = this.download.bind(this)
    this.bind(['click', 'touchend'], this.download)
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
    return `<xg-icon class="xgplayer-download">
      <div class="xgplayer-icon btn-definition"><span>下载</span></div>
    </xg-icon>`
  }
}
