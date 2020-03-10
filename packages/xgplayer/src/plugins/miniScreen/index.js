import Plugin from '../../plugin'
import PlayIcon from '../assets/play.svg'
import PauseIcon from '../assets/pause.svg'
import MiniScreenIcon from './miniScreenIcon'
import './index.scss'

const {Util, Events} = Plugin

class MiniScreen extends Plugin {
  static get pluginName () {
    return 'miniscreen'
  }

  static get defaultConfig () {
    return {
      disable: false,
      width: 320,
      height: 180,
      left: -1, // 默认左下角
      top: -1, // 默认左下角
      isShowIcon: false, // 是否显示icon
      isScrollSwitch: false, // 滚动自动切换自动切换
      scrollTop: 0, // 触发滚动的高度
      disableDrag: false // 禁用拖拽
    }
  }

  constructor (args) {
    super(args)
    this.isMini = false
    const {config} = this
    this.pos = {
      left: config.left < 0 ? window.innerWidth - config.width - 20 : config.left,
      top: config.top < 0 ? window.innerHeight - config.height - 20 : config.top,
      height: this.config.height,
      width: this.config.width
    }
    this.coordinate = {
      currentX: 0,
      currentY: 0,
      scrollY: window.scrollY || 0
    }
    this.lastStyle = null
    this.isMoveing = false
  }

  beforeCreate (args) {
    if (typeof args.player.config.mini === 'boolean') {
      args.config.isShowIcon = args.player.config.mini
    }
  }

  afterCreate () {
    const bindFunKeys = ['onMousemove', 'onMousedown', 'onMouseup', 'onCancelClick', 'onCenterClick', 'onScroll']
    bindFunKeys.map(key => {
      this[key] = this[key].bind(this)
    })
    this.on(Events.PAUSE, () => {
      const btn = this.find('.play-icon')
      Util.addClass(btn, 'pause')
      Util.removeClass(btn, 'play')
    })
    this.on(Events.PLAY, () => {
      const btn = this.find('.play-icon')
      Util.addClass(btn, 'play')
      Util.removeClass(btn, 'pause')
    })
  }

  onPluginsReady () {
    const {player, config} = this
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
      this.miniIcon = player.controls.registerPlugin(MiniScreenIcon, options, MiniScreenIcon.pluginName)
    }
    this.bind('.mini-cancel-btn', 'click', this.onCancelClick)
    this.bind('.play-icon', 'click', this.onCenterClick)
    if (!this.config.disableDrag) {
      this.bind('mousedown', this.onMousedown)
    }
    if (this.config.isScrollSwitch) {
      window.addEventListener('scroll', this.onScroll)
    }
  }

  onCancelClick (e) {
    this.exitMini()
  }

  onCenterClick (e) {
    const {player} = this
    player.paused ? player.play() : player.pause()
  }

  getCss (o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key]
  }

  onScroll (e) {
    if ((!window.scrollY && window.scrollY !== 0) || Math.abs(window.scrollY - this.coordinate.scrollY) < 50) {
      return;
    }
    let scrollHeight = parseInt(this.getCss(this.player.root, 'height'))
    scrollHeight += this.config.scrollTop
    this.coordinate.scrollY = window.scrollY
    if (window.scrollY > scrollHeight + 5 && !this.isMini) {
      this.getMini()
    } else if (window.scrollY <= scrollHeight && this.isMini) {
      this.exitMini()
    }
  }

  onMousedown (e) {
    if (e.target !== this.root || this.isMoveing) {
      return;
    }
    this.isMoveing = true
    this.coordinate.currentX = e.clientX
    this.coordinate.currentY = e.clientY
    this.bind('mouseup', this.onMouseup)
    this.bind('mousemove', this.onMousemove)
  }

  onMouseup (e) {
    if (e.target !== this.root || !this.isMoveing) {
      return;
    }
    this.isMoveing = false
    const target = this.config.target || this.player.root
    this.pos.top = parseInt(this.getCss(target, 'top'))
    this.pos.left = parseInt(this.getCss(target, 'left'))
    this.unbind('mousemove', this.onMousemove)
    this.unbind('mouseup', this.onMouseup)
  }

  onMousemove (e, callback) {
    e = e || window.event
    const target = this.config.target || this.player.root
    const maxTop = window.innerHeight - parseInt(this.getCss(target, 'height'))
    const maxLeft = window.innerWidth - parseInt(this.getCss(target, 'width'))
    if (this.isMoveing) {
      const nowX = e.clientX
      const nowY = e.clientY
      const disX = nowX - this.coordinate.currentX
      const disY = nowY - this.coordinate.currentY
      let top = parseInt(this.pos.top) + disY
      let left = parseInt(this.pos.left) + disX
      if (left < 0) {
        left = 0;
      } else if (left > maxLeft) {
        left = maxLeft
      }

      if (top < 0) {
        top = 0;
      } else if (top > maxTop) {
        top = maxTop
      }
      target.style.left = `${left}px`
      target.style.top = `${top}px`
      if (typeof callback === 'function') {
        callback(left, top)
      }

      if (e.preventDefault) {
        e.preventDefault()
      }
      return false
    }
  }

  getMini () {
    if (this.isMini) {
      return
    }
    const {player, playerConfig} = this;
    const target = this.config.target || this.player.root
    // this.draggie.enable()
    this.lastStyle = {}
    Util.addClass(player.root, 'xgplayer-mini')
    Object.keys(this.pos).map(key => {
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
    const {player, playerConfig} = this;
    const target = this.config.target || this.player.root
    Util.removeClass(player.root, 'xgplayer-mini')
    if (this.lastStyle) {
      Object.keys(this.lastStyle).map(key => {
        target.style[key] = this.lastStyle[key]
      })
    }
    this.lastStyle = null;
    if (playerConfig.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${playerConfig.height * 100 / playerConfig.width}%`
    }
    this.emit(Events.MINI_STATE_CHANGE, false)
    this.isMini = player.isMini = false
  }

  destroy () {
    this.unbind('mousedown', this.onMousedown)
    window.removeEventListener('scroll', this.onScroll)
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `
      <xg-mini-layer class="xg-mini-layer">
      <div class="mask"></div>
      <xg-mini-header class="xgplayer-mini-header">
        <div>按住画面可移动小窗</div>
      </xg-mini-header>
      <div class="mini-cancel-btn">X</div>
      <div class="play-icon play">
        ${PauseIcon}
        ${PlayIcon}
      </div>
      </xg-mini-layer>`
  }
}

export {
  MiniScreen as default,
  MiniScreenIcon
}
