import downloadUtil from 'downloadjs'
import { POSITIONS } from '../../plugin'
import { xgIconTips } from '../common/iconTools'
import IconPlugin from '../common/iconPlugin'
import DownloadSvg from '../assets/download.svg'
import './index.scss'
/**
 * @typedef { {
 *   position: string,
 *   index: number,
 *   disable: boolean,
 *   [propName: string]: any
 *  } } IDownloadConfig
 */
export default class Download extends IconPlugin {
  static get pluginName () {
    return 'download'
  }

  /**
   * @type IDownloadConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 3,
      disable: true
    }
  }

  constructor (args) {
    super(args)
    this.timer = null
    this.isLock = false
  }

  afterCreate () {
    super.afterCreate()
    if (this.config.disable) {
      return
    }
    this.appendChild('.xgplayer-icon', this.icons.download)
    this._handler = this.hook('click', this.download, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })
    this.bind(['click', 'touchend'], this._handler)
  }

  registerIcons () {
    return {
      download: DownloadSvg
    }
  }

  download = (e) => {
    if (this.isLock) {
      return
    }
    this.emitUserAction(e, 'download')
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
    super.destroy()
    this.unbind(['click', 'touchend'], this.download)
    window.clearTimeout(this.timer)
    this.timer = null
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-download">
   <div class="xgplayer-icon">
   </div>
   ${xgIconTips(this, 'DOWNLOAD_TIPS', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
