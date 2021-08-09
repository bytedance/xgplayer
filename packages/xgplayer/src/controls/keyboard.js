import { on, hasClass, removeClass, addClass } from '../utils/util'
class Keyboard {
  constructor (player) {
    this.player = player
    this.state = {
      playbackRate: 0,
      isRepeat: false,
      keyCode: 0,
      repeat: 0,
      isBody: false
    }
    this.timer = null
    this.initEvents()
  }

  initEvents () {
    const {root, config} = this.player
    this.player.onBodyKeydown = this.onBodyKeydown.bind(this)
    this.player.onKeydown = this.onKeydown.bind(this)
    this.player.onKeyup = this.onKeyup.bind(this)
    if (!config.keyShortcut || config.keyShortcut === 'on') {
      document.addEventListener('keydown', this.player.onBodyKeydown)
      root.addEventListener('keydown', this.player.onKeydown)
      let destroyFunc = () => {
        document.removeEventListener('keydown', this.player.onBodyKeydown)
        root.removeEventListener('keydown', this.player.onKeydown)
        clearTimeout(this.timer)
        this.timer = null
      }
      on(this.player, 'destroy', destroyFunc)
    }
  }

  checkTarget (e) {
    const {player} = this
    return e.target === player.root || e.target === player.video || e.target === player.controls
  }

  onBodyKeydown (event) {
    let e = event || window.event
    const keyCode = e.keyCode
    if ((e.target === document.body) && (keyCode === 37 || keyCode === 39 || keyCode === 32)) {
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      if (!e.repeat) {
        document.addEventListener('keyup', this.player.onKeyup)
      }
      this.handler(e)
      return false
    }
  }

  onKeydown (event) {
    let e = event || window.event
    const keyCode = e.keyCode
    if (this.checkTarget(e) && (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 32 || keyCode === 27)) {
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      this.player.emit('focus')
      if (!e.repeat) {
        this.player.root.addEventListener('keyup', this.player.onKeyup)
      }
      this.handler(e)
      return false
    }
  }

  onKeyup () {
    const {state, player} = this
    document.removeEventListener('keyup', this.player.onKeyup)
    player.root.removeEventListener('keyup', this.player.onKeyup)
    if (!state.keyCode) {
      return
    }
    if (state.playbackRate !== 0) {
      player.playbackRate = state.playbackRate
    }

    if (!state.isRepeat) {
      this.handlerKeyCode(state.keyCode, false)
    }
    state.playbackRate = 0
    state.isRepeat = false
    state.keyCode = 0
    state.repeat = 0
    this.changeVolumeSlide()
  }

  handler (e) {
    const {state, player} = this
    state.keyCode = e.keyCode
    state.isRepeat = e.repeat
    if (e.repeat) {
      if (player.config.disableLongPress) {
        this.handlerKeyCode(state.keyCode, false)
      } else if(state.repeat % 2 === 0) {
        this.handlerKeyCode(state.keyCode, true)
      }
      state.repeat++
    }
  }

  handlerKeyCode (keyCode, isLonePress) {
    const {player, state} = this
    switch (keyCode) {
      case 39:
        // 快进
        if (isLonePress) {
          state.repeat === 0 && this.changeRate()
        } else {
          this.seek(false, isLonePress)
        }
        break
      case 37:
        // 快退
        this.seek(true, isLonePress)
        break
      case 38:
        this.changeVolume(true)
        // 上
        break
      case 40:
        this.changeVolume(false)
        // 下
        break
      case 32:
        if (!isLonePress) {
          player.paused ? player.play() : player.pause()
        }
        break
      case 27:
        if (hasClass(player.root, 'xgplayer-is-cssfullscreen')) {
          player.exitCssFullscreen()
        }
        break
      default:
        //
    }
  }

  seek (isBack, isLongPress) {
    const {player} = this
    const keyShortcutStep = player.config.keyShortcutStep || {}
    const currentTimeStep = keyShortcutStep.currentTime || 10
    if (player.isLoading || player.isSeeking || (isLongPress && this.state.repeat % 8 > 0)) {
      return
    }
    if (isBack) {
      if (player.currentTime - currentTimeStep >= 0) {
        player.currentTime -= currentTimeStep
      } else {
        player.currentTime = 0
      }
    } else {
      if(player.maxPlayedTime && player.config.allowSeekPlayed && (player.currentTime + currentTimeStep > player.maxPlayedTime)) {
        player.currentTime = player.maxPlayedTime
      } else {
        if (player.currentTime + currentTimeStep <= player.duration) {
          player.currentTime += currentTimeStep
        } else {
          player.currentTime = player.duration + 1
        }
      }
    }
  }

  changeRate () {
    this.state.playbackRate = this.player.playbackRate
    this.player.playbackRate = this.player.config.keyboardRate || 5
  }

  changeVolumeSlide (show) {
    const {player} = this
    if (!player.controls) {
      return
    }
    if (show) {
      player.emit('focus')
      if (!hasClass(player.root, 'xgplayer-volume-active')) {
        addClass(player.root, 'xgplayer-volume-active')
      }
    } else {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        removeClass(player.root, 'xgplayer-volume-active')
      }, 1000)
    }
  }

  changeVolume (isup) {
    const {player} = this
    const keyShortcutStep = player.config.keyShortcutStep || {}
    const volumeStep = keyShortcutStep.volume || 0.1
    this.changeVolumeSlide(true)
    const volume = player.volume
    if (isup && volume + volumeStep <= 1) {
      player.volume = volume + volumeStep
    } else if (!isup && volume - volumeStep >= 0) {
      player.volume = volume - volumeStep
    }
  }
}

let keyboard = function () {
  let player = this
  player.keyboard = new Keyboard(player)
}

export default {
  name: 'keyboard',
  method: keyboard
}