import SubTitles from 'xgplayer-subtitles'
import {Util, POSITIONS} from '../../plugin'
import OptionsIcon from '../common/optionsIcon'

const DEFAULT_CLOSE_TYPE = 'text-close'

function formartList (list) {
  let defaultIndex = -1
  list.map((item, index) => {
    if (!item.id && !item.language) {
      item.id = index
    }
    !item.url && (item.url = item.src)
    !item.text && (item.text = item.label)
    !item.language && (item.language = item.srclang)
    item.isDefault === undefined && (item.isDefault = item.default)
    if (item.isDefault || item.default) {
      defaultIndex = index
    }
  })
  return defaultIndex
}

export default class TextTrack extends OptionsIcon {
  static get pluginName () {
    return 'texttrack'
  }
  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 6,
      list: [],
      isDefaultOpen: true,
      style: {
        follow: true, // 是否跟随控制栏调整位置
        mode: 'stroke', // 字体显示模式，默认是描边
        followBottom: 50, // 跟随底部控制栏的高度
        fitVideo: true, // 是否跟随视频自动调整字号
        offsetBottom: 2, // 字幕距离画面底部百分比，默认2%
        baseSizeX: 49, // 横屏视频适配基准字号
        baseSizeY: 28, // 竖屏视频适配基准字号
        minSize: 16, // pc端最小字号
        minMobileSize: 13, // 移动端最小字号
        line: 'double', // 最大显示行数 single/double/three
        fontColor: '#fff' // 字体颜色
      },
      closeText: {text: '不开启', iconText: '字幕'},
      className: 'xgplayer-texttrack',
      hidePortrait: false
    }
  }

  constructor (args) {
    super(args)
    this.curRate = 1
  }

  beforeCreate (args) {
    const texttrack = args.player.config.texttrack || args.player.config.textTrack
    if (Util.typeOf(texttrack) === 'Array') {
      args.config.list = texttrack
    }
  }

  afterCreate () {
    const {list, style, isDefaultOpen} = this.config
    if (!list || list.length < 1) {
      return
    }
    const defaultIndex = formartList(list)
    // 如果配置信息为默认开启，但是没有默认开启的语言，则默认第一个
    if (isDefaultOpen && defaultIndex < 0) {
      list[0].isDefault = true
    }

    super.afterCreate()

    const config = {
      subTitles: list,
      defaultOpen: isDefaultOpen
    }
    Object.keys(style).map(key => {
      config[key] = style[key]
    })
    this.subTitles = new SubTitles(config)
    this.subTitles.attachPlayer(this.player)
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    super.show()
  }

  // 更新字幕信息
  updateSubtitles (list = [], isDefaultOpen = false) {
    const defaultIndex = formartList(list)
    const curLanguage = this.subTitles && this.subTitles.currentText ? this.subTitles.currentText.language : null
    let cuIndex = null
    list.map((item, index) => {
      if (item.language === curLanguage) {
        item.isDefault = true
        cuIndex = index
      }
    })
    if (defaultIndex > -1 && defaultIndex !== cuIndex) {
      list[defaultIndex].isDefault = false
    }
    this.subTitles.destroy()
    const config = {
      subTitles: list,
      defaultOpen: isDefaultOpen
    }
    Object.keys(this.config.style).map(key => {
      config[key] = this.config.style[key]
    })
    this.subTitles = new SubTitles(config)
    this.subTitles.attachPlayer(this.player)
    this.renderItemList()
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    const target = e.delegateTarget
    const language = target.getAttribute('language')
    const id = target.getAttribute('data-id')
    const type = target.getAttribute('data-type')
    if (this.subTitles) {
      if (type === DEFAULT_CLOSE_TYPE) {
        this.subTitles.switchOff()
      } else {
        this.subTitles.switch({language, id}).catch(error => {
          console.log('onItemClick', error)
        })
      }
    }
  }

  changeCurrentText () {
    const {list, closeText} = this.config
    let index = this.curIndex
    if (index - 1 < 0) {
      this.find('.icon-text').innerHTML = this.getTextByLang(closeText, 'iconText')
    } else if (index - 1 < list.length) {
      const curItem = list[index - 1]
      if (!curItem) return
      this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText')
    }
  }

  renderItemList () {
    const {list, closeText} = this.config
    let curIndex = 0
    const items = []
    items.push({
      showText: this.getTextByLang(closeText),
      'data-type': DEFAULT_CLOSE_TYPE
    })
    list.map((item, index) => {
      const itemInfo = {
        language: item.language || item.srclang,
        'data-id': item.id
      }
      if (item.default || item.isDefault) {
        itemInfo.isCurrent = true
        curIndex = index + 1
      }
      itemInfo.showText = this.getTextByLang(item)
      items.push(itemInfo)
    })
    super.renderItemList(items, curIndex)
  }

  destroy () {
    this.subTitles.destroy()
    this.subTitles = null
    super.destroy()
  }
}
