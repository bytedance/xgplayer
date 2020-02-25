import DanmuJs from 'danmu.js'
import Plugin from '../../plugin'
import DanmuPanel from './danmuPanel'
import DanmuIcon from './danmuIcon'
import './index.scss'

const {Util, Events} = Plugin

class Danmu extends Plugin {
  constructor (args) {
    super(args)
    this.danmujs = null;
    this.danmuPanel = null
  }

  static get pluginName () {
    return 'danmu'
  }

  static get defaultConfig () {
    return {
      comments: [], // 弹幕数组,
      area: { // 弹幕显示区域
        start: 0, // 区域顶部到播放器顶部所占播放器高度的比例
        end: 1 // 区域底部到播放器顶部所占播放器高度的比例
      },
      closeDefaultBtn: true, // 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
      defaultOff: true, // 开启此项后弹幕不会初始化，默认初始化弹幕
      panel: true,
      panelConfig: {},
      switchButton: true,
      isOpen: true
    }
  }

  afterCreate () {
    console.log('danmu', this.config)
    this.once(Events.COMPLETE, () => {
      this.initDanmu()
      this.registerExtIcons()
    })

    this.config.isOpen &&
    this.once(Events.TIME_UPDATE, () => {
      this.start()
    })
  }

  initDanmu () {
    const {player, config} = this
    const danmuConfig = {
      container: this.el,
      player: player.video,
      comments: config.comments,
      area: config.area
    }
    player.danmu = this.danmujs = new DanmuJs(danmuConfig)
    const switchBtn = Util.copyDom(this.danmujs.bulletBtn.createSwitch(true))
    console.log('switchBtn', switchBtn)
  }

  registerExtIcons () {
    const {player, config} = this
    if (config.panel) {
      const panelOptions = {
        config: {
          onChangeset: (set) => {
            this.changeSet(set)
          }
        },
        root: player.controls.right
      }
      this.danmuPanel = player.controls.registerPlugin(DanmuPanel.pluginName, DanmuPanel, panelOptions)
    }
    if (config.switchButton) {
      const buttonConfig = {
        config: {
          onSwitch: (isOpen) => {
            this.onSwitch(isOpen)
          },
          isOpen: true
        },
        root: player.controls.right,
        index: 8
      }
      this.danmuButton = player.controls.registerPlugin(DanmuIcon.pluginName, DanmuIcon, buttonConfig)
    }
  }

  changeSet (set) {
    console.log('changeSet', set)
  }

  onSwitch (isOpen) {
    if (isOpen) {
      this.start()
    } else {
      this.stop()
    }
  }

  start () {
    this.danmujs && this.danmujs.start()
    this.show()
  }

  stop () {
    this.danmujs && this.danmujs.stop()
    this.hide()
  }
  render () {
    return `<xg-danmu class="xgplayer-danmu"></xg-danmu>`
  }
}

export default Danmu
