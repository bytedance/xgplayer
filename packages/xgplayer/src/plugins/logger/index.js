import BasePlugin, { Events } from '../../plugin'
import XG_DEBUG from '../../utils/debug'
import { clearTimeout, getHostFromUrl, setTimeout } from '../../utils/util'
function now () {
  return new Date().getTime()
}

const LOG_TYPES = {
  LOAD_START: 'loadstart',
  LOADED_DATA: 'loadeddata',
  FIRST_FRAME: 'firstFrame',
  WAIT_START: 'waitingStart',
  WAIT_END: 'waitingEnd',
  SEEK_START: 'seekStart',
  SEEK_END: 'seekEnd'
}
class XGLogger extends BasePlugin {
  static get pluginName () {
    return 'xgLogger'
  }

  static get defaultConfig () {
    return {
      waitTimeout: 10000
    }
  }

  afterCreate () {
    this._onReset()
    this._waitType = 'firstFrame'

    this._initOnceEvents()

    this.newPointTime = now()
    // 初始化到首帧耗时 new -> loadeddata
    this.loadedCostTime = 0
    // 初始化到开始请求耗时 new -> loadstart
    this.startCostTime = 0

    this.on(Events.LOAD_START, () => {
      const { _state } = this
      const { autoplayStart, isFFSend } = _state
      this.startCostTime = now() - this.newPointTime
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} LOAD_START`, `autoplayStart:${autoplayStart} isFFSend:${isFFSend} startCostTime:${this.startCostTime} newPointTime${this.newPointTime}`)
      if (isFFSend) {
        return
      }
      !_state.isLs && this.emitLog(LOG_TYPES.LOAD_START, {})
      _state.isLs = true
      _state.isTimeUpdate = false
      _state.isFFLoading = true
      this.pt = now()
      this.vt = 0
      this.fvt = 0 // 首帧耗时 loadstart -> loadeddata
      this._initOnceEvents()
      this._onWaitingLoadStart()
    })

    this.on(Events.LOADED_DATA, () => {
      this.vt = now()
      this.fvt = this.vt - this.pt
      this.loadedCostTime = this.vt - this.newPointTime
      const { isTimeUpdate, isFFSend, autoplayStart } = this._state
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} LOADED_DATA`, `fvt:${this.fvt} isTimeUpdate:${this._state.isTimeUpdate} loadedCostTime:${this.loadedCostTime}`)
      if (isTimeUpdate || autoplayStart) {
        this._sendFF('loadedData')
      }
      if (!isFFSend) {
        this.emitLog(LOG_TYPES.LOADED_DATA, {})
      }
      this.suspendWaitingStatus('loadeddata')
    })

    this.on(Events.SEEKING, this._onSeeking)
    this.on(Events.SEEKED, this._onSeeked)

    this.on(Events.DESTROY, () => {
      this.endState('destroy')
    })

    this.on(Events.URL_CHANGE, () => {
      this.endState('urlChange')
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} URL_CHANGE`)
      this._state.isFFSend && this._onReset()
    })

    this.on([Events.PLAYING, Events.CANPLAY], this._onPlaying)

    this.on(Events.WAITING, this._onWaiting)
    this.on(Events.ERROR, this._onError)
    this.on(Events.RESET, () => {
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} RESET`)
      this.endState('reset')
      this._initOnceEvents()
      this._onReset()
    })
  }

  _initOnceEvents () {
    this.off(Events.AUTOPLAY_STARTED, this._onAutoplayStart)
    this.off(Events.TIME_UPDATE, this._onTimeupdate)
    this.once(Events.AUTOPLAY_STARTED, this._onAutoplayStart)
    this.once(Events.TIME_UPDATE, this._onTimeupdate)
  }

  _sendFF (endType) {
    this.s = now()
    const { isFFLoading, isFFSend } = this._state
    XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} _sendFF`, `${endType} fvt:${this.fvt} isFFLoading:${isFFLoading} !isFFSend:${!isFFSend}`)
    if (this.vt > 0 && isFFLoading && !isFFSend) {
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} emitLog_firstFrame`, endType)
      this._state.isFFLoading = false
      this._state.isFFSend = true
      this.emitLog(LOG_TYPES.FIRST_FRAME, { fvt: this.fvt, costTime: this.fvt, vt: this.vt, startCostTime: this.startCostTime, loadedCostTime: this.loadedCostTime })
    }
  }

  _onTimeupdate = () => {
    this._state.isTimeUpdate = true
    if (this._state.autoplayStart) {
      XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} _onTimeupdate`)
      this._sendFF('onTimeupdate')
    }
  }

  _onAutoplayStart = () => {
    XG_DEBUG.logInfo(`[xgLogger]${this.player.playerId} _onAutoplayStart`)
    this._state.autoplayStart = true
    this.vt && this._sendFF('onAutoplayStart')
  }

  _onReset = () => {
    this._state = {
      autoplayStart: false, // 是否已经自动起播
      isFFLoading: false, // LOAD_START是否已经触发
      isTimeUpdate: false, // 第一次timeupdate是否已经触发
      isFFSend: false, // 首帧事件是否已经触发
      isLs: false // loadstart是否已经发送
    }
    this.vt = 0
    this.pt = 0
    this.fvt = 0
    this.newPointTime = now()
    this.loadedCostTime = 0
    this.startCostTime = 0
    this._isSeeking = false
    this.seekingStart = 0
    this.waitingStart = 0
    this.fixedWaitingStart = 0
    this._isWaiting = false
    this._waitTimer && clearTimeout(this, this._waitTimer)
    this._waittTimer && clearTimeout(this, this._waittTimer)
    this._waitTimer = null
    this._waittTimer = null
    this._waitType = 0 // 0 - 普通卡顿 1-起播卡顿 2-seek卡顿
  }

  _onSeeking = () => {
    if (this.seekingStart) {
      return
    }
    this.suspendWaitingStatus('seek')
    this.seekingStart = now()
    this.emitLog(LOG_TYPES.SEEK_START, { start: now() })
  }

  _onSeeked = () => {
    this.suspendSeekingStatus('seeked')
  }

  _onWaitingLoadStart = () => {
    if (this._isWaiting || this.vt) {
      return
    }
    this._isWaiting = true
    this.waitingStart = now()
    this.fixedWaitingStart = now()
    this._waitType = 1
    this.emitLog(LOG_TYPES.WAIT_START, { fixedStart: this.fixedWaitingStart, start: this.waitingStart, type: 1, endType: 'loadstart' })
  }

  _onWaiting = () => {
    // 普通卡顿起播之前不产生
    if (this._isWaiting || !this.vt) {
      return
    }
    // 卡顿标记开始
    this._isWaiting = true
    if (!this.vt) {
      this._waitType = 1
    } else if (this.seekingStart) {
      this._waitType = 2
    } else {
      this._waitType = 0
    }
    // 原始卡顿耗时起始时间
    this.fixedWaitingStart = now()
    this._waitTimer = setTimeout(this, () => {
      if (this._isWaiting) {
        this.waitingStart = now()
        clearTimeout(this, this._waitTimer)
        this._waitTimer = null
        this._startWaitTimeout()
        this.emitLog(LOG_TYPES.WAIT_START, { fixedStart: this.fixedWaitingStart, start: this.waitingStart, type: this._waitType, endType: this._waitType === 2 ? 'seek' : 'playing' })
      }
    }, 200)
  }

  _onError = () => {
    this.suspendSeekingStatus('error')
    this.suspendWaitingStatus('error')
  }

  _startWaitTimeout () {
    if (this._waittTimer) {
      clearTimeout(this, this._waittTimer)
    }
    this._waittTimer = setTimeout(this, () => {
      this.suspendWaitingStatus('timeout')
      clearTimeout(this, this._waittTimer)
      this._waittTimer = null
    }, this.config.waitTimeout)
  }

  _onPlaying = () => {
    this._isWaiting && this.suspendWaitingStatus('playing')
  }

  endState (endType) {
    this.suspendWaitingStatus(endType)
    this.suspendSeekingStatus(endType)
  }

  suspendSeekingStatus (endType) {
    if (!this.seekingStart) {
      return
    }
    const _now = now()
    const _cost = _now - this.seekingStart
    this.seekingStart = 0
    this.emitLog(LOG_TYPES.SEEK_END, { end: _now, costTime: _cost, endType })
  }

  suspendWaitingStatus (endType) {
    if (this._waitTimer) {
      clearTimeout(this, this._waitTimer)
      this._waitTimer = null
    }
    if (this._waittTimer) {
      clearTimeout(this, this._waittTimer)
      this._waittTimer = null
    }
    this._isWaiting = false
    if (!this.waitingStart) {
      return
    }
    const _now = now()
    const _cost = _now - this.waitingStart
    const _fixedCost = _now - this.fixedWaitingStart
    const { waitTimeout } = this.config
    this._isWaiting = false
    this.waitingStart = 0
    this.fixedWaitingStart = 0
    this.emitLog(LOG_TYPES.WAIT_END, {
      fixedCostTime: _fixedCost > waitTimeout ? waitTimeout : _fixedCost,
      costTime: _cost > waitTimeout ? waitTimeout : _cost,
      type: endType === 'loadeddata' ? 1 : this._waitType,
      endType: this._waitType === 2 ? 'seek' : endType
    })
  }

  emitLog (eventType, data) {
    const { player } = this
    this.emit(Events.XGLOG, {
      t: now(),
      host: getHostFromUrl(player.currentSrc),
      vtype: player.vtype,
      eventType,
      currentTime: this.player.currentTime,
      readyState: player.video.readyState,
      networkState: player.video.networkState,
      ...data
    })
  }
}
export {
  LOG_TYPES,
  XGLogger as default
}
