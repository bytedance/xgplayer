import Plugin from '../../plugin'
import CssFullSceenSvg from '../assets/requestCssFull.svg'
import ExitCssFullSceenSvg from '../assets/exitCssFull.svg'

const {Events, POSITIONS} = Plugin

export default class CssFullScreen extends Plugin {
  static get pluginName () {
    return 'cssFullscreen'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 1,
      disable: false
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
    // 退出全屏的时候会同时退出网页全屏
    this.on(Events.FULLSCREEN_CHANGE, (isFullScreen) => {
      !isFullScreen && this.animate(isFullScreen)
    })
    this.btnClick = this.btnClick.bind(this);
    this.bind(['click', 'touchend'], this.btnClick)
  }

  initIcons () {
    const {icons} = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.cssFullscreen)
    contentIcon.appendChild(icons.exitCssFullscreen)
  }

  btnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.player.isCssfullScreen) {
      this.player.getCssFullscreen()
    } else {
      this.player.exitCssFullscreen()
    }
  }

  animate (isFullScreen) {
    if (!this.root) {
      return;
    }
    isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal')
  }

  switchTips () {
    this.changeLangTextKey(this.find('.xg-tips'), this.isCssfullScreen ? 'exitCssFullscreen' : 'cssFullscreen')
  }

  registerIcons () {
    return {
      cssFullscreen: { icon: CssFullSceenSvg, class: 'xg-get-cssfull' },
      exitCssFullscreen: { icon: ExitCssFullSceenSvg, class: 'xg-exit-cssfull' }
    }
  }

  registerLangauageTexts () {
    return {
      'cssFullscreen': {
        jp: 'シアターモード',
        en: 'Cssfullscreen',
        zh: '进入样式全屏'
      },
      exitCssFullscreen: {
        jp: 'シアターモードを終了',
        en: 'Exit cssfullscreen',
        zh: '退出样式全屏'
      }
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
    <div class="xg-tips" lang-key="cssFullscreen">${this.isCssfullScreen ? this.langText.exitCssFullscreen : this.langText.cssFullscreen}</div>
    </xg-icon>`
  }
}
