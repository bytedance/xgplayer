import OptionsIcon from '../common/optionsIcon'

const { Events, POSITIONS, Util } = OptionsIcon
export default class DefinitionIcon extends OptionsIcon {
  static get pluginName () {
    return 'definition'
  }

  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 3,
      list: [],
      disable: false,
      hidePortrait: false, // 是否在移动端竖屏状态下隐藏
      className: 'xgplayer-definition'
    }
  }

  beforeCreate (args) {
    const {list} = args.config
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
    const {list} = this.config
    const currentSrc = player.currentSrc || player.src
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
    const {player} = this
    player.currentTime = this.curTime
    if (!this.isPaused) {
      let playPromise = player.play()
      if (playPromise !== undefined && playPromise) {
        // eslint-disable-next-line handle-callback-err
        playPromise.catch(err => {})
      }
    } else {
      player.pause()
    }
    player.emit(Events.AFTER_DEFINITION_CHANGE)
  }

  switchUrl (lastATag) {
    const {player} = this
    let curRUL = document.createElement('a');
    ['mp4', 'hls', '__flv__', 'dash'].every(item => {
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
        return false
      } else {
        return true
      }
    })
    if (lastATag && curRUL.href !== lastATag.href && !player.ended) {
      player.switchURL(lastATag.href)
    }
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
    const {player} = this
    if (player.switchURL) {
      this.switchUrl(to)
    } else {
      // TODO: 兼容hls和flv
      if (to.url !== player.currentSrc) {
        this.curTime = player.currentTime
        this.isPaused = player.paused
        if (!player.ended) {
          player.video.src = to.url
          this.once('canplay', () => {
            this.onCanplayChangeDefinition()
          })
        }
      }
    }
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    const {player} = this
    const target = e.delegateTarget
    const url = target.getAttribute('url')
    player.emit(Events.BEFORE_DEFINITION_CHANGE, url)
    this.changeDefinition(data.to)
    player.emit(Events.DEFINITION_CHANGE, {from: data.from, to: data.to})
  }
}
