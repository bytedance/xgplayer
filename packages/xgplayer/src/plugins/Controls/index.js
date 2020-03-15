import Plugin from '../../plugin'

const {Events, Util, POSITIONS, Sniffer} = Plugin

class Controls extends Plugin {
  static get pluginName () {
    return 'Controls'
  }

  static get defaultConfig () {
    return {
      disable: false,
      autoHide: true,
      mode: ''
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.controls === 'boolean') {
      args.config.disable = !args.player.config.controls
    }
    if (!args.config.mode && Sniffer.device === 'mobile') {
      args.config.mode = 'flex'
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
    this.bind('mouseleave', (e) => {
      this.mouseOut(e)
    })
  }

  mouseEnter () {
    clearTimeout(this.player.userTimer)
  }

  mouseOut () {
    const {player} = this
    player.userTimer = setTimeout(function () {
      this.isActive = false
      player.emit(Events.PLAYER_BLUR)
    }, player.config.inactive)
  }

  show () {
    this.root && (this.root.style.display = 'inline-block')
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
    let className = this.config.mode === 'flex' ? 'flex ' : ''
    className += this.config.autoHide ? 'control_autohide' : ''

    return `<xg-controls class="xgplayer-controls ${className}" unselectable="on" onselectstart="return false">
    <left-grid class="left-grid">
    </Left-grid>
    <center class="center"></center>
    <right-grid class="right-grid">
    </right-grid>
    </xg-controls>`
  }
}

export default Controls
