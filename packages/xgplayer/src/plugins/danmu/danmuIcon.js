import Plugin from '../../plugin'

const {POSITIONS} = Plugin

const DANMU_OPEN = `<dk-switch class="danmu-switch">
<span class="txt">弹</span>
</dk-switch>`

class DanmuIcon extends Plugin {
  static get pluginName () {
    return 'danmuIcon'
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
    this.initIcons()
    this.switchState(this.config.defaultOpen)
    this.onStateChange = this.onStateChange.bind(this)
    this.bind(['click', 'touchend'], this.onStateChange)
  }

  registerIcons () {
    return {
      openDanmu: { icon: DANMU_OPEN, class: '' }
    }
  }

  registerLangauageTexts () {
    return {
      danmuClose: {
        jp: '閉じる',
        en: 'close',
        zh: '关闭'
      },
      dammuOpen: {
        jp: 'オンにする',
        en: 'open',
        zh: '开启'
      }
    }
  }

  switchState (isOpen) {
    if (isOpen === 'normal') {
      this.switchTips(false)
      this.setAttr('data-state', 'active')
    } else {
      this.setAttr('data-state', 'normal')
      this.switchTips(true)
    }
    this.config.onSwitch && this.config.onSwitch(!isOpen)
  }

  initIcons () {
    const {icons} = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.openDanmu)
  }

  switchTips (isOpen) {
    this.changeLangTextKey(this.find('.xg-tips'), isOpen ? 'dammuOpen' : 'danmuClose')
  }

  onStateChange (e) {
    const isOpen = this.root.getAttribute('data-state')
    this.switchState(isOpen)
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
      <div class="xgplayer-icon">
      </div>
      <div class="xg-tips" lang-key="dammuOpen"></div>
    </xg-icon>`
  }
}

export default DanmuIcon
