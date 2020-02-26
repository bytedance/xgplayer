import Draggabilly from 'draggabilly'
import Plugin from '../../plugin'
import MiniScreenIcon from './miniScreenIcon'
import './index.scss'

const {Util, Events} = Plugin

class MiniScreen extends Plugin {
  static get pluginName () {
    return 'miniscreen'
  }

  static get defaultConfig () {
    return {
      width: 320,
      height: 180,
      left: 0,
      top: 200,
      'z-index': 110,
      isShowIcon: true, // 是否显示icon
      isCachePosition: true // 是否缓存位置信息
    }
  }

  constructor (args) {
    super(args)
    this.isMini = false
    this.position = {
      left: this.config.left,
      top: this.config.top,
      height: this.config.height,
      width: this.config.width
    }
    this.coordinate = {}
    this.lastStyle = null
  }

  changPosition (position = {left: 0, rigth: 0, top: null, bottom: null}) {
    console.log(position)
  }

  afterCreate () {
    this.getMini = this.getMini.bind(this)
    this.exitMini = this.exitMini.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onMousedown = this.onMousedown.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    const {player} = this
    if (this.config.isShowIcon) {
      const options = {
        onClick: () => {
          this.getMini()
        }
      }
      this.miniIcon = player.controls.registerPlugin(MiniScreenIcon.pluginName, MiniScreenIcon, options)
    }
    this.bind('xg-mini-drag', 'click', () => {
      console.log('xg-mini-drag')
      this.exitMini()
    })
    // this.bind(['click', 'touchend'], this.getMini)
    // this.bind('mousedown', this.onMousedown)
    // this.bind('mouseup', this.onMouseup)
    // this.draggie = new Draggabilly(this.player.root, {grid: [ 20, 20 ]})
    // this.draggie.isEnabled = false
    this.bind('mouseenter', () => {
      console.log('onMouseEnter')
    })
    this.bind('mouseleave', () => {
      console.log('onMouseLeave')
    })
  }

  onMouseEnter () {
    console.log('onMouseEnter')
  }

  onMouseLeave () {
    console.log('onMouseLeave')
  }

  onMousedown (e) {
    console.log('onMousedown')
    console.log(`x:${e.clientX}  y:${e.clientY}`)
    this.bind('mousemove', this.onMousemove)
  }

  onMouseup (e) {
    console.log('onMouseup')
    this.unbind('mousemove', this.onMousemove)
  }

  onMousemove (e) {
    const nx = e.clientX
    const ny = e.clientY
    const {x, y} = this.coordinate
    const {right, left} = this.position
    if (nx === x && ny === y) {
      return
    }
    if (right === 0) {

    } else if (left === 0) {

    }
    this.coordinate.x = nx
    this.coordinate.y = ny
    console.log('coordinate', this.coordinate)
  }

  getMini () {
    if (this.isMini) {
      return
    }
    const {player, playerConfig} = this;
    player.isMini = this.isMini = true
    // this.draggie.enable()
    this.lastStyle = {}
    Util.addClass(player.root, 'xgplayer-mini')
    this.show()
    console.log('position', this.position)
    Object.keys(this.position).map(key => {
      this.lastStyle[key] = player.root.style[key]
      player.root.style[key] = `${this.position[key]}px`
    })
    if (playerConfig.fluid) {
      player.root.style['padding-top'] = ''
    }
    console.log('this.lastStyle', this.lastStyle)
    this.createDraggie()
    this.emit(Events.MINI_STATE_CHANGE, true)
  }

  exitMini () {
    this.hide();
    if (!this.isMini) {
      return false
    }
    // this.draggie.disable()
    const {player, playerConfig} = this;
    this.isMini = player.isMini = false
    Util.removeClass(player.root, 'xgplayer-mini')
    if (this.lastStyle) {
      console.log('this.lastStyle', this.lastStyle)
      // player.root.removeAttribute('style')
      // player.root.setAttribute('style', this.lastStyle)
      Object.keys(this.lastStyle).map(key => {
        player.root.style[key] = this.lastStyle[key]
      })
    }
    this.lastStyle = null;
    if (playerConfig.fluid) {
      player.root.style['width'] = '100%'
      player.root.style['height'] = '0'
      player.root.style['padding-top'] = `${playerConfig.height * 100 / playerConfig.width}%`
    }
    this.draggie.destroy()
    this.draggie = null
    this.emit(Events.MINI_STATE_CHANGE, false)
  }

  createDraggie () {
    this.draggie = new Draggabilly(this.player.root, {
      // grid: [ 5, 5 ]
      // handle: '.xg-mini-layer'
    })
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  render () {
    return `
      <xg-mini-layer class="xg-mini-layer">
      <xg-mini-drag>关闭</xg-mini-drag>
      </xg-mini-layer>`
  }
}

export default MiniScreen
