import { EVENTS } from 'xgplayer-helper-utils'

const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const MSE_EVENTS = EVENTS.MSE_EVENTS

const Tag = 'FLVController'

const FLV_ERROR = 'FLV_ERROR'

export default class FlvController {
  constructor (player, mse, config) {
    this.TAG = Tag
    this._player = player
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    }

    this.mse = mse;

    this.bufferClearTimer = null;

    this._handleTimeUpdate = this._handleTimeUpdate.bind(this)
    this._handleKeyFrame = this._handleKeyFrame.bind(this)
    this.config = config
  }

  init () {
    if (!this.mse) {
      const { Mse } = this.config
      this.mse = new Mse({ container: this._player.video }, this._context);
      this.mse.init();
    }

    this.initComponents();
    this.initListeners()
  }

  initComponents () {
    const { FetchLoader, XgBuffer, FlvDemuxer, Tracks, Remuxer, PreSource, Compatibility, Logger, remux } = this.config
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    const remuxer = this._context.registry('MP4_REMUXER', Remuxer)(this._player.currentTime)
    if (remux) {
      Object.keys(remux).forEach(key => {
        remuxer[key] = remux[key]
      })
    }
    this._context.registry('PRE_SOURCE_BUFFER', PreSource)

    if (this._player.config.compatibility !== false) {
      this._context.registry('COMPATIBILITY', Compatibility)
    }

    this._context.registry('LOGGER', Logger)
  }

  initBackup() {
    const { PreSource, Mse } = this.config;
    this._context.registry('PRE_SOURCE_BUFFER', PreSource);
    this.backupVideo = document.createElement('video');
    this.backupVideo.muted = true;
    this.backupMSE = new Mse({ container: this.backupVideo, dataSource: 'BACKUP_SOURCE_BUFFER' }, this._context);
    this.backupMSE.init();
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))
    this.on(LOADER_EVENTS.LOADER_RETRY, this._handleFetchRetry.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this))
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this))
    this.on(REMUX_EVENTS.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this))

    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this))
    this.on(MSE_EVENTS.MSE_ERROR, this._handleMseError.bind(this))
    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame)

    this._player.on('timeupdate', this._handleTimeUpdate)
  }

  _handleMediaInfo () {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
  }

  _handleKeyFrame (pts) {
    this._player && this._player.emit('isKeyframe', pts)
  }

  _handleLoaderDataLoaded () {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleMetadataParsed (type) {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _handleDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
    if (this.backupMSE) {
      this.backupMSE.addSourceBuffers()
    }
  }

  _handleMediaSegment () {
    this.mse.addSourceBuffers()
    this.mse.doAppend();
    if (this.backupMSE) {
      this.backupMSE.addSourceBuffers()
      this.backupMSE.doAppend();
    }
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
    if (bufferEnd - time > preloadTime * 2 && !this._player.paused) {
      if (bufferEnd - preloadTime > this._player.currentTime) {
        this._player.currentTime = bufferEnd - preloadTime
      }
    }

    if (this.backupMSE) {
      this.backupMSE.doAppend();
    }
    this.mse.doAppend();
    if (this._player.paused || this.urlSwitching) {
      this.urlSwitching = false
      this._handleTimeUpdate();
    }
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
      // 兼容Safari bufferStart时间不准确，导致seek失败
      video.currentTime = bufferStart + 0.1;
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
    this._player.emit('error', {
      code: err.code,
      errorType: 'network',
      ex: `[${tag}]: ${err.message}`,
      errd: {}
    })
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true)
  }

  _handleFetchRetry (tag, info) {
    this._player.emit('retry', Object.assign({
      tag
    }, info))
  }

  _handleDemuxError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${tag}]: ${err ? err.message : ''}`,
      errd: {}
    });
    this._onError(DEMUX_EVENTS.DEMUX_ERROR, tag, err, fatal)
  }

  _handleMseError (tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${tag}]: ${err ? err.message : ''}`,
      errd: {}
    });
    this._onError(MSE_EVENTS.MSE_ERROR, tag, err, fatal)
  }

  _handleAddRAP (rap) {
    if (this.state.randomAccessPoints) {
      this.state.randomAccessPoints.push(rap)
    }
  }

  _onError (type, mod, err, fatal) {
    let error = {
      code: err.code,
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
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
    if (!url) {
      this._player.emit('error', {
        code: '0',
        errorType: 'network',
        ex: `empty url`,
        errd: {}
      });
      return;
    }
    const { count: times, delay: delayTime } = this._player.config.retry || {};
    this.emit(LOADER_EVENTS.LADER_START, url, {}, times, delayTime)
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
    if (this._timer) clearInterval(this._timer)
  }
}
