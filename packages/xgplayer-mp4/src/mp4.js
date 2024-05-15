import EventEmitter from 'eventemitter3'
import Concat from 'concat-typed-array'
import { MP4Demuxer, FMP4Remuxer } from 'xgplayer-transmuxer'
import { ERROR_CODES, NetWorkError, ParserError, ERROR_TYPES } from './error'
import util, { getFileSizeFromHeaders } from './util'
import MP4Loader from 'xgplayer-mp4-loader'
import { checkOpenLog, log } from './util/logger'

const MP4_EVENTS = {
  ERROR: 'error',
  META_READY: 'metaReady',
  MOOV_REQ_PROGRESS: 'moov_request_Progress',
  UPDATE_LOAD_IDX: 'update_load_fragmentIdx'
}

class MP4 extends EventEmitter {

  static getDefaultConfig () {
    return {
      segmentDuration: 5,
      onProcessMinLen: 1024, // 当fetch用onprocess渐进式回调数据时，当收到的数据量最少到配置值时才回调
      chunkSize: 800000, // [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
      retryCount: 3,
      retryDelay: 1000,
      timeout: 3000,
      enableWorker: false,
      playerId: '',
      vid: '',
      ext: {}
    }
  }
  /**
   * [constructor 构造函数]
   * @param { string } url                      [视频地址]
   * @param { Object } options
   * @param { Number } [chunk_size=Math.pow(25, 4)]           [请求的数据块大小，对于长视频设置的较大些可以避免二次请求]
   * @param { any } preloader [预加载器]
   * @param { any } preloadTimeCache  [预加载信息]
   */

  constructor (url, options) {
    super()
    this.url = url
    this.options = MP4.getDefaultConfig()
    // eslint-disable-next-line array-callback-return
    Object.keys(options).map(key => {
      options[key] !== undefined && options[key] !== null && (this.options[key] = options[key])
    })
    this.timeRange = []
    this.CHUNK_SIZE = this.options.chunkSize
    this.bufferLoaded = new Uint8Array(0)
    this.bufferLoadedPos = 0
    this.meta = null
    this.videoTrak = null
    this.audioTrak = null
    this.canDownload = true
    this._loadSuccessCallBack = null
    this._isPending = false // 当前流程是否进入错误处理挂起状态
    this._metaLoading = false // meta请求是否进行中
    this.MP4Loader = new MP4Loader({
      segmentDuration: this.options.segmentDuration,
      url,
      vid: options.vid,
      retry: this.options.retryCount,
      retryDelay: this.options.retryDelay,
      timeout: this.options.timeout,
      ...options.reqOptions,
      openLog: checkOpenLog(),
    })
    this.MP4Demuxer = null
    this.FMP4Remuxer = null
    this._needInitSegment = true
    this._switchBitRate = false
    this.enableWorker = this.options.enableWorker
    if (!this.enableWorker) {
      this.MP4Demuxer = null
      this.FMP4Remuxer = null
    }
    this.seekTime = -1
    this.changeBitRateTime = -1
  }


  async changeBitRate (bitRateInfo) {
    this.url = bitRateInfo.url
    await this.MP4Loader.changeUrl(this.url, this.options.vid + Date.now(), this.CHUNK_SIZE)
    this._switchBitRate = true
    this.log('[switchBitrate] changeUrl, bitRate,',this.url)
  }

  log (message, ...optionalParams) {
    const { options } = this
    const newMessage = (options && options.vid) ? `[MP4] ${options.vid} ${message}` : `[MP4] ${message}`
    log(newMessage, ...optionalParams)
  }

  /**
   * 错误处理
   * @param { Error } error
   * @param { string } state
   */
  async errorHandler (error, state, _context = {}) {
    const { response, message } = error
    const vid = this.options ? this.options.vid : ''
    let _error = null
    this._isPending = true
    if (response) {
      _error = new NetWorkError('network', response.status, {
        httpText: response.httpText,
        message,
        url: response.url,
      })
      this.emit(MP4_EVENTS.ERROR, _error)
    } else {
      // 其他错误信息
      console.error(`[MP4] [${vid}] errorHandler,`, error)
      _error = error
      this.emit(MP4_EVENTS.ERROR, _error)
    }
  }


