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
      }
    }
  }

  afterCreate () {
    this.initIcons()
    this.onStateChange = this.onStateChange.bind(this)
    this.bind(['click', 'touchend'], this.onStateChange)
  }

  registerIcons () {
    return {
      openDanmu: { icon: DANMU_OPEN, class: 'danmu-switch-open' },
      closeDanmu: { icon: DANMU_OPEN, class: 'danmu-switch-closed' }
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
    if (isOpen) {
      this.setAttr('data-state', 'active')
    } else {
      this.setAttr('data-state', 'normal')
    }
    this.switchTips(isOpen)
  }

  initIcons () {
    const {icons} = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.openDanmu)
    contentIcon.appendChild(icons.closeDanmu)
  }

  switchTips (isOpen) {
    this.changeLangTextKey(this.find('.xg-tips'), isOpen ? 'dammuOpen' : 'danmuClose')
  }

  onStateChange (e) {
    e.preventDefault();
    e.stopPropagation();
    const state = this.root.getAttribute('data-state')
    const isOpen = state === 'active'
    this.switchState(!isOpen)
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
      <div class="xgplayer-icon">
      </div>
      <div class="xg-tips" lang-key="dammuOpen"></div>
    </xg-icon>`
  }
}

export default DanmuIcon
