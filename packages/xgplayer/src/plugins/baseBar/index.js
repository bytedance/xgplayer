import Plugin from '../../plugin/plugin'

class BaseBar extends Plugin {
  static get pluginName () {
    return 'basebar'
  }

  static get defaultConfig () {
    return {
      disable: false,
      width: '50'
    }
  }

  afterCreate () {
    this.center = this.find('.xg-top-bar')
    this.left = this.find('.xg-left-bar')
    this.right = this.find('.xg-right-bar')
    const {config} = this
    if (config.width && !config.disable) {
      this.center.style.height = `${config.width}px`
      this.left.style.width = `${config.width}px`
      this.right.style.width = `${config.width}px`
    }
  }

  registerPlugin (name, plugin, options = {}) {
    if (!options.root) {
      const position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position
      const root = this[position] || this.center
      options.root = root
    }
    return super.registerPlugin(name, plugin, options)
  }

  render () {
    if (this.config.disable) {
      return ''
    }
    return `
    <xg-bar>
    <xg-bar class="xg-top-bar"></xg-bar>
    <xg-bar class="xg-left-bar"></xg-bar>
    <xg-bar class="xg-right-bar"></xg-bar>
    </xg-bar>`
  }
}
export default BaseBar