  async init () {
    if (this.url) {
      await this.MP4Loader.changeUrl(this.url, this.options.vid + Date.now(), this.CHUNK_SIZE)
    }
    await this.getMetaInfo()
  }

  getTimeRange () {
    const range = []
    let timeRange = null
    for (let i = 0; this.videoTrak && i < this.videoTrak.length; i++) {
      timeRange = {
        startTime: this.videoTrak[i].startTime,
        endTime: this.videoTrak[i].endTime,
        downloaded : false,
        isLoading : false
      }
      range.push(timeRange)
    }
    if (this.audioTrak && this.audioTrak.length > range.length) {
      for (let j = range.length; j < this.audioTrak.length; j++) {
        timeRange = {
          startTime: Math.max(this.audioTrak[j].startTime, timeRange ? timeRange.endTime : 0),
          endTime: Math.max(this.audioTrak[j].endTime, timeRange ? timeRange.endTime : 0),
          downloaded : false,
          isLoading : false,
        }
        range.push(timeRange)
      }
    }
    return range
  }

  async getMetaInfo (isEmitMetaEvent = true) {
    try {
      this._metaLoading = true
      this.log('getMetaInfo start')
      this.bufferLoaded = new Uint8Array(0)
      let startPos = 0
      const onProgressHandle = async (data, state, options, error, response) => {
        const fileSize = response ? Number(getFileSizeFromHeaders(response.headers, 'content-range')) : 0
        const contentLength = response ? Number(getFileSizeFromHeaders(response.headers, 'Content-Length')) : 0
        this.log('getMetaInfo onProgressHandle, dataLen,', data ? data.byteLength : -1, ', state,', state, ',range,', JSON.stringify(options.range))
        console.log('getMetaInfo onProgressHandle, dataLen,', state,',state', 'range', JSON.stringify(options.range), contentLength, fileSize)
        if (error) {
          this.emit(MP4_EVENTS.ERROR, error)
          return
        }
        if (data) {
          if (options.range[0] === startPos) {
            this.bufferLoaded = Concat(Uint8Array, this.bufferLoaded, new Uint8Array(data))
            startPos += data.byteLength
          }
        }
        if (options.meta && !this.meta) {
          const metaInfo = options.meta
          this.videoTrak = metaInfo.videoSegments
          this.audioTrak = metaInfo.audioSegments
          this.timeRange = this.getTimeRange()
          this.meta = {...metaInfo.meta, ext:{videoTrak: this.videoTrak, audioTrak: this.audioTrak}}
          metaInfo.bufferLoaded = this.bufferLoaded
          this.log('meta reach')
          if (isEmitMetaEvent) {
            this.emit(MP4_EVENTS.META_READY, this.meta)
          }
        }
        if (this.meta && state) {
          this.log('[getMetaInfo req end]')
          this._metaLoading = false
        }

        if (this.meta && (data || state)) {
          this.log('emit moov_req_progress')
          this.emit(MP4_EVENTS.MOOV_REQ_PROGRESS)
        }
        const range = options?.range || []
        if (fileSize > 0 && !this.meta && range && range.length > 1 && range[1] >= fileSize) {
          this.log('getMetaInfo_error_nometa')
          this.emit(MP4_EVENTS.ERROR, { message: 'getMetaInfo_error_nometa' })
        }
        if (contentLength > 0 && !this.meta && range && range.length > 1 && range[1] === contentLength) {
          this.log('getMetaInfo_error_nometa')
          this.emit(MP4_EVENTS.ERROR, { message: 'getMetaInfo_error_nometa' })
        }
      }
      await this.MP4Loader.loadMetaProcess(this.MP4Loader.cache, [0, this.CHUNK_SIZE], onProgressHandle)
    } catch (error) {
      console.error('[MP4] trigger errorHandler getMetaInfo',error?.message)
      this.loadError(error, 'getMetaInfo')
    }
  }

  getFragmentIdx (time) {
    let video
    let audio
    if (!this.videoTrak.length) {
      audio = this.audioTrak.find(x => x.startTime <= time && x.endTime > time)
      return audio ? audio.index : 0
    } else {
      video = this.videoTrak.find(x => x.startTime <= time && x.endTime > time)
      audio = this.audioTrak.find(x => x.startTime <= time && x.endTime > time)
      if (video && audio) {
        return Math.min(video.index, audio.index)
      } else if (video || audio){
        return video ? video.index : audio.index
      } else {
        let last = Number.MAX_VALUE
        if (this.videoTrak && this.videoTrak.length > 0) {
          last = this.videoTrak.length - 1
        }
        if (this.audioTrak && this.audioTrak.length > 0) {
          last = Math.min(this.audioTrak.length - 1, last)
        }
        return last
      }
    }
  }

