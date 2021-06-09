/**
 * 下一个按钮组件
 */
import Plugin, { hooksDescriptor, POSITIONS, Sniffer, Events } from '../../plugin'
import Next from '../assets/playNext.svg'

export default class PlayNextIcon extends Plugin {
  static get pluginName () {
    return 'playNext'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 1,
      url: null,
      urlList: []
    }
  }

  constructor (options) {
    super(options)
    this.idx = -1
  }

  afterCreate () {
    if (!this.config.urlList || this.config.urlList.length === 0) {
      return
    }
    hooksDescriptor(this)
    this.appendChild('.xgplayer-icon', this.icons.playNext)
    this.initEvents()
  }

  registerIcons () {
    return {
      playNext: Next
    }
  }

  initEvents () {
    this.nextHandler = this.hook('playNext', this.changeSrc)
    const event = Sniffer.device === 'mobile' ? 'touchend' : 'click'
    this.bind(event, this.playNext)
    this.show()
  }

  playNext = (e) => {
    const { player } = this
    e.preventDefault()
    e.stopPropagation()
    if (this.idx + 1 < this.config.urlList.length) {
      this.idx++
      player.emit(Events.PLAYNEXT, this.idx + 1)
      this.nextHandler(this.config.urlList[this.idx], this.idx)
    } else {
      this.nextHandler()
      player.emit(Events.PLAYNEXT)
    }
  }

  changeSrc (url) {
    const { player } = this
    if (!url) {
      return
    }
    player.pause()
    player.currentTime = 0
    player.autoplay = true
    player.src = url
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.playNext)
  }

  render () {
    if (!this.config.urlList || this.config.urlList.length === 0) {
      return
    }
    return `
     <xg-icon class="xgplayer-playnext">
      <div class="xgplayer-icon">
      </div>
      <div class="xg-tips" lang-key="PLAYNEXT_TIPS">${this.i18n.PLAYNEXT_TIPS}</div>
     </xg-icon>
    `
  }
}
