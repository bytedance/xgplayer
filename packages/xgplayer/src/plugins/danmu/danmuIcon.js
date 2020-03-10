import Plugin from '../../plugin'

const {Util, POSITIONS} = Plugin
class DanmuIcon extends Plugin {
  static get pluginName () {
    return 'danmuIcon'
  }

  static get position () {
    return {
      index: 7,
      gird: 'right'
    }
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 11,
      onSwitch: (state) => {
      },
      defaultOpen: false
    }
  }

  afterCreate () {
    this.onStateChange = this.onStateChange.bind(this)
    this.bind(['click', 'touchend'], this.onStateChange)
  }

  switchState () {
    this.onStateChange()
  }

  onStateChange (e) {
    const dom = this.find('.danmu-switch')
    const isOpen = Util.hasClass(dom, 'danmu-switch-active')
    if (isOpen) {
      Util.removeClass(dom, 'danmu-switch-active')
    } else {
      Util.addClass(dom, 'danmu-switch-active')
    }
    this.config.onSwitch && this.config.onSwitch(!isOpen)
  }

  show () {
    this.root.sytle.display = 'flex'
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  render () {
    return `
    <xg-icon class="danmu-icon">
      <dk-switch class="danmu-switch ${this.config.defaultOpen ? 'danmu-switch-active' : ''}">
        <span class="txt">弹</span>
      </dk-switch>
    </xg-icon>`
  }
}

export default DanmuIcon
