import Plugin, {hooksDescriptor, Events, POSITIONS, Sniffer, STATE_CLASS, Util} from '../../plugin'
import TopBackIcon from './backicon'
import FullScreenSvg from '../assets/requestFull.svg'
import ExitFullScreenSvg from '../assets/exitFull.svg'

export default class Fullscreen extends Plugin {
  static get pluginName () {
    return 'fullscreen'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 0,
      useCssFullscreen: false,
      rotateFullscreen: false,
      switchCallback: null,
      target: null,
      disable: false,
      needBackIcon: false
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.fullscreen === 'boolean') {
      args.config.disable = !args.player.config.fullscreen
    }
  }

  afterCreate () {
    hooksDescriptor(this)
    if (this.config.disable) {
      return
    }
    this.isFullScreen = this.player.isFullScreen
    this.initIcons()

    this.fullSreenHandler = this.hook('fullsreen_change', this.changeFullScreen)

    this.bind('.xgplayer-fullscreen', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.fullSreenHandler)

    this.on(Events.FULLSCREEN_CHANGE, (isFullScreen) => {
      this.changeLangTextKey(this.find('.xg-tips'), isFullScreen ? this.i18nKeys.EXITFULLSCREEN_TIPS : this.i18nKeys.FULLSCREEN_TIPS)
      this.animate(isFullScreen)
    })
    if (Sniffer.device === 'mobile' && this.config.needBackIcon) {
      this.topBackIcon = this.player.registerPlugin({
        plugin: TopBackIcon,
        options: {
          config: {
            onClick: (e) => {
              this.show()
              this.fullSreenHandler(e)
            }
          }
        }
      })
    }
    if (Sniffer.device === 'mobile') {
      window.addEventListener('orientationchange', () => {
        if (this.player.fullscreen && this.config.rotateFullscreen) {
          if (window.orientation === 90 || window.orientation === -90) {
            this.setRotateDeg(0)
          } else {
            this.setRotateDeg(90)
          }
        }
      })
    }
  }

  registerIcons () {
    return {
      fullscreen: {icon: FullScreenSvg, class: 'xg-get-fullscreen'},
      exitFullscreen: {icon: ExitFullScreenSvg, class: 'xg-exit-fullscreen'}
    }
  }

  destroy () {
    this.unbind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.fullSreenHandler)
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.xgplayer-icon', icons.fullscreen)
    this.appendChild('.xgplayer-icon', icons.exitFullscreen)
  }

  setRotateDeg (deg) {
    const {player} = this
    if (window.orientation === 90 || window.orientation === -90) {
      player.rotateDeg = 0
    } else {
      player.rotateDeg = deg
    }
  }

  getRotateFullscreen () {
    const {player} = this
    if (player.isCssfullScreen) {
      player.exitCssFullscreen()
    }
    if (player.root.getAttribute('style')) {
      this._originCssText = player.root.style.cssText
      player.root.removeAttribute('style')
    }
    player.addClass(STATE_CLASS.ROTATE_FULLSCREEN)
    player.fullscreen = true
    this.setRotateDeg(90)
    this.emit(Events.FULLSCREEN_CHANGE, true)
  }

  exitRotateFullscreen () {
    const {player} = this
    player.removeClass(STATE_CLASS.ROTATE_FULLSCREEN)
    player.fullscreen = false
    this._originCssText && Util.setStyleFromCsstext(player.root, this._originCssText)
    this._originCssText = ''
    this.setRotateDeg(0)
    this.emit(Events.FULLSCREEN_CHANGE, false)
  }

  changeFullScreen (e) {
    // e.preventDefault();
    e.stopPropagation();
    const {player, config} = this;
    let useCssFullscreen = false
    if (config.useCssFullscreen === true || (typeof config.useCssFullscreen === 'function' && config.useCssFullscreen())) {
      useCssFullscreen = true;
    }
    if (useCssFullscreen) {
      if (player.fullscreen) {
        player.fullscreen = false
        player.exitCssFullscreen()
        this.emit(Events.FULLSCREEN_CHANGE, false)
      } else {
        player.fullscreen = true
        player.getCssFullscreen()
        this.emit(Events.FULLSCREEN_CHANGE, true)
      }
      this.animate(player.fullscreen)
    } else if (config.rotateFullscreen) {
      if (player.fullscreen) {
        this.exitRotateFullscreen()
      } else {
        this.getRotateFullscreen()
      }
      this.animate(player.fullscreen)
    } else {
      if (config.switchCallback && typeof config.switchCallback === 'function') {
        config.switchCallback(this.isFullScreen)
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
    if (this.topBackIcon) {
      if (isFullScreen) {
        this.topBackIcon.show()
        this.hide()
      } else {
        this.topBackIcon.hide()
        this.show()
      }
    }
  }

  show () {
    super.show()
  }

  hide () {
    super.hide()
  }

  render () {
    if (this.config.disable) {
      return
    }
    const langKey = 'FULLSCREEN_TIPS'
    return `<xg-icon class="xgplayer-fullscreen">
    <div class="xgplayer-icon">
    </div>
    <div class="xg-tips" lang-key="${this.i18nKeys[langKey]}">${this.i18n[langKey]}</div>
    </xg-icon>`
  }
}