  async _checkHasMeta () {
    this.log(' loadMeta start')
    this._metaLoading = true
    try {
      const metaInfo = await this.MP4Loader.loadMeta(this.MP4Loader.cache, Math.round(this.CHUNK_SIZE / 2))
      this._metaLoading = false
      this.videoTrak = metaInfo.videoSegments
      this.audioTrak = metaInfo.audioSegments
      this.meta = {...metaInfo.meta, ext:{videoTrak: this.videoTrak, audioTrak: this.audioTrak}}
      this.timeRange = this.getTimeRange()
      this.bufferLoaded = new Uint8Array(0)
      metaInfo.bufferLoaded = this.bufferLoaded
      return true
    } catch (e) {
      console.error(e)
      this._metaLoading = false
      this.emit(MP4_EVENTS.ERROR, e)
      console.error(e)
      return false
    }
  }

  resetFragmentLoadState (fragIndex){
    for (let i = 0; i < this.timeRange.length; i++) {
      if (i < fragIndex) {
        this.timeRange[i].downloaded = true
        this.timeRange[i].isLoading = true
      } else {
        this.timeRange[i].downloaded = false
        this.timeRange[i].isLoading = false
      }
    }
  }

  getFragRange (fragIndex) {
    let videoSeg = null
    if (this.videoTrak) {
      videoSeg = fragIndex < this.videoTrak.length ? this.videoTrak[fragIndex] : this.videoTrak[this.videoTrak.length - 1]
    }
    let audioSeg = null
    if ( this.audioTrak) {
      audioSeg = fragIndex < this.audioTrak.length ? this.audioTrak[fragIndex] : this.audioTrak[this.audioTrak.length - 1]
    }
    let videodiff = 0, audiodiff = 0
    if (this.videoTrak && fragIndex >= this.videoTrak.length - 1) {
      videodiff = -1
    }
    if (this.audioTrak && fragIndex >= this.audioTrak.length - 1) {
      audiodiff = -1
    }
    const range = [
      Math.min(videoSeg?.range[0] || Infinity, audioSeg?.range[0] || Infinity),
      Math.max((videoSeg ?.range[1]) + videodiff || 0, (audioSeg?.range[1]) + audiodiff || 0)
    ]
    if (fragIndex < this.timeRange.length) {
      this.timeRange[fragIndex].range = range
    }
    return range
  }

  async load (fragIndex, successCallback) {
    this._loadSuccessCallBack = successCallback
    if (this._switchBitRate && !this._metaLoading) {
      this.log('[switchBitrate], switch bitRate start load, time,', fragIndex >= this.videoTrak.length ? this.audioTrak[fragIndex].startTime : this.videoTrak[fragIndex].startTime, ', fragIndex,',fragIndex)
      const metaReady = await this._checkHasMeta()
      if (this.changeBitRateTime > 0) {
        if (this.timeRange[fragIndex].startTime <= this.changeBitRateTime && this.changeBitRateTime < this.timeRange[fragIndex].endTime) {
          this.log('[switchBitrate], not need update load fragIndex', fragIndex,',stTime,',this.changeBitRateTime)
        } else {
          // 需要根据新码率的关键帧列表去找切换后码率的开始下载的fragIndex，修复不同码率关键帧不对齐导致卡播
          fragIndex = this.getFragmentIdx(this.changeBitRateTime)
          this.log('[switchBitrate], need update load fragIndex', fragIndex,',stTime,',this.changeBitRateTime, ',newBitrateTimeRange,',this.timeRange[fragIndex].startTime,'-',this.timeRange[fragIndex].endTime)
          this.emit(MP4_EVENTS.UPDATE_LOAD_IDX, fragIndex)
        }
        this.seekTime = this.changeBitRateTime
        this.changeBitRateTime = -1
      }
      this.resetFragmentLoadState(fragIndex)
      this.log('[switchBitrate], reset timerange state,', fragIndex)
      this._needInitSegment = true
      this.resetTansmuxer()
      if (metaReady) {
        this._switchBitRate = false
      }
    }

    if (this._switchBitRate && this._metaLoading) {
      return
    }

    const range = this.getFragRange(fragIndex)
    this.log('loadFragment,',fragIndex, ',range,',JSON.stringify(range))
    if (this.seekTime > 0) {
      const subRange = this.getSubRange(fragIndex, this.seekTime, range)
      this.loadFragment(fragIndex, subRange)
      this.seekTime = -1
    } else {
      this.loadFragment(fragIndex, range)
    }
  }

