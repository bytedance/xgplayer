import Plugin from '../../plugin'
import './danmuIcon.scss'

const {Util} = Plugin
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
      onSwitch: (state) => {
        console.log(`DanmuIcon:${state}`)
      },
      isOpen: false
    }
  }

  afterCreate () {
    console.log('danmuIcon', this.config)
    this.onStateChange = this.onStateChange.bind(this)
    this.bind(['click', 'touchend'], this.onStateChange)
  }

  switchState () {
    this.onStateChange()
  }

  onStateChange (e) {
    console.log('onStateChange')
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
    this.el.sytle.display = 'flex'
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  render () {
    return `
    <xg-icon class="danmu-icon">
      <dk-switch class="danmu-switch ${this.config.isOpen ? 'danmu-switch-active' : ''}">
        <span class="txt">弹</span>
      </dk-switch>
    </xg-icon>`
  }
}

export default DanmuIcon
