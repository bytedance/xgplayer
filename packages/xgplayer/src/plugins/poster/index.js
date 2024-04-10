import Plugin, { Events, Util } from '../../plugin'
import './index.scss'

/**
 * @typedef {{
 *   isEndedShow?: boolean, // 是否在播放结束之后显示
 *   hideCanplay?: boolean, // 设置为true时，播放后才隐藏，在视频地址更新后会重新显示poster。默认为false，即在play事件触发后隐藏poster
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
      hideCanplay: false, // 设置为true时，播放后才隐藏，在视频地址更新后会重新显示poster。默认为false，即在play事件触发后隐藏poster
      notHidden: false, // 是否一直显示
      poster: '', // 封面图地址
      fillMode: 'fixWidth' // 封面图填充方式，fixWidth / fixHeight / cover / contain
    }
  }

  set isEndedShow (value) {
    this.config.isEndedShow = value
  }

  get isEndedShow () {
    return this.config.isEndedShow
  }

  hide () {
    Util.addClass(this.root, 'hide')
  }

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
    Util.removeClass(this.root, 'hide')
  }

  beforeCreate (args) {
    if (typeof args.player.config.poster === 'string') {
      args.config.poster = args.player.config.poster
    }
  }

  afterCreate () {
    this.on(Events.ENDED, () => {
      if (this.isEndedShow) {
        Util.removeClass(this.root, 'hide')
      }
    })

    if (this.config.hideCanplay) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
      this.on(Events.URL_CHANGE, () => {
        Util.removeClass(this.root, 'hide')
        Util.addClass(this.root, 'xg-showplay')
        this.once(Events.TIME_UPDATE, () => {
          this.onTimeUpdate()
        })
      })
    } else {
      this.on(Events.PLAY, () => {
        Util.addClass(this.root, 'hide')
      })
    }
  }

  onTimeUpdate () {
    if (!this.player.currentTime) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
    } else {
      Util.removeClass(this.root, 'xg-showplay')
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
      case 'contain':
        _bg = 'contain'
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
    const { poster, hideCanplay, fillMode, notHidden } = this.config
    const _bg = this.getBgSize(fillMode)
    const style = poster ? `background-image:url(${poster});${_bg}` : _bg
    const className = notHidden ? 'xg-not-hidden' : (hideCanplay ? 'xg-showplay' : '')
    return `<xg-poster class="xgplayer-poster ${className}" style="${style}">
    </xg-poster>`
  }
}

export default Poster
