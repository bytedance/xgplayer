import { EVENTS } from 'xgplayer-helper-utils'
import Player from 'xgplayer'

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS;

const Tag = 'FLVController'

const FLV_ERROR = 'FLV_ERROR'

export default class FlvController {
  constructor (player, config) {
    this.TAG = Tag
    this._player = player
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    }

    this.bufferClearTimer = null;
    this.config = config
  }

  init () {
    this.initComponents();
    this.initListeners()
  }

  initComponents () {
    const { FetchLoader, XgBuffer, FlvDemuxer, Tracks, Logger, PageVisibility } = this.config
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('LOGGER', Logger)
    this._context.registry('PAGE_VISIBILITY', PageVisibility)
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))
    // this.on(BROWSER_EVENTS.VISIBILITY_CHANGE, this._handleVisibilityChange.bind(this))
  }

  _handleMediaInfo () {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'))
    }
  }

  _handleLoaderDataLoaded () {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START)
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _handleDemuxComplete () {
    if (this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS');
      videoTrack.samples.forEach((sample) => {
        // const buffer = new Stream(sample.data.buffer)
        // const nals = NalUnit.getNalunits(buffer);
        const nals = sample.nals;
        if (!nals) return;
        const nalsLength = nals.reduce((len, current) => {
          return len + 4 + current.body.byteLength;
        }, 0);
        const newData = new Uint8Array(nalsLength);
        let offset = 0;
        nals.forEach((nal) => {
          newData.set([0, 0, 0, 1], offset)
          offset += 4;
          newData.set(new Uint8Array(nal.body), offset);
          offset += nal.body.byteLength;
        })
        sample.nals = null;
        sample.data = newData;
      })
      this._player.video.onDemuxComplete(videoTrack, audioTrack);
    }
  }
  _handleVisibilityChange (visible) {
    if (!visible && !this._player.paused) {
      this._player.pause()
    }
  }

  _handleMetadataParsed (type) {
    if (type === 'audio') {
      // 将音频meta信息交给audioContext，不走remux封装
      const { audioTrack } = this._context.getInstance('TRACKS')
      if (audioTrack && audioTrack.meta) {
        this._setMetaToAudio(audioTrack.meta)
      }
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS')
      if (videoTrack && videoTrack.meta) {
        this._setMetaToVideo(videoTrack.meta)
      }
    }
  }

  _setMetaToAudio (audioMeta) {
    if (this._player.video) {
      this._player.video.setAudioMeta(audioMeta);
    }
  }

  _setMetaToVideo (videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta);
    }
  }

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
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
    this._player = null
    this.state.randomAccessPoints = []
  }
}
