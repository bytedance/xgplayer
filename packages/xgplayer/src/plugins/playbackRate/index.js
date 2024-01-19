import { Events, POSITIONS } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'
import './index.scss'

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
      ...OptionsIcon.defaultConfig,
      position: POSITIONS.CONTROLS_RIGHT,
      index: 4,
      list: [2, 1.5, 1, 0.75, 0.5],
      className: 'xgplayer-playbackrate',
      isShowIcon: true,
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

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
    if (!this.config.list || this.config.list.length === 0) {
      return
    }
    super.show()
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    const target = e.delegateTarget
    const rate = Number(target.getAttribute('rate'))
    if (!rate || rate === this.curValue) {
      return false
    }
    const props = {
      playbackRate: {
        from: this.player.playbackRate,
        to: rate
      }
    }
    this.emitUserAction(e, 'change_rate', { props })
    this.curValue = rate
    this.player.playbackRate = rate
  }

  renderItemList () {
    const playbackRate = this.player.playbackRate || 1
    this.curValue = playbackRate
    let curIndex = -1
    const items = this.config.list.map((item, index) => {
      const itemInfo = {
        rate: item.rate
      }
      if (itemInfo.rate === playbackRate) {
        itemInfo.selected = true
        curIndex = index
      }
      itemInfo.showText = this.getTextByLang(item)
      return itemInfo
    })
    super.renderItemList(items, curIndex)
  }

  changeCurrentText () {
    if (this.isIcons) {
      return
    }
    const { list } = this.config
    const index = this.curIndex < list.length ? this.curIndex : 0
    const curItem = list[index]
    let _text = ''
    // 在列表中没有匹配的选项的时候，默认展示`${playbackRate}x'
    if (!curItem || this.curIndex < 0) {
      _text = `${this.player.playbackRate}x`
    } else {
      _text = this.getTextByLang(curItem, 'iconText')
    }
    this.find('.icon-text').innerHTML = _text
  }

  destroy () {
    super.destroy()
  }
}
