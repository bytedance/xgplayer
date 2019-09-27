import Remuxer from 'xgplayer-remux'
import { FetchLoader } from 'xgplayer-loader'
import { FlvDemuxer } from 'xgplayer-demux'
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
    this.mse.addSourceBuffers()
    this.mse.doAppend();
  }

  seek () {
    if (!this.state.initSegmentArrived) {
      this.loadData()
    }
  }

  loadData () {
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url)
  }

  destroy () {
    this._context.destroy()
    this._context = null
  }
}

export default FlvController
