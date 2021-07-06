import { Events, POSITIONS, Util } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'
/**
 * @typedef {{
 *   text?: string,
 *   text?: string,
 *   definition?: any
 * }} IDefinition
 */

/**
 * @typedef {{
 *   position?: string,
 *   index?: string,
 *   list?: Array<IDefinition>,
 *   disable?: any,
 *   hidePortrait?: boolean,
 *   className?: string
 * }} IDefinitionConfig
 */
export default class DefinitionIcon extends OptionsIcon {
  static get pluginName () {
    return 'definition'
  }

  /**
   * @type IDefinitionConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 3,
      list: [],
      disable: false,
      hidePortrait: false, // 是否在移动端竖屏状态下隐藏
      className: 'xgplayer-definition'
    }
  }

  beforeCreate (args) {
    const { list } = args.config
    if (Array.isArray(list) && list.length > 0) {
      args.config.list = list.map(item => {
        if (!item.text && item.name) {
          item.text = item.name
        }
        return item
      })
    }
  }

  constructor (args) {
    super(args)
    // 记录切换的时候的播放器状态
    this.curTime = 0
    this.isPaused = true
  }

  afterCreate () {
    super.afterCreate()
    this.on('resourceReady', (list) => {
      this.changeDefinitionList(list)
    })
  }

  renderItemList () {
    const { player } = this
    const { list } = this.config
    let currentSrc = player.currentSrc || player.src
    if (player.switchURL) {
      let curRUL = document.createElement('a');
      ['hlsjs'].every(item => {
        if (player[item]) {
          if (player[item].url) {
            curRUL.href = player[item].url
          }
          if (item === 'hlsjs') {
            curRUL.href = player[item].originUrl || player[item].url
          }
          currentSrc = curRUL.href
          return false
        } else {
          return true
        }
      })
      curRUL = null
    }
    let curIndex = 0
    const items = list.map((item, index) => {
      const showItem = {
        url: item.url,
        definition: item.definition || '',
        showText: this.getTextByLang(item)
      }
      if (item.url === currentSrc || (!Util.isUndefined(item.definition) && item.definition === this.config.defaultDefinition)) {
        showItem.isCurrent = true
        curIndex = index
      }
      return showItem
    })
    super.renderItemList(items, curIndex)
  }

  onCanplayChangeDefinition () {
    const { player } = this
    player.currentTime = this.curTime
    if (!this.isPaused) {
      const playPromise = player.play()
      if (playPromise !== undefined && playPromise) {
        // eslint-disable-next-line handle-callback-err
        playPromise.catch(_err => {})
      }
    } else {
      player.pause()
    }
    player.emit(Events.AFTER_DEFINITION_CHANGE)
  }

  onTimeupdateChangeDefinition () {
    this.once('timeupdate', () => {
      this.onCanplayChangeDefinition()
    })
  };

  switchUrl (lastATag) {
    const { player } = this
    let curRUL = document.createElement('a');
    ['mp4', 'hls', '__flv__', 'dash', 'hlsjs'].every(item => {
      if (player[item]) {
        if (player[item].url) {
          curRUL.href = player[item].url
        }
        if (item === '__flv__') {
          if (player[item]._options) {
            curRUL.href = player[item]._options.url
          } else {
            curRUL.href = player[item]._mediaDataSource.url
          }
        }
        if (item === 'hlsjs') {
          curRUL.href = player[item].originUrl || player[item].url
        }
        return false
      } else {
        return true
      }
    })
    if (lastATag && curRUL.href !== lastATag.url && !player.ended) {
      player.switchURL(lastATag.url)
    }
    curRUL = null
  }

  // 对外暴露 切换清晰度
  changeDefinitionList (list) {
    if (!Array.isArray(list)) {
      return
    }
    this.config.list = list.map(item => {
      if (!item.text && item.name) {
        item.text = item.name
      }
      return item
    })
    this.renderItemList()
    this.show()
  }

  changeDefinition (to) {
    const { player } = this
    if (player.switchURL) {
      this.switchUrl(to)
    } else {
      // TODO: 兼容hls和flv
      if (to.url !== player.currentSrc) {
        this.curTime = player.currentTime
        this.isPaused = player.paused
        if (!player.ended) {
          player.src = to.url
          player.play()
          if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
            this.once('timeupdate', () => {
              this.onTimeupdateChangeDefinition()
            })
          } else {
            this.once('canplay', () => {
              this.onCanplayChangeDefinition()
            })
          }
        }
      }
    }
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    const { player } = this
    const target = e.delegateTarget
    const url = target.getAttribute('url')
    player.emit(Events.BEFORE_DEFINITION_CHANGE, url)
    this.changeDefinition(data.to)
    player.emit(Events.DEFINITION_CHANGE, { from: data.from, to: data.to })
  }
}
