import downloadUtil from 'downloadjs'
import Plugin from '../../../plugin'


export default class DownloadIcon extends Plugin {
  static get pluginName () {
    return 'DownloadIcon'
  }

  constructor (args) {
    super(args)
    this.timer = null
    this.isLock = false
  }

  afterCreate () {
    this.download = this.download.bind(this);
    ['click', 'touchend'].forEach(event => {
      this.bind(event, this.download)
    })
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

  getAbsoluteURL(url) {
    // Check if absolute URL
    if (!url.match(/^https?:\/\//)) {
      const div = document.createElement('div')
      div.innerHTML = `<a href="${url}">x</a>`
      url = div.firstChild.href
    }
    return url
  }

  destroy() {
    ['click', 'touchend'].forEach(event => {
      this.unbind(event, this.download)
    })
    window.clearTimeout(this.timer)
    this.timer = null
  }

  render () {
    return `<xg-icon class="xgplayer-download">
      <div class="xgplayer-icon btn-definition"><span>下载</span></div>
    </xg-icon>`
  }
}
