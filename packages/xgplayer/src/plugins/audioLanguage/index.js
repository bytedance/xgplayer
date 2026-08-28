import { POSITIONS, Util } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'
import './index.scss'


/**
 * @typedef {{
 *   position?: string,
 *   index?: number,
 *   list?: Array<IDefinition>,
 *   defaultDefinition?: any,
 *   disable?: any,
 *   hidePortrait?: boolean,
 *   className?: string
 * }} IDefinitionConfig
 */
export default class AudioLanguageIcon extends OptionsIcon {
  static get pluginName () {
    return 'audiolanguage'
  }

  /**
   * @type IDefinitionConfig
   */
  static get defaultConfig () {
    return {
      ...OptionsIcon.defaultConfig,
      position: POSITIONS.CONTROLS_RIGHT,
      index: 3,
      list: [],
      defaultLanguage: '',
      disable: true,
      className: 'xgplayer-audio-language',
      isShowIcon: true
    }
  }

  beforeCreate (args) {
    const { list } = args.config
    if (Array.isArray(list) && list.length > 0) {
      args.config.list = list.map(item => {
        if (!item.text && item.name) {
          item.text = item.name
        }
        if (!item.text) {
          item.text = item.language
        }
        return item
      })
    }
  }

  constructor (args) {
    super(args)
  }

  afterCreate () {
    super.afterCreate()
    this.on('audioLanguageResourceReady', (list) => {
      this.changeList(list)
    })
  }

  show () {
    if (!this.config.list || this.config.list.length < 2){
      return
    }
    Util.addClass(this.root, 'show')
  }


  renderItemList (list = this.config.list || [], to) {
    const targetLanguage = to && to.language ? to.language : this.config.defaultLanguage
    if (to) {
      list.forEach((item) => {
        item.selected = false
      })
    }
    let curIndex = 0
    const items = list.map((item, index) => {
      const showItem = {
        ...item,
        showText: this.getTextByLang(item) || item.language,
        selected: false
      }

      if (item.selected || (item.language
        // eslint-disable-next-line eqeqeq
        && item.language == targetLanguage)
      ) {
        showItem.selected = true
        curIndex = index
      }
      return showItem
    })
    super.renderItemList(items, curIndex)
  }

  changeList (list) {
    if (!Array.isArray(list)) {
      return
    }
    this.config.list = list.map(item => {
      if (!item.text && item.name) {
        item.text = item.name
      }
      if (!item.text) {
        item.text = item.language
      }
      return item
    })
    this.renderItemList()
    this.config.list.length < 2 ? this.hide() : this.show()
  }

  switchAudioTrack (to, from) {
    this.player.switchAudioTrack(to, from)
  }

  onItemClick (e, data) {
    super.onItemClick(...arguments)
    this.emitUserAction(e, 'change_audiolanguage', { from: data.from, to: data.to })
    this.switchAudioTrack(data.to, data.from)
  }
}
