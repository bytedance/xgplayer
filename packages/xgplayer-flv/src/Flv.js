import FlvDemuxer from './parse/demux'
import FetchLoader from '../../xgplayer-loader-fetch/src/index'
import { XgBuffer } from '../../xgplayer-buffer/src/index'
import { Tracks } from '../../xgplayer-buffer/src/track'
import { REMUX_EVENTS } from './constants/events'
import MSE from './parse/MSE'

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
    this.mse = new MSE(this._player.video)

    this.state = {
      initSegmentArrived: false,
      range: {
        start: 0,
        end: 0
      }
    }
  }

  init () {
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)
    this._context.registry('TRACKS', Tracks)

    this.initMSE()
    this.initSourceOpenAndInitSegmentEvent()
  }

  initMSE () {
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this.handleMediaSegment.bind(this))
  }

  handleMediaSegment (buffer) {
    if (!this.mse.appendBuffer(buffer)) {
      // TODO 找个地方存起来，可能是MSEController
    }
  }
  /**
   * 简化sourceopen和initSegment的相互依赖模型
   */
  initSourceOpenAndInitSegmentEvent () {
    const sourceOpentask = createAsyncTask()
    const initSegmentTask = createAsyncTask()

    this.mse.once('sourceopen', sourceOpentask.resolve)
    this.once(REMUX_EVENTS.INIT_SEGMENT, initSegmentTask.resolve)

    Promise.all([
      initSegmentTask.promise,
      sourceOpentask.promise
    ]).then((result) => {
      if (result && result[0]) {
        const initSegment = result[0]
        // append ftyp and moov
        this.handleAppendInitSegment(initSegment)
      }
    })
  }

  handleAppendInitSegment (initSegment) {
    this.state.initSegmentArrived = true
    this.mse.appendBuffer(initSegment)
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
    const { timeScale, keyframes } = this._context.mediaInfo
    const seekStart = time * timeScale
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
    const seekEndFilePos = findFilePosition((time + preloadTime) * timeScale)
    return {
      start: seekStartFilePos,
      end: seekEndFilePos
    }
  }

  destroy () {}

  get isSeekable () {
    if (!this.context) {
      return true
    }
    return this._context.mediaInfo.keyframes !== null && this._context.mediaInfo.keyframes !== undefined
  }
}

export default FlvController
