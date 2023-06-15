import { Events, POSITIONS } from '../../plugin'
import { xgIconTips } from '../common/iconTools'
import IconPlugin from '../common/iconPlugin'
import CssFullSceenSvg from '../assets/requestCssFull.svg'
import ExitCssFullSceenSvg from '../assets/exitCssFull.svg'
import './index.scss'

/**
  * @typedef { {
  *  position: string,
  *  index: number,
  *  disable: boolean,
  *  target: null | HTMLElement,
  *  [propName: string]: any
  * } } ICssConfig
  */

export default class CssFullScreen extends IconPlugin {
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

  afterCreate () {
    super.afterCreate()
    if (this.config.target) {
      this.playerConfig.fullscreenTarget = this.config.target
    }

    this.initIcons()
    this.on(Events.CSS_FULLSCREEN_CHANGE, (isCssfullScreen) => {
      this.animate(isCssfullScreen)
    })
    this.handleCssFullscreen = this.hook('cssFullscreen_change', this.btnClick, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })
    this.bind(['click', 'touchend'], this.handleCssFullscreen)
  }

  initIcons () {
    const { icons } = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.cssFullscreen)
    contentIcon.appendChild(icons.exitCssFullscreen)
  }

  btnClick = (e) => {
    if (this.config.disable) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    const { isCssfullScreen } = this.player
    this.emitUserAction(e, 'switch_cssfullscreen', { cssfullscreen: isCssfullScreen })
    if (!isCssfullScreen) {
      this.player.getCssFullscreen()
    } else {
      this.player.exitCssFullscreen()
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
    const tipDom = this.find('.xg-tips')
    tipDom && this.changeLangTextKey(tipDom, isFullScreen ? i18nKeys.EXITCSSFULLSCREEN_TIPS : i18nKeys.CSSFULLSCREEN_TIPS)
  }

  registerIcons () {
    return {
      cssFullscreen: { icon: CssFullSceenSvg, class: 'xg-get-cssfull' },
      exitCssFullscreen: { icon: ExitCssFullSceenSvg, class: 'xg-exit-cssfull' }
    }
  }

  destroy () {
    super.destroy()
    this.unbind(['click', 'touchend'], this.btnClick)
  }

  render () {
    return `<xg-icon class='xgplayer-cssfullscreen'>
    <div class="xgplayer-icon">
    </div>
    ${xgIconTips(this, 'CSSFULLSCREEN_TIPS', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
