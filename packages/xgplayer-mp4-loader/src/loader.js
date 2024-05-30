import { NetLoader, concatUint8Array, Logger, EVENT } from 'xgplayer-streaming-shared'
import { MP4Parser } from 'xgplayer-transmuxer'
import { getConfig } from './config'
import { MediaError } from './error'
import { Cache } from './cache'
import { isNumber, moovToMeta, moovToSegments, isSegmentsOk } from './utils'
import EventEmitter from 'eventemitter3'

export class MP4Loader extends EventEmitter {
  vid = ''
  url = ''
  meta = {}
  downloadInfo = []
  videoSegments = []
  audioSegments = []
  cache = null
  _currentSegmentIndex = -1
  _currentLoadingSegmentIndex = -1
  buffer
  _error

  constructor (config) {
    super()
    this._config = getConfig(config)
    const {
      vid,
      cache,
      ...rest
    } = this._config
    this.cache = cache || new Cache()
    this.vid = vid || rest.url
    this.url = rest.url
    rest.transformError = this._transformError
    this.logger = new Logger('MP4Loader_' + this.vid)
    !!config.openLog && Logger.enable()
    rest.logger = this.logger

    this._loader = new NetLoader(rest)
    this._loader.on(EVENT.REAL_TIME_SPEED, (data) => {
      this.emit(EVENT.REAL_TIME_SPEED, data)
    })
  }

  get isMetaLoaded () {
    return this.videoSegments.length || this.audioSegments.length
  }

  setCurrentSegment (segIndex) {
    if (isNumber(segIndex)) {
      this._currentSegmentIndex = segIndex
    }
  }

  isLastSegment (segIndex) {
    if (isNumber(segIndex)) {
      const lastIndex = this.videoSegments[this.videoSegments.length - 1]?.index || this.audioSegments[this.audioSegments.length - 1]?.index || 0
      return segIndex >= lastIndex
    }

    return false
  }

  isSegmentLoading (segIndex) {
    return segIndex === this._currentLoadingSegmentIndex
  }

  async changeUrl (url, vid = url, moovEnd, notCancelLoader) {
    await this.reset(notCancelLoader)
    if (url) this.url = url
    if (vid) this.vid = vid
    if (moovEnd) this._config.moovEnd = moovEnd
  }

  async getOrLoadMeta (cache) {
    if (!this.isMetaLoaded) await this.loadMeta(cache)
    return this.meta
  }