  /**
   * 查找离time最近的左边的关键帧的开始的range
   * @param { fragIndex }
   * @param { time }
   * @param { range }
   * @return {
   *  range: array<number>,

   * }
   */

  getSubRange (fragIndex, time, range) {
    let videoStartRange = range[0]
    let audioStartRange = range[0]
    let i = 1
    let find = false
    this.log('>>>>>getSubRange time,',time, JSON.stringify(range))
    if (this.videoTrak) {
      const videoSeg = fragIndex < this.videoTrak.length ? this.videoTrak[fragIndex] : this.videoTrak[this.videoTrak.length - 1]
      const keyFrameList = videoSeg.frames.filter(getKeyFrameList)
      const videoTimescale = this.meta.videoTimescale
      let startTime = keyFrameList[0].startTime / videoTimescale
      this.log('>>>>>getSubRange video, startTime,',videoSeg.startTime,',endTime,',videoSeg.endTime)
      for (let j = 0; j < keyFrameList.length; j++) {
        this.log('>>>>>getSubRange video keyFrameList, startTime,',keyFrameList[j].startTime / videoTimescale,',range,',keyFrameList[j].offset)
      }
      for (; i < keyFrameList.length; i++) {
        const endTime = keyFrameList[i].startTime / videoTimescale
        if ( startTime <= time && time < endTime && range[0] < keyFrameList[i - 1].offset) {
          videoStartRange = keyFrameList[i - 1].offset
          find = true
          this.log('>>>>>getSubRange video end, startTime,',startTime, ',endTime,',endTime, ',startRange,',videoStartRange, ', keyFrameIndex,',i - 1)
          break
        }
        startTime = endTime
      }
      if (!find && startTime <= time && time < videoSeg.endTime + 0.8) {
        videoStartRange = keyFrameList[i - 1].offset
        this.log('>>>>>getSubRange video last, startTime,',startTime, ',endTime,',videoSeg.endTime, ',startRange,',videoStartRange)
      }
    }
    i = 1
    if (this.audioTrak) {
      const audioSeg = fragIndex < this.audioTrak.length ? this.audioTrak[fragIndex] : this.audioTrak[this.audioTrak.length - 1]
      const frameList = audioSeg.frames
      const audioTimescale = this.meta.audioTimescale
      i = Math.floor((time * audioTimescale - frameList[0].startTime) / audioSeg.frames[0].duration)
      i = Math.min(frameList.length - 1, i)
      let starttime = i > 0 ? frameList[i - 1].startTime / audioTimescale : frameList[0].startTime / audioTimescale
      for ( ; i >= 0 && i < frameList.length; ) {
        if (i > 0 && starttime > time) {
          i -= 1
          starttime = frameList[i].startTime / audioTimescale
          continue
        }
        const endtime = (frameList[i].startTime + frameList[i].duration) / audioTimescale
        if (starttime <= time && time < endtime && range[0] < frameList[i].offset) {
          audioStartRange = frameList[i].offset
          find = true
          this.log('>>>>>getSubRange audio end, startTime,', starttime, ',endTime,', endtime, ',startRange,', audioStartRange, ', index,', i)
          break
        }
        starttime = endtime
        i++
      }
    }
    const finalRange = [Math.min(audioStartRange, videoStartRange), range[1]]
    this.log('>>>>>getSubRange finalRange ', JSON.stringify(finalRange), ',oldRange,',JSON.stringify(range))
    return finalRange
  }


