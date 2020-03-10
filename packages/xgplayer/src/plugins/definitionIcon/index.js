import Plugin from '../../plugin'

const { Events, Util, Sniffer, POSITIONS } = Plugin
export default class DefinitionIcon extends Plugin {
  static get pluginName () {
    return 'DefinitionIcon'
  }

  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 3,
      itemList: null
    }
  }

  constructor (args) {
    super(args)
    // 记录切换的时候的播放器状态
    this.curTime = 0
    this.isPaused = true
  }

  afterCreate () {
    this.once(Events.CANPLAY, () => {
      if (this.config.itemList && this.config.itemList.length > 0) {
        this.renderItemList()
        this.show()
      }
    })
    this.once('resourceReady', (list) => {
      this.config.itemList = list
      this.renderItemList()
      this.show()
    })
    if (Sniffer.device === 'mobile') {
      this.activeEvent = 'click'
    } else {
      this.activeEvent = 'mouseenter'
    }
    this.onToggle = this.onToggle.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.bind(this.activeEvent, this.onToggle)
    this.bind('mouseleave', this.onToggle)
    this.bind('.icon-list li', ['touched', 'click'], this.onItemClick)
  }

  renderItemList () {
    const {player} = this
    const {itemList} = this.config
    let src = player.config.url;
    const a = document.createElement('a')
    if (player.switchURL) {
      this.switchUrl()
    } else {
      src = player.currentSrc || player.src
    }
    if (player['hls']) {
      a.href = player['hls'].url
      src = a.href
    }

    const liList = itemList.map(item => {
      a.href = item.url
      const className = player.dash ? (item.selected ? 'selected' : '') : (a.href === src ? 'selected' : '')
      return `<li class="${className}" cname="${item.name}" url="${item.url}">${item.name}</li>`
    })
    let cursrc = itemList.filter(item => {
      a.href = item.url
      if (player.dash) {
        return item.selected === true
      } else {
        return a.href === src
      }
    })
    this.find('.icon-text').innerHTML = (cursrc[0] || {name: ''}).name
    this.find('.icon-list').innerHTML = liList.join('')
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
    }
    player.emit('afterdefinitionChange')
  }

  onToggle (e) {
    e.preventDefault()
    e.stopPropagation()
    Util.hasClass(this.root, 'list-show') ? Util.removeClass(this.root, 'list-show') : Util.addClass(this.root, 'list-show')
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
  changeDefinition () {

  }

  onItemClick (e) {
    const {player} = this
    const {itemList} = this.config
    e.preventDefault()
    e.stopPropagation()
    if (e.target && e.target.className === 'selected') {
      return false
    }
    const a = document.createElement('a')
    player.emit('beforeDefinitionChange', a.href)
    if (player.dash) {
      itemList.forEach(item => {
        item.selected = false
        if (item.name === e.target.innerHTML) {
          item.selected = true
        }
      })
    }
    const curlSelected = this.find('.selected')
    Util.addClass(e.target, 'selected')
    curlSelected && Util.removeClass(curlSelected, 'selected')
    const from = curlSelected ? curlSelected.getAttribute('cname') : ''
    const to = e.target.getAttribute('cname')
    a.href = e.target.getAttribute('url')
    this.curTime = player.currentTime;
    this.isPaused = player.paused
    if (player.switchURL) {
      this.switchUrl(a)
    } else {
      // if (player['hls']) {
      //   let curRUL = document.createElement('a')
      //   curRUL = player['hls'].url
      // }
      if (a.href !== player.currentSrc) {
        if (!player.ended) {
          player.src = a.href
          this.once('canplay', () => {
            this.onCanplayChangeDefinition()
          })
        }
      }
    }
    this.find('.icon-text').innerHTML = to
    player.emit('definitionChange', {from, to})
    if (Sniffer.device === 'mobile') {
      Util.removeClass(this.root, 'list-show')
    }
  }

  render () {
    const text = '清晰度'
    return `<xg-icon class="xgplayer-playbackrate" style="display: none;">
    <div class="xgplayer-icon btn-definition"><span class="icon-text">${text}</span></div>
    <ul class="icon-list">
    </ul>
   </xg-icon>`
  }
}
