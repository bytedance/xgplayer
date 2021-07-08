import BasePlugin, { Events, Util } from '../../plugin'

function now () {
  return new Date().getTime()
}

export default class Xglogger extends BasePlugin {
  static get pluginName () {
    return 'xgLogger'
  }

  static get defaultConfig () {
    return {}
  }

  afterCreate () {
    this.vt = 0
    this.pt = 0
    this.fvt = 0
    this.stall = {
      costTime: 0,
      currentTime: 0
    }

    this.seekData = {
      costTime: 0,
      currentTime: 0
    }
    this._isSeeking = false
    this.seekingStart = 0
    this.waitingStart = 0
    this._isWaiting = false
    this._waitTimer = null
    this._waittTimer = null
    this.on(Events.LOAD_START, () => {
      // console.log('Events.LOAD_START')
      this.vt = this.pt = now()
    })
    this.on(Events.LOADED_DATA, () => {
      this.vt = now()
      this.fvt = this.vt - this.pt
      // console.log('Events.LOADED_DATA', this.fvt)
      this.emitLog('firstFrame', { fvt: this.fvt })
    })

    this.on(Events.WAITING, this._onWaiting)
    this.on(Events.SEEKING, this._onSeeking)
    this.on(Events.SEEKED, this._onSeeked)
    this.on(Events.PLAYING, this._onPlaying)
    this.on(Events.ERROR, this._onError)
  }

  _onSeeking = () => {
    if (!this.seekingStart) {
      return
    }
    this.seekingStart = now()
  }

  _onSeeked = () => {
    this.suspendSeekingStatus('seeked')
  }

  _onWaiting = () => {
    if (this._isWaiting) {
      return
    }
    // 卡顿标记开始
    this._isWaiting = true
    this._waitTimer = Util.setTimeout(this, () => {
      if (this._isWaiting) {
        this.waitingStart = now()
        Util.clearTimeout(this, this._waitTimer)
        this._waitTimer = null
        this.emitLog('waitingStart', { start: this.waitingStart })
      }
    }, 200)
  }

  _onError = () => {
    this.suspendSeekingStatus('error')
    this.suspendWaitingStatus('error')
  }

  _startWaitTimeout () {
    this._waittTimer = Util.setTimeout(this, () => {
      this.suspendWaitingStatus('timeout')
      Util.clearTimeout(this, this._waittTimer)
      this._waittTimer = null
    }, 20000)
  }

  _onPlaying = () => {
    this.suspendWaitingStatus('playing')
  }

  suspendSeekingStatus (endType) {
    if (!this.seekingStart) {
      return
    }
    const _now = now()
    const _cost = _now - this.seekingStart
    // console.log('suspendSeekingStatus>>', `endType:${endType} costTime:${_cost}`)
    this.seekingStart = 0
    this.emitLog('seekEnd', { end: _now, costTime: _cost })
  }

  suspendWaitingStatus (endType) {
    if (this._waitTimer) {
      Util.clearTimeout(this._waitTimer)
      this._waitTimer = null
    }
    if (!this.waitingStart) {
      return
    }
    // console.log('suspendWaitingStatus>>', endType)
    const _now = now()
    const _cost = _now - this.waitingStart
    this._isWaiting = false
    this.waitingStart = 0
    // switch (endType) {
    //   case 'timeout':
    //     break
    //   case 'playing':
    //     this._isWaiting = false
    //     this.waitingStart = false
    //     break
    // }
    this.emitLog('waitingEnd', { endType, costTime: _cost })
  }

  emitLog (eventType, data) {
    const { player } = this
    // console.log('>>>emitLog', `eventType:${eventType}`, data)
    this.emit('xglog', {
      eventType,
      currentTime: this.player.currentTime,
      readyState: player.video.readyState,
      networkState: player.video.networkState,
      ...data
    })
  }
}
