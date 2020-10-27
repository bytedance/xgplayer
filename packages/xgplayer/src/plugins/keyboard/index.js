import {BasePlugin} from '../../plugin'

class Keyboard extends BasePlugin {
  static get pluginName () {
    return 'keyboard'
  }

  static get defaultConfig () {
    return {
      seekStep: 10,
      keyCodeMap: {},
      disable: false
    }
  }

  mergekeyCodeMap () {
    const extendkeyCodeMap = this.config.keyCodeMap
    if (extendkeyCodeMap) {
      Object.keys(extendkeyCodeMap).map(key => {
        if (!this.keyCodeMap[key]) {
          this.keyCodeMap[key] = extendkeyCodeMap[key]
        } else {
          ['keyCode', 'action', 'disable', 'isBodyTarget'].map(key1 => {
            extendkeyCodeMap[key][key1] && (this.keyCodeMap[key][key1] = extendkeyCodeMap[key][key1])
          })
        }
      })
    }
  }

  afterCreate () {
    this.config.disable = !this.playerConfig.keyShortcut
    const seekStep = typeof this.config.seekStep === 'function' ? this.config.seekStep(this.player) : this.config.seekStep
    if (!(!seekStep || typeof seekStep !== 'number')) {
      this.seekStep = seekStep
    }
    this.keyCodeMap = {
      'space': {
        keyCode: 32,
        action: 'playPause',
        disable: false,
        noBodyTarget: false // 默认在body上触发
      },
      'up': {
        keyCode: 38,
        action: 'upVolume',
        disable: false,
        noBodyTarget: true // 默认不在body上触发
      },
      'down': {
        keyCode: 40,
        action: 'downVolume',
        disable: false,
        noBodyTarget: true
      },
      'left': {
        keyCode: 37,
        action: 'seekBack',
        disable: false
      },
      'right': {
        keyCode: 39,
        action: 'seek',
        disable: false
      },
      'esc': {
        keyCode: 27,
        action: 'exitFullscreen',
        disable: false
      }
    }
    this.mergekeyCodeMap()
    this.onKeydown = this.onKeydown.bind(this)
    this.onBodyKeyDown = this.onBodyKeyDown.bind(this)
    this.player.root.addEventListener('keydown', this.onKeydown)
    document.addEventListener('keydown', this.onBodyKeyDown)
  }

  checkCode (code, isBodyTarget) {
    let flag = false
    Object.keys(this.keyCodeMap).map(key => {
      if (this.keyCodeMap[key] && code === this.keyCodeMap[key].keyCode) {
        flag = !isBodyTarget || (isBodyTarget && !this.keyCodeMap[key].noBodyTarget)
      }
    })
    return flag
  }

  downVolume () {
    const {player} = this
    if (player.volume - 0.1 >= 0) {
      player.volume = parseFloat((player.volume - 0.1).toFixed(1))
    } else {
      player.volume = 0
    }
  }

  upVolume () {
    const {player} = this
    if (player.volume + 0.1 <= 1) {
      player.volume = parseFloat((player.volume + 0.1).toFixed(1))
    } else {
      player.volume = 1
    }
  }

  seek () {
    const {player} = this
    if (player.currentTime + this.seekStep <= player.duration) {
      player.currentTime += this.seekStep
    } else {
      player.currentTime = player.duration - 1
    }
  }

  seekBack () {
    const {player} = this
    if (player.currentTime - this.seekStep >= 0) {
      player.currentTime -= this.seekStep
    } else {
      player.currentTime = 0
    }
  }

  playPause () {
    const {player} = this
    if (player.paused) {
      // eslint-disable-next-line handle-callback-err
      player.play()
    } else {
      player.pause()
    }
  }

  exitFullscreen () {
    const {player} = this
    if (player.fullscreen) {
      player.exitFullscreen()
    }
    if (player.isCssfullScreen) {
      player.exitCssFullscreen()
    }
  }

  // TODO: 多播放器实例存在的情况下，body下的快捷键会触发所有实例的逻辑，需改进
  onBodyKeyDown (event) {
    if (this.config.disable) {
      return
    }
    let e = event || window.event
    const keyCode = e.keyCode
    if (e.target === document.body && this.checkCode(keyCode, true)) {
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      this.handleKeyCode(keyCode)
      return false
    }
    return false
  }

  onKeydown (event) {
    if (this.config.disable) {
      return
    }
    const player = this.player
    let e = event || window.event
    if (e && (e.keyCode === 37 || this.checkCode(e.keyCode)) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
      player.emit('focus')
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
    } else {
      return true
    }
    this.handleKeyCode(e.keyCode)
  }

  handleKeyCode (keyCode) {
    const {player} = this
    if (keyCode === 40 || keyCode === 38) {
      if (player.controls) {
        // let volumeSlider = player.controls.querySelector('.xgplayer-slider')
        // if (volumeSlider) {
        //   if (Util.hasClass(volumeSlider, 'xgplayer-none')) {
        //     Util.removeClass(volumeSlider, 'xgplayer-none')
        //   }
        //   if (player.sliderTimer) {
        //     clearTimeout(player.sliderTimer)
        //   }
        //   player.sliderTimer = setTimeout(function () {
        //     Util.addClass(volumeSlider, 'xgplayer-none')
        //   }, player.config.inactive)
        // }
      }
    }
    Object.keys(this.keyCodeMap).map(key => {
      if (this.keyCodeMap[key].keyCode === keyCode && !this.keyCodeMap[key].disable) {
        if (typeof this.keyCodeMap[key].action === 'function') {
          this.keyCodeMap[key].action()
        } else if (typeof this.keyCodeMap[key].action === 'string') {
          const funKey = this.keyCodeMap[key].action
          if (typeof this[funKey] === 'function') {
            this[funKey]()
          }
        }
      }
    })
  }

  destroy () {
    this.player.root.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('keydown', this.onBodyKeyDown)
  }
}

export default Keyboard
