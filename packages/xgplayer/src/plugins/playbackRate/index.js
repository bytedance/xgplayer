import Plugin from '../../plugin'
import SideListIcon from '../common/sideListIcon'

const {POSITIONS} = Plugin

export default class PlaybackRate extends SideListIcon {
  static get pluginName () {
    return 'playbackRate'
  }
  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 4,
      list: [0.5, 0.75, {rate: 1, iconText: '倍速'}, 1.5, 2],
      className: 'xgplayer-playbackrate',
      pluginName: 'playbackRate'
    }
  }

  constructor (args) {
    super(args)
    this.curRate = 1
  }

  afterCreate () {
    const {playerConfig, config} = this
    if (Array.isArray(playerConfig.playbackRate)) {
      config.list = playerConfig.playbackRate
    }
    super.afterCreate()
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    super.show()
  }

  onItemClick (e) {
    const target = e.delegateTarget
    const rate = target.getAttribute('rate')
    if (Number(rate) === this.curValue) {
      return false
    }
    this.player.playbackRate = Number(rate)
    this.changeCurrent(rate, target.getAttribute('text'))
    super.onItemClick(e)
  }

  destroy () {
    this.unbind(this.activeEvent, this.onMouseenter)
    this.unbind('mouseleave', this.onMouseenter)
  }

  renderItemList () {
    const playbackRate = this.player.playbackRate || 1
    this.curValue = playbackRate
    let currentText = ''
    const items = this.config.list.map((item) => {
      let itemInfo = typeof item === 'object' ? item : {rate: item}
      !itemInfo.text && (itemInfo.text = `${itemInfo.rate}x`)
      if (itemInfo.rate === playbackRate) {
        itemInfo.isCurrent = true
        currentText = item.iconText || itemInfo.text
      }
      return itemInfo
    })
    super.renderItemList(items, currentText)
  }
}
