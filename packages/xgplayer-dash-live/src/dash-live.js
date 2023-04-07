import Parser from './parse'
import { EVENTS, logger } from 'xgplayer-helper-utils'

const {
  LOADER_EVENTS,
  MSE_EVENTS,
  CORE_EVENTS
} = EVENTS

const log = logger.log.bind(logger, 'DashLiveController')
// const warn = logger.warn.bind(logger, 'DashLiveController')

/* eslint-disable no-undefined */
export default class DashLiveController {
  constructor (config, player) {
    this.player = player
    this.config = config
    this.isInit = false
    this.loadedNumber = -1
    this.videoTotle = 0
    this.audioTotle = 0
    this.isAudioInit = false
    this.isVideoInit = false
    this.firstSegment = false
    this.videoSegmentLoadEnd = false
    this.audioSegmentLoadEnd = false
    this.isAddSourceBuffer = false
    this.videoFirstChunkLoaded = false
    this.audioFirstChunkLoaded = false
  }

  init () {
    log('init')
    const { XgBuffer, Tracks, FetchLoader, XhrLoader, Mse, RemuxedBufferManager } = this._pluginConfig

    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader
    this._mpdLoader = this._context.registry('MPD_LOADER', Loader)({ buffer: 'MPD_BUFFER', readtype: 1 })
    // 分片通过chunk方式进行加载
    this._videoSegmentLoader = this._context.registry('VIDEO_LOADER', Loader)({ buffer: 'VIDEO_BUFFER', readtype: 0 })
    this._audioSegmentLoader = this._context.registry('AUDIO_LOADER', Loader)({ buffer: 'AUDIO_BUFFER', readtype: 0 })
    // 初始化分片加载
    this._videoInitSegmentLoader = this._context.registry('VIDEO_INIT_LOADER', Loader)({ buffer: 'VIDEO_BUFFER', readtype: 3 })
    this._audioInitSegmentLoader = this._context.registry('AUDIO_INIT_LOADER', Loader)({ buffer: 'AUDIO_BUFFER', readtype: 3 })
    this._segmentVideoBuffer = this._context.registry('VIDEO_BUFFER', XgBuffer)()
    this._segmentAudioBuffer = this._context.registry('AUDIO_BUFFER', XgBuffer)()
    this._parse = this._context.registry('PARSE', Parser)()

    this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)
    this._context.registry('TRACKS', Tracks)()
    if (!this.mse) {
      this.mse = new Mse({ container: this._player.video }, this._context)
      this.mse.init()
    }

    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderComplete)
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._onLoaderDataLoaded)
    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._onSourceUpdateEnd)

    this.on('INIT_DATA_LOADED', this._onInitDataLoaded)
    this.on('SEGMENT_LOADED', this._onSegmentLoaded)
    this.on('CHUNK_LOADED', this._onChunkLoaded)
  }

  _onChunkLoaded = (type) => {
    // 标记音视频都有部分数据加载
    if (!this[`${type}FirstChunkLoaded`]) {
      this[`${type}FirstChunkLoaded`] = true
    }

    if (this.videoFirstChunkLoaded && this.audioFirstChunkLoaded) {
      log('firstChunkLoaded')
      this._addInitSourceBuffer()
    }
    this.mse.doAppend()
  }

  _onSourceUpdateEnd = () => {
    const time = this._player.currentTime
    const video = this._player.video
    const preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime

    const { length } = video.buffered

    if (length === 0) {
      return
    }

    if (!video.currentTime) {
      log('set start currentTime')
      video.currentTime = video.buffered.start(0) + parseFloat(this.availabilityTimeOffset)
    }

    // emit to out
    this.emitCoreEvent(CORE_EVENTS.BUFFER_APPENDED)

    const bufferEnd = video.buffered.end(length - 1)
    if (bufferEnd - time > preloadTime * 2) {
      if (bufferEnd - preloadTime > this._player.currentTime) {
        this._player.currentTime = bufferEnd - preloadTime
      }
    }
  }

  _onLoaderDataLoaded = (buffer) => {
    switch (buffer.TAG) {
      case 'VIDEO_BUFFER':
        this._onLoadChunkVideo(buffer.shift())
        break
      case 'AUDIO_BUFFER':
        this._onLoadChunkAudio(buffer.shift())
        break
      default:
        return function () {
          console.log('===========chunk loaded', buffer.TAG)
        }
    }
  }

  _onLoaderComplete = (buffer) => {
    if (!buffer) {
      console.error('请求数据超时')
    } else {
      // console.log('load complete, buffer type:', buffer.TAG)
      switch (buffer.TAG) {
        case 'MPD_BUFFER':
          this._onLoadMPD(buffer)
          break
        case 'VIDEO_BUFFER':
          this._onLoadVideo(buffer.shift(), buffer)
          break
        case 'AUDIO_BUFFER':
          this._onLoadAudio(buffer.shift(), buffer)
          break
        default :
          return this._onLoadMPD(buffer)
      }
    }
  }

  _onSegmentLoaded = () => {
    if (!this.firstSegment) {
      log('firstSegmentLoaded')
      this.firstSegment = true
      this._addInitSourceBuffer()
    }
    this.mse.doAppend()
    this._loadNextSegment()
  }

  _onInitDataLoaded = () => {
    log('init segment loaded')
    this._context.mediaInfo.hasAudio = true
    this._context.mediaInfo.hasVideo = true
  }

  /**
   * @description 检查是否请求下一个分片
   */
  _loadNextSegment () {
    if (this.audioSegmentLoadEnd && this.videoSegmentLoadEnd) {
      this._loadSegment()
    }
  }

  _onLoadChunkVideo (buffer) {
    // console.log('load fragment video')
    this._writeToPreSourceBuffer('video', buffer)
    this.videoTotle += buffer.length
    this.emit('CHUNK_LOADED', 'video')
  }

  _onLoadChunkAudio (buffer) {
    // console.log('load fragment audio')
    this._writeToPreSourceBuffer('audio', buffer)
    this.audioTotle += buffer.length
    this.emit('CHUNK_LOADED', 'audio')
  }

  _onLoadVideo (buffer, bufferArray) {
    // console.log('videoBuffer', buffer)
    if (!this.isVideoInit) {
      this.isVideoInit = true
      this._initPreSourceBuffer('video', this._parse.mediaList.video[0].codecs, buffer)
      if (this.isAudioInit) {
        this.emit('INIT_DATA_LOADED')
      }
    } else {
      // console.log('load frameng video done', this.isAudioFragment)
      this._writeToPreSourceBuffer('video', buffer)
      this.videoSegmentLoadEnd = true
      this.mse.doAppend()
      console.log('>>>>>>video read done', this.loadedNumber, buffer.length, this.videoTotle, bufferArray.array.length)
      this.videoTotle = 0
      if (this.audioSegmentLoadEnd) {
        this.emit('SEGMENT_LOADED', 'video')
      }
    }
  }

  _onLoadAudio (buffer, bufferArray) {
    // console.log('audioBuffer', buffer)
    if (!this.isAudioInit) {
      this.isAudioInit = true
      this._initPreSourceBuffer('audio', this._parse.mediaList.audio[0].codecs, buffer)
      if (this.isVideoInit) {
        this.emit('INIT_DATA_LOADED')
      }
    } else {
      // console.log('load frameng audio done', this.isVideoFragment)
      this._writeToPreSourceBuffer('audio', buffer)
      this.audioSegmentLoadEnd = true
      this.mse.doAppend()
      console.log('>>>>>>audio read done', this.loadedNumber, buffer.length, this.audioTotle, bufferArray.array.length)
      this.audioTotle = 0
      if (this.videoSegmentLoadEnd) {
        this.emit('SEGMENT_LOADED', 'video')
      }
    }
  }

  _addInitSourceBuffer () {
    if (!this.isAddSourceBuffer) {
      log('add initSourceBuffer')
      this.isAddSourceBuffer = true
      this.mse.addSourceBuffers()
    }
  }

  _onLoadMPD (buffer) {
    let mediaList
    try {
      this._parse.parse(buffer, this.url)
      this.mediaList = mediaList = this._parse.mediaList
      const minimumUpdatePeriod = this._parse.mpdAttributes.minimumUpdatePeriod || 2
      log('mpd parsed')
      if (!this.isInit) {
        ['video', 'audio'].forEach((item) => {
          this._initPreSourceBuffer(item, mediaList[item][mediaList[item].selectedIdx].codecs)
        })
        this._getAvailabilityTimeOffset()
        this._initTracks()
        this._loadInitSegment(mediaList)
        this.isInit = true
      }
      // 第一次加载分片
      if (this.loadedNumber === -1) {
        this._loadSegment()
      }
      this._loadNextSegment()

      // load next mpd
      if (this.refreshMPDTimer) {
        clearTimeout(this.refreshMPDTimer)
      }
      this.refreshMPDTimer = setTimeout(() => {
        this._mpdLoader.load(this.url)
        this.refreshMPDTimer = null
      }, minimumUpdatePeriod * 1000)
    } catch (error) {
      console.error('parse mpd error, is:', error)
    }
  }

  _writeToPreSourceBuffer (type, buffer) {
    if (!buffer.length) {
      return
    }
    const preSourceBuffer = this._context.getInstance('PRE_SOURCE_BUFFER')
    const source = preSourceBuffer.getSource(type)
    source.data.push({ buffer: buffer })
  }

  _initPreSourceBuffer (type, codec, initBuffer) {
    const preSourceBuffer = this._context.getInstance('PRE_SOURCE_BUFFER')
    let source = preSourceBuffer.getSource(type)
    if (!source) {
      log('init presource buffer')
      source = preSourceBuffer.createSource(type)
    }
    source.mimetype = codec
    source.init = { buffer: initBuffer }
  }

  _initTracks () {
    const { AudioTrack, VideoTrack, AudioTrackMeta, VideoTrackMeta } = this._pluginConfig
    const tracks = this._context.getInstance('TRACKS')

    const videoTrack = new VideoTrack()
    videoTrack.meta = new VideoTrackMeta()
    videoTrack.id = videoTrack.meta.id = 0

    const audioTrack = new AudioTrack()
    audioTrack.meta = new AudioTrackMeta()
    audioTrack.id = audioTrack.meta.id = 1

    tracks.videoTrack = videoTrack
    tracks.audioTrack = audioTrack
  }

  _loadInitSegment (mediaList) {
    const url = this._getInitSegmentURL(mediaList);

    ['video', 'audio'].forEach((item) => {
      if (item === 'video') {
        this._videoInitSegmentLoader.load(url.video)
      }

      if (item === 'audio') {
        this._audioInitSegmentLoader.load(url.audio)
      }
    })
  }

  _getInitSegmentURL (mediaList) {
    const vInitURL = mediaList.video[mediaList.video.selectedIdx].initSegment
    const aInitURL = mediaList.audio[mediaList.audio.selectedIdx].initSegment

    return {
      video: vInitURL,
      audio: aInitURL
    }
  }

  _loadSegment = () => {
    const list = this._getSegmentURL(this.mediaList)
    let vList = list.video
    let aList = list.audio
    // console.log('_loadSegment:', vList.length, aList.length)
    // 加载下一个分片的时候，要求分片列表中最后一个音视频的number是相同的，有时会出现不相同的情况.确保每次请求的音视频的number都是相同的
    if (aList.length && vList.length && vList[vList.length - 1].number === aList[aList.length - 1].number) {
      let audioSegmentItem
      let videoSegmentItem
      if (this.loadedNumber > -1) {
        audioSegmentItem = aList.shift()
        videoSegmentItem = vList.shift()
      } else {
        audioSegmentItem = aList.pop()
        videoSegmentItem = vList.pop()
        log('start idx', videoSegmentItem.number)
        aList = []
        vList = []
      }
      // console.log(videoSegmentItem.idx, this.loadedNumber)
      if (parseFloat(videoSegmentItem.number) > parseFloat(this.loadedNumber)) {
        if (videoSegmentItem.number !== audioSegmentItem.number) {
          console.error('load segment error:', videoSegmentItem.number, audioSegmentItem.number)
        }
        this.videoSegmentLoadEnd = false
        this.audioSegmentLoadEnd = false
        this._videoSegmentLoader.load(videoSegmentItem.url, { maxReaderInterval: 20000 })
        this._audioSegmentLoader.load(audioSegmentItem.url, { maxReaderInterval: 20000 })
        this.loadedNumber = videoSegmentItem.number
        // console.log('load id', this.loadedNumber)
      } else {
        this._loadSegment()
      }
    }
    // 最开始有时候mediaList只有一个,只包含音频或者视频
    if (this.loadedNumber === -1 && (!aList.length || !vList.length)) {
      setTimeout(() => {
        this._loadSegment()
      }, 100)
    }
  }

  _getSegmentURL (mediaList) {
    const vList = mediaList.video[mediaList.video.selectedIdx].mediaSegments
    const aList = mediaList.audio[mediaList.audio.selectedIdx].mediaSegments

    return {
      video: vList,
      audio: aList
    }
  }

  _getAvailabilityTimeOffset () {
    const mediaList = this.mediaList
    const videoInfo = mediaList.video[mediaList.video.selectedIdx]
    const audioInfo = mediaList.audio[mediaList.audio.selectedIdx]

    this.availabilityTimeOffset = Math.max(videoInfo.availabilityTimeOffset, audioInfo.availabilityTimeOffset)
  }

  load (url = this.player.config.url) {
    this.url = url
    this._mpdLoader.load(url)
    log('load', url)
  }

  destroy () {
    log('destroy')
    if (this.refreshMPDTimer) {
      clearTimeout(this.refreshMPDTimer)
    }
    this.isVideoInit = false
    this.videoFirstChunkLoaded = false
    this.audioFirstChunkLoaded = false
    this.loadedNumber = -1
    this.videoSegmentLoadEnd = false
    this.audioSegmentLoadEnd = false
    this.videoTotle = 0
    this.audioTotle = 0
    this.isInit = false
    this.isAddSourceBuffer = false
    this.firstSegment = false
    this._player.video.currentTime = 0
    if (this._videoSegmentLoader) {
      this._videoSegmentLoader.cancel()
    }
    if (this._audioSegmentLoader) {
      this._audioSegmentLoader.cancel()
    }

    if (this.mse) {
      this.mse.removeBuffers()
    }
    if (this._segmentVideoBuffer) {
      this._segmentVideoBuffer.clear()
    }
    if (this._segmentAudioBuffer) {
      this._segmentAudioBuffer.clear()
    }

    if (this.mse && this._player?.video.readyState) {
      // this.mse.endOfStream()
      this.mse.destroy()
      this.mse = null
    }
    return Promise.resolve()
  }
}
