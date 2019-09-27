import FlvDemuxer from '../../xgplayer-demux/src/flv'
import Remuxer from 'xgplayer-remux'
import { FetchLoader } from 'xgplayer-loader'
import { Tracks, XgBuffer, PreSource } from 'xgplayer-buffer'
import { Mse, EVENTS } from 'xgplayer-utils'
import { Compatibility } from 'xgplayer-codec'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS

const Tag = 'FLVController'

class Logger {
  warn () {}
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
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('MP4_REMUXER', Remuxer.Mp4Remuxer)
    this._context.registry('PRE_SOURCE_BUFFER', PreSource)

    this._context.registry('COMPATIBILITY', Compatibility)

    this._context.registry('LOGGER', Logger)
    this.mse = this._context.registry('MSE', Mse)({ container: this._player.video })

    this.initListeners()
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this))
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this))
  }

  _handleMediaInfo () {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
    const buffer = this._context.getInstance('LOADER_BUFFER')
    // const loader = this._context.getInstance('FETCH_LOADER')
    if (this.isSeekable) {
      // loader.cancel()
      this.state.range = {
        start: 0,
        end: buffer.historyLen - 1
      }
    }
  }

  _handleLoaderDataLoaded () {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleMetadataParsed (type) {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }
  _handleDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
  }

  _handleMediaSegment () {
    this.mse.doAppend();
  }

  seek (time) {
    if (!this.state.initSegmentArrived) {
      this.loadMeta()
      return
    }
    if (this._player.config.isLive || !this.isSeekable) {
      return
    }
    const { preloadTime = 15 } = this._player.config
    const range = this.getRange(time, preloadTime)
    this.state.range = range
    this.loadData()
  }

  loadData () {
    const { start, end } = this.state
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url, {
      Range: `bytes=${start}-${end}`
    })
  }

  loadMeta () {
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url)
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

  destroy () {
    this._context.destroy()
    this._context = null
  }

  get isSeekable () {
    if (!this._context || !this._context.mediaInfo.isComplete()) {
      return true
    }
    return this._context.mediaInfo.keyframes !== null && this._context.mediaInfo.keyframes !== undefined
  }
}

export default FlvController
