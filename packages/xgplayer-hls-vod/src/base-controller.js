import { Errors } from 'xgplayer'
import { EVENTS, Err, Crypto, FetchLoader, XhrLoader, logger } from 'xgplayer-helper-utils'
import { Tracks, Buffer as XgBuffer, Playlist } from 'xgplayer-helper-models'
import { CompatHls as Compatibility } from 'xgplayer-helper-codec'
import { M3U8Parser, TsDemuxer } from 'xgplayer-helper-transmuxers'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const REMUX_EVENTS = EVENTS.REMUX_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS
const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS
const COMPATIBILITY_EVENTS = EVENTS.COMPATIBILITY_EVENTS
const CORE_EVENTS = EVENTS.CORE_EVENTS

class HlsVodController {
  constructor () {
    this.url = ''
    this.baseurl = ''
    this.sequence = 0
    this._playlist = null
    this._lastSeekTime = 0
    this.m3u8Text = null
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer)
    this._tsBuffer = this._context.registry('TS_BUFFER', XgBuffer)()
    this._tracks = this._context.registry('TRACKS', Tracks)()
    this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: false })
    this._compat = this._context.registry('COMPATIBILITY', Compatibility)()

    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', Loader)({ buffer: 'M3U8_BUFFER', readtype: 1 })
    this._tsloader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })

    this._demuxer = this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' })

    this.retrytimes = this._pluginConfig.retryTimes
    this.preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime
  }

  _bindEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete)
    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError)
    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed)
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onError)

    // emit to out
    this.connectEventTo(LOADER_EVENTS.LOADER_START, 'M3U8_LOADER', CORE_EVENTS.LOADER_START)
    this.connectEventTo(LOADER_EVENTS.LOADER_START, 'TS_LOADER', CORE_EVENTS.LOADER_START)
    this.connectEvent(LOADER_EVENTS.LOADER_COMPLETE, CORE_EVENTS.LOADER_COMPLETE)
    this.connectEvent(LOADER_EVENTS.LOADER_RETRY, CORE_EVENTS.LOADER_RETRY)
    this.connectEvent(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, CORE_EVENTS.LOADER_RESPONSE_HEADERS)
    this.connectEvent(DEMUX_EVENTS.ISKEYFRAME, CORE_EVENTS.KEYFRAME)
    this.connectEvent(LOADER_EVENTS.LOADER_TTFB, CORE_EVENTS.TTFB)
    this.connectEvent(DEMUX_EVENTS.SEI_PARSED, CORE_EVENTS.SEI_PARSED)
    this.connectEvent(DEMUX_EVENTS.DEMUX_ERROR, CORE_EVENTS.DEMUX_ERROR)
    this.connectEvent(DEMUX_EVENTS.METADATA_PARSED, CORE_EVENTS.METADATA_PARSED)
    this.connectEvent(REMUX_EVENTS.REMUX_METADATA, CORE_EVENTS.REMUX_METADATA)
    this.connectEvent(COMPATIBILITY_EVENTS.EXCEPTION, CORE_EVENTS.STREAM_EXCEPTION)

    this._player.on('timeupdate', this._onTimeUpdate)
    this._player.on('waiting', this._onWaiting)
  }

  _onTimeUpdate = () => {
    throw new Error('need override by children')
  }

  _onWaiting = () => {
    throw new Error('need override by children')
  }

  _onMetadataParsed = () => {
    throw new Error('need override by children')
  }

  _onDemuxComplete = () => {
    throw new Error('need override by children')
  }

  _onLoaderCompete = (buffer) => {
    if (buffer.TAG === 'M3U8_BUFFER') {
      this.m3u8Text = buffer.shift()
      try {
        const mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl)
        this._playlist.pushM3U8(mdata)
        if (this._player.config.mediaType === 'live-video') {
          this._player.video.duration = mdata.duration / 1000
        }
      } catch (error) {
        this._onError('HlsVodController', Err.M3U8_PARSE(error))
      }
      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader
        this._context.registry('DECRYPT_BUFFER', XgBuffer)()
        this._context.registry('KEY_BUFFER', XgBuffer)()
        this._tsloader.buffer = 'DECRYPT_BUFFER'
        this._keyLoader = this._context.registry('KEY_LOADER', Loader)({ buffer: 'KEY_BUFFER', readtype: 3 })
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LOADER_START, this._playlist.encrypt.uri, this._pluginConfig)
      } else {
        if (!this.preloadTime) {
          if (this._playlist.targetduration) {
            this.preloadTime = this._playlist.targetduration
            if (this.mse) {
              this.mse.preloadTime = this._playlist.targetduration
            }
          } else {
            this.preloadTime = 5
            if (this.mse) {
              this.mse.preloadTime = 5
            }
          }
        }
        const frag = this._playlist.getTs(this._player.currentTime * 1000)
        if (frag) {
          this._logDownSegment(frag)
          this._playlist.downloading(frag.url, true)
          this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, this._pluginConfig)
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LOADER_START, this.url, this._pluginConfig)
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
        this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, this._pluginConfig)
      } else {
        if (this.retrytimes > 0) {
          this.retrytimes--
          this.emitTo('M3U8_LOADER', LOADER_EVENTS.LOADER_START, this.url, this._pluginConfig)
        }
      }
    }
  }

  _onDcripted = () => {
    this.emit(DEMUX_EVENTS.DEMUX_START)
  }

  seek = (time) => {
    const { video } = this._player
    for (let i = 0; i < video.buffered.length; i++) {
      if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
        return
      }
    }
    const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader
    this._lastSeekTime = time
    this._tsloader.destroy()
    this._tsloader = this._context.registry('TS_LOADER', Loader)({ buffer: 'TS_BUFFER', readtype: 3 })
    if (this._presource && this._presource.sources.video) {
      this._presource.sources.video.data = []
    }
    if (this._presource && this._presource.sources.audio) {
      this._presource.sources.audio.data = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.audioTrack.samples = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.videoTrack.samples = []
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

  load = (url) => {
    this.baseurl = M3U8Parser.parseURL(url)
    this.url = url
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LOADER_START, url, this._pluginConfig)
  }

  _preload = (time) => {
    time = Math.floor(time)
    if (this._tsloader.loading) {
      return
    }
    const video = this._player.video

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
        this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, this._pluginConfig)
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
        this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, this._pluginConfig)
      }
    }
  }

  _logDownSegment = (frag) => {
    if (!frag) return
    logger.groupEnd()
    logger.group(this.TAG, `load ${frag.id}: [${frag.time / 1000} , ${(frag.time + frag.duration) / 1000}], downloading: ${frag.downloading} , donwloaded: ${frag.downloaded}`)
  }

  /** *********** 对外事件 ********************/

  // 兼容老的业务使用
  _handleSEIParsed = (sei) => {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadError = (mod, error) => {
    this._onError(mod, error?.err)
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
  }

  _onError = (_, error) => {
    this._player?.emit('error', new Errors(this._player, error))
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

    this._player.off('timeupdate', this._onTimeUpdate)
    this._player.off('waiting', this._onWaiting)
  }
}
export default HlsVodController
