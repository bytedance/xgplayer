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

  beforeCreate (args) {
    if (typeof args.player.config.cssFullscreen === 'boolean') {
      args.config.disable = !args.player.config.cssFullscreen
    }
  }

  afterCreate () {
    super.afterCreate()
    if (this.config.disable) {
      return
    }

    if (this.config.target) {
      this.playerConfig.fullscreenTarget = this.config.target
    }

    this.initIcons()
    this.on(Events.CSS_FULLSCREEN_CHANGE, (isCssfullScreen) => {
      this.animate(isCssfullScreen)
    })
    this.btnClick = this.btnClick.bind(this)
    this.handleCssFullscreen = this.hook('cssFullscreen_change', this.btnClick, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })
    this.bind(['click', 'touchend'], this.handleCssFullscreen)

    this.checkTooltipBounds(this.find('.xg-tips'))
    this._resizeObserver = new ResizeObserver(() => {
      this._checkTooltipBounds(this.find('.xg-tips'))
    })
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

  _lastTooltipData = {
    text: '',
    overflowLeft: false,
    overflowRight: false
  };

  checkTooltipBounds (tipDom) {
    if (!tipDom || !this.player) return

    const currentText = tipDom.innerText || tipDom.textContent
    if (currentText === this._lastTooltipData.text) {
      tipDom.classList.toggle('xg-tips-left-aligned', this._lastTooltipData.overflowLeft)
      tipDom.classList.toggle('xg-tips-right-aligned', this._lastTooltipData.overflowRight)
      return
    }

    const originalDisplay = tipDom.style.display
    tipDom.style.visibility = 'hidden'
    tipDom.style.display = 'block'

    const tooltipRect = tipDom.getBoundingClientRect()
    const parentRect = this.player.root.getBoundingClientRect()

    tipDom.style.display = originalDisplay
    tipDom.style.visibility = ''

    const overflowLeft = tooltipRect.left < parentRect.left
    const overflowRight = tooltipRect.right > parentRect.right

    this._lastTooltipData = {
      text: currentText,
      overflowLeft,
      overflowRight
    }
    tipDom.classList.toggle('xg-tips-left-aligned', overflowLeft)
    tipDom.classList.toggle('xg-tips-right-aligned', overflowRight)
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
    if (this.config.disable) {
      return
    }
    return `<xg-icon class='xgplayer-cssfullscreen'>
    <div class="xgplayer-icon">
    </div>
    ${xgIconTips(this, 'CSSFULLSCREEN_TIPS', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
