import Proxy from './proxy'
import util from './utils/util'
import sniffer from './utils/sniffer'
import Errors from './error'
import pluginsManager, {Plugin, BasePlugin} from './pluginsManager'
import getDefaultPlugins from './plugins'
import {
  version
} from '../package.json'

class Player extends Proxy {
  constructor (options) {
    options.plugins = getDefaultPlugins(options)
    super(options)
    this.config = util.deepCopy({
      width: 600,
      height: 337.5,
      ignores: [],
      whitelist: [],
      lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
      inactive: 3000,
      volume: 0.6,
      controls: true,
      controlsList: ['nodownload']
    }, options)

    // timer and flags
    this.userTimer = null
    this.waitTimer = null
    this.isProgressMoving = false

    this._initDOM()

    this.pluginsCall()
    this._registerPlugins()

    setTimeout(() => {
      this.emit('ready')
      this.isReady = true
    }, 0)

    pluginsManager.beforeInit(this)
    if (this.config.videoInit) {
      if (util.hasClass(this.root, 'xgplayer-nostart')) {
        this.start()
      }
    }
  }

  /**
   * 注册组件 组件列表config.plugins
   */
  _registerPlugins () {
    const ignores = this.config.ignores || []
    const plugins = this.config.plugins || []
    const ignoresStr = ignores.join('||')
    plugins.map(plugin => {
      try {
        //在ignores中的不做组装
        if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
          return null
        }
        return pluginsManager.register(this, plugin)
      } catch(err) {
        return null
      }
    })
  }

  register(){
  }

  unRegister(){}

  /**
   * init control bar
   * @private
   */
  _initDOM () {
    this.root = util.findDom(document, `#${this.config.id}`)
    this.controls = util.createDom('xg-controls', '', {
      unselectable: 'on',
      onselectstart: 'return false'
    }, 'xgplayer-controls')
    if (!this.root) {
      let el = this.config.el
      if (el && el.nodeType === 1) {
        this.root = el
      } else {
        this.emit('error', new Errors('use', this.config.vid, {
          line: 32,
          handle: 'Constructor',
          msg: 'container id can\'t be empty'
        }))
        return false
      }
    }
    // this.rootBackup = util.copyDom(this.root)
    util.addClass(this.root, `xgplayer xgplayer-${sniffer.device} xgplayer-nostart ${this.config.controls ? '' : 'no-controls'}`)
    this.root.appendChild(this.controls)
    if (this.config.fluid) {
      this.root.style['max-width'] = '100%'
      this.root.style['width'] = '100%'
      this.root.style['height'] = '0'
      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`

      this.video.style['position'] = 'absolute'
      this.video.style['top'] = '0'
      this.video.style['left'] = '0'
    } else {
      // this.root.style.width = `${this.config.width}px`
      // this.root.style.height = `${this.config.height}px`
      if (this.config.width) {
        if (typeof this.config.width !== 'number') {
          this.root.style.width = this.config.width
        } else {
          this.root.style.width = `${this.config.width}px`
        }
      }
      if (this.config.height) {
        if (typeof this.config.height !== 'number') {
          this.root.style.height = this.config.height
        } else {
          this.root.style.height = `${this.config.height}px`
        }
      }
    }
    if (this.config.controlStyle && util.typeOf(this.config.controlStyle) === 'String') {
      let self = this
      fetch(self.config.controlStyle, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                self.config[prop] = obj[prop]
              }
            }
            self.pluginsCall()
            self._registerPlugins()
          }).catch(() => {
            this._registerPlugins()
          })
        }
      }).catch(function (err) {
        console.log('Fetch错误:' + err)
      })
    } else {
      this.pluginsCall()
      this._registerPlugins()
    }

    ['focus', 'blur'].forEach(item => {
      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })

    let player = this
    player.once('loadeddata', this.getVideoSize)
    this.mousemoveFunc = function () {
      player.emit('focus')
      if (!player.config.closeFocusVideoFocus) {
        player.video.focus()
      }
    }
    this.root.addEventListener('mousemove', this.mousemoveFunc)
    this.playFunc = function () {
      player.emit('focus')
      if (!player.config.closePlayVideoFocus) {
        player.video.focus()
      }
    }
    player.once('play', this.playFunc)

    function onDestroy () {
      player.root.removeEventListener('mousemove', player.mousemoveFunc)
      player.off('destroy', onDestroy)
    }

    player.once('destroy', onDestroy)
  }


  /**
   * 当前播放器挂在的插件实例代码
   */
  get plugins() {
    return pluginsManager.getPlugins(this)
  }

  getPlugin(pluginName) {
    return pluginsManager.findPlugin(this, pluginName)
  }

  start (url = this.config.url) {
    let root = this.root
    let player = this
    if (!url || url === '') {
      this.emit('urlNull')
    }
    this.canPlayFunc = function () {
      let playPromise = player.video.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.then(function () {
          player.emit('autoplay started')
        }).catch(function () {
          player.emit('autoplay was prevented')
          Player.util.addClass(player.root, 'xgplayer-is-autoplay')
        })
      }
      player.off('canplay', player.canPlayFunc)
    }
    if (util.typeOf(url) === 'String') {
      this.video.src = url
    } else {
      url.forEach(item => {
        this.video.appendChild(util.createDom('source', '', {
          src: `${item.src}`,
          type: `${item.type || ''}`
        }))
      })
    }
    this.once('loadeddata', this.loadeddataFunc)
    if (this.config.autoplay) {
      this.on('canplay', this.canPlayFunc)
    }
    root.insertBefore(this.video, root.firstChild)
    setTimeout(() => {
      this.emit('complete')
    }, 1)
    pluginsManager.afterInit(this)
  }

  reload () {
    this.video.load()
    this.reloadFunc = function () {
      this.play().catch(err => { console.log(err) })
    }
    this.once('loadeddata', this.reloadFunc)
  }

  destroy (isDelDom = true) {
    let player = this
    clearInterval(this.bulletResizeTimer)
    for (let k in this._interval) {
      clearInterval(this._interval[k])
      this._interval[k] = null
    }
    this.ev.forEach((item) => {
      let evName = Object.keys(item)[0]
      let evFunc = this[item[evName]]
      if (evFunc) {
        this.off(evName, evFunc)
      }
    });
    if (this.loadeddataFunc) {
      this.off('loadeddata', this.loadeddataFunc)
    }
    if (this.reloadFunc) {
      this.off('loadeddata', this.reloadFunc)
    }
    if (this.replayFunc) {
      this.off('play', this.replayFunc)
    }
    if (this.playFunc) {
      this.off('play', this.playFunc)
    }
    if (this.getVideoSize) {
      this.off('loadeddata', this.getVideoSize)
    };
    ['focus', 'blur'].forEach(item => {
      this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)])
    })
    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(item => {
        if (this[item]) {
          this[item].removeEventListener('keydown', (e) => { player.onKeydown(e, player) })
        }
      })
    }

    function destroyFunc () {
      this.emit('destroy')
      // this.root.id = this.root.id + '_del'
      // parentNode.insertBefore(this.rootBackup, this.root)

      // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
      this.video.removeAttribute('src') // empty source
      this.video.load()
      if (isDelDom) {
        // parentNode.removeChild(this.root)
        this.root.innerHTML = ''
        let classNameList = this.root.className.split(' ')
        if (classNameList.length > 0) {
          this.root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ')
        } else {
          this.root.className = ''
        }
      }
      for (let k in this) {
        // if (k !== 'config') {
        delete this[k]
        // }
      }
      this.off('pause', destroyFunc)
    }

    if (!this.paused) {
      this.pause()
      this.once('pause', destroyFunc)
    } else {
      destroyFunc.call(this)
    }
    pluginsManager.destroy(this)
    super.destroy()
  }

  replay () {
    util.removeClass(this.root, 'xgplayer-ended')
    this.currentTime = 0
    this.play().catch(err => {
      console.log(err)
    })
  }

  getFullscreen (el) {
    let player = this
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else {
      util.addClass(el, 'xgplayer-is-cssfullscreen')
    }
  }

  exitFullscreen (el) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    util.removeClass(el, 'xgplayer-is-cssfullscreen')
  }

  getCssFullscreen () {
    let player = this
    util.addClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('requestCssFullscreen')
  }

  exitCssFullscreen () {
    let player = this
    util.removeClass(player.root, 'xgplayer-is-cssfullscreen')
    player.emit('exitCssFullscreen')
  }

  pluginsCall () {
    let self = this
    if (Player.plugins) {
      let ignores = this.config.ignores
      Object.keys(Player.plugins).forEach(name => {
        let descriptor = Player.plugins[name]
        if (!ignores.some(item => name === item || name === 's_' + item)) {
          if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
            if (name === sniffer.device) {
              setTimeout(() => {
                descriptor.call(self, self)
              }, 0)
            }
          } else {
            descriptor.call(this, this)
          }
        }
      })
    }
  }

  onFocus () {
    let player = this
    util.removeClass(this.root, 'xgplayer-inactive')
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
    player.userTimer = setTimeout(function () {
      player.emit('blur')
    }, player.config.inactive)
  }

  onBlur () {
    // this.video.blur()
    if (!this.paused && !this.ended) {
      util.addClass(this.root, 'xgplayer-inactive')
    }
  }

  onPlay () {
    util.addClass(this.root, 'xgplayer-playing')
    util.removeClass(this.root, 'xgplayer-pause')
  }

  onPause () {
    util.addClass(this.root, 'xgplayer-pause')
    if (this.userTimer) {
      clearTimeout(this.userTimer)
    }
    this.emit('focus')
  }

  onEnded () {
    util.addClass(this.root, 'xgplayer-ended')
    util.removeClass(this.root, 'xgplayer-playing')
  }

  onSeeking () {
    // util.addClass(this.root, 'seeking');
  }

  onSeeked () {
    // for ie,playing fired before waiting
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    util.removeClass(this.root, 'xgplayer-isloading')
  }

  onWaiting () {
    let self = this
    if (self.waitTimer) {
      clearTimeout(self.waitTimer)
    }
    self.waitTimer = setTimeout(function () {
      util.addClass(self.root, 'xgplayer-isloading')
    }, 500)
  }

  onPlaying () {
    if (this.waitTimer) {
      clearTimeout(this.waitTimer)
    }
    util.removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay')
    util.addClass(this.root, 'xgplayer-playing')
  }
  
  getVideoSize() {
    if (this.video.videoWidth && this.video.videoHeight) {
      let containerSize = this.root.getBoundingClientRect()
      if (this.config.fitVideoSize === 'auto') {
        if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
          this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
        } else {
          this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
        }
      } else if (this.config.fitVideoSize === 'fixWidth') {
        this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`
      } else if (this.config.fitVideoSize === 'fixHeight') {
        this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`
      }
    }
  }

  get version () {
    return version
  }

  /***
   * TODO
   * 插件全部迁移完成再做删除
   */
  static install (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    if (!Player.plugins[name]) {
      Player.plugins[name] = descriptor
    }
  }
  
  /***
   * TODO
   * 插件全部迁移完成再做删除
   */
  static use (name, descriptor) {
    if (!Player.plugins) {
      Player.plugins = {}
    }
    Player.plugins[name] = descriptor
  }
}

Player.util = util
Player.sniffer = sniffer
Player.Errors = Errors
Player.Plugin = Plugin
Player.BasePlugin = BasePlugin
export default Player
