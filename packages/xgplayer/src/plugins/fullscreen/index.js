import Plugin from '../../plugin'
import FullScreenSvg from '../assets/requestFull.svg'
import ExitFullScreenSvg from '../assets/exitFull.svg'

const {Events, POSITIONS} = Plugin

export default class Fullscreen extends Plugin {
  static get pluginName () {
    return 'fullscreen'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 0,
      useCssFullscreen: false,
      switchCallback: null,
      target: null,
      disable: false
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.fullscreen === 'boolean') {
      args.config.disable = !args.player.config.fullscreen
    }
  }

  afterCreate () {
    if (this.config.disable) {
      return
    }
    this.isFullScreen = this.player.isFullScreen
    this.initIcons()
    this.btnClick = this.btnClick.bind(this)
    this.bind(['click', 'touchend'], this.btnClick)
    this.on(Events.FULLSCREEN_CHANGE, (isFullScreen) => {
      this.changeLangTextKey(this.find('.xg-tips'), isFullScreen ? 'exitFullscreen' : 'fullscreen')
      this.animate(isFullScreen)
    })
  }

  registerLangauageTexts () {
    return {
      fullscreen: {
        jp: 'フルスクリーン',
        en: 'Fullscreen',
        zh: '进入全屏'
      },
      exitFullscreen: {
        jp: 'フルスクリーン',
        en: 'Exit fullscreen',
        zh: '退出全屏'
      }
    }
  }

  registerIcons () {
    return {
      fullscreen: {icon: FullScreenSvg, class: 'xg-get-fullscreen'},
      exitFullscreen: {icon: ExitFullScreenSvg, class: 'xg-exit-fullscreen'}
    }
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.btnClick)
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.xgplayer-icon', icons.fullscreen)
    this.appendChild('.xgplayer-icon', icons.exitFullscreen)
  }

  btnClick (e) {
    const {player, config} = this;
    let useCssFullscreen = false
    if (config.useCssFullscreen === true || (typeof config.useCssFullscreen === 'function' && config.useCssFullscreen())) {
      useCssFullscreen = true;
    }
    if (useCssFullscreen) {
      if (player.fullscreen) {
        player.getCssFullscreen()
        player.fullscreen = true
        this.emit(Events.FULLSCREEN_CHANGE, true)
      } else {
        player.exitCssFullscreen()
        player.fullscreen = false
        this.emit(Events.FULLSCREEN_CHANGE, false)
      }
      this.animate(player.fullscreen)
    } else {
      if (config.switchCallback && typeof config.switchCallback === 'function') {
        config.switchFullScreen(this.isFullScreen)
        this.isFullScreen = !this.isFullScreen
        return
      }
      if (player.fullscreen) {
        player.exitFullscreen(config.target)
      } else {
        player.getFullscreen(config.target)
      }
    }
  }

  animate (isFullScreen) {
    isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal')
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-fullscreen">
    <div class="xgplayer-icon">
    </div>
    <div class="xg-tips" lang-key="fullscreen">${this.player.isFullScreen ? this.langText.exitFullscreen : this.langText.fullscreen}</div>
    </xg-icon>`
  }
}
