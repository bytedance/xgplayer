import Plugin from '../../plugin'
import OptionsIcon from '../common/optionsIcon'

const {POSITIONS} = Plugin

export default class PlaybackRate extends OptionsIcon {
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
      hidePortrait: false
    }
  }

  constructor (args) {
    super(args)
    this.curRate = 1
  }

  beforeCreate (args) {
    const {playbackRate} = args.player.config
    let list = !playbackRate ? [] : Array.isArray(playbackRate) ? playbackRate : args.config.list
    if (Array.isArray(list)) {
      args.config.list = list.map(item => {
        if (typeof item === 'number') {
          item = {
            rate: item,
            text: `${item}x`
          }
        } else if (!item.text && item.rate) {
          item.text = `${item.rate}x`
        }
        return item
      })
    }
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    super.show()
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    const target = e.delegateTarget
    const rate = target.getAttribute('rate')
    if (Number(rate) === this.curValue) {
      return false
    }
    this.player.playbackRate = Number(rate)
    // this.curIndex = data.to.index
    // this.changeCurrentText(rate)
  }

  destroy () {
    this.unbind(this.activeEvent, this.onMouseenter)
    this.unbind('mouseleave', this.onMouseenter)
  }

  renderItemList () {
    const playbackRate = this.player.playbackRate || 1
    this.curValue = playbackRate
    let curIndex = 0
    const items = this.config.list.map((item, index) => {
      const itemInfo = {
        rate: item.rate
      }
      if (itemInfo.rate === playbackRate) {
        itemInfo.isCurrent = true
        curIndex = index
      }
      itemInfo.showText = this.getTextByLang(item)
      return itemInfo
    })
    super.renderItemList(items, curIndex)
  }
}
