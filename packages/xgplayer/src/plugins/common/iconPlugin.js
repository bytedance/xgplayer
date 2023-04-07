import Plugin from '../../plugin'

export default class Fullscreen extends Plugin {
  afterCreate () {
    this.bind('mouseenter', this._onMouseenter)
    this.bind('mouseleave', this._onMouseLeave)
  }

  _onMouseenter = (e) => {
    this.emit('icon_mouseenter', {
      pluginName: this.pluginName
    })
  }

  _onMouseLeave = (e) => {
    this.emit('icon_mouseleave', {
      pluginName: this.pluginName
    })
  }

  destroy () {
    this.unbind('mouseenter', this._onMouseenter)
    this.unbind('mouseleave', this._onMouseLeave)
  }
}
