import DanmuJs from 'danmu.js'
import Plugin, { Events, Util } from '../../plugin'
import DanmuPanel from './danmuPanel'
import DanmuIcon from './danmuIcon'

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
      this.isOpen && this.danmujs && this.danmujs.pause()
    })

    this.on(Events.PLAY, () => {
      this.isOpen && this.danmujs && this.danmujs.play()
    })

    this.on(Events.SEEKING, () => {
      this.seekCost = window.performance.now()
      this.danmujs && this.danmujs.stop()
    })

    this.on(Events.SEEKED, () => {
      if (!this.danmujs || !this.isOpen) {
        return
      }
      if (this.intervalId) {
        Util.clearTimeout(this, this.intervalId)
        this.intervalId = null
      }
      const now = window.performance.now()
      if (now - this.seekCost > MIN_INTERVAL) {
        this.danmujs.start()
      } else {
        this.intervalId = Util.setTimeout(this, () => {
          this.danmujs.start()
          // clearTimeout(this.intervalId)
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
    Util.setTimeout(this, () => {
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

  setCommentLike (id, data) {
    this.danmujs && this.danmujs.setCommentLike(id, data)
  }

  // 按照id改变某一个弹幕的持续显示时间
  setCommentDuration (id, duration) {
    this.danmujs && this.danmujs.setCommentDuration(id, duration)
  }

  // 改变所有已加入队列弹幕的持续显示时间
  setAllDuration (mode, duration) {
    this.danmujs && this.danmujs.setAllDuration(mode, duration)
  }

  // 改变某一个弹幕的id
  setCommentID (oldID, newID) {
    this.danmujs && this.danmujs.setCommentID(oldID, newID)
  }

  // 屏蔽某一类弹幕(参数可选值 scroll | top | bottom | color)
  hideMode (mode) {
    this.danmujs && this.danmujs.hide(mode)
  }

  // 显示某一类弹幕(参数可选值 scroll | top | bottom | color)
  showMode (mode) {
    this.danmujs && this.danmujs.show(mode)
  }

  // 修改弹幕显示区域
  setArea (area) {
    this.danmujs && this.danmujs.setArea(area)
  }

  // 设置透明度
  setOpacity (opacity) {
    this.danmujs && this.danmujs.setOpacity(opacity)
  }

  // 设置字体
  setFontSize (size, channelSize) {
    this.danmujs && this.danmujs.setFontSize(size, channelSize)
  }

  sendComment (comments) {
    this.danmujs && this.danmujs.sendComment(comments)
  }

  destroy () {
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
