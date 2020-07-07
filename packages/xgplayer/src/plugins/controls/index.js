import Plugin from '../../plugin'

const {Events, Util, POSITIONS, Sniffer} = Plugin

class Controls extends Plugin {
  static get pluginName () {
    return 'controls'
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
    console.log('args.config.mode', args.config.mode)
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
    this.innerRoot = this.find('inner-controls')
    this.on(Events.MINI_STATE_CHANGE, (isMini) => {
      isMini ? Util.addClass(this.root, 'mini-controls') : Util.removeClass(this.root, 'mini-controls')
    })
    this.bind('mouseenter', (e) => {
      this.mouseEnter(e)
    })
    this.bind('mouseleave', (e) => {
      this.mouseOut(e)
    })

    this.bind(['click', 'touchend', 'touchmove'], (e) => {
      e.preventDefault()
      e && e.stopPropagation();
    })
  }

  mouseEnter () {
    // console.log('controls mouseEnter')
    // clearTimeout(this.player.userTimer)
  }

  mouseOut () {
    // console.log('controls mouseOut')
    // const {player} = this
    // player.userTimer = setTimeout(function () {
    //   this.isActive = false
    //   player.emit(Events.PLAYER_BLUR)
    // }, player.config.inactive)
  }

  focus () {
    this.player.emit(Events.PLAYER_FOCUS, {autoHide: false})
  }

  unFocus () {
    this.player.emit(Events.PLAYER_FOCUS, {autoHide: true})
  }

  blur () {
    this.player.emit(Events.PLAYER_BLUR, {ignoreStatus: true})
  }

  show () {
    this.root && (this.root.style.display = 'inline-block')
  }

  registerPlugin (plugin, options = {}, name) {
    if (!this.root) {
      return;
    }
    const defaultConfig = plugin.defaultConfig || {}
    if (!options.root) {
      const position = options.config && options.config.position ? options.config.position : defaultConfig.position
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
        case POSITIONS.CONTROLS:
          options.root = this.root;
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
    let className = this.config.mode === 'flex' ? 'flex-controls ' : ''
    className += this.config.autoHide ? 'control_autohide' : ''
    return `<xg-controls class="xgplayer-controls ${className}" unselectable="on" onselectstart="return false">
    <inner-controls class="inner-controls">
      <left-grid class="left-grid">
      </Left-grid>
      <center class="center"></center>
      <right-grid class="right-grid">
      </right-grid>
    </inner-controls>
    </xg-controls>`
  }
}

export default Controls