  async loadMetaProcess (cache, [moovStart, moovEnd], onProgress, config = {}) {
    this._error = false
    this.logger.debug('[loadMetaProcess start], range,', [moovStart, moovEnd])
    const OnProgressHandle = async (data, state, options, response) => {
      if (this.meta && options?.range && options.range.length > 0 && options.range[1] >= moovEnd) {
        state = true
        this.logger.debug('[loadMetaProcess],data done,setstate true,[', moovStart, moovEnd, ']')
      }
      if (state && options?.range && options.range.length > 0 && options.range[1] < moovEnd) {
        state = false // 为了修复state为true但数据还么全部返回的问题
        this.logger.debug('[loadMetaProcess],data not done,setstate false,[', moovStart, moovEnd, ']')
      }
      this.logger.debug('[loadMetaProcess],task,[', moovStart, moovEnd, '], range,', options.range, ',dataLen,', (data ? data.byteLength : undefined), ', state,', state, ',err,',this._error)
      !this._error && data && data.byteLength > 0 && onProgress(data, state, options, null, response)
      if (this.meta.moov || this._error) return
      if (data && data.byteLength > 0) {
        try {
          this.buffer = concatUint8Array(this.buffer, data)
        } catch (e) {
          onProgress(null, state, options, new MediaError(e?.message), response)
          return
        }
        let moov = MP4Parser.findBox(this.buffer, ['moov'])[0]
        if (!moov) {
          const mdat = MP4Parser.findBox(this.buffer, ['mdat'])[0]
          if (state) {
            if (!mdat) {
              this._error = true
              onProgress(null, state, options, new MediaError('cannot find moov or mdat box'), response)
              return
              // throw new MediaError('cannot find moov or mdat box')
            } else {
              const moovStart = mdat.start + mdat.size
              const res = await this.loadData([moovStart, ''], cache, config)
              if (res) {
                moov = MP4Parser.findBox(res.data, ['moov'])[0]
              }
            }
          }
        }
        if (moov && state && moov.size > moov.data.length) {
          this.logger.debug('[loadMetaProcess],moov not all, range,', options.range[1], ',dataLen,', this.buffer.byteLength, ', state,', state)
          await this.loadMetaProcess(cache, [options.range[1], moov.start + moov.size - 1], onProgress)
        }
        if (moov && moov.size <= moov.data.length && !this.meta.moov) {
          const parsedMoov = MP4Parser.moov(moov)
          if (!parsedMoov) {
            this._error = true
            onProgress(null, state, options, new MediaError('cannot parse moov box'), response)
            return
            // throw new MediaError('cannot parse moov box', moov.data)
          }

          const segments = moovToSegments(parsedMoov, this._config)
          if (!isSegmentsOk(segments)) {
            this._error = true
            onProgress(null, state, options, new MediaError('cannot parse segments'), response)
            return
            // throw new MediaError('cannot parse segments', moov.data)
          }

          this.meta = moovToMeta(parsedMoov)
          const { videoSegments, audioSegments } = segments
          this.videoSegments = videoSegments
          this.audioSegments = audioSegments
          delete this.buffer
          this.logger.debug('[loadMetaProcess] moov ok')
          onProgress(undefined, state, {
            meta: {
              meta: this.meta,
              videoSegments,
              audioSegments
            }
          }, null, response)
        }
      }
    }
    await this.loadData([moovStart, moovEnd || this._config.moovEnd], cache, { onProgress: OnProgressHandle, ...config})
  }

  async loadMeta (cache, moovEnd, config = {}) {
    const responses = []
    this.logger.debug('[loadMeta start]')
    let res = await this.loadData([0, moovEnd || this._config.moovEnd], cache, config)
    if (!res) return
    responses.push(res)
    let moov = MP4Parser.findBox(res.data, ['moov'])[0]
    if (!moov) {
      const mdat = MP4Parser.findBox(res.data, ['mdat'])[0]
      if (!mdat) {
        throw new MediaError('cannot find moov or mdat box', res.data)
      }
      const moovStart = mdat.start + mdat.size
      res = await this.loadData([moovStart], cache, config)
      if (!res) return
      responses.push(res)
      moov = MP4Parser.findBox(res.data, ['moov'], moovStart)[0]
      if (!moov) {
        throw new MediaError('cannot find moov box', res.data)
      }
    }
    if (moov.size > moov.data.length) {
      res = await this.loadData([res.data.length, moov.start + moov.size - 1], cache, config)
      if (!res) return
      responses.push(res)
      moov.data = concatUint8Array(moov.data, res.data)
    }
    const parsedMoov = MP4Parser.moov(moov)
    if (!parsedMoov) {
      throw new MediaError('cannot parse moov box', moov.data)
    }
    const segments = moovToSegments(parsedMoov, this._config)
    if (!isSegmentsOk(segments)) {
      throw new MediaError('cannot parse segments', moov.data)
    }

    this.meta = moovToMeta(parsedMoov)
    const { videoSegments, audioSegments } = segments
    this.videoSegments = videoSegments
    this.audioSegments = audioSegments
    delete this.buffer
    this.logger.debug('[load moov end!!!!!]')
    return {
      meta: this.meta,
      videoSegments,
      audioSegments,
      responses
    }
  }

  loadCacheMeta (meta, segmentIndex){
    const { moov } = meta
    const segments = moovToSegments(moov, this._config)
    const { videoSegments, audioSegments } = segments
    this.videoSegments = videoSegments
    this.audioSegments = audioSegments
    this._currentSegmentIndex = segmentIndex
    this.meta = meta
  }

