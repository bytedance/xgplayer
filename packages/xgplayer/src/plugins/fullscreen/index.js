import { Events, POSITIONS, Sniffer, Util } from '../../plugin'
import { xgIconTips } from '../common/iconTools'
import IconPlugin from '../common/iconPlugin'
import TopBackIcon from './backicon'
import FullScreenSvg from '../assets/requestFull.svg'
import ExitFullScreenSvg from '../assets/exitFull.svg'
import './index.scss'

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
export default class Fullscreen extends IconPlugin {
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

  afterCreate () {
    super.afterCreate()
    const { config, playerConfig } = this
    if (config.disable) {
      return
    }

    if (config.target) {
      this.playerConfig.fullscreenTarget = this.config.target
    }

    const fullEl = Util.getFullScreenEl()

    if (playerConfig.fullscreenTarget === fullEl) {
      this.player.getFullscreen().catch(e=>{})
    }

    this.initIcons()

    this.handleFullscreen = this.hook('fullscreenChange', this.toggleFullScreen, {
      pre: (e) => {
        const { fullscreen } = this.player
        this.emitUserAction(e, 'switch_fullscreen', {
          prop: 'fullscreen',
          from: fullscreen,
          to: !fullscreen
        })
      }
    })

    this.bind('.xgplayer-fullscreen', ['touchend', 'click'], this.handleFullscreen)

    this.on(Events.FULLSCREEN_CHANGE, (isFullScreen) => {
      const tipsDom = this.find('.xg-tips')
      tipsDom && this.changeLangTextKey(tipsDom, isFullScreen ? this.i18nKeys.EXITFULLSCREEN_TIPS : this.i18nKeys.FULLSCREEN_TIPS)
      this.animate(isFullScreen)
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
        this.player.setRotateDeg(0)
      } else {
        this.player.setRotateDeg(90)
      }
    }
  }

  registerIcons () {
    return {
      fullscreen: { icon: FullScreenSvg, class: 'xg-get-fullscreen' },
      exitFullscreen: { icon: ExitFullScreenSvg, class: 'xg-exit-fullscreen' }
    }
  }

  destroy () {
    super.destroy()
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

  /**
   * 切换全屏
   * @param { Event } [e]
   */
  toggleFullScreen (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const { player, config } = this
    const useCssFullscreen = config.useCssFullscreen === true || (typeof config.useCssFullscreen === 'function' && config.useCssFullscreen())
    if (useCssFullscreen) {
      if (player.fullscreen) {
        player.exitCssFullscreen()
      } else {
        player.getCssFullscreen()
      }
      this.animate(player.fullscreen)
    } else if (config.rotateFullscreen) {
      if (player.fullscreen) {
        player.exitRotateFullscreen()
      } else {
        player.getRotateFullscreen()
      }
      this.animate(player.fullscreen)
    } else if (config.switchCallback && typeof config.switchCallback === 'function') {
      config.switchCallback(player.fullscreen)
    } else {
      if (player.fullscreen) {
        player.exitFullscreen()
      } else {
        player.getFullscreen().catch(e=>{})
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

  /**
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
    ${xgIconTips(this, langKey, this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
