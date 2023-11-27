import Plugin, { Events } from '../../plugin'
import { addClass, removeClass } from '../../utils/util'
import './index.scss'

/**
 * @typedef {{
 *   isEndedShow?: boolean, // 是否在播放结束之后显示
 *   hideCanplay?: boolean, // cnaplay 时间大于1的时候才隐藏
 *   poster?: string // 封面图地址
 * }} IPosterConfig
 */
class Poster extends Plugin {
  static get pluginName () {
    return 'poster'
  }

  /**
   * @type IPosterConfig
   */
  static get defaultConfig () {
    return {
      isEndedShow: true, // 是否在播放结束之后显示
      hideCanplay: false, // cnaplay 时间大于1的时候才隐藏
      poster: '', // 封面图地址
      fillMode: 'fixWidth', // fixWidth / fixHeight / cover / container
    }
  }

  set isEndedShow (value) {
    this.config.isEndedShow = value
  }

  get isEndedShow () {
    return this.config.isEndedShow
  }

  hide () {
    addClass(this.root, 'hide')
  }

  show () {
    removeClass(this.root, 'hide')
  }

  beforeCreate (args) {
    if (typeof args.player.config.poster === 'string') {
      args.config.poster = args.player.config.poster
    }
  }

  afterCreate () {
    this.on(Events.ENDED, () => {
      if (this.isEndedShow) {
        removeClass(this.root, 'hide')
      }
    })

    if (this.config.hideCanplay) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
      this.on(Events.URL_CHANGE, () => {
        removeClass(this.root, 'hide')
        addClass(this.root, 'xg-showplay')
        this.once(Events.TIME_UPDATE, () => {
          this.onTimeUpdate()
        })
      })
    } else {
      this.on(Events.PLAY, () => {
        addClass(this.root, 'hide')
      })
    }
  }

  onTimeUpdate () {
    if (!this.player.currentTime) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
    } else {
      removeClass(this.root, 'xg-showplay')
    }
  }

  update (poster) {
    if (!poster) {
      return
    }
    this.config.poster = poster
    this.root.style.backgroundImage = `url(${poster})`
  }

  getBgSize (mode) {
    let _bg = ''
    switch (mode) {
      case 'cover':
        _bg = 'cover'
        break
      case 'container':
        _bg = 'container'
        break
      case 'fixHeight':
        _bg = 'auto 100%'
        break
      default:
        _bg = ''
    }
    return _bg ? `background-size: ${_bg};` : ''
  }

  render () {
    const { poster, hideCanplay, fillMode } = this.config
    const _bg = this.getBgSize(fillMode)
    const style = poster ? `background-image:url(${poster});${_bg}` : _bg
    return `<xg-poster class="xgplayer-poster ${hideCanplay ? 'xg-showplay' : ''}" style="${style}">
    </xg-poster>`
  }
}

export default Poster
