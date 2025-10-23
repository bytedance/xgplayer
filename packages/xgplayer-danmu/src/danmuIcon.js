import { Plugin, POSITIONS, xgIconTips } from 'xgplayer'
import { xgIconTips } from '../common/iconTools'

const DANMU_OPEN = `<dk-switch class="danmu-switch">
<span class="txt">弹</span>
</dk-switch>`

class DanmuIcon extends Plugin {
  static get pluginName () {
    return 'danmuIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 11,
      onSwitch: (event, state) => {
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

  switchState (isOpen) {
    if (isOpen) {
      this.setAttr('data-state', 'active')
    } else {
      this.setAttr('data-state', 'normal')
    }
    this.switchTips(isOpen)
  }

  initIcons () {
    const { icons } = this
    const contentIcon = this.find('.xgplayer-icon')
    contentIcon.appendChild(icons.openDanmu)
    contentIcon.appendChild(icons.closeDanmu)
  }

  switchTips (isOpen) {
    const tipDom = this.find('.xg-tips')
    tipDom && this.changeLangTextKey(tipDom, isOpen ? 'OFF' : 'OPEN')
  }

  onStateChange (e) {
    e.preventDefault()
    e.stopPropagation()
    const state = this.root.getAttribute('data-state')
    const isOpen = state === 'active'
    this.switchState(!isOpen)
    this.config.onSwitch && this.config.onSwitch(e, !isOpen)
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  render () {
    const langKey = 'OPEN'
    return `
    <xg-icon class="danmu-icon">
      <div class="xgplayer-icon">
      </div>
      ${xgIconTips(this, langKey, this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}

export default DanmuIcon