  getSegmentByTime (time) {
    let video
    let audio
    if (!this.videoSegments.length) {
      audio = this.audioSegments.find(x => x.startTime <= time && x.endTime > time)
    } else {
      video = this.videoSegments.find(x => x.startTime <= time && x.endTime > time)
      if (video) {
        audio = this.audioSegments[video.index]
      }
    }

    return {
      video,
      audio
    }
  }

  async loadSegmentByTime (time, cache, changeCurrent = true, config = {}) {
    if (!this.isMetaLoaded) {
      await this.loadMeta(cache)
    }
    const { video, audio } = this.getSegmentByTime(time)
    return this._loadSegment(video, audio, cache, changeCurrent, config)
  }

  async loadNextSegment (cache, changeCurrent = true, config = {}) {
    if (!this.isMetaLoaded) {
      await this.loadMeta()
    }
    const video = this.videoSegments[this._currentSegmentIndex + 1]
    const audio = this.audioSegments[this._currentSegmentIndex + 1]
    return this._loadSegment(video, audio, cache, changeCurrent, config)
  }

  async preload (time) {
    if (!this.isMetaLoaded) {
      await this.loadMeta(true)
    }
    if (!time || time < 0) return
    const { video, audio } = this.getSegmentByTime(time)
    const index = Math.max(video?.index || 0, audio?.index || 0)
    if (!index) return

    const videos = this.videoSegments.slice(0, index)
    const audios = this.audioSegments.slice(0, index)

    const load = async (i) => {
      if (i > index) return
      await this._loadSegment(videos[i], audios[i], true, false)
      await load(i + 1)
    }

    await load(0)
  }

  cancel () {
    return this._loader.cancel()
  }

  async reset (notCancelLoader = false) {
    if (!notCancelLoader) {
      this.logger.debug('[MP4loader reset func call loader.cancel]')
      await this._loader.cancel()
    }
    this.vid = this.url = ''
    this.meta = {}
    this.downloadInfo = []
    this.videoSegments = []
    this.audioSegments = []
    this._currentSegmentIndex = -1
    this._currentLoadingSegmentIndex = -1
    delete this.buffer
  }

  async destroy () {
    await this.reset()
    // await this.cancel()
    this.cache.clear()
  }

  async _loadSegment (video, audio, cache, changeCurrent, config) {
    if (!video && !audio) return
    const segIndex = video?.index || audio?.index || 0
    this._currentLoadingSegmentIndex = segIndex
    let res
    try {
      res = await this.loadData([
        Math.min(video?.range[0] || Infinity, audio?.range[0] || Infinity),
        Math.max(video?.range[1] || 0, audio?.range[1] || 0)
      ], cache, config)
    } finally {
      this._currentLoadingSegmentIndex = -1
    }
    if (!res) return

    if (changeCurrent) {
      this._currentSegmentIndex = segIndex
    }

    res.video = video
    res.audio = audio

    return res
  }

  async loadData (range, cache, config = {}) {
    const cacheKey = this._getCacheKey(range)
    const data = await this.cache.get(cacheKey)
    let res
    if (!data) {
      const url = config?.url ? config.url : this.url
      res = await this._loader.load(url, { range, vid: this.vid, ...config })
    } else {
      res = { data, state: true, options: { fromCache: true, range, vid: this.vid } }
    }
    if (!res) return
    if (!data) {
      res.data && this.downloadInfo.push({
        startTime: res.startTime,
        endTime: res.endTime,
        size: res.data.byteLength,
        range
      })
      if (this.downloadInfo && this.downloadInfo.length > this._config.maxDownloadInfoSize) {
        this.downloadInfo = this.downloadInfo.slice(-this._config.maxDownloadInfoSize)
      }
    }

    if (!data && cache) {
      // this.cache.set(cacheKey, res.data)
    }

    // res.range = range
    return res
  }

  _transformError = (error) => {
    // error.type = 'network'
    return error
  }

  _getCacheKey (range) {
    return (this.vid || this.url) + ':' + range
  }
}
