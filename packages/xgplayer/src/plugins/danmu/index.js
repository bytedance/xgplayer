import DanmuJs from 'danmu.js'
import Plugin from '../../plugin'
import DanmuPanel from './danmuPanel'
import DanmuIcon from './danmuIcon'

const {Events} = Plugin
const MIN_INTERVAL = 300

class Danmu extends Plugin {
  constructor (args) {
    super(args)
    this.danmujs = null;
    this.danmuPanel = null
    this.isOpen = false
    this.seekCost = 0
    this.intervalId = 0
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
      closeDefaultBtn: true, // TODO: 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
      defaultOff: false, // TODO: 开启此项后弹幕不会初始化，默认初始化弹幕
      panel: false, // 是否安装配置面板
      panelConfig: {}, // 配置面板促使配置
      switchConfig: {}, // 开关按钮配置信息
      defaultOpen: true // 是否默认开启弹幕
    }
  }

  afterCreate () {
    this.initDanmu()
    this.registerExtIcons()

    this.once(Events.TIME_UPDATE, () => {
      this.config.defaultOpen && this.start()
    })

    this.on(Events.PAUSE, () => {
      this.danmujs && this.danmujs.pause()
    })

    this.on(Events.PLAY, () => {
      this.danmujs && this.danmujs.play()
    })

    this.on(Events.SEEKING, () => {
      this.seekCost = window.performance.now()
      this.danmujs && this.danmujs.stop()
    })

    this.on(Events.SEEKED, () => {
      if (!this.danmujs || !this.isOpen) {
        return
      }
      console.log('this.seekCost:' + parseInt(window.performance.now() - this.seekCost, 10))
      if (this.intervalId) {
        clearTimeout(this.intervalId)
        this.intervalId = null
      }
      const now = window.performance.now()
      if (now - this.seekCost > MIN_INTERVAL) {
        this.danmujs.start()
      } else {
        this.intervalId = setTimeout(() => {
          this.danmujs.start()
          clearTimeout(this.intervalId)
          this.intervalId = null
        }, MIN_INTERVAL)
      }
    })
  }

  onPluginsReady () {
    // 添加点击触发事件触发 依赖pc插件
    const pcPlugin = this.player.plugins.pc
    if (pcPlugin) {
      pcPlugin.onVideoDblClick && this.bind('dblclick', pcPlugin.onVideoDblClick)
      pcPlugin.onVideoClick && this.bind('click', pcPlugin.onVideoClick)
    }
  }

  initDanmu () {
    const {player, config} = this
    const danmuConfig = {
      container: this.root,
      player: player.video,
      comments: this.config.comments,
      area: config.area,
      defaultOff: config.defaultOff
    }
    const danmu = new DanmuJs(danmuConfig)
    this.danmujs = danmu
    player.danmu = this.danmujs = danmu
  }

  registerExtIcons () {
    const {player, config} = this
    if (config.panel) {
      const panelOptions = {
        config: {
          onChangeset: (set) => {
            this.changeSet(set)
          }
        }
      }
      this.danmuPanel = player.controls.registerPlugin(DanmuPanel, panelOptions, DanmuPanel.pluginName)
    }
    const {switchConfig} = config
    if (!config.closeDefaultBtn) {
      const buttonOptions = {
        config: {
          onSwitch: (isOpen) => {
            this.onSwitch(isOpen)
          }
        }
      }
      Object.keys(switchConfig).map(key => {
        buttonOptions.config[key] = switchConfig[key]
      })
      this.danmuButton = player.controls.registerPlugin(DanmuIcon, buttonOptions, DanmuIcon.pluginName)
      this.config.defaultOpen && this.danmuButton.switchState(true)
    }
  }

  changeSet (set) {
    console.log('changeSet', set)
  }

  onSwitch (defaultOpen) {
    if (defaultOpen) {
      this.start()
    } else {
      this.stop()
    }
  }

  start () {
    if (this.isOpen || !this.danmujs) {
      return
    }
    this.show()
    // 避免弹幕弹层还没展开 导致轨道计算异常
    setTimeout(() => {
      this.danmujs.start()
      if (this.player.paused) {
        this.danmujs.pause()
      }
      this.isOpen = true
    }, 0)
  }

  stop () {
    if (!this.isOpen || !this.danmujs) {
      return
    }
    this.danmujs.stop()
    this.isOpen = false
    this.hide()
  }

  sendComment (comments) {
    this.danmujs && this.danmujs.sendComment(comments)
  }

  destoy () {
    this.danmujs.stop()
    this.danmujs.destroy()
    this.danmuButton && this.danmuButton.__destroy()
    this.danmuPanel && this.danmuPanel.__destroy()
    this.danmuButton = null
    this.danmuPanel = null
  }

  render () {
    return `<xg-danmu class="xgplayer-danmu">
    </xg-danmu>`
  }
}

export {
  Danmu as default,
  DanmuIcon,
  DanmuPanel
}
