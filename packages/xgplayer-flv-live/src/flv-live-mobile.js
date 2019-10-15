import { FetchLoader } from 'xgplayer-loader'
import { FlvDemuxer } from 'xgplayer-demux'
import { Mp4Remuxer } from 'xgplayer-remux'
import { Tracks, XgBuffer } from 'xgplayer-buffer'
import { EVENTS } from 'xgplayer-utils'
import { Compatibility } from 'xgplayer-codec'
import Player from 'xgplayer'

const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS

const Tag = 'FLVController'

class Logger {
  warn () {}
}

export default class FlvController {
  constructor (player) {
    this.TAG = Tag
    this._player = player

    this.state = {
      initSegmentArrived: false
    }
  }

  init () {
    this._context.registry('FETCH_LOADER', FetchLoader)
    this._context.registry('LOADER_BUFFER', XgBuffer)

    this._context.registry('FLV_DEMUXER', FlvDemuxer)

    this._context.registry('MP4_REMUXER', Mp4Remuxer)
    this._context.registry('TRACKS', Tracks)

    this._context.registry('COMPATIBILITY', Compatibility)

    this._context.registry('LOGGER', Logger)

    this.initListeners()
  }

  initListeners () {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this))
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this))

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this))
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this))
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this))

    this._player.on('timeupdate', this._handleTimeUpdate.bind(this))
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
    
  }

  _handleDemuxComplete () {
    const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')

    // 处理视频gop
    FlvController.resolveVideoGOP(videoTrack)

    // 将音频帧交给audioContext，不走remux封装
    const audioSamples = audioTrack.samples;
    FlvController.resolveAudio(audioSamples);
    
    audioTrack.samples = [];

    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _handleAppendInitSegment () {
    this.state.initSegmentArrived = true
    this.mse.addSourceBuffers()
  }

  _handleMediaSegment (type) {

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
  }

  _handleTimeUpdate () {
    const time = this._player.currentTime
    if (time > 2) {
      // 在直播时及时清空buffer，降低直播内存占用
      this.mse.remove(time - 2)
    }
  }

  _handleNetworkError () {
    this._player.emit('error', new Player.Errors('network', this._player.config.url))
  }

  _handleDemuxError () {
    this._player.emit('error', new Player.Errors('parse', this._player.config.url))
  }

  _setMp4ToVideo (mp4) {
    const { video } = this._player;

    video.setVideo(mp4)
  }

  _setAACToAudio (aacSamples) {
    const { video } = this._player;
  }

  seek () {
    if (!this.state.initSegmentArrived) {
      this.loadData()
    }
  }

  loadData () {
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url)
  }

  pause () {
    const loader = this._context.getInstance('FETCH_LOADER')

    if (loader) {
      loader.cancel()
    }
  }

  /**
   * 保证当前播放的视频以gop为单位
   * @param videoTrack
   */
  static resolveVideoGOP (videoTrack) {
    const { samples } = videoTrack;
    if (!samples.length) {
      return;
    }

    let firstIframeIdx = null
    let lastIframeIdx = null

    if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
      // 将缓存帧放置到队列的头部
      samples.unshift.apply(samples, videoTrack.tempSamples);
    }

    // 寻找第一个I帧
    for (let i = 0, len = samples.length; i < len; i++) {
      const current = samples[i];
      if (current.isKeyframe) {
        firstIframeIdx = i;
        break;
      }
    }

    // 寻找最后一个I帧
    for (let i = samples.length - 1; i > 0; i++) {
      const current = samples[i]

      if (current.isKeyframe) {
        lastIframeIdx = i;
        break;
      }
    }

    if (firstIframeIdx !== 0) {
      samples.splice(0, firstIframeIdx - 1)
    }

    videoTrack.samples = samples.slice(0, lastIframeIdx)
    const rest = samples.slice(lastIframeIdx)
    if (videoTrack.tempSamples) {
      videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest)
    } else {
      // 将剩下的帧缓存，等待一个完整的gop
      videoTrack.tempSamples = rest
    }
  }
}
