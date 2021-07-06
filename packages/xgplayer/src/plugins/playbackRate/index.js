import { Events, POSITIONS } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'

/**
 * @typedef {{
 *  position?: string,
 *  index?: number,
 *  list?: Array<number | { [propName: string]: any }>,
 *  className?: string,
 *  hidePortrait?: boolean,
 *  [propName: string]: any
 * }} IPlaybackRateConfig
 */

export default class PlaybackRate extends OptionsIcon {
  static get pluginName () {
    return 'playbackRate'
  }

  /**
   * @type IPlaybackRateConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 4,
      list: [2, 1.5, 1, 0.75, 0.5],
      className: 'xgplayer-playbackrate',
      hidePortrait: false
    }
  }

  constructor (args) {
    super(args)
    this.curRate = 1
  }

  beforeCreate (args) {
    const { playbackRate } = args.player.config
    const list = !playbackRate ? [] : Array.isArray(playbackRate) ? playbackRate : args.config.list
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

  afterCreate () {
    super.afterCreate()
    this.on(Events.RATE_CHANGE, () => {
      if (this.curValue === this.player.playbackRate) {
        return
      }
      this.renderItemList()
    })
    this.renderItemList()
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return
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
    this.curValue = Number(rate)
    this.player.playbackRate = Number(rate)
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

  destroy () {
    super.destroy()
  }
}
