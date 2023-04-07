/**
 * 下一个按钮组件
 */
import Plugin, { POSITIONS, Sniffer, Events } from '../../plugin'
import { xgIconTips } from '../common/iconTools'
import Next from '../assets/playNext.svg'
import './index.scss'

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
    this.appendChild('.xgplayer-icon', this.icons.playNext)
    this.initEvents()
  }

  registerIcons () {
    return {
      playNext: Next
    }
  }

  initEvents () {
    this.nextHandler = this.hook('nextClick', this.changeSrc)
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
      this.nextHandler(this.config.urlList[this.idx], this.idx)
      player.emit(Events.PLAYNEXT, this.idx + 1)
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
    if (player.switchURL) {
      player.switchURL(url)
    } else {
      player.src = url
    }
    player.config.url = url
    player.play()
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
      ${xgIconTips(this, 'PLAYNEXT_TIPS', this.playerConfig.isHideTips)}
     </xg-icon>
    `
  }
}
