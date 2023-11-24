/* eslint-disable array-callback-return */
// import 'core-js/modules/es7.string.pad-start';
import { BasePlugin, Events, Sniffer, Errors, Util } from 'xgplayer'
import MP4, { MP4_EVENTS } from './mp4'
import { ERROR_TYPES, ERROR_CODES } from './error'
import { MSE } from 'xgplayer-streaming-shared'
import util from './util'
import Timer from './util/timer'
import ProxyPromise from './util/proxy-promise'
import { log } from './util/logger'

const DESTROYED = 'DESTROYED'

let _playerPlayNext = null

let _playerStartInit = null

let _playerChangeDefinition = null

let _playerSwitchUrl = null

export default class Mp4Plugin extends BasePlugin {
  static get pluginName () {
    return 'mp4Plugin'
  }

  static get defaultConfig () {
    return {
      maxBufferLength: 40,
      minBufferLength: 5,
      disableBufferBreakCheck: false,
      waitingTimeOut: 15000,
      waitingInBufferTimeOut: 5000,
      waitJampBufferMaxCnt:3,
      tickInSeconds: 0.1,
      reqOptions: null,
      closeDowngrade: false
    }
  }

  static get version () {
    return __VERSION__
  }

  constructor (options) {
    super(options)
    this.mp4 = null
    this.mse = null
    this._waitAdjustTimeCnt = 0
    this._lastCheckTime = util.nowTime()
    this._removeBuffeEndTime = 0
    this._pendingPromises = []
  }

