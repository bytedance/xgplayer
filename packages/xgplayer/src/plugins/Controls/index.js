import Plugin from '../../plugin'
const {Events, Util} = Plugin
class Controls extends Plugin {
  static get pluginName () {
    return 'Controls'
  }

  static get defaultConfig () {
    return {
      height: 48,
      isHide: false
    }
  }

  afterCreate () {
    const {height} = this.config
    const style = {
      height: `${height}px`
    }
    Object.keys(style).map(key => {
      this.el.style[key] = style[key]
    })
    this.left = this.find('left-grid')
    this.center = this.find('center')
    this.right = this.find('right-grid')
    this.on(Events.MINI_STATE_CHANGE, (isMini) => {
      isMini ? Util.addClass(this.el, 'mini') : Util.removeClass(this.el, 'mini')
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
    if (!options.root) {
      const position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position
      const root = this[position] || this.left
      options.root = root
    }
    return super.registerPlugin(plugin, options, name)
  }

  render () {
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
