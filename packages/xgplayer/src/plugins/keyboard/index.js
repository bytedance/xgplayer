import { BasePlugin, Events } from '../../plugin'
/**
 * @typedef {{
 *   seekStep?: number,
 *   checkVisible?: boolean,
 *   disableBodyTrigger?: boolean,
 *   keyCodeMap?: { [propName: string]: any },
 *   disable: boolean,
 *   isIgnoreUserActive: boolean,
 *   [propName: string]: any
 * }} IKeyboardConfig
 */

function preventDefault (e) {
  e.preventDefault()
  e.returnValue = false
}

function isDisableTag (el) {
  const tagName = el.tagName

  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || el.isContentEditable) {
    return true
  }

  return false
}

class Keyboard extends BasePlugin {
  static get pluginName () {
    return 'keyboard'
  }

  /**
   * @type IKeyboardConfig
   */
  static get defaultConfig () {
    return {
      seekStep: 10, // Left/right fast forward each operation time
      checkVisible: true, // Whether to check the visibility when the shortcut key takes effect
      disableBodyTrigger: false, // Whether to monitor the shortcut keys on the body
      disableRootTrigger: false, // 是否在player.root上做快捷键监听
      isGlobalTrigger: false, // Whether the shortcut key needs to be triggered globally
      keyCodeMap: {},
      disable: false,
      isIgnoreUserActive: false // 是否忽略用户激活状态
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
      space: {
        keyCode: 32,
        action: 'playPause',
        disable: false,
        noBodyTarget: false
      },
      up: {
        keyCode: 38,
        action: 'upVolume',
        disable: false,
        noBodyTarget: true
      },
      down: {
        keyCode: 40,
        action: 'downVolume',
        disable: false,
        noBodyTarget: true
      },
      left: {
        keyCode: 37,
        action: 'seekBack',
        disable: false
      },
      right: {
        keyCode: 39,
        action: 'seek',
        disable: false
      },
      esc: {
        keyCode: 27,
        action: 'exitFullscreen',
        disable: false
      }
    }
    this.mergekeyCodeMap()
    this.player.root.addEventListener('keydown', this.onKeydown)
    document.addEventListener('keydown', this.onBodyKeyDown)
  }

  checkIsVisible () {
    if (!this.config.checkVisible) {
      return true
    }
    const rec = this.player.root.getBoundingClientRect()
    const { height, top, bottom } = rec
    const h = window.innerHeight
    if ((top < 0 && top < 0 - height * 0.9) || (bottom > 0 && bottom - h > height * 0.9)) {
      return false
    }
    return true
  }

  checkCode (code, isBodyTarget) {
    let flag = false
    Object.keys(this.keyCodeMap).map(key => {
      if (this.keyCodeMap[key] && code === this.keyCodeMap[key].keyCode && !this.keyCodeMap[key].disable) {
        flag = !isBodyTarget || (isBodyTarget && !this.keyCodeMap[key].noBodyTarget)
      }
    })
    return flag
  }

  downVolume (event) {
    const { player } = this
    const val = parseFloat((player.volume - 0.1).toFixed(1))
    const props = {
      volume: {
        from: player.volume,
        to: val
      }
    }
    this.emitUserAction(event, 'change_volume', { props })
    if (val >= 0) {
      player.volume = val
    } else {
      player.volume = 0
    }
  }

  upVolume (event) {
    const { player } = this
    const val = parseFloat((player.volume + 0.1).toFixed(1))
    const props = {
      volume: {
        from: player.volume,
        to: val
      }
    }
    this.emitUserAction(event, 'change_volume', { props })
    if (val <= 1) {
      player.volume = val
    } else {
      player.volume = 1
    }
  }

  seek (event) {
    const { currentTime, duration } = this.player
    let _time = currentTime
    if (currentTime + this.seekStep <= duration) {
      _time = currentTime + this.seekStep
    } else {
      _time = duration
    }
    const props = {
      currentTime: {
        from: currentTime,
        to: _time
      }
    }
    this.emitUserAction(event, 'seek', { props })
    this.player.currentTime = _time
  }

  seekBack (event) {
    const { currentTime } = this.player
    let _time = 0
    if (currentTime - this.seekStep >= 0) {
      _time = currentTime - this.seekStep
    }
    const props = {
      currentTime: {
        from: currentTime,
        to: _time
      }
    }
    this.emitUserAction(event, 'seek', { props })
    this.player.currentTime = _time
  }

  playPause (event) {
    const { player } = this
    if (!player) {
      return
    }
    this.emitUserAction(event, 'switch_play_pause')
    if (player.paused) {
      // eslint-disable-next-line handle-callback-err
      player.play()
    } else {
      player.pause()
    }
  }

  exitFullscreen (event) {
    const { player } = this
    const { fullscreen, cssfullscreen } = player
    if (fullscreen) {
      this.emitUserAction('keyup', 'switch_fullscreen', {
        prop: 'fullscreen',
        from: fullscreen,
        to: !fullscreen
      })
      player.exitFullscreen()
    }
    if (cssfullscreen) {
      this.emitUserAction('keyup', 'switch_css_fullscreen', {
        prop: 'cssfullscreen',
        from: cssfullscreen,
        to: !cssfullscreen
      })
      player.exitCssFullscreen()
    }
  }

  onBodyKeyDown = (event) => {
    const e = event || window.event
    if (!this.player || (!this.player.isUserActive && !this.config.isIgnoreUserActive)) {
      return
    }
    if (this.config.disable || this.config.disableBodyTrigger || !this.checkIsVisible() || e.metaKey || e.altKey || e.ctrlKey) {
      return
    }
    const keyCode = e.keyCode
    if ((e.target === document.body || (this.config.isGlobalTrigger && !isDisableTag(e.target))) && this.checkCode(keyCode, true)) {
      preventDefault(e)
      this.handleKeyCode(keyCode, event)
      return false
    }
    return false
  }

  onKeydown = (event) => {
    const e = event || window.event
    if (this.config.disable || this.config.disableRootTrigger || e.metaKey || e.altKey || e.ctrlKey) {
      return
    }
    if (!this.player.isUserActive && !this.config.isIgnoreUserActive) {
      return
    }
    if (!this.player.isUserActive && !this.config.isIgnoreUserActive) {
      return
    }
    if (e && (e.keyCode === 37 || this.checkCode(e.keyCode)) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
      preventDefault(e)
    } else {
      return true
    }
    this.handleKeyCode(e.keyCode, event)
  }

  handleKeyCode (curKeyCode, event) {
    Object.keys(this.keyCodeMap).map(key => {
      const { action, keyCode, disable } = this.keyCodeMap[key]
      if (keyCode === curKeyCode && !disable) {
        if (typeof action === 'function') {
          action(event, this.player)
        } else if (typeof action === 'string') {
          if (typeof this[action] === 'function') {
            this[action](event, this.player)
          }
        }
        this.emit(Events.SHORTCUT, {
          key: key,
          target: event.target,
          ...this.keyCodeMap[key]
        })
      }
    })
  }

  destroy () {
    this.player.root.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('keydown', this.onBodyKeyDown)
  }

  disable () {
    this.config.disable = true
  }

  enable () {
    this.config.disable = false
  }
}

export default Keyboard
