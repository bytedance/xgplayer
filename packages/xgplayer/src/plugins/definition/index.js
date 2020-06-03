import SideListIcon from '../common/sideListIcon'

const { Events, POSITIONS } = SideListIcon
export default class DefinitionIcon extends SideListIcon {
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
      hideMobile: true, // 是否在移动端竖屏状态下隐藏
      classname: 'xgplayer-definition',
      pluginName: 'definition'
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
    this.once('resourceReady', (list) => {
      this.changeDefinitionList(list)
    })
  }

  // renderItemList () {
  //   const {player} = this
  //   const {list} = this.config
  //   let src = player.config.url
  //   const a = document.createElement('a')
  //   if (player.switchURL) {
  //     this.switchUrl()
  //   } else {
  //     const currentSrc = player.currentSrc || player.src;
  //     src = /^http/.test(currentSrc) ? currentSrc : src;
  //   }
  //   if (player['hls']) {
  //     a.href = player['hls'].url
  //     src = a.href
  //   }

  //   const liList = list.map(item => {
  //     a.href = item.url
  //     const className = player.dash ? (item.selected ? 'selected' : '') : (a.href === src ? 'selected' : '')
  //     return `<li class="${className}" cname="${item.name}" url="${item.url}">${item.name}</li>`
  //   })
  //   let cursrc = list.filter(item => {
  //     a.href = item.url
  //     if (player.dash) {
  //       return item.selected === true
  //     } else {
  //       return a.href === src
  //     }
  //   })
  //   this.find('.icon-text').innerHTML = (cursrc[0] || {name: '清晰度'}).name
  //   this.find('.option-list').innerHTML = liList.join('')
  // }
  renderItemList () {
    const { player } = this
    const {list} = this.config
    const currentSrc = player.currentSrc || player.src
    const currentText = '清晰度'
    list.map((item) => {
      if (item.url === currentSrc) {
        item.isCurrent = true
      }
    })
    super.renderItemList(list, currentText)
  }

  onCanplayChangeDefinition () {
    console.log('onCanplayChangeDefinition')
    const {player} = this
    player.currentTime = this.curTime
    if (!this.isPaused) {
      let playPromise = player.play()
      if (playPromise !== undefined && playPromise) {
        // eslint-disable-next-line handle-callback-err
        playPromise.catch(err => {})
      }
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
    this.config.list = list
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
    this.find('.icon-text').innerHTML = to.name
  }

  onItemClick (e, data) {
    const {player} = this
    const target = e.delegateTarget
    const url = target.getAttribute('url')
    player.emit(Events.BEFORE_DEFINITION_CHANGE, url)
    this.changeDefinition(data.to)
    player.emit(Events.DEFINITION_CHANGE, {from: data.from, to: data.to})
  }
}
