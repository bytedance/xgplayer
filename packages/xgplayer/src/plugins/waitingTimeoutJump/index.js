import BasePlugin, { Events } from '../../plugin'

export default class WaitingTimeoutJump extends BasePlugin {
  static get pluginName () {
    return 'waitingTimeoutJump'
  }

  static get defaultConfig () {
    return {
      useWaitingTimeoutJump: false,
      waitingTime: 15, // wait超过此时间没恢复，则向前跳jumpSize,单位s
      jumpSize: 2, // 单位s，
      jumpCntMax: 4 // 一次播放最大向前跳几次
    }
  }

  afterCreate () {
    const { useWaitingTimeoutJump, jumpSize } = this.config
    if (useWaitingTimeoutJump === false) {
      return
    }
    this.hasPlayed = false
    this.jumpCnt = 0
    /**
     * @type {null | number}
     */
    this.timer = null
    this.jumpSize = jumpSize
    this.on(Events.WAITING, this.onWaiting)
    this.on([Events.PLAYING, Events.CANPLAY], () => {
      clearTimeout(this.timer)
      this.timer = null
      this.jumpSize = this.config.jumpSize
    })
    this.on(Events.PLAY, () => {
      this.hasPlayed = true
    })
  }

  onWaiting = () => {
    const { config } = this
    if (this.jumpCnt > config.jumpCntMax || this.timer || config.useWaitingTimeoutJump === false) {
      return
    }
    this.timer = setTimeout(this.onJump, config.waitingTime * 1000)
  }

  onJump = () => {
    const { player, config } = this
    clearTimeout(this.timer)
    this.timer = null
    if (this.jumpCnt > config.jumpCntMax || config.useWaitingTimeoutJump === false) {
      return
    }

    if (player.media.paused && player.media.currentTime !== 0 && this.hasPlayed) {
      return
    }
    this.jumpSize = config.jumpSize * (this.jumpCnt + 1)
    if (this.jumpCnt === config.jumpSize && this.jumpSize < 6) {
      this.jumpSize = 6
    }
    const jumpTo = player.currentTime + this.jumpSize
    const seekEnd = player.media.duration

    if (jumpTo > seekEnd) {
      return
    }
    console.log('waitintTimeout, currentTime:', player.currentTime, ', jumpTo:', jumpTo)
    this.jumpCnt++
    player.currentTime = jumpTo
  }
}
