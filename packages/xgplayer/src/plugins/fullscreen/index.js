import Plugin, { Events, POSITIONS, Sniffer, STATE_CLASS } from '../../plugin'
import TopBackIcon from './backicon'
import FullScreenSvg from '../assets/requestFull.svg'
import ExitFullScreenSvg from '../assets/exitFull.svg'

/**
 * @typedef { {
 *   position?: string,
 *   index?: number,
 *   useCssFullscreen?: boolean,
 *   rotateFullscreen?: boolean,
 *   switchCallback?: () => any,
 *   target?: null | HTMLElement,
 *   disable?: boolean,
 *   needBackIcon?: boolean,
 *   [propName: string]: any
 * } } IFullscreenConfig
 */
export default class Fullscreen extends Plugin {
  static get pluginName () {
    return 'fullscreen'
  }

  /**
   * @type IFullscreenConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 0,
      useCssFullscreen: false, // Whether to use the page full screen
      rotateFullscreen: false, // Whether to enable rotating full screen
      switchCallback: null, // Custom switch function
      target: null, // Trigger Dom element
      disable: false,
      needBackIcon: false // Whether to enable the return button in the upper left corner of the full screen exit
    }
  }

  /**
   * @private
   */
  beforeCreate (args) {
    if (typeof args.player.config.fullscreen === 'boolean') {
      args.config.disable = !args.player.config.fullscreen
    }
  }

  /**
   * @private
   */
  afterCreate () {
    if (this.config.disable) {
      return
    }
    this.initIcons()

    this.handleFullscreen = this.hook('fullscreenChange', this.changeFullScreen, {
      pre: (e) => {
        this.emitUserAction(e, 'switch_fullscreen', { fullscreen: this.player.fullscreen })
      }
    })

    this.bind('.xgplayer-fullscreen', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.handleFullscreen)

    this.on(Events.FULLSCREEN_CHANGE, (isFullScreen) => {
      this.changeLangTextKey(this.find('.xg-tips'), isFullScreen ? this.i18nKeys.EXITFULLSCREEN_TIPS : this.i18nKeys.FULLSCREEN_TIPS)
      this.animate(isFullScreen)
      if (this.config.needBackIcon) {
        this.show()
      }
    })
    if (this.config.needBackIcon) {
      this.topBackIcon = this.player.registerPlugin({
        plugin: TopBackIcon,
        options: {
          config: {
            onClick: (e) => {
              this.handleFullscreen(e)
            }
          }
        }
      })
    }
    if (Sniffer.device === 'mobile') {
      window.addEventListener('orientationchange', this._onOrientationChange)
    }
  }

  /**
   * @private
   */
  _onOrientationChange = (e) => {
    if (this.player.fullscreen && this.config.rotateFullscreen) {
      if (window.orientation === 90 || window.orientation === -90) {
        this.setRotateDeg(0)
      } else {
        this.setRotateDeg(90)
      }
    }
  }

  /**
   * @private
   */
  registerIcons () {
    return {
      fullscreen: { icon: FullScreenSvg, class: 'xg-get-fullscreen' },
      exitFullscreen: { icon: ExitFullScreenSvg, class: 'xg-exit-fullscreen' }
    }
  }

  destroy () {
    this.unbind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.handleFullscreen)
    if (Sniffer.device === 'mobile') {
      window.removeEventListener('orientationchange', this._onOrientationChange)
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.fullscreen)
    this.appendChild('.xgplayer-icon', icons.exitFullscreen)
  }

  setRotateDeg (deg) {
    const { player } = this
    if (window.orientation === 90 || window.orientation === -90) {
      player.rotateDeg = 0
    } else {
      player.rotateDeg = deg
    }
  }

  /**
   * 进入旋转全屏
   * @param { HTMLElement } [el]
   */
  getRotateFullscreen (el) {
    const { player } = this
    if (player.isCssfullScreen) {
      player.exitCssFullscreen(el)
    }
    const _class = el ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.ROTATE_FULLSCREEN
    player._fullscreenEl = el || player.root
    player.changeFullStyle(player.root, el, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN)
    player.fullscreen = true
    this.setRotateDeg(90)
    this.emit(Events.FULLSCREEN_CHANGE, true)
  }

  /**
   * 退出旋转全屏
   * @param { HTMLElement } [el]
   */
  exitRotateFullscreen (el) {
    const { player } = this
    player.fullscreen = false
    const _class = player._fullscreenEl !== player.root ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.ROTATE_FULLSCREEN
    player.recoverFullStyle(player.root, player._fullscreenEl, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN)
    this.setRotateDeg(0)
    this.emit(Events.FULLSCREEN_CHANGE, false)
  }

  /**
   * 进入旋转全屏
   * @param { Event } [e]
   */
  changeFullScreen (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const { player, config } = this
    let useCssFullscreen = false
    if (config.useCssFullscreen === true || (typeof config.useCssFullscreen === 'function' && config.useCssFullscreen())) {
      useCssFullscreen = true
    }
    if (useCssFullscreen) {
      if (player.fullscreen) {
        player.fullscreen = false
        player.exitCssFullscreen(config.target)
        this.emit(Events.FULLSCREEN_CHANGE, false)
      } else {
        player.fullscreen = true
        player.getCssFullscreen(config.target)
        this.emit(Events.FULLSCREEN_CHANGE, true)
      }
      this.animate(player.fullscreen)
    } else if (config.rotateFullscreen) {
      if (player.fullscreen) {
        this.exitRotateFullscreen(config.target)
      } else {
        this.getRotateFullscreen(config.target)
      }
      this.animate(player.fullscreen)
    } else {
      if (config.switchCallback && typeof config.switchCallback === 'function') {
        config.switchCallback(player.fullscreen)
        return
      }
      if (player.fullscreen) {
        player.exitFullscreen(config.target)
      } else {
        player.getFullscreen(config.target)
      }
    }
  }

  /**
   *
   * @param { boolean } isFullScreen
   */
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

  /**
   * @private
   * @returns
   */
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
