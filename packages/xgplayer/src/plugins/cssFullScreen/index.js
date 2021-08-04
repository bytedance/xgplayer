import Plugin, { Events, POSITIONS } from '../../plugin'
import CssFullSceenSvg from '../assets/requestCssFull.svg'
import ExitCssFullSceenSvg from '../assets/exitCssFull.svg'

/**
  * @typedef { {
  *  position: string,
  *  index: number,
  *  disable: boolean,
  *  target: null | HTMLElement,
  *  [propName: string]: any
  * } } ICssConfig
  */

export default class CssFullScreen extends Plugin {
  static get pluginName () {
    return 'cssFullscreen'
  }

  /**
   * @type ICssConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 1,
      disable: false,
      target: null
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.cssFullscreen === 'boolean') {
      args.config.disable = !args.player.config.cssFullscreen
    }
  }

  afterCreate () {
    if (this.config.disable) {
      return
    }
    this.initIcons()
    this.on(Events.CSS_FULLSCREEN_CHANGE, (isCssfullScreen) => {
      this.animate(isCssfullScreen)
    })
    this.btnClick = this.btnClick.bind(this)
    this.bind(['click', 'touchend'], this.btnClick)
  }

  initIcons () {
    const { icons } = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.cssFullscreen)
    contentIcon.appendChild(icons.exitCssFullscreen)
  }

  btnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    const { isCssfullScreen } = this.player
    this.emitUserAction(e, 'switch_css_fullscreen', { cssfullscreen: isCssfullScreen })
    if (!isCssfullScreen) {
      this.player.getCssFullscreen(this.config.target)
    } else {
      this.player.exitCssFullscreen(this.config.target)
    }
  }

  animate (isFullScreen) {
    if (!this.root) {
      return
    }
    isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal')
    this.switchTips(isFullScreen)
  }

  switchTips (isFullScreen) {
    const { i18nKeys } = this
    this.changeLangTextKey(this.find('.xg-tips'), isFullScreen ? i18nKeys.EXITCSSFULLSCREEN_TIPS : i18nKeys.CSSFULLSCREEN_TIPS)
  }

  registerIcons () {
    return {
      cssFullscreen: { icon: CssFullSceenSvg, class: 'xg-get-cssfull' },
      exitCssFullscreen: { icon: ExitCssFullSceenSvg, class: 'xg-exit-cssfull' }
    }
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.btnClick)
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class='xgplayer-cssfullscreen'>
    <div class="xgplayer-icon">
    </div>
    <div class="xg-tips" lang-key="${this.i18nKeys.EXITCSSFULLSCREEN_TIPS}">${this.i18n.CSSFULLSCREEN_TIPS}</div>
    </xg-icon>`
  }
}
