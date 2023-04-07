import EventEmitter from 'eventemitter3'
import MP4Loader from 'xgplayer-mp4-loader'
import { MSE, StreamingError, EVENT, Buffer, isMediaPlaying } from 'xgplayer-streaming-shared'
import { BufferService } from './buffer-service'
import { getConfig } from './config'

export class MP4 extends EventEmitter {
  _prevSegmentEndTime = 0
  _tickTimer = null
  _loading = false

  constructor (config) {
    super()
    config = this._config = getConfig(config)
    this.media = this._config.media
    if (config.softDecode && this.media.setPlayMode) {
      this.media.setPlayMode('VOD')
    }
    this._bufferService = new BufferService(this, config.softDecode)
    this._loader = new MP4Loader({
      url: config.url,
      retry: config.retry,
      retryDelay: config.retryDelay
    })

    this.media.addEventListener('seeking', this._onSeeking)
  }

  static version = __VERSION__

  static isSupported () {
    return MSE.isSupported() || !!WebAssembly
  }

  async load (url) {
    await this._reset()
    if (url) await this._loader.changeUrl(url)
    this._startTick(this._config.tickInterval)
    await this._loadSegment(0)
  }

  // async replay () {
  //   if (!this.media) return
  //   if (this._config.softDecode) {
  //     this.load()
  //     // force reload internal
  //     this.media.play(true)
  //   }
  // }

  async destroy () {
    this.media.removeEventListener('seeking', this._onSeeking)
    await this._reset()
    await this._bufferService.destroy()
  }

  async _reset () {
    this._stopTick()
    await this._loader.reset()
    await this._bufferService.reset()
    this._prevSegmentEndTime = 0
    this._loading = false
  }

  async _loadSegment (time) {
    if (this._loading) return
    const currentTime = this.media.currentTime
    if (this._prevSegmentEndTime > (currentTime + this._config.preloadTime)) return

    this._loading = true
    let res
    try {
      if (time !== null && time !== undefined) {
        res = await this._loader.loadSegmentByTime(time)
      } else {
        res = await this._loader.loadNextSegment()
      }
    } catch (error) {
      this._emitError(StreamingError.network(error))
    }
    if (!res) {
      this._loading = false
      return
    }
    this._prevSegmentEndTime = Math.min(res.video?.endTime || Infinity, res.audio?.endTime || Infinity)
    try {
      await this._bufferService.appendBuffer(res.data, res.option.range[0], res.video?.frames, res.audio?.frames, this._loader.meta.moov)
      await this._bufferService.evictBuffer(this._config.bufferBehind)
    } catch (error) {
      return this._emitError(StreamingError.create(error))
    } finally {
      this._loading = false
    }
    if (this._loader.isLastSegment(res.video?.index || res.audio?.index || 0)) {
      this._end()
    } else {
      this._loadSegment()
    }
  }

  _end () {
    this._bufferService.endOfStream()
    this._stopTick()
  }

   _onSeeking = async () => {
     if (!this.media) return
     const seekTime = this.media.currentTime
     const loader = this._loader
     const { video, audio } = loader.getSegmentByTime(seekTime)
     const seg = video || audio
     if (!seg) return
     if (loader.isSegmentLoading(seg.index)) {
       return
     }
     const info = Buffer.info(Buffer.get(this.media), seekTime, 0.1)
     if (info.end && (info.end >= seg.endTime || info.end >= this.media.duration)) return

     await loader.cancel()
     this._loading = false
     this._prevSegmentEndTime = 0
     this._loadSegment(seekTime)
     this._startTick()
   }

   _startTick (time = 0) {
     this._stopTick()
     this._tickTimer = setTimeout(this._tick, time)
   }

   _stopTick () {
     clearTimeout(this._tickTimer)
   }

  _tick = () => {
    this._stopTick()
    const media = this.media
    if (!media) return
    this._startTick(this._config.tickInterval)
    if (Buffer.end(Buffer.get(media)) < 0.1 || !media.readyState) return
    if (isMediaPlaying(media)) {
      this._loadSegment()
    }
  }

  _emitError (error, endOfStream = true) {
    console.error(error)
    console.table(error)
    this.emit(EVENT.ERROR, error)
    if (endOfStream) {
      this._end()
    }
  }
}
