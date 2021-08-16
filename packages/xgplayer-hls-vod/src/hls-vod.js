import { EVENTS, Mse, Crypto, FetchLoader, XhrLoader, logger } from 'xgplayer-helper-utils'
import { RemuxedBufferManager, Tracks, Buffer as XgBuffer, Playlist } from 'xgplayer-helper-models'
import { CompatHls as Compatibility } from 'xgplayer-helper-codec'
import { Mp4Remuxer, M3U8Parser, TsDemuxer } from 'xgplayer-helper-transmuxers'

const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS
const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS
const HLS_ERROR = 'HLS_ERROR'
class HlsVodController {
  constructor (mse) {
    this.TAG = 'HlsVodController'
    this.url = ''
    this.baseurl = ''
    this.sequence = 0
    this._playlist = null
    this.mse = mse
    this._lastSeekTime = 0
    this.m3u8Text = null
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer)
    this._tsBuffer = this._context.registry('TS_BUFFER', XgBuffer)()
    this._tracks = this._context.registry('TRACKS', Tracks)()

    this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: false })
    this._presource = this._context.registry('PRE_SOURCE_BUFFER', RemuxedBufferManager)()

    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', Loader)({ buffer: 'M3U8_BUFFER', readtype: 1 })
    this._tsloader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })

    // 初始化TS Demuxer
    this._demuxer = this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' })

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer)(this._player.currentTime)

    this.retrytimes = this._pluginConfig.retryTimes
    this.preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime

    // 初始化MSE
    if (!this.mse) {
      this.mse = new Mse({ preloadTime: this.preloadTime, container: this._player.video }, this._context)
      this.mse.init()
    }
    this.initEvents()
  }

  initEvents () {
    this._onLoaderCompete = this._onLoaderCompete.bind(this)
    this._onLoadError = this._onLoadError.bind(this)
    this._onInitSegment = this._onInitSegment.bind(this)
    this._handleSEIParsed = this._handleSEIParsed.bind(this)
    this._onMediaSegment = this._onMediaSegment.bind(this)
    this._onMetadataParsed = this._onMetadataParsed.bind(this)
    this._onDemuxComplete = this._onDemuxComplete.bind(this)
    this._onDemuxError = this._onDemuxError.bind(this)
    this._onRemuxError = this._onRemuxError.bind(this)
    this._onTimeUpdate = this._onTimeUpdate.bind(this)
    this._onWaiting = this._onWaiting.bind(this)
    this._handleKeyFrame = this._handleKeyFrame.bind(this)

    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete)

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError)

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment)

    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed)

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment)

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)

    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame)

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError)

    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError)

    this._player.on('timeupdate', this._onTimeUpdate)

    this._player.on('waiting', this._onWaiting)
  }

  _onError (type, mod, err, fatal) {
    const error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
      errorFatal: fatal
    }
    this._player && this._player.emit(HLS_ERROR, error)
  }

  _onLoadError (mod, error) {
    this._player.emit('error', {
      code: error.code,
      errorType: 'network',
      ex: `[${mod}]: ${error.message}`,
      errd: {}
    })
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, true)
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
  }

  _onDemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${mod}]: ${error ? error.message : ''}`,
      errd: {}
    })
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, fatal)
  }

  _onRemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal)
  }

  _onWaiting () {
    let end = true

    this._seekToBufferStart()
    const playList = Object.keys(this._playlist.list)
    const playListLen = playList.length
    if (!playListLen) {
      return
    }

    for (let i = 0; i < playListLen; i++) {
      if (this._player.currentTime * 1000 < parseInt(playList[i])) {
        end = false
      }
    }
    if (end) {
      const { video } = this._player
      if (Math.abs(video.currentTime - video.duration) < 1) {
        this._player.emit('ended')
        this.mse.endOfStream()
      }
    }
  }

  _seekToBufferStart () {
    const video = this._player.video
    const buffered = video.buffered
    const range = [0, 0]
    const currentTime = video.currentTime
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i)
        range[1] = buffered.end(i)
        if (range[0] <= currentTime && currentTime <= range[1]) {
          return
        }
      }
    }

    const bufferStart = range[0]

    if (currentTime === 0 && currentTime < bufferStart && Math.abs(currentTime - bufferStart) < 3) {
      video.currentTime = bufferStart
    }
  }

  _onTimeUpdate () {
    this._seekToBufferStart()
    this._preload(this._player.currentTime)
  }

  _onDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA, 'ts')
  }

  _handleKeyFrame (pts) {
    this._player && this._player.emit('isKeyframe', pts)
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _onMetadataParsed (type) {
    const duration = parseInt(this._playlist.duration)
    if (type === 'video') {
      this._tracks.videoTrack.meta.duration = duration
    } else if (type === 'audio') {
      this._tracks.audioTrack.meta.duration = duration
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onMediaSegment () {
    if (Object.keys(this.mse.sourceBuffers).length < 1) {
      this.mse.addSourceBuffers()
    }

    this.mse.doAppend()
  }

  _onInitSegment () {
    this.mse.addSourceBuffers()
  }

  _onLoaderCompete (buffer) {
    const { fetchOptions = {} } = this._pluginConfig
    if (buffer.TAG === 'M3U8_BUFFER') {
      this.m3u8Text = buffer.shift()
      try {
        const mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl)
        this._playlist.pushM3U8(mdata)
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, true)
      }
      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        this._context.registry('DECRYPT_BUFFER', XgBuffer)()
        this._context.registry('KEY_BUFFER', XgBuffer)()
        this._tsloader.buffer = 'DECRYPT_BUFFER'
        this._keyLoader = this._context.registry('KEY_LOADER', Loader)({ buffer: 'KEY_BUFFER', readtype: 3 })
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LADER_START, this._playlist.encrypt.uri, fetchOptions, this._pluginConfig)
      } else {
        if (!this.preloadTime) {
          if (this._playlist.targetduration) {
            this.preloadTime = this._playlist.targetduration
            this.mse.preloadTime = this._playlist.targetduration
          } else {
            this.preloadTime = 5
            this.mse.preloadTime = 5
          }
        }

        const frag = this._playlist.getTs(this._player.currentTime * 1000)
        if (frag) {
          this._logDownSegment(frag)
          this._playlist.downloading(frag.url, true)
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url, fetchOptions, this._pluginConfig)
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url, fetchOptions, this._pluginConfig)
          }
        }
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this._playlist.downloaded(this._tsloader.url, true)
      this._demuxer.demux(Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]))
      this._preload(this._player.currentTime)
      // this.emit(DEMUX_EVENTS.DEMUX_START, Object.assign({url: this._tsloader.url}, this._playlist._ts[this._tsloader.url]));
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3
      this._playlist.downloaded(this._tsloader.url, true)
      this.emitTo('CRYPTO', CRYPTO_EVENTS.START_DECRYPTO, Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]))
    } else if (buffer.TAG === 'KEY_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3
      this._playlist.encrypt.key = buffer.shift()
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer: 'DECRYPT_BUFFER',
        outputbuffer: 'TS_BUFFER'
      })

      this._crypto.on(CRYPTO_EVENTS.DECRYPTED, this._onDcripted.bind(this))

      const frag = this._playlist.getTs()
      if (frag) {
        this._playlist.downloading(frag.url, true)
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url, fetchOptions, this._pluginConfig)
      } else {
        if (this.retrytimes > 0) {
          this.retrytimes--
          this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url, fetchOptions, this._pluginConfig)
        }
      }
    }
  }

  _onDcripted () {
    this.emit(DEMUX_EVENTS.DEMUX_START)
  }

  seek (time) {
    const { video } = this._player
    for (let i = 0; i < video.buffered.length; i++) {
      if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
        // this._playlist.clearDownloaded();
        return
      }
    }

    this._lastSeekTime = time
    this._tsloader.destroy()
    this._tsloader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })
    if (this._presource.sources.video) {
      this._presource.sources.video.data = []
    }
    if (this._presource.sources.audio) {
      this._presource.sources.audio.data = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.audioTrack.samples = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.videoTrack.samples = []
    }

    if (this._compat) {
      this._compat.reset()
    }

    if (this._tsBuffer) {
      this._tsBuffer.array = []
      this._tsBuffer.length = 0
      this._tsBuffer.offset = 0
    }

    this._playlist.clearDownloaded()
    this._context.seek(time)
    this._preload(time)
  }

  load (url) {
    const { fetchOptions = {} } = this._pluginConfig
    this.baseurl = M3U8Parser.parseURL(url)
    this.url = url
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url, fetchOptions, this._pluginConfig)
  }

  _preload (time) {
    time = Math.floor(time)
    if (this._tsloader.loading) {
      return
    }
    const video = this._player.video
    const { fetchOptions = {} } = this._pluginConfig

    // Get current time range
    let currentbufferend = -1

    for (let i = 0; i < video.buffered.length; i++) {
      if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
        currentbufferend = video.buffered.end(i)
      }
    }

    if (currentbufferend < 0) {
      let frag = this._playlist.getTs((time > 1 ? time - 0.5 : time) * 1000) // FIXME: Last frame buffer shortens duration
      if (frag && frag.downloaded) {
        frag = this._playlist.getTs(frag.time + frag.duration)
      }
      if (frag && !frag.downloading && !frag.downloaded) {
        this._logDownSegment(frag)
        this._playlist.downloading(frag.url, true)
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url, fetchOptions, this._pluginConfig)
      }
    } else if (currentbufferend < video.currentTime + this.preloadTime) {
      let frag = this._playlist.getLastDownloadedTs() || this._playlist.getTs(currentbufferend * 1000)

      if (!frag) {
        return
      }

      // let fragend = frag ? (frag.time + frag.duration) / 1000 : 0;

      let curTime = frag.time + frag.duration
      const curFragTime = frag.time

      if (frag.downloaded) {
        let loopMax = 1000
        while (loopMax-- > 0) {
          curTime += 10
          frag = this._playlist.getTs(curTime)
          if (!frag || frag.time > curFragTime) {
            break
          }
        }
      }

      if (frag && !frag.downloading && !frag.downloaded) {
        this._logDownSegment(frag)
        this._playlist.downloading(frag.url, true)
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url, fetchOptions, this._pluginConfig)
      }
    }
  }

  _logDownSegment (frag) {
    if (!frag) return
    logger.groupEnd()
    logger.group(this.TAG, `load ${frag.id}: [${frag.time / 1000} , ${(frag.time + frag.duration) / 1000}], downloading: ${frag.downloading} , donwloaded: ${frag.downloaded}`)
  }

  destroy () {
    this.url = ''
    this.baseurl = ''
    this.sequence = 0
    this._playlist = null
    this.retrytimes = 3
    this.preloadTime = 5
    this._demuxer = null
    this._lastSeekTime = 0
    this.m3u8Text = null
    this.mse = null

    this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete)

    this.off(LOADER_EVENTS.LOADER_ERROR, this._onLoadError)

    this.off(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment)

    this.off(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed)

    this.off(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment)

    this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)

    this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)

    this.off(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError)

    this.off(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError)

    this._player.off('timeupdate', this._onTimeUpdate)

    this._player.off('waiting', this._onWaiting)
  }
}
export default HlsVodController
