import { BasePlugin, Events } from '../../plugin'
import { getCurrentTimeByOffset } from '../../utils/util'

/**
 * @typedef {{
 *   seekStep?: number,
 *   checkVisible?: boolean,
 *   disableBodyTrigger?: boolean,
 *   keyCodeMap?: { [propName: string]: any },
 *   disable: boolean,
 *   playbackRate: number,
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
      checkVisible: false, // Whether to check the visibility when the shortcut key takes effect
      disableBodyTrigger: false, // Whether to monitor the shortcut keys on the body
      disableRootTrigger: false, // 是否在player.root上做快捷键监听
      isGlobalTrigger: true, // Whether the shortcut key needs to be triggered globally
      keyCodeMap: {},
      disable: false,
      playbackRate: 2, // 长按倍速限制
      isIgnoreUserActive: true // 是否忽略用户激活状态
    }
  }

  mergekeyCodeMap () {
    const extendkeyCodeMap = this.config.keyCodeMap
    if (extendkeyCodeMap) {
      Object.keys(extendkeyCodeMap).map(key => {
        if (!this.keyCodeMap[key]) {
          this.keyCodeMap[key] = extendkeyCodeMap[key]
        } else {
          ['keyCode', 'action', 'disable', 'pressAction', 'disablePress', 'isBodyTarget'].map(key1 => {
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
        disablePress: false,
        noBodyTarget: false
      },
      up: {
        keyCode: 38,
        action: 'upVolume',
        disable: false,
        disablePress: false,
        noBodyTarget: true
      },
      down: {
        keyCode: 40,
        action: 'downVolume',
        disable: false,
        disablePress: false,
        noBodyTarget: true
      },
      left: {
        keyCode: 37,
        action: 'seekBack',
        disablePress: false,
        disable: false
      },
      right: {
        keyCode: 39,
        action: 'seek',
        pressAction: 'changePlaybackRate',
        disablePress: false,
        disable: false
      },
      esc: {
        keyCode: 27,
        action: 'exitFullscreen',
        disablePress: true,
        disable: false
      }
    }
    this.mergekeyCodeMap()
    this._keyState = {
      isKeyDown: false,
      isBodyKeyDown: false,
      isPress: false,
      tt: 0,
      playbackRate: 0
    }
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
    if (player.volume <= 0) {
      return
    }
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
    if (player.volume >= 1) {
      return
    }
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
    const { currentTime, offsetCurrentTime, duration, offsetDuration, timeSegments } = this.player
    let _time = offsetCurrentTime > -1 ? offsetCurrentTime : currentTime
    const _duration = offsetDuration || duration
    const _step = event.repeat && this.seekStep >= 4 ? parseInt(this.seekStep / 2, 10) : this.seekStep
    if (_time + _step <= _duration) {
      _time = _time + _step
    } else {
      _time = _duration
    }
    const _seekTime = getCurrentTimeByOffset(_time, timeSegments)
    const props = {
      currentTime: {
        from: currentTime,
        to: _seekTime
      }
    }
    this.emitUserAction(event, 'seek', { props })
    this.player.currentTime = _seekTime
  }

  seekBack (event) {
    const { currentTime, offsetCurrentTime, timeSegments } = this.player
    const _step = event.repeat ? parseInt(this.seekStep / 2, 10) : this.seekStep
    const _time = offsetCurrentTime > -1 ? offsetCurrentTime : currentTime
    let _seekTime = _time - _step
    if (_seekTime < 0) {
      _seekTime = 0
    }
    _seekTime = getCurrentTimeByOffset(_seekTime, timeSegments)
    const props = {
      currentTime: {
        from: currentTime,
        to: _seekTime
      }
    }
    this.emitUserAction(event, 'seek', { props })
    this.player.currentTime = _seekTime
  }

  changePlaybackRate (event) {
    const { _keyState, config, player } = this
    if (_keyState.playbackRate === 0) {
      _keyState.playbackRate = player.playbackRate
      player.playbackRate = config.playbackRate
    }
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
    if (!this.player) {
      return
    }
    const e = event || window.event
    const keyCode = e.keyCode
    const { _keyState, player } = this
    const { disable, disableBodyTrigger, isIgnoreUserActive } = this.config
    // 以下条件不响应
    if (disable || disableBodyTrigger || !(player.isUserActive || isIgnoreUserActive) || isDisableTag(e.target) || !this.checkIsVisible() || e.metaKey || e.altKey || e.ctrlKey) {
      _keyState.isBodyKeyDown = false
      return
    }
    // 首次进入进行是否生效校验
    if (!event.repeat && !_keyState.isKeyDown) {
      if ((e.target === document.body || (this.config.isGlobalTrigger && !isDisableTag(e.target))) && this.checkCode(keyCode, true)) {
        _keyState.isBodyKeyDown = true
      }
      document.addEventListener('keyup', this.onBodyKeyUp)
    }
    _keyState.isBodyKeyDown && this.handleKeyDown(e)
  }

  onBodyKeyUp = (event) => {
    if (!this.player) {
      return
    }
    document.removeEventListener('keyup', this.onBodyKeyUp)
    this.handleKeyUp(event)
  }

  onKeydown = (event) => {
    if (!this.player) {
      return
    }
    const e = event || window.event
    const { _keyState } = this
    // 首次按下检查是否满足触发他条件
    if (!e.repeat) {
      if (this.config.disable || this.config.disableRootTrigger || e.metaKey || e.altKey || e.ctrlKey) {
        return
      }
      if (e && (e.keyCode === 37 || this.checkCode(e.keyCode)) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
        _keyState.isKeyDown = true
      }
      this.player.root.addEventListener('keyup', this.onKeyup)
    }
    // 长按不满足触发条件直接返回
    if (!_keyState.isKeyDown) {
      return
    }
    this.handleKeyDown(e)
  }

  onKeyup = (event) => {
    if (!this.player) {
      return
    }
    this.player.root.removeEventListener('keyup', this.onKeyup)
    this.handleKeyUp(event)
  }

  handleKeyDown (e) {
    const { _keyState } = this
    if (e.repeat) {
      _keyState.isPress = true
      const _t = Date.now()
      if (_t - _keyState.tt < 200) {
        return
      }
      _keyState.tt = _t
    }
    this.handleKeyCode(e.keyCode, e, _keyState.isPress)
  }

  handleKeyUp (e) {
    const { _keyState } = this
    if (_keyState.playbackRate > 0) {
      this.player.playbackRate = _keyState.playbackRate
      _keyState.playbackRate = 0
    }
    _keyState.isKeyDown = false
    _keyState.isPress = false
    _keyState.tt = 0
  }

  handleKeyCode (curKeyCode, event, isPress) {
    const arr = Object.keys(this.keyCodeMap)
    for (let i = 0; i < arr.length; i++) {
      const { action, keyCode, disable, pressAction, disablePress } = this.keyCodeMap[arr[i]]
      if (keyCode === curKeyCode) {
        if (!disable && !(isPress && disablePress)) {
          const _action = !isPress ? action : (pressAction || action)
          if (typeof _action === 'function') {
            action(event, this.player, isPress)
          } else if (typeof _action === 'string') {
            if (typeof this[_action] === 'function') {
              this[_action](event, this.player, isPress)
            }
          }
          this.emit(Events.SHORTCUT, {
            key: arr[i],
            target: event.target,
            isPress: isPress,
            ...this.keyCodeMap[arr[i]]
          })
        }
        preventDefault(event)
        break
      }
    }
  }

  destroy () {
    this.player.root.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('keydown', this.onBodyKeyDown)
    this.player.root.removeEventListener('keyup', this.onKeyup)
    document.removeEventListener('keyup', this.onBodyKeyUp)
  }

  disable () {
    this.config.disable = true
  }

  enable () {
    this.config.disable = false
  }
}

export default Keyboard