  afterCreate () {
    window.__mp4player = this
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            try {
              return this.mse ? this.mse.url : this.config.url
            } catch (error) {
              return null
            }
          }
        }
      })
    } catch (e) {
      // NOOP
    }

    this._proxyPlayer()
  }

  attachEvents () {
    this.off(Events.SEEKING, this._onSeeking)
    this.on(Events.SEEKING, this._onSeeking)
    this.on(Events.WAITING, this._onWaiting)
    this.off(Events.URL_CHANGE, this.switchURL)
    this.on(Events.URL_CHANGE, this.switchURL)
  }

  detachEvents () {
    this.off(Events.SEEKING, this._onSeeking)
    this.off(Events.WAITING, this._onWaiting)
    this.off(Events.URL_CHANGE, this.switchURL)
  }

  /**
   * 代理播放器的相关API
   * platNext、_startInit
   */
  _proxyPlayer () {
    if (typeof this.player.playNext === 'function') {
      _playerPlayNext = this.player.playNext
    }
    this.player.playNext = (...args) => {
      this.playNext(...args)
    }

    _playerStartInit = this.player._startInit
    _playerSwitchUrl = this.player.switchURL
    _playerChangeDefinition = this.player.changeDefinition

    this.player._startInit = this._playerStartInit.bind(this)
    this.player.switchURL = this.switchURL.bind(this)
    this.player.changeDefinition = this.changeDefinition.bind(this)

    this.player.removeHooks('replay', this._replayHook)

    this.player.removeHooks('retry', this._retryHook)
  }

  _playerStartInit (url) {
    const { config, playerConfig } = this
    if (config.supportHevc === undefined) {
      if (Sniffer?.isHevcSupported && Sniffer.isHevcSupported()) {
        config.supportHevc = true
      }
    }
    const ret = this.initMp4()
    this._initPromise = ret
    this._addPendingPromise(this._initPromise)
    if (this.mse && Util.typeOf(url) === 'String' && /^blob/.test(url) && url !== this.mse.url) {
      url = playerConfig.url
    }
    ret.then(() => {
      if (this.mse) {
        url = this.mse.url
      }
      this.attachEvents()
      this._startProgress()
    }).catch((e) => {
      const isBreak = this._initPromise ? this._initPromise.isBreak : false
      if (this.isDestroy || isBreak) {
        return
      }

      let err = e
      if (!err.errorCode) {
        err = new Errors(this.player, {
          errorType: ERROR_TYPES.RUNTIME, // 'runtime',
          // errorTypeCode: e?.errorTypeCode || ERROR_TYPES.runtime,
          errorCode: e?.errorCode || ERROR_CODES.other,
          vid: this.playerConfig.vid,
          errorMessage: e?.errorMessage || e?.message,
          mediaError: {
            code: e?.httpCode || ERROR_CODES.other,
            message: e?.errorMessage || e?.message,
            errorType:e?.errorType
          }
        })
        err.url = url
      }
      this.useVideoLoad = true
      this.player.vtype = 'MP4_1'
      this.player.emit('playCatch', this.player.vtype, err)
    }).finally(() => {
      if (!this._initPromise) {
        return
      }
      const { isBreak } = this._initPromise
      if (isBreak) {
        return
      }
      this._initPromise && this._removePendingPromise(this._initPromise)
      this._initPromise = null
      !this.isDestroy && !isBreak && _playerStartInit.call(this.player, url)
    })
  }

  initMp4 () {
    const { player } = this
    if (!player.config.vid) {
      player.config.vid = Date.now()
    }
    const _promise = new ProxyPromise()
    if (this.mp4) {
      this.mp4.off(MP4_EVENTS.META_READY, this._onMp4MetaReady)
      this.mp4.off(MP4_EVENTS.ERROR, this._onMp4Error)
      this.mp4.off(MP4_EVENTS.MOOV_REQ_PROGRESS, this._onMp4DataCallBack)
      this.mp4.destroy()
      this.mp4 = null
    }
    this.mp4 = new MP4(player.config.url, {...this.config, vid: player.config.vid})
    this.mp4.on(MP4_EVENTS.META_READY, this._onMp4MetaReady)
    this.mp4.on(MP4_EVENTS.ERROR, this._onMp4Error)
    this.mp4.on(MP4_EVENTS.MOOV_REQ_PROGRESS, this._onMp4DataCallBack)
    this.mp4.on(MP4_EVENTS.UPDATE_LOAD_IDX, (fragment) => {
      this._curLoadSegmentIdx = fragment
      this.log('[update curLoadSegmentIdx]',fragment)
    })
    this.mp4.init()
    return _promise
  }

  _onMp4DataCallBack = () => {
    if (this._isMseInit) {
      this._onTimeUpdate()
    }
  }

  _onMp4MetaReady = (meta) => {
    const { config } = this
    const isH265 = this.mp4.checkCodecH265()
    try {
      if (isH265 && !this.config.supportHevc) {
        const message = 'browser not support HEVC'
        const _err = new Errors(this.player, {
          errorType: 'runtime',
          errorTypeCode: ERROR_TYPES.runtime,
          errorCode: ERROR_CODES.h265Error,
          errorMessage: message,
          vid: config.vid,
          mediaError: { code: ERROR_CODES.h265Error, message: message}
        })
        this._errorHandler(_err)
      } else {
        this._initMse(meta)
        this._initPromise.resolve()
      }
    } catch (e) {
      const _err = new Errors(this.player, {
        errorType: 'runtime',
        errorTypeCode: ERROR_TYPES.runtime,
        errorCode: ERROR_CODES.mse,
        errorMessage: e?.message,
        vid: config.vid,
        mediaError: { code: ERROR_CODES.other1, message: e?.message}
      })
      this._errorHandler(_err)
      return
    }
    this._loadData()
  }

  setConfig (newConfig) {
    this.config = Object.assign(this.config, newConfig)
  }

  /**
   * 播放下一个
   * @param { any } newConfig 播放器
   */
  playNext (newConfig) {
    const { player } = this
    this._defInited = false

    player.resetState()
    player._currentTime = 0
    player._duration = 0
    player.isPlaying = false
    this._MSEError = false
    player.pause()
    this._reset()
    player.setConfig(newConfig)
    this.log('[Index] playNext', newConfig)
    player.play()
    // 下发播放下一个视频事件
    this.emit('playnext')
  }

  checkDegrade (error) {
    console.log('>>>checkDegrade', error)
    const { closeDowngrade } = this.config
    return !closeDowngrade || error.httpCode === 'networkError'
  }


  _onMp4Error = (err) => {
    const { vid } = this.playerConfig
    console.error('[Index] _onMp4Error', vid, err)
    this._errorHandler(err)
  }

  _errorHandler (err) {
    console.trace('>>>_errorHandler', err)
    const {player, config} = this
    if (!player || this.useVideoLoad) {
      return
    }
    if (!err.url && this.mp4?.url) {
      err.url = this.mp4.url
    }
    const preState = player.paused
    console.error('final error !!!!, ', config.vid, err)
    this.player.vtype = 'MP4_2'
    this.player.emit('playCatch', this.player.vtype, err)
    const isDegrade = this.checkDegrade(err)
    if (isDegrade) {
      if (this._initPromise) {
        this._removeAndRejectInitPromise(err)
      } else {
        this._startDegradedPlayback(err, preState)
      }
    } else {
      this.player.pause()
      this._reset()
      const { currentTime } = player
      this.destroyMSE()
      player.currentTime = currentTime
      this.emit('error', err)
    }
  }

  /**
   * @@description 降级到video播放
   */
  _startDegradedPlayback (err, preState) {
    console.log('>>>_startDegradedPlayback')
    const { player, playerConfig } = this
    this.useVideoLoad = true
    this.destroyMSE()
    this._currentTime = player.currentTime
    this.__onmetadataHandle = () => {
      if (this._currentTime) {
        player.currentTime = this._currentTime
      }
      if (preState) {
        this.player.pause()
      } else {
        this.player.play()
      }
      player.media.removeEventListener('loadedmetadata', this.__onmetadataHandle)
      this.__onmetadataHandle = null
    }
    player.media.addEventListener('loadedmetadata', this.__onmetadataHandle)
    const _url = playerConfig.url
    player.media.src = _url
  }

  _addPendingPromise (p) {
    this._pendingPromises.push(p)
  }

  _removePendingPromise (p) {
    // this.log(LogCacheLevel.LOG,'removePendingPromise', p?.id)
    const idx = this._pendingPromises.indexOf(p)
    if (idx > -1) {
      this._pendingPromises.splice(idx, 1)
    }
  }

  _cancelPendingPromises () {
    if (this._pendingPromises.length > 0) {
      this._pendingPromises.forEach(promise => {
        promise.reject(DESTROYED)
      })
    }
    this._pendingPromises = []
  }

  _removeAndRejectInitPromise (error) {
    if (this._initPromise) {
      this._removePendingPromise(this._initPromise)
      this._initPromise.reject(error)
    }
  }

  /**
   * 初始化MSE信息
   * @param {*} mp4
   * @param {*} meta
   * @param {*} promise
   * @param {*} preloadTimeCache
   */
  async _initMse (meta) {
    if (this.mse) {
      await this.mse.unbindMedia()
      this.mse = null
    }
    const isHvc = this.mp4 && this.mp4.checkCodecH265()
    const hasVideo = !!meta.videoCodec
    const hasAudio = !!meta.audioCodec

    let codec
    if (hasVideo && hasAudio) {
      codec = isHvc ? 'video/mp4; codecs="hev1.1.6.L93.B0, mp4a.40.5"' : 'video/mp4; codecs="avc1.64001E, mp4a.40.5"'
    } else if (hasVideo) {
      codec = isHvc ? 'video/mp4; codecs="hev1.1.6.L93.B0"' : 'video/mp4; codecs="avc1.64001E"'
    } else {
      codec = 'video/mp4; codecs="mp4a.40.5"'
    }

    const contentTypes = { [MSE.VIDEO]: { mimeType: 'video/mp4', codec } }
    this.mse = new MSE()
    const openPromise = this.mse.bindMedia(this.player.video)
    openPromise.then(()=> {
      const contentTypesLocal = Object.keys(contentTypes)
      try {
        for (let i = 0; i < contentTypesLocal.length; i++) {
          const type = contentTypesLocal[i]
          this.mse.createSource(type, contentTypes[type].codec)
        }
      } catch (e) {
        console.error('MSE error: ',e)
        this._errorHandler(e)
      }
      this._isMseInit = true
      this._onTimeUpdate()
    })
  }

  /**
   * 销毁MSE对象 // 在重用MSE的时候，如果降级到video原生播放，单实例复用时，需要重新绑定url.所以降级到video原生的需要删除mse对象
   */
  async destroyMSE() {
    await this.mse?.unbindMedia()
    this.mse = null
  }

  _onTimeUpdate () {
    const { mse, mp4, player, config } = this
    if (!mp4) return
    const timeRange = mp4.timeRange
    const range = player.getBufferedRange(player.buffered2)
    if ( mse && mp4 && mp4.canDownload) {
      if (util.nowTime() - this._lastCheckTime > 1000) {
        this._lastCheckTime = util.nowTime()
        this._loadStuckCheck()
        this._checkRemoveSourceBuffer(range, player.currentTime)
      }
      const cacheMaxTime = player.paused ? player.currentTime + config.minBufferLength : player.currentTime + config.maxBufferLength
      if (range[1] - cacheMaxTime < 0) {
        timeRange.every((item, idx) => {
          if (item.downloaded) {
            return true
          }
          // 为了避免切换码率卡顿，仍有一小段旧码率的数据buffer，在此处算有buffer不会下载,所以排除下切换码率
          if (!this._isChangeDefinition && item.endTime - item.startTime > 1 && this._isInBuffer(item)) {
            item.downloaded = true
            item.isLoading = true
            this.log(`onTimeUpdate, ${idx} download segment, has buffer`,item.startTime, item.endTime)
            return true
          }
          if (item.startTime - player.currentTime < config.maxBufferLength) {
            this._curLoadSegmentIdx = idx
            this.log('[onTimeUpdate],load index==>>>, ', idx, ',IdxTimeRange, ', item.startTime, '-', item.endTime, ',buffEnd, ', range[1], ',playCurTime,', player.currentTime, ', bufferLen,', range[1] - player.currentTime, ',bufferRangeList,',this.player.buffered2 ? this.player.buffered2.bufferedList : null)
            this._loadData()
          }
        })
      }
      this._isEnded()
    }
    this.checkRemoveOldBitrateBuffer()
  }

  checkRemoveOldBitrateBuffer () {
    const { mse, player } = this
    if ( mse && this._removeBuffeEndTime > 0 && player.currentTime > this._removeBuffeEndTime + 1) {
      this.log('remove old bitrate buffer',this._removeBuffeEndTime)
      mse.remove(MSE.VIDEO, 0, this._removeBuffeEndTime - 1)
      this._removeBuffeEndTime = 0
    }
  }

  // 如果item所在的区间有buffer，则不进行重复下载
  _isInBuffer (item, gap = 0) {
    let inbuffer = false
    const buffered = this.player.video.buffered
    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i) - gap
      const end = buffered.end(i) + gap
      if (start <= item.startTime && item.endTime <= end) {
        inbuffer = true
        break
      }
    }
    return inbuffer
  }

  async _loadData () {
    if (!this.mp4 || !this._isMseInit) {
      this.log('loadData, player.mp4 null', this._isMseInit)
      return
    }
    try {
      await this.mp4.load(this._curLoadSegmentIdx, this._loadDataSuccess)
    } catch (e) {
      console.error('[Index] _loadData error', this.playerConfig.vid , e)
    }
  }

  _loadDataSuccess = (data) => {
    if (this.isDestroy || !this.mse) {
      return
    }
    this.log('[loadFragment] _loadDataSuccess ', JSON.stringify(data.context.range), ',dataLen,', data.buffer ? data.buffer.byteLength : 0, data.state)
    try {
      if (data.initSeg) {
        this._appendInitSeg(data.initSeg)
        if (!data.buffer || data.buffer.byteLength < 1) {
          this.log('no data, must load data')
          this._onTimeUpdate()
        }
      }
      const {buffer, state, context } = data
      // 为了修复，可能最后一小部分回来的数据，并没有借出来任何的帧数据，所以没有调用append,不能触发计算bufferEndTime
      if (this.mse && state && (!buffer || buffer.byteLength <= 0) && context.fragIndex === this.mp4.timeRange.length - 1) {
        const buffered = this.player.buffered
        if (buffered && buffered.length > 0) {
          this.bufferEndTime = buffered.end(buffered.length - 1)
        }
        this._isEnded()
        this.log('loaded ended !!!==>>>', JSON.stringify(context.range), ', fragIndex,',context.fragIndex, ', bufferEndTime,',this.bufferEndTime, ',meta_duration,',this.mp4.meta.duration)
      }
      if (this.mse && state && context.fragIndex === this.mp4.timeRange.length - 1 && (!buffer || buffer.byteLength <= 0)) {
        const buffered = this.player.buffered
        if (buffered && buffered.length > 0) {
          this.bufferEndTime = buffered.end(buffered.length - 1)
        }
        this._isEnded()
        this.log('load ended !!!==>>>', this.playerConfig.vid, JSON.stringify(context.range), ', fragIndex,',context.fragIndex, ', bufferEndTime,',this.bufferEndTime, ',meta_duration,',this.mp4.meta.duration)
      }
      if (buffer && this.mse) {
        if (buffer && buffer.byteLength > 0) {
          this._appendBuffer(MSE.VIDEO, buffer, context, state)
        }
      }
    } catch (e) {
      // TODO: 测试异常处理逻辑
      this.log('appendBuffer error', e)
      const _err = new Errors(this.player, {
        errorType: 'runtime',
        errorTypeCode: ERROR_TYPES.runtime,
        errorCode: ERROR_CODES.mse,
        vid: this.player.config.vid,
        errorMessage: e.message,
        mediaError: {code: ERROR_CODES.mse, message: e.message}
      })
      this._errorHandler(_err)
    }
    if (data?.state) {
      this._onTimeUpdate()
    }
  }

  _onWaiting = () => {
    const { player, config } = this
    clearTimeout(this._waitInBufferTimer)
    this._waitInBufferTimer = null
    const curTime = player.currentTime
    // console.log('[>>>>onWaiting],currentTime, ',curTime, util.nowTime())
    const buffer = player.bufferedPoint
    if (buffer.end > 0 && buffer.end - player.currentTime >= 2) {
      if (this._waitAdjustTimeCnt < config.waitJampBufferMaxCnt) {
        this._waitInBufferTimer = setTimeout(() => {
          this._waitAdjustTimeCnt++
          player.currentTime = player.currentTime + 0.5
          this.log('[waitInBufferTimeout], waitAdjustTimeCnt,', this._waitAdjustTimeCnt, ',curtime,', curTime, util.nowTime())
        }, config.waitingInBufferTimeOut)
      }
    }
  }

  _onSeeking = async () => {
    const { player, mp4 } = this
    const curTime = player.currentTime
    this.log('[seekTime], curTime,',curTime, ',buffer,',player.buffered2.bufferedList)
    if (!mp4 || !mp4.meta) {
      return
    }
    this.endofstream = false
    mp4.bufferLoadedPos = -1
    mp4._metaLoading = false
    const buffered = player.bufferedPoint
    let hasBuffered = false
    let fragIndex = 0
    if (buffered.end > 0) {
      hasBuffered = true
      if (mp4.meta.duration - buffered.end < 0.5) {
        this._startProgress()
        this.log('[seeking in buffered range], buffer end,',buffered.end, ', duration,', mp4.meta.duration)
        return
      }
      fragIndex = mp4.getFragmentIdx(buffered.end)
      if (this._curLoadSegmentIdx === fragIndex) {
        this._startProgress()
        this.log('[seeking in buffered range], seek fragIndex is current load segmentIdx', fragIndex)
        return
      }
      mp4.seekTime = buffered.end
      fragIndex < 0 && (fragIndex = this._curLoadSegmentIdx)
      this.log('[seeking in buffered range], seekTime ', curTime,',bufferRange,',buffered.start, '-',buffered.end, ', fragIndex,', fragIndex)
    }
    if (!hasBuffered) {
      mp4.seekTime = curTime
      fragIndex = mp4.getFragmentIdx(curTime)
      fragIndex < 0 && (fragIndex = this._curLoadSegmentIdx)
      this.log('[seekTime out buffer range], curTime,', curTime, ', Idx,', fragIndex)
      const { mse } = this
      if (mse && mse.isFull()) {
        const bufferList = player.buffered2.bufferedList
        const bufferRange = bufferList[bufferList.length - 1]
        mse.clearOpQueues(MSE.VIDEO)
        this._checkRemoveSourceBuffer([bufferRange.start, bufferRange.end], player.currentTime , true, true)
      }
    }
    await mp4.cancelLoading()
    mp4.resetFragmentLoadState(fragIndex)
    this._curLoadSegmentIdx = fragIndex
    this._onTimeUpdate()
    this._startProgress()
    this._isEnded()
  }


  _appendInitSeg (initSeg) {
    // 校验是否是h265的视频
    if (!this.mp4 || !this.mse) return
    this.mse.append(MSE.VIDEO, initSeg, {vid: this.playerConfig.vid, range: null, dataLen: initSeg.byteLength, isinit: true}).then((data) => {
      this.log('appendInitSeg end ==>>>', data.context ? data.context : null, ', costTime,', data.costtime)
    })
  }


  _appendBuffer (codec, buffer, context = {},state) {
    const { mse, config } = this
    mse.append(codec, buffer, {vid:config.vid, fragIndex: context.fragIndex, range: context.range, dataLen: buffer.byteLength, state}).then((data) => {
      this.log('player appendBuffer end ==>>>', data.context ? data.context : null, ', costTime,', data.costtime, ', opt,', data.name,',bufferRange,',this.player.getBufferedRange())
      if (this.mse && context.state && context.fragIndex === this.mp4.timeRange.length - 1) {
        const buffered = this.player.buffered
        if (buffered && buffered.length > 0) {
          this.bufferEndTime = buffered.end(buffered.length - 1)
        }
        this._isEnded()
        this.log('loaded ended !!!==>>>', context.range, ', fragIndex,',context.fragIndex, ', bufferEndTime,',this.bufferEndTime, ',meta_duration,',this.mp4.meta.duration)
      }
    }).catch((error) => {
      console.log('[MSE error]', error)
      if (error && mse?.isFull()) {
        const bufferRange = this.player.getBufferedRange(this.player.buffered2)
        this._checkRemoveSourceBuffer(bufferRange, this.player.currentTime, true)
      }
    })
  }

  /**
   *清除sourcebuffer中播放过的数据
   */
  _checkRemoveSourceBuffer (sourceBufferRange, currentTime, mustClear) {
    const { mse, mp4, player } = this
    if (!mse || !mp4 || !player) return
    if (mustClear) {
      clearTimeout(this._removeBufferTimer)
      this._removeBufferTimer = null
    }
    if (!sourceBufferRange) sourceBufferRange = player.getBufferedRange(player.buffered2)
    if (!currentTime) currentTime = player.currentTime
    if (!mustClear && util.nowTime() - this._checkRemoveBufferLastTime <= this.config.removeBufferLen || this.endofstream) return
    this._checkRemoveBufferLastTime = util.nowTime()
    if (sourceBufferRange && sourceBufferRange[0] >= 0 && (currentTime - sourceBufferRange[0] > this.config.removeBufferLen || mse.isFull())) {
      const time = sourceBufferRange[1]
      const segmentIdx = mp4.getFragmentIdx(time)
      if (segmentIdx >= 0 && (mp4.timeRange[segmentIdx].startTime < currentTime)) {
        const clearEnd = Math.floor(Math.min(mp4.timeRange[segmentIdx].startTime, sourceBufferRange[1]))
        if (sourceBufferRange[0] < clearEnd) {
          this.log('[checkremoveSourceBuffer], remove range==>>>', sourceBufferRange[0], clearEnd)
          mse.remove(MSE.VIDEO, sourceBufferRange[0], clearEnd)
        } else if (mse.isFull() && !this._removeBufferTimer) {
          this._removeBufferTimer = setTimeout( () => {this._checkRemoveSourceBuffer( null, null, true)}, 10 * 1000)
        }
      }
    }
  }

  /**
   * 检查是否播放完成
   * @returns {Boolean}
   */
  _isEnded () {
    const { player, mp4 } = this
    const buffered = player.bufferedPoint
    const _end = buffered ? buffered.end : 0
    if (!this.endofstream && this.mse && mp4.meta.duration - player.currentTime < 0.5) {
      this.log('[check player isEnded],deal mse.endOfStream, currentTime,',player.currentTime, ', bufferend,',_end, ', duration,',mp4.meta.duration)
      this.endofstream = true
      this.mse.endOfStream()
    }
    if (mp4 && mp4.meta && mp4.meta.duration - player.currentTime < 0.5) {
      this._stopProgress()
      this.log('[check player isEnded],stopProgress and endOfStream,currentTime, ',player.currentTime, ', bufferend,',_end, ', duration,',mp4.meta.duration)
      this.mse && this.mse.endOfStream()
      return true
    }
    return false
  }


  /**
   * 切换播放源，用于同一个视频的不同播放源切换
   * @param { string ||  Array<{ src: string,  [propName: string]: any; // 扩展定义}> } url
   */
  switchURL (definitionInfo) {
    this.changeDefinition(definitionInfo)
  }

  oldChangeDefinition (to, from) {
    const { config, player } = this
    this.log('[oldChangeDefinition],currentTime,',player.currentTime, ',from,',from, ',to,',to)
    const { currentTime, paused} = player
    if (!this._changeDefState) {
      this._changeDefState = {currentTime: currentTime, paused: paused}
      this.log('[oldChangeDefinition],currentTime,',player.currentTime, ',pause,',paused)
    }
    player.config.url = to.url
    config.focusUserDefinition = true
    player.currentTime = 0
    player.pause()
    this._reset()
    this._isMseInit = false
    this._changeDefineCanPlay && player.off('canplay', this._changeDefineCanPlay)
    this._changeDefineCanPlay = () => {
      this.changeDefineCanPlay(currentTime, paused, from, to)
      this._changeDefineCanPlay = null
    }
    player.once('canplay', this._changeDefineCanPlay)
    this.player.video.load()
    this.initMp4()
  }

  changeDefineCanPlay = (currentTime, paused, from, to) => {
    const { player } = this
    if (player.ended) {
      player.currentTime = 0
      return
    }
    this.log('[oldChangeDefinition],this._changeDefState,',this._changeDefState)
    player.currentTime = this._changeDefState ? this._changeDefState.currentTime : currentTime
    const isPause = this._changeDefState ? this._changeDefState.paused : paused
    if (isPause) {
      player.pause()
    } else {
      player.play()
    }
    this._changeDefState = null
    player.emit(Events.AFTER_DEFINITION_CHANGE, { from, to })
  }

  changeDefinition = async (to, from ) => {
    const { player, config, mp4 } = this

    if (!from) {
      from = player.curDefinition
    }
    this._MSEError = false

    if (config.witchBitRateWay) {
      this.oldChangeDefinition(to, from)
      return
    }

    player.emit(Events.DEFINITION_CHANGE, {from, to})
    const timeStart = player.currentTime
    let fragIndex = mp4.getFragmentIdx(timeStart)
    fragIndex < 0 && (fragIndex = this._curLoadSegmentIdx)
    this.log('switchBitrate:point,fragIndex,', fragIndex, ',startTime,', mp4.timeRange[fragIndex].startTime, ',currentTime,',player.currentTime)
    if (mp4) {
      this.mp4.changeBitRateTime = timeStart
      await mp4.cancelLoading()
      mp4._metaLoading && (mp4._metaLoading = false)
    }
    this._removeBuffeEndTime = mp4.timeRange[fragIndex].startTime
    this._isChangeDefinition = true
    const buffered = player.getBufferedRange(player.buffered)
    // 保留5s数据
    if (buffered[1] > 0 && buffered[1] - player.currentTime > 5) {
      this.mse.clearOpQueues(MSE.VIDEO)
      this.mse.remove(MSE.VIDEO, player.currentTime + 5, buffered[1])
    }
    this.log('switchBitrate: resetFragmentLoadState,', fragIndex)
    mp4.resetFragmentLoadState(fragIndex)
    this._curLoadSegmentIdx = fragIndex
    await this.mp4.changeBitRate(to)
    this._onTimeUpdate()
    player.emit('RESOLUTION_UPDATE', to)
  }

  /**
   * 卡顿超时检查启用
   * 卡顿超过一定时间则至直接降级处理
   */
  _loadStuckCheck () {
    const { config , player } = this
    if (!config.disableBufferBreakCheck) {
      if (player.currentTime - (this._lastCurrentTime || 0) > 0.1 || player.paused) {
        if (this._bufferBreakFlag === 1 || this._bufferBreakFlag === 2) {
          this.log('视频没有卡死,重置卡死标记')
          this._bufferBreakFlag = 0
          clearTimeout(this._bufferBreakTimer)
          this._bufferBreakFlag = null
        }
      } else {
        // 开启卡死计时
        if (!this._bufferBreakFlag) {
          this._bufferBreakFlag = 1
          this.log(`卡死计时开始! 持续${config.waitingTimeOut}毫秒则确认卡死`)
          this._bufferBreakTimer = setTimeout(() => {
            if (this.isDestroy) {
              return
            }
            if (this._bufferBreakFlag === 1) {
              this._bufferBreakFlag = 2
              this.log('确认卡死!!!')
              this._errorHandler(new Errors(this.player, {
                errorType: 'runtime',
                errorTypeCode: ERROR_TYPES.runtime,
                errorCode: ERROR_CODES.waitTimeout,
                errorMessage: 'wait_timeout',
                vid: config.vid
              }))
            }
            this._bufferBreakTimer = null
          }, config.waitingTimeOut)
        }
      }
      this._lastCurrentTime = player.currentTime
    }
  }

  get isDestroy () {
    return !this.player
  }


  _replayHook = () => {
    this.player?.play()
    return false
  }

  _retryHook = () => {
    this.beforePlayerInit()
    return false
  }

  _stopProgress () {
    this._hasStartProgress = false
    if (this._requestTimer) {
      this._requestTimer.stop()
      this._requestTimer = null
    }
    if (this._bufferBreakTimer) {
      clearTimeout(this._bufferBreakTimer)
      this._bufferBreakTimer = null
      this._bufferBreakFlag = undefined
    }
  }

  _startProgress () {
    if (this._hasStartProgress) {
      return
    }
    this._stopProgress()
    this._requestTimer = new Timer(() => {
      if (this._requestTimer) {
        this._onTimeUpdate()
      }
    })
    this._requestTimer.tickEvery(this.config.tickInSeconds)
    this._hasStartProgress = true
  }


  log (message, ...optionalParams) {
    const { playerConfig } = this
    const newMessage = (playerConfig && playerConfig.vid) ? `[Index]${playerConfig.vid} ${message}` : `[Index] ${message}`
    log(newMessage, ...optionalParams)
  }

  /**
   * 重置当前插件的状态
   */
  _reset () {
    this._isMseInit = false
    this.endofstream = false

    this._curLoadSegmentIdx = 0
    this._removeBuffeEndTime = 0
    this._isChangeDefinition = false
    this._stopProgress()
    if (this.mp4) {
      this.mp4.off(MP4_EVENTS.META_READY, this._onMp4MetaReady)
      this.mp4.off(MP4_EVENTS.ERROR, this._onMp4Error)
      this.mp4.off(MP4_EVENTS.MOOV_REQ_PROGRESS, this._onMp4DataCallBack)
      this.mp4.destroy()
      this.mp4 = null
    }
    if (this.mse) {
      this.mse.unbindMedia()
      this.mse = null
    }
    this._unloadVideo()
  }

  // 销毁移除当前video的src
  _unloadVideo () {
    const { player } = this
    try {
      this.log(`unloadVideo src ${player.video.src}`)
      if (player.video && player.video.src) {
        player.video.removeAttribute('src') // empty source
        player.video.load()
      }
    } catch (error) {
      this.log('unloadVideo error', error)
    }
  }


  destroy () {
    const { player } = this

    player.removeHooks('replay', this._replayHook)

    player.removeHooks('retry', this._retryHook)

    this.detachEvents()
    this._reset()

    this.player.playNext = _playerPlayNext
    this.player._startInit = _playerStartInit
    this.player.changeDefinition = _playerChangeDefinition
    this.player.switchURL = _playerSwitchUrl

    if (this._bufferBreakTimer) {
      clearInterval(this._bufferBreakTimer)
    }
    if (this._removeBufferTimer) {
      clearTimeout(this._removeBufferTimer)
      this._removeBufferTimer = null
    }
    if (this._waitInBufferTimer) {
      clearTimeout(this._waitInBufferTimer)
      this._waitInBufferTimer = null
    }
  }
}
