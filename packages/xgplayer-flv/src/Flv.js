import FlvDemuxer from './parse/demux'
import Mp4Remuxer from 'xgplayer-remux/src/mp4'
import MSE from 'xgplayer-utils/src/mse'
import FetchLoader from 'xgplayer-loader-fetch'
import Presource from 'xgplayer-buffer/src/presouce'
import { Tracks, XgBuffer } from 'xgplayer-buffer/src/index'
import { REMUX_EVENTS, DEMUX_EVENTS } from 'xgplayer-utils/dist/constants/events'

const Tag = 'FLVController'

const createAsyncTask = () => {
  let res, rej
  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  return {
    promise,
    resolve: res,
    reject: rej
  }
}

class FlvController {
  constructor (player) {
    this.TAG = Tag
    this._player = player

    this.state = {
      initSegmentArrived: false,
      range: {
        start: 0,
        end: ''
      }
    }

  }

  init () {
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)
    this._context.registry('TRACKS', Tracks)
    this._context.registry('MP4_REMUXER', Mp4Remuxer)
    this._context.registry('PRE_SOURCE_BUFFER', Presource)
    this.mse = this._context.registry('MSE', MSE)({ container: this._player })


    this.initListeners()
  }

  initListeners () {
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this.handleMediaSegment.bind(this))
    this.on(DEMUX_EVENTS.MEDIA_INFO, this.handleMediaInfo.bind(this))
    this.on(REMUX_EVENTS.INIT_SEGMENT, this.handleAppendInitSegment.bind(this))
  }

  handleMediaInfo () {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
    const buffer = this._context.getInstance('LOADER_BUFFER')
    const loader = this._context.getInstance('FETCH_LOADER')
    if (this.isSeekable) {
      loader.cancel()
      this.state.range = {
        start: 0,
        end: buffer.historyLen - 1
      }
    }
  }

  handleMediaSegment () {
    this.mse.doAppend();
  }

  handleAppendInitSegment () {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
  }

  seek (time) {
    if (this._player.isLive || !this.isSeekable) {
      return
    }
    if (!this.state.initSegmentArrived) {
      this.loadMeta()
      return
    }
    const { preloadTime = 15 } = this._player.config
    const range = this.getRange(time, preloadTime)
    this.state.range = range
    this.loadData()
  }

  loadData () {
    const { start, end } = this.state
    const loader = this._context.getInstance('FETCH_LOADER')
    loader.load(this._player.config.url, {
      Range: `bytes=${start}-${end}`
    })
  }

  loadMeta () {
    const loader = this._context.getInstance('FETCH_LOADER')
    loader.load(this._player.config.url) // 采用直播的模式，一直往后读取数据
  }

  getRange (time, preloadTime) {
    const { keyframes } = this._context.onMetaData
    const { timescale } = this._context.getInstance('TRACKS').videoTrack.meta
    const seekStart = time * timescale
    const findFilePosition = (time) => {
      for (let i = 0, len = keyframes.times.length; i < len; i++) {
        const currentKeyframeTime = keyframes.times[i]
        const nextKeyframeTime = i + 1 < len ? keyframes.times[i + 1] : Number.MAX_SAFE_INTEGER

        if (currentKeyframeTime <= time && time <= nextKeyframeTime) {
          return i
        }
      }

      return ''
    }

    const seekStartFilePos = findFilePosition(seekStart)
    const seekEndFilePos = findFilePosition((time + preloadTime) * timescale)
    return {
      start: seekStartFilePos,
      end: seekEndFilePos
    }
  }

  destroy () {}

  get isSeekable () {
    if (!this._context || !this._context.mediaInfo.isComplete()) {
      return true
    }
    return this._context.mediaInfo.keyframes !== null && this._context.mediaInfo.keyframes !== undefined
  }
}

export default FlvController
