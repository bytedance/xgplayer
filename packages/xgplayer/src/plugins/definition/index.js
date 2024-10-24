import { Events, POSITIONS, Util } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'
import './index.scss'

/**
 * @typedef {import('../../defaultConfig').IDefinition} IDefinition
 */

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
export default class DefinitionIcon extends OptionsIcon {
  static get pluginName () {
    return 'definition'
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
      defaultDefinition: '',
      disable: false,
      hidePortrait: false, // Whether to hide in the vertical screen state of the mobile terminal
      className: 'xgplayer-definition',
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
          item.text = item.definition
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

    this.on(Events.DEFINITION_CHANGE, (data) => {
      this.renderItemList(this.config.list, data.to)
    })
    if (this.player.definitionList.length < 2) {
      this.hide()
    }
  }

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
    if (!this.config.list || this.config.list.length < 2){
      return
    }
    Util.addClass(this.root, 'show')
  }

  initDefinition () {
    const { list, defaultDefinition } = this.config
    if (list.length > 0) {
      let to = null
      list.map(item => {
        if (item.definition === defaultDefinition) {
          to = item
        }
      })
      if (!to) {
        to = list[0]
      }
      this.changeDefinition(to)
    }
  }

  renderItemList (list = this.config.list || [], to) {
    const targetDef = to && to.definition ? to.definition : this.config.defaultDefinition
    if (to) {
      list.forEach((item) => {
        item.selected = false
      })
    }
    let curIndex = 0
    const items = list.map((item, index) => {
      const showItem = {
        ...item,
        showText: this.getTextByLang(item) || item.definition,
        selected: false
      }

      if (item.selected || (item.definition
        // eslint-disable-next-line eqeqeq
        && item.definition == targetDef)
      ) {
        showItem.selected = true
        curIndex = index
      }
      return showItem
    })
    super.renderItemList(items, curIndex)
  }

  // 对外暴露 切换清晰度
  changeDefinitionList (list) {
    if (!Array.isArray(list)) {
      return
    }

    if (this.player.config.definition) {
      this.player.config.definition.list = list
    }

    this.config.list = list.map(item => {
      if (!item.text && item.name) {
        item.text = item.name
      }
      if (!item.text) {
        item.text = item.definition
      }
      return item
    })
    this.renderItemList()
    this.config.list.length < 2 ? this.hide() : this.show()
  }

  changeDefinition (to, from) {
    this.player.changeDefinition(to, from)
  }

  onItemClick (e, data) {
    const { list: definitionList } = this.config
    super.onItemClick(...arguments)
    this.emitUserAction(e, 'change_definition', { from: data.from, to: data.to })
    for (let i = 0; i < definitionList.length; i++) {
      if (data.to && definitionList[i].definition === data.to.definition) {
        data.to.url = definitionList[i].url
      }

      if (data.from && (definitionList[i].definition === data.from.definition)) {
        data.from.url = definitionList[i].url
      }
    }
    this.player.changeDefinition(data.to, data.from)
  }
}
