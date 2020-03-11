import Plugin from '../../plugin'
const {Events, Util, POSITIONS} = Plugin

class Controls extends Plugin {
  static get pluginName () {
    return 'Controls'
  }

  static get defaultConfig () {
    return {
      disable: false
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.controls === 'boolean') {
      args.config.disable = !args.player.config.controls
    }
  }

  afterCreate () {
    if (this.config.disable) {
      return
    }
    const {height} = this.config
    const style = {
      height: `${height}px`
    }
    Object.keys(style).map(key => {
      this.root.style[key] = style[key]
    })
    this.left = this.find('left-grid')
    this.center = this.find('center')
    this.right = this.find('right-grid')
    this.on(Events.MINI_STATE_CHANGE, (isMini) => {
      isMini ? Util.addClass(this.root, 'mini') : Util.removeClass(this.root, 'mini')
    })
    this.bind('mouseenter', (e) => {
      this.mouseEnter(e)
    })
    this.bind('mouseou', (e) => {
      this.mouseOut(e)
    })
  }

  mouseEnter () {
    console.log('mouseenter')
  }

  mouseOut () {
    console.log('mouseout')
  }

  showTips () {

  }

  registerPlugin (plugin, options = {}, name) {
    if (!this.root) {
      return;
    }
    if (!options.root) {
      const position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position
      switch (position) {
        case POSITIONS.CONTROLS_LEFT:
          options.root = this.left
          break
        case POSITIONS.CONTROLS_RIGTH:
          options.root = this.right;
          break;
        case POSITIONS.CONTROLS_CENTER:
          options.root = this.center;
          break;
        default:
          options.root = this.left
      }
      return super.registerPlugin(plugin, options, name)
    }
  }

  render () {
    if (this.config.disable) {
      return;
    }
    return `<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">
    <left-grid class="left-grid">
    </Left-grid>
    <center class="center"></center>
    <right-grid class="right-grid">
    </right-grid>
    </xg-controls>`
  }
}

export default Controls