  onprogressDataArrive = async (data, state, options) => {
    if (data && data.byteLength > 0) {
      const curSegRange = this.timeRange[options.index].range
      if (curSegRange && options.range[1] >= curSegRange[1] && !state) {
        state = true
      }
      this.log('[mp4.loadFragment onprogressDataArrive ] receive data, >>> index,', options.index, ',range,', JSON.stringify(options.range), ', dataLen,', data.byteLength)
      this._mux(data, options.range[0], options.index, state)
    }
    if (state) {
      this.timeRange[options.index].downloaded = true
      this.bufferLoadedPos = -1
      this.log('[FragLoadDowned],fragmentIdx,',options.index,',rangeEnd,',options.range[1])
    }
  }

  _mux (buffer, start, fragIndex, state) {
    const videoIndexRange = this.getSamplesRange(fragIndex, 'video')
    const audioIndexRange = this.getSamplesRange(fragIndex, 'audio')
    const range = [start, start + buffer.byteLength]
    try {
      if (!this.MP4Demuxer) {
        this.MP4Demuxer = new MP4Demuxer(this.videoTrak, this.audioTrak, null,{openLog: checkOpenLog()})
      }
      const demuxRet = this.MP4Demuxer.demuxPart(buffer, start, videoIndexRange, audioIndexRange, this.meta.moov, this.useEME, this.kidValue)
      if (!this.FMP4Remuxer && (!this.checkCodecH265() || this.options.supportHevc)) {
        this.FMP4Remuxer = new FMP4Remuxer(this.MP4Demuxer.videoTrack, this.MP4Demuxer.audioTrack, {openLog: checkOpenLog()})
      }
      let res
      this.log('[mux], videoTimeRange,',demuxRet.videoTrack ? [demuxRet.videoTrack.startPts, demuxRet.videoTrack.endPts] : null, ',audioTimeRange,',demuxRet.audioTrack ? [demuxRet.audioTrack.startPts, demuxRet.audioTrack.endPts] : null)
      const startPts = Math.min(demuxRet.videoTrack.startPts, demuxRet.audioTrack.startPts)
      const endPts = Math.max(demuxRet.videoTrack.endPts, demuxRet.audioTrack.endPts)
      const timeRange = [startPts, endPts]
      if (this.FMP4Remuxer) {
        const remuxRes = this.FMP4Remuxer.remux(this._needInitSegment, {initMerge: true, range: range})
        remuxRes.initSegment && (this._needInitSegment = false)
        const data = util.concatData(remuxRes.audioSegment,remuxRes.videoSegment)
        res = {
          buffer: data,
          range,
          state,
          context: {
            range, fragIndex, timeRange
          },
          initSeg: remuxRes.initSegment
        }
      } else {
        res = {
          videoTrack: demuxRet.videoTrack,
          audioTrack: demuxRet.audioTrack,
          buffer: null,
          range,
          state,
          context: {
            range, fragIndex, timeRange
          }
        }
      }
      this._loadSuccessCallBack && this._loadSuccessCallBack(res)
    } catch (e) {
      console.error('mux err:', e)
      const err = new ParserError(ERROR_TYPES.remux, ERROR_CODES.muxError, {msg:JSON.stringify(e)})
      this.errorHandler(err, 'mux', {fragIndex, range: [start, start + buffer.byteLength]})
    }
  }

  getSamplesRange (fragmentIdx, type) {
    const range = []
    switch (type) {
      case 'video':
        if (this.videoTrak && fragmentIdx < this.videoTrak.length ) {
          const frames = this.videoTrak[fragmentIdx].frames
          range.push(frames[0].index)
          range.push(frames[frames.length - 1].index)
        }
        break
      case 'audio':
        if (this.audioTrak && fragmentIdx < this.audioTrak.length ) {
          const frames = this.audioTrak[fragmentIdx].frames
          range.push(frames[0].index)
          range.push(frames[frames.length - 1].index)
        }
        break
      default:
        console.warn('[getSamplesRange] type ', type, ' is invalid')
        break
    }
    return range
  }

