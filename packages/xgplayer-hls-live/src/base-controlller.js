import { EVENTS, logger } from 'xgplayer-helper-utils'
const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS
const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS
const HLS_ERROR = 'HLS_ERROR'

const MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g

export default class BaseController {
  constructor (params) {
    this.url = ''
    this.baseurl = ''
    this.sequence = 0
    this.m3u8Text = null
    this._playlist = null
    this._m3u8FlushDuration = 4
    this._m3u8lasttime = 0
  }

  init () {
    const { XgBuffer, Tracks, Playlist, FetchLoader, XhrLoader, TsDemuxer, Compatibility } = this._pluginConfig
    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader

    this._timmer = setInterval(this._checkStatus, 300)
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer)
    this._context.registry('TS_BUFFER', XgBuffer)
    this._track = this._context.registry('TRACKS', Tracks)()
    this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: true, logger })

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', Loader)({ buffer: 'M3U8_BUFFER', readtype: 1 })
    this._tsloader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })

    // 初始化TS Demuxer
    this._tsDemuxer = this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' })
    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()

    this.retryTimes = this._pluginConfig.retryTimes
    this.preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime
  }

  _initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete)
    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError)

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed)
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError)
  }

  _onError (type, mod, err, fatal) {
    const error = {
      code: err.code,
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
      errorFatal: fatal
    }
    this._player.emit(HLS_ERROR, error)
  }

  _onLoadError = (loader, error) => {
    this._player.pause()
    const err = {
      code: error.code,
      errorType: 'network',
      ex: `[${loader}]: ${error.message}`,
      errd: {}
    }
    this._player.emit('error', err)

    this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, true)
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
    this.destroy()
  }

  _onDemuxError = (mod, error, fatal) => {
    if (fatal === undefined) {
      fatal = true
    }
    this._player.emit('error', {
      code: '31',
      errorType: 'parse',
      ex: `[${mod}]: ${error ? error.message : ''}`,
      errd: {}
    })
    this._onError(DEMUX_EVENTS.DEMUX_ERROR, mod, error, fatal)
  }

  _handleSEIParsed = (sei) => {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadComplete = (buffer) => {
    const { M3U8Parser, XgBuffer, FetchLoader, XhrLoader, Crypto } = this._pluginConfig
    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader

    if (buffer.TAG === 'M3U8_BUFFER') {
      let mdata
      try {
        this.m3u8Text = buffer.shift()
        let result = MASTER_PLAYLIST_REGEX.exec(this.m3u8Text)
        if (result && result[2]) {
          // redirect
          this.load(result[2])
        } else {
          mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl)
        }
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'M3U8_PARSER', error, false)
      }

      if (!mdata) {
        if (this.retrytimes > 0) {
          this.retrytimes--
          this._preload()
        } else {
          this._streamEnd()
        }
        return
      }

      try {
        this._playlist.pushM3U8(mdata, true)
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, false)
      }

      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        this._context.registry('DECRYPT_BUFFER', XgBuffer)()
        this._context.registry('KEY_BUFFER', XgBuffer)()
        this._tsloader.buffer = 'DECRYPT_BUFFER'
        this._keyLoader = this._context.registry('KEY_LOADER', Loader)({ buffer: 'KEY_BUFFER', readtype: 3 })
        const { count: times, delay: delayTime } = this._player.config.retry || {}
        // 兼容player.config上传入retry参数的逻辑
        const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times
        const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LOADER_START, this._playlist.encrypt.uri, {}, retryCount, retryDelay)
      } else {
        this._m3u8Loaded(mdata)
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3
      this._playlist.downloaded(this._tsloader.url, true)
      let seg = Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url])
      this.emit(DEMUX_EVENTS.DEMUX_START, seg, this._playlist.end)
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retrytimes = this._pluginConfig.retrytimes || 3
      this._playlist.downloaded(this._tsloader.url, true)
      this.emitTo('CRYPTO', CRYPTO_EVENTS.START_DECRYPTO)
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
      this._crypto.on(CRYPTO_EVENTS.DECRYPTED, this._onDcripted)
    }
  }

  // 占位符
  _streamEnd () {
    console.log('父类继承实现')
  }

  _onDcripted = () => {
    this.emit(DEMUX_EVENTS.DEMUX_START)
  }

  _preload () {
    if (this.retryTimes < 1 || this._tsloader.loading || this._m3u8loader.loading) {
      return
    }
    let frag = this._playlist.getTs()
    const { count: times, delay: delayTime } = this._player.config.retry || {}
    // 兼容player.config上传入retry参数的逻辑
    const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times
    const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime
    const { fetchOptions = {} } = this._pluginConfig
    if (frag && !frag.downloaded && !frag.downloading) {
      this._logDownSegment(frag)
      this._playlist.downloading(frag.url, true)
      this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, fetchOptions, retryCount, retryDelay)
    } else {
      let current = new Date().getTime()
      if ((!frag || frag.downloaded) &&
        (current - this._m3u8lasttime) / 1000 > this._m3u8FlushDuration) {
        this._m3u8lasttime = current
        this.emitTo('M3U8_LOADER', LOADER_EVENTS.LOADER_START, this.url, fetchOptions, retryCount, retryDelay)
      }
    }
  }

  _logDownSegment (frag) {
    if (!frag) return
    logger.groupEnd()
    logger.group(this.TAG, `load ${frag.id}: [${frag.time / 1000} , ${(frag.time + frag.duration) / 1000}], downloading: ${frag.downloading} , donwloaded: ${frag.downloaded}`)
  }

  load (url) {
    this.baseurl = this._pluginConfig.M3U8Parser.parseURL(url)
    this.url = url
    this._playlist.resetSequence()
    this._preload()
  }

  destroy () {
    if (this._timmer) {
      clearInterval(this._timmer)
    }
    this.m3u8Text = null
  }
}
