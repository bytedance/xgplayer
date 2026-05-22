import BasePlugin, { Events } from '../../plugin'

export default class GapJump extends BasePlugin {
  static get pluginName () {
    return 'gapJump'
  }

  static get defaultConfig () {
    return {
      useGapJump: false,
      smallGapLimit: 0.5,
      gapDetectionThreshold: 0.3
    }
  }

  afterCreate () {
    const { useGapJump } = this.config
    if (useGapJump === false) {
      return
    }
    this.hasPlayed = false
    this.seekingEventReceived = false
    this.isSafari = /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform)
    this.on(Events.WAITING, this.onGapJump)

    this.on(Events.PLAY, () => {
      this.hasPlayed = true
    })

    this.on(Events.SEEKING, () => {
      this.seekingEventReceived = true
    })
  }

  onGapJump = () => {
    const { player, config } = this
    if (player.media.readyState === HTMLMediaElement.HAVE_NOTHING) {
      return
    }
    if (player.media.seeking) {
      if (!this.seekingEventReceived) { return }
    } else {
      this.seekingEventReceived = false
    }

    if (player.media.paused && player.media.currentTime !== 0 && this.hasPlayed) {
      return
    }

    const buffered = player.media.buffered
    const smallGapLimit = config.smallGapLimit || 0.5
    const gapDetectionThreshold = config.gapDetectionThreshold || 0.3
    const currentTime = player.media.currentTime
    const idx = this._getIndex(buffered, currentTime, gapDetectionThreshold)
    if (idx === null || idx === 0) {
      return
    }
    console.log('GapJump  bufferRange ', buffered.start(idx), buffered.end(idx))
    const jumpTo = buffered.start(idx) + 0.1
    const seekEnd = player.media.duration

    if (jumpTo > seekEnd) {
      return
    }
    const jumpSize = jumpTo - currentTime
    const isGapSmall = jumpSize <= smallGapLimit
    if (jumpSize < GapJump.BROWSER_GAP_TOLERANCE) {
      return
    }

    if (isGapSmall) {
      if (config.useGapJump !== false) {
        player.media.currentTime = this.isSafari ? jumpTo + 0.1 : jumpTo
      }
      this.player && this.player.emit('detectGap')
      console.log('gapJump gapIndex', idx, ' isGapSamll:', isGapSmall, ' currentTime:', player.media.currentTime, ' jumpSize:', (currentTime - player.media.currentTime))
      // 目前转码视频首个分片cts存在，在Safari下为0.08，先忽略
      if (jumpTo !== 0.08) {
        player && player.emit('log', {
          type: 'oneevent', // 事件类型
          end_type: 'gap',
          vid: player.config.vid,
          ext: {
            video_postion: Math.floor(jumpTo * 1000) // ms
          }
        })
      }
    }
  }

  _getIndex (buffered, time, threshold) {
    if (!buffered || !buffered.length) {
      return null
    }
    if (buffered.length === 1 && buffered.end(0) - buffered.start(0) < 1e-6) {
      return null
    }
    const bufferedInfo = this._getBuffered(buffered)
    let idx = null
    for (let i = 0; i < bufferedInfo.length; i++) {
      const item = bufferedInfo[i]
      if (item.start > time && (i === 0 || bufferedInfo[i - 1].end - time <= threshold)) {
        idx = i
        break
      }
    }
    return idx
  }

  _getBuffered (b) {
    if (!b) {
      return []
    }
    const ret = []
    for (let i = 0; i < b.length; i++) {
      ret.push({
        start: b.start(i),
        end: b.end(i)
      })
    }
    return ret
  }
}
GapJump.BROWSER_GAP_TOLERANCE = 0.001