  async loadFragment (fragIndex, range) {
    if (this._isPending || (range.length > 0 && range[0] === 0 && range[1] === 0) || this.timeRange[fragIndex].isLoading /* || this._metaLoading*/) return
    this.log('[MP4.loadFragment] ,fragIndex,', fragIndex, ',range ', range, ',len ,', range[1] - range[0],', bufferLoaded_Len,', this.bufferLoaded.byteLength)
    if (range.length >= 2 && range[1] && range[1] > 0 && range[1] <= this.bufferLoaded.byteLength) {
      this.timeRange[fragIndex].isLoading = true
      const start = Math.max(range[0], this.bufferLoadedPos)
      const buffer = new Uint8Array(this.bufferLoaded.slice(start, range[1]))
      this.log('[mp4.loadFragment] has all data: ', start, range[1])
      this.timeRange[fragIndex].downloaded = true
      this.bufferLoadedPos = -1
      this._mux(buffer, start, fragIndex, true)
    } else {
      // // 对range进行缩减，已经有的数据不在重复下载
      if (range.length >= 2 && range[0] && range[0] <= this.bufferLoaded.byteLength) {
        if (!this.timeRange[fragIndex].isLoading) {
          const start = Math.max(range[0], this.bufferLoadedPos)
          const buffer = new Uint8Array(this.bufferLoaded.slice(start, range[1]))
          if (buffer.byteLength > 0) {
            this.bufferLoadedPos = start + buffer.byteLength
            this.log('[mp4.loadFragment] has part data: ', start, start + buffer.byteLength)
            this._mux(buffer, start, fragIndex, range[1] <= this.bufferLoadedPos)
            return
          }
          if (!this._metaLoading && !this.timeRange[fragIndex].isLoading) {
            this.log('[mp4.loadFragment] ready to load part data >>> ', this.bufferLoaded.byteLength, range[1])
            this.timeRange[fragIndex].isLoading = true
            await this.startLoad([this.bufferLoaded.byteLength, range[1]],fragIndex)
          }
        }
      } else {
        if ((!this._metaLoading || range[0] >= this.CHUNK_SIZE ) && !this.timeRange[fragIndex].isLoading) {
          this.timeRange[fragIndex].isLoading = true
          this.log('[mp4.loadFragment],ready to load all data ,segmentIdx, ', fragIndex, ',range >>> ', JSON.stringify(range))
          await this.startLoad(range,fragIndex)
        }
      }
    }
  }

  async startLoad (range, fragIndex){
    try {
      await this.MP4Loader.loadData(range, this.MP4Loader.cache, {
        index: fragIndex,
        onProgress: this.onprogressDataArrive,
        onProcessMinLen: this.options.onProcessMinLen,
        url: this.url
      })
    } catch (e) {
      console.error('[MP4] trigger errorHandler startLoad', range, fragIndex, e?.message)
      this.timeRange[fragIndex].isLoading = false
      this.loadError(e, 'startLoad', {range, fragIndex})
    }
  }

  loadError (e, loadState, context) {
    !e.response && (e.response = {})
    if (e.isTimeout) {
      e.response.status = 'timeout'
    } else if (!e?.response?.status) {
      e.response.status = 'networkError'
    }
    this.errorHandler(e, loadState, context)
  }

  async cancelLoading () {
    await this.MP4Loader && this.MP4Loader.cancel()
  }

  async update (url) {
    this.url = url
    this.MP4Loader && this.MP4Loader.changeUrl(url)
    if (this.MP4Loader) {
      this.MP4Loader.changeUrl(url)
    }
    //  await this.MP4Loader.changeUrl(this.url, this.options.vid + Date.now(), this.CHUNK_SIZE)
  }

  restart () {
    this._isPending = false
    if (!this.meta) {
      this.init()
    }
  }


  checkCodecH265 () {
    const isHvc = this.meta && (this.meta.videoCodec.indexOf('hvc1') > -1 ||
      this.meta.videoCodec.indexOf('hev1') > -1
    )
    return isHvc
  }

  destroy () {
    if (this.hasDestroyed) {
      return
    }
    this.resetTansmuxer()
    this._isPending = false
    this._metaLoading = false
    this.bufferLoadedPos = 0
    this.bufferLoaded = new Uint8Array(0)
    if (this.MP4Loader) {
      this.MP4Loader.cancel()
      this.MP4Loader.destroy()
    }
    this.hasDestroyed = true
  }

  resetTansmuxer () {
    this.MP4Demuxer && this.MP4Demuxer.reset()
    this.MP4Demuxer = null
    this.FMP4Remuxer && this.FMP4Remuxer.reset()
    this.FMP4Remuxer = null
  }
}

export {
  MP4 as default,
  MP4_EVENTS
}

function getKeyFrameList (frame){
  if (frame.keyframe) return frame
}
