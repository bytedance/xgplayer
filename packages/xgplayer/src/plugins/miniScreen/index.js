import Plugin, { Util, Events } from '../../plugin'
import PlayIcon from '../assets/play.svg'
import PauseIcon from '../assets/pause.svg'
import MiniScreenIcon from './miniScreenIcon'
import Draggabilly from '../../utils/draggabilly'

/**
 * @typedef {{
 *   index?: number,
 *   disable?: boolean,
 *   width?: number,
 *   height?: number,
 *   left?: number, // 默认左下角
 *   top?: number, // 默认左下角
 *   isShowIcon?: boolean, // 是否显示icon
 *   isScrollSwitch?: boolean, // 滚动自动切换自动切换
 *   scrollTop?: number, // 触发滚动的高度
 *   disableDrag?: boolean, // 禁用拖拽
 *   [propName: string]: any
 * }} IMiniScreenConfig
 */
class MiniScreen extends Plugin {
  static get pluginName () {
    return 'miniscreen'
  }

  /**
   * @type IMiniScreenConfig
   */
  static get defaultConfig () {
    return {
      index: 10,
      disable: false,
      width: 320,
      height: 180,
      left: -1, // Default bottom left corner
      top: -1, // Default bottom left corner
      isShowIcon: false, // Whether to show icon
      isScrollSwitch: false,
      scrollTop: 0, // Height to trigger scroll
      disableDrag: false // Disable drag and drop
    }
  }

  constructor (args) {
    super(args)
    this.isMini = false
    this.isClose = false
    const { config } = this
    this.pos = {
      left: config.left < 0 ? window.innerWidth - config.width - 20 : config.left,
      top: config.top < 0 ? window.innerHeight - config.height - 20 : config.top,
      height: this.config.height,
      width: this.config.width,
      scrollY: window.scrollY || 0
    }
    this.lastStyle = null
  }

  beforeCreate (args) {
    if (typeof args.player.config.mini === 'boolean') {
      args.config.isShowIcon = args.player.config.mini
    }
  }

  afterCreate () {
    this.initIcons()
    this.on(Events.PAUSE, () => {
      this.setAttr('data-state', 'pause')
    })
    this.on(Events.PLAY, () => {
      this.setAttr('data-state', 'play')
    })
  }

  onPluginsReady () {
    const { player, config } = this
    if (config.disable) {
      return
    }
    if (this.config.isShowIcon) {
      const options = {
        config: {
          onClick: () => {
            this.getMini()
          }
        }
      }
      player.controls.registerPlugin(MiniScreenIcon, options, MiniScreenIcon.pluginName)
    }
    const eventName = Util.checkTouchSupport() ? 'touchend' : 'click'
    this.bind('.mini-cancel-btn', eventName, this.onCancelClick)
    this.bind('.play-icon', eventName, this.onCenterClick)
    if (!this.config.disableDrag) {
      this._draggabilly = new Draggabilly(this.player.root, {
        handle: this.root
      })
    }
    if (this.config.isScrollSwitch) {
      window.addEventListener('scroll', this.onScroll)
    }
  }

  registerIcons () {
    return {
      play: { icon: PlayIcon, class: 'xg-icon-play' },
      pause: { icon: PauseIcon, class: 'xg-icon-pause' }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.play-icon', icons.play)
    this.appendChild('.play-icon', icons.pause)
  }

  onCancelClick = (e) => {
    // e.preventDefault()
    // e.stopPropagation()
    this.exitMini()
    this.isClose = true
  }

  onCenterClick = (e) => {
    const { player } = this
    player.paused ? player.play() : player.pause()
  }

  onScroll = (e) => {
    if ((!window.scrollY && window.scrollY !== 0) || Math.abs(window.scrollY - this.pos.scrollY) < 50) {
      return
    }
    let scrollHeight = parseInt(Util.getCss(this.player.root, 'height'))
    scrollHeight += this.config.scrollTop
    this.pos.scrollY = window.scrollY
    if (window.scrollY > scrollHeight + 5) {
      !this.isMini && !this.isClose && this.getMini()
    } else if (window.scrollY <= scrollHeight) {
      this.isMini && this.exitMini()
      this.isClose = false
    }
  }

  getMini () {
    if (this.isMini) {
      return
    }
    const { player, playerConfig } = this
    const target = this.config.target || this.player.root
    this.lastStyle = {}
    Util.addClass(player.root, 'xgplayer-mini');
    ['width', 'height', 'top', 'left'].map(key => {
      this.lastStyle[key] = target.style[key]
      target.style[key] = `${this.pos[key]}px`
    })
    if (playerConfig.fluid) {
      target.style['padding-top'] = ''
    }
    this.emit(Events.MINI_STATE_CHANGE, true)
    player.isMini = this.isMini = true
  }

  exitMini () {
    if (!this.isMini) {
      return false
    }
    const { player, playerConfig } = this
    const target = this.config.target || this.player.root
    Util.removeClass(player.root, 'xgplayer-mini')
    if (this.lastStyle) {
      Object.keys(this.lastStyle).map(key => {
        target.style[key] = this.lastStyle[key]
      })
    }
    this.lastStyle = null
    if (playerConfig.fluid) {
      player.root.style.width = '100%'
      player.root.style.height = '0'
      player.root.style['padding-top'] = `${playerConfig.height * 100 / playerConfig.width}%`
    }
    this.emit(Events.MINI_STATE_CHANGE, false)
    this.isMini = player.isMini = false
  }

  destroy () {
    window.removeEventListener('scroll', this.onScroll)
    const eventName = Util.checkTouchSupport() ? 'touchend' : 'click'
    this.unbind('.mini-cancel-btn', eventName, this.onCancelClick)
    this.unbind('.play-icon', eventName, this.onCenterClick)
    this._draggabilly && this._draggabilly.destroy()
    this._draggabilly = null
    this.exitMini()
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `
      <xg-mini-layer class="xg-mini-layer">
      <xg-mini-header class="xgplayer-mini-header">
      <div lang-key="${this.i18nKeys.MINI_DRAG}">${this.i18n.MINI_DRAG}</div>
      </xg-mini-header>
      <div class="mini-cancel-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fill="#fff" fill-rule="evenodd" d="M3.99 3.49a1 1 0 0 1 1.414 0L10 8.085l4.596-4.595a1 1 0 1 1 1.414 1.414L11.414 9.5l4.596 4.596a1 1 0 0 1 .084 1.32l-.084.094a1 1 0 0 1-1.414 0L10 10.914 5.404 15.51a1 1 0 0 1-1.414-1.414L8.585 9.5 3.99 4.904a1 1 0 0 1-.084-1.32z"></path>
        </svg>
      </div>
      <div class="play-icon">
      </div>
      </xg-mini-layer>`
  }
}

export {
  MiniScreen as default,
  MiniScreenIcon
}
