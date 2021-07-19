import { EVENTS, logger } from 'xgplayer-helper-utils'
// import { hevc, avc } from 'xgplayer-helper-codec'

// const { NalUnitHEVC } = hevc;
// const { NalUnit } = avc;

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS
const HLS_EVENTS = EVENTS.HLS_EVENTS
const CRYPTO_EVENTS = EVENTS.CRYPTO_EVENTS
const HLS_ERROR = 'HLS_ERROR'

class HlsLiveController {
  constructor () {
    this.TAG = 'HlsLiveMobile'
    this.url = ''
    this.baseurl = ''
    this.sequence = 0
    this._playlist = null
    this.m3u8FlushDuration = 4
    this._m3u8lasttime = 0
    this._timmer = setInterval(this._checkStatus.bind(this), 50)
    this._lastCheck = 0
    this.m3u8Text = null
    this.inWaiting = false
    this._downloadedFragmentQueue = []
    this.setDataInterval = null
  }

  init () {
    const { XgBuffer, Tracks, Playlist, FetchLoader, TsDemuxer } = this._pluginConfig
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer)
    this._context.registry('TS_BUFFER', XgBuffer)
    this._context.registry('TRACKS', Tracks)

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true, logger})

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 })
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 })

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' })

    this.retryTimes = this._pluginConfig.retryTimes
    this.preloadTime = this._player.config.preloadTime || this._pluginConfig.preloadTime
    this.initEvents()
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this))

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this))

    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this))

    this.on(DEMUX_EVENTS.ISKEYFRAME, this._handleKeyFrame.bind(this))

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this))

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this))

    this._onWaiting = this._onWaiting.bind(this)
    this._onPlaying = this._onPlaying.bind(this)

    if (this._player) {
      this._player.on('waiting', this._onWaiting)
      this._player.on('playing', this._onPlaying)
    }
  }

  _onWaiting () {
    if (!this._player.video || this._player.video.currentTime < 1) return
    this.inWaiting = true
  }

  _onPlaying () {
    this.inWaiting = false
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err ? err.message : ''}`,
      errorFatal: fatal
    }
    this._player.emit(HLS_ERROR, error)
  }

  _onDemuxComplete () {
    if (this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS')
      if (!videoTrack) return
      videoTrack.samples.forEach((sample) => {
        if (sample.analyzed) {
          return
        }
        sample.analyzed = true
        let nals = sample.nals
        const nalsLength = nals.reduce((len, current) => {
          return len + 4 + current.body.byteLength
        }, 0)
        const newData = new Uint8Array(nalsLength)
        let offset = 0
        nals.forEach((nal) => {
          newData.set([0, 0, 0, 1], offset)
          offset += 4
          newData.set(new Uint8Array(nal.body), offset)
          offset += nal.body.byteLength
        })
        sample.nals = null
        sample.data = newData
      })
      this._player.video.onDemuxComplete(videoTrack, audioTrack)
    }
    this._consumeFragment()
  }

  _handleKeyFrame (pts) {
    this._player && this._player.emit('isKeyframe', pts)
  }

  _onMetadataParsed (type) {
    logger.warn(this.TAG, 'meta detect or changed , ', type)
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
      this._player.video.setAudioMeta(audioMeta)
    }
  }

  _setMetaToVideo (videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta)
    }
  }

  _onLoadError (loader, error) {
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

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadComplete (buffer) {
    const { M3U8ParserNew, XgBuffer, FetchLoader, Crypto } = this._pluginConfig
    if (buffer.TAG === 'M3U8_BUFFER') {
      let mdata
      try {
        this.m3u8Text = buffer.shift()
        const parsed = M3U8ParserNew.parse(this.m3u8Text, this.url)
        if (parsed && Array.isArray(parsed.streams)) {
          // redirect
          this.load(parsed.streams[0]?.url)
        } else {
          mdata = M3U8ParserNew.tempAdapter(parsed)
        }
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'M3U8_PARSER', error, false)
      }

      if (!mdata) {
        if (this.retryTimes > 0) {
          this.retryTimes--
          this._preload()
        } else {
          this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
          if (this._player.video) {
            this._player.video.handleEnded()
          }
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
        this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({buffer: 'KEY_BUFFER', readtype: 3})
        const { count: times, delay: delayTime } = this._player.config.retry || {}
        // 兼容player.config上传入retry参数的逻辑
        const retryCount = typeof times === 'undefined' ? this._pluginConfig.retryCount : times
        const retryDelay = typeof delayTime === 'undefined' ? this._pluginConfig.retryDelay : delayTime

        this.emitTo('KEY_LOADER', LOADER_EVENTS.LOADER_START, this._playlist.encrypt.uri, {}, retryCount, retryDelay)
      } else {
        this._m3u8Loaded(mdata)
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retryTimes = this._pluginConfig.retryTimes
      this._playlist.downloaded(this._tsloader.url, true)
      this._downloadedFragmentQueue.push(Object.assign({url: this._tsloader.url}, this._playlist._ts[this._tsloader.url]))
      this._consumeFragment()
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retryTimes = this._pluginConfig.retryTimes
      this._playlist.downloaded(this._tsloader.url, true)
      this.emitTo('CRYPTO', CRYPTO_EVENTS.START_DECRYPTO)
    } else if (buffer.TAG === 'KEY_BUFFER') {
      this.retryTimes = this._pluginConfig.retryTimes
      this._playlist.encrypt.key = buffer.shift()
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer: 'DECRYPT_BUFFER',
        outputbuffer: 'TS_BUFFER'
      })
      this._crypto.on(CRYPTO_EVENTS.DECRYPTED, this._onDcripted.bind(this))
    }
  }

  // 触发waiting时候,攒两个分片再播放
  _consumeFragment (force) {
    if (!force && this.inWaiting && this._downloadedFragmentQueue.length < 2) return
    let ts = this._downloadedFragmentQueue.shift()
    if (ts) {
      this.emit(DEMUX_EVENTS.DEMUX_START, ts, this._playlist.end)
      this.inWaiting = false
    }
  }

  _onDcripted () {
    this.emit(DEMUX_EVENTS.DEMUX_START)
  }

  _m3u8Loaded (mdata) {
    this.m3u8FlushDuration = this._playlist.targetduration || this.m3u8FlushDuration
    if (this._playlist.fragLength > 0) {
      this.retryTimes = this._pluginConfig.retryTimes
    } else {
      if (this.retryTimes > 0) {
        this.retryTimes--
        this._preload()
      } else {
        this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
        if (this._player.video) {
          this._player.video.handleEnded()
        }
      }
    }
  }
  _checkStatus () {
    if (this.retryTimes < 1 && (new Date().getTime() - this._lastCheck < 10000)) {
      return
    }
    this._lastCheck = new Date().getTime()
    if (this._player.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = this._player.currentTime
      if (this._player.readyState <= 2) {
        this._preload()
      }
      let bufferend = this._player.buffered.end(this._player.buffered.length - 1)
      if (currentTime > bufferend - this.preloadTime) {
        this._preload()
      }
    }
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

    if (frag && !frag.downloaded && !frag.downloading) {
      this._logDownSegment(frag)
      this._playlist.downloading(frag.url, true)
      this.emitTo('TS_LOADER', LOADER_EVENTS.LOADER_START, frag.url, {}, retryCount, retryDelay)
    } else {
      this._consumeFragment(true)
      let current = new Date().getTime()
      if ((!frag || frag.downloaded) &&
        (current - this._m3u8lasttime) / 1000 > this.m3u8FlushDuration) {
        this._m3u8lasttime = current
        this.emitTo('M3U8_LOADER', LOADER_EVENTS.LOADER_START, this.url, {}, retryCount, retryDelay)
      }
    }
  }

  _logDownSegment (frag) {
    if (!frag) return
    logger.groupEnd()
    logger.group(this.TAG, `load ${frag.id}: [${frag.time / 1000} , ${(frag.time + frag.duration) / 1000}], downloading: ${frag.downloading} , donwloaded: ${frag.downloaded}`)
  }

  _isHEVC (meta) {
    return meta && meta.codec === 'hev1.1.6.L93.B0'
  }

  load (url) {
    this.url = url
    this._preload()
  }

  resetLoaderIdle () {
    this._m3u8loader.loading = false
    this._tsloader.loading = false
  }

  resetPlayList () {
    this._playlist.clear()
  }

  destroy () {
    clearInterval(this._timmer)
    this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete)
    // this.off(REMUX_EVENTS.REMUX_ERROR);
    this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed)
    this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)
    this._player.off('waiting', this._onWaiting)
    this._player.off('playing', this._onPlaying)
    this.m3u8Text = null
  }
}
export default HlsLiveController
