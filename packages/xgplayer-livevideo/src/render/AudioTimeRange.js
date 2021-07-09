import { logger } from 'xgplayer-helper-utils'
const TOLERANCE = 0.5
export default class AudioTimeRange {
  constructor (parent) {
    this.TAG = 'AudioTimeRange'
    this._parent = parent
    this._buffers = []
    this._duration = 0
    this._baseDts = -1
    this._lastBuffer = null
  }

  get isLive () {
    return this._parent.isLive
  }

  get duration () {
    return this._duration
  }

  set duration (v) {
    this._duration = v
  }

  get buffered () {
    if (this.isLive) {
      return {
        length: this._duration ? 1 : 0,
        start: () => 0,
        end: () => this._duration
      }
    }

    let buffers = this._mergeBufferRanges()
    return {
      length: buffers.length,
      start: (i) => {
        let buffer = buffers[i]
        return buffer ? buffer.start : 0
      },
      end: (i) => {
        let buffer = buffers[i]
        return buffer ? buffer.end : Infinity
      }
    }
  }

  resetDts (dts) {
    this._baseDts = dts
  }

  dump () {
    let buffered = this.buffered
    let len = buffered.length
    let ret = ''

    for (let i = 0; i < len; i++) {
      ret += `${buffered.start(i)}~${buffered.end(i)} `
    }
    console.log(ret)
  }

  _transitionSamples (audioBufferSource) {
    const { numberOfChannels, length } = audioBufferSource

    const transitionCount = 50

    for (let channel = 0; channel < numberOfChannels; channel++) {
      let audioData = audioBufferSource.getChannelData(channel)

      for (let i = 0; i < transitionCount; i++) {
        /* fadein */
        audioData[i] = (audioData[i] * i) / transitionCount
      }

      for (let i = length - transitionCount; i < length; i++) {
        /* fadeout */
        audioData[i] = (audioData[i] * (length - i)) / transitionCount
      }
    }
  }

  append (source, duration, startDts, segmentStart, delay) {
    if (this._baseDts === -1) {
      this._baseDts = startDts
    }
    this._transitionSamples(source)
    let start = (startDts - this._baseDts) / 1000
    let end = start + duration
    let buffer = {
      start,
      end,
      startDts,
      source,
      duration,
      delay
    }

    if (!this.isLive && segmentStart) {
      buffer.start = segmentStart / 1000
      buffer.end = buffer.start - start + end
    }

    logger.log(this.TAG, `add new buffer range, [${buffer.start} , ${buffer.end}]`)

    // todo: 去重,排序
    if (!this._buffers.filter((x) => x.start === start).length) {
      this._buffers.push(buffer)
    } else {
      console.error('音频重复')
      return
    }

    if (this.isLive) {
      this._duration += duration
    }
    return buffer.start
  }

  deletePassed (time) {
    // 少删除一个音频buffer，缓解追帧时音视频差值过大
    this._buffers = this._buffers.filter((x) => x.start >= time)
    return this._buffers[0]
  }

  canSeek (time) {
    let last = this._buffers[this._buffers.length - 1]
    if (!last) return false
    if (last.start < time) return false
    return true
  }

  _mergeBufferRanges () {
    let buffers = this._buffers.sort((a, b) => (a.start > b.start ? 1 : -1))
    let len = buffers.length
    let ret = []
    if (!len) return ret

    let last = {
      start: buffers[0].start,
      end: buffers[0].end
    }

    for (let i = 1; i < len; i++) {
      let c = buffers[i]
      if (Math.abs(last.end - c.start) < TOLERANCE) {
        last.end = c.end
      } else {
        ret.push(last)
        last = {
          start: c.start,
          end: c.end
        }
      }
    }
    ret.push(last)
    return ret
  }

  getBuffer (time, tolerance) {
    if (this.isLive) {
      return this._buffers.shift()
    }
    let buffer = this._buffers.filter((x) => x.start < time + TOLERANCE && x.end > time + TOLERANCE)[0]
    logger.log(this.TAG, `get audio buffer , currentTime:${time} ,buffer:[${buffer && buffer.start} , ${buffer && buffer.end}]`)
    return buffer
  }
}
