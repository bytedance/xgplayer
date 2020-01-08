import Remuxer from 'xgplayer-transmuxer-remux-mp4'
import FlvDemuxer from 'xgplayer-transmuxer-demux-flv'
import FetchLoader from 'xgplayer-transmuxer-loader-fetch'
import EVENTS from 'xgplayer-transmuxer-constant-events'

import Tracks from 'xgplayer-transmuxer-buffer-track'
import PreSource from 'xgplayer-transmuxer-buffer-presource'
import XgBuffer from 'xgplayer-transmuxer-buffer-xgbuffer'
import Compatibility from 'xgplayer-transmuxer-codec-compatibility'

import Mse from 'xgplayer-utils-mse'
import Player from 'xgplayer'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS

const Tag = 'FLVController'

class Logger {
  warn () {}
}

const FLV_ERROR = 'FLV_ERROR'

export default class FlvController {
  constructor (player, mse) {
    this.TAG = Tag
    this._player = player
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    }

    this.mse = mse;

    this.bufferClearTimer = null;

    this._handleTimeUpdate = this._handleTimeUpdate.bind(this)
  }

  init () {
    if (!this.mse) {
      this.mse = new Mse({ container: this._player.video }, this._context);
      this.mse.init();
    }

    this.initComponents();
    this.initListeners()
  }

  initComponents () {
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('MP4_REMUXER', Remuxer)(this._player.currentTime)
    this._context.registry('PRE_SOURCE_BUFFER', PreSource)

    if (this._player.config.compatibility !== false) {
      this._context.registry('COMPATIBILITY', Compatibility)
    }

    this._context.registry('LOGGER', Logger)
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this))
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this))
    this.on(REMUX_EVENTS.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this))

    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this))

    this._player.on('timeupdate', this._handleTimeUpdate)
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

  _handleSEIParsed(sei) {
    this._player.emit('SEI_PARSED', sei)
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

  _handleSourceUpdateEnd () {
    const time = this._player.currentTime;
    const video = this._player.video;
    const preloadTime = this._player.config.preloadTime || 5

    const { length } = video.buffered;

    if (length === 0) {
      return;
    }

    const bufferEnd = video.buffered.end(length - 1);
    if (bufferEnd - time > preloadTime * 2) {
      this._player.currentTime = bufferEnd - preloadTime
    }
    this.mse.doAppend();
  }

  _handleTimeUpdate () {
    const time = this._player.currentTime

    const video = this._player.video;
    let buffered = video.buffered

    if (!buffered || !buffered.length) {
      return;
    }

    let range = [0, 0]
    let currentTime = video.currentTime
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i)
        range[1] = buffered.end(i)
        if (range[0] <= currentTime && currentTime <= range[1]) {
          break
        }
      }
    }

    const bufferStart = range[0]
    const bufferEnd = range[1]

    if (currentTime > bufferEnd || currentTime < bufferStart) {
      video.currentTime = bufferStart;
      return;
    }

    if (time - bufferStart > 10 || buffered.length > 1) {
      // 在直播时及时清空buffer，降低直播内存占用
      if (this.bufferClearTimer || !this.state.randomAccessPoints.length) {
        return;
      }
      let rap = Infinity;
      for (let i = 0; i < this.state.randomAccessPoints.length; i++) {
        const temp = Math.ceil(this.state.randomAccessPoints[i] / 1000)
        if (temp > time - 10) {
          break;
        } else {
          rap = temp;
        }
      }

      // console.log('rap', rap, `time ${time}`, `bufferEnd ${bufferEnd}`,`clean ${Math.min(rap, time - 10, bufferEnd - 10)}`)
      this.mse.remove(Math.max(Math.min(rap, time - 10, bufferEnd - 10), 0.1), 0)

      this.bufferClearTimer = setTimeout(() => {
        this.bufferClearTimer = null
      }, 5000)
    }
  }

  _handleNetworkError (tag, err) {
    this._player.emit('error', new Player.Errors('network', this._player.config.url))
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true)
  }

  _handleDemuxError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', new Player.Errors('parse', this._player.config.url))
    this._onError(DEMUX_EVENTS.DEMUX_ERROR, tag, err, fatal)
  }

  _handleAddRAP (rap) {
    if (this.state.randomAccessPoints) {
      this.state.randomAccessPoints.push(rap)
    }
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal || false
    }
    this._player.emit(FLV_ERROR, error);
  }

  seek () {
    if (!this.state.initSegmentArrived) {
      this.loadData()
    }
  }

  loadData (url = this._player.config.url) {
    this.emit(LOADER_EVENTS.LADER_START, url)
  }

  pause () {
    const loader = this._context.getInstance('FETCH_LOADER')

    if (loader) {
      loader.cancel()
    }
  }

  destroy () {
    this._player.off('timeupdate', this._handleTimeUpdate)
    this._player = null
    this.mse = null
    this.state.randomAccessPoints = []
  }
}
