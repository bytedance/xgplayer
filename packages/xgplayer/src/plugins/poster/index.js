import Plugin, { Events, Util } from '../../plugin'
import './index.scss'

/**
 * @typedef {{
 *   isEndedShow?: boolean, // 是否在播放结束之后显示
 *   hideCanplay?: boolean, // 设置为true时，播放后才隐藏，在视频地址更新后会重新显示poster。默认为false，即在play事件触发后隐藏poster
 *   poster?: string, // 封面图地址
 *   useVideoPoster?: boolean // 是否使用video元素的poster属性设置封面（注意：原生poster填充方式固定为contain，fillMode不生效）
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
      useVideoPoster: false, // 是否使用video元素的poster属性设置封面
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
    if (!this.isHide) {
      if (!this.config.useVideoPoster) {
        Util.addClass(this.root, 'hide')
      }
      this.isHide = true
    }
  }

  /**
   * @returns
   */
  show () {
    this.isHide = false
    if (!this.config.useVideoPoster) {
      Util.removeClass(this.root, 'hide')
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.poster === 'string') {
      args.config.poster = args.player.config.poster
    }
  }

  afterCreate () {
    // 如果使用 video poster 属性，初始化时设置
    if (this.config.useVideoPoster && this.config.poster) {
      this.player.media.poster = this.config.poster
    }

    this.on(Events.ENDED, () => {
      if (this.isEndedShow) {
        this.show()
      }
    })

    this.on(Events.PLAYING, () => {
      this.hide()
    })

    if (this.config.hideCanplay) {
      this.once(Events.TIME_UPDATE, () => {
        this.onTimeUpdate()
      })
      this.on(Events.URL_CHANGE, () => {
        this.show()
        if (!this.config.useVideoPoster) {
          Util.addClass(this.root, 'xg-showplay')
        }
        this.once(Events.TIME_UPDATE, () => {
          this.onTimeUpdate()
        })
      })
    } else {
      this.on(Events.PLAY, () => {
        this.hide()
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

  setConfig (config) {
    Object.keys(config).forEach(key => {
      this.config[key] = config[key]
    })
    const { poster } = this.config
    this.update(poster)
  }

  update (poster) {
    if (!poster) {
      return
    }
    this.config.poster = poster
    if (this.config.useVideoPoster) {
      this.player.media.poster = poster
    } else {
      this.root.style.backgroundImage = `url(${poster})`
    }
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
    const { poster, hideCanplay, fillMode, notHidden, useVideoPoster } = this.config
    if (useVideoPoster) {
      return ''
    }
    const _bg = this.getBgSize(fillMode)
    const style = poster ? `background-image:url(${poster});${_bg}` : _bg
    const className = notHidden ? 'xg-not-hidden' : (hideCanplay ? 'xg-showplay' : '')
    return `<xg-poster class="xgplayer-poster ${className}" style="${style}">
    </xg-poster>`
  }
}

export default Poster
