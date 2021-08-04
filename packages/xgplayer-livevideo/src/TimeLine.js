import EventEmitter from 'eventemitter3'
import { logger } from 'xgplayer-helper-utils'
import AudioRender from './render/AudioRender'
import VideoRenderFromVideo from './render/VideoRenderFromVideo'
import VideoRenderFromWasm from './render/VideoRenderFromWasm'
import Events from './events'

export default class TimeLine extends EventEmitter {
  constructor (config, parent) {
    super()
    this.TAG = 'TimeLine'
    this._parent = parent
    this._lastSegment = null
    this._seeking = false
    this.audioRender = new AudioRender(config, this)
    this.videoRender = this._getController(parent.videoDecode, config)
    this._readyStatus = {
      audio: false,
      video: false
    }
    this._paused = true
    this._noAudio = false
    this._switchToMultiWorker = false
    this._lowdecodeEmited = false
    this._lastSeekTime = 0
    this._bindEvent()
    this._parent.updateCanplayStatus(this.currentAudioCanAutoplay)
    this._decodeVideo = config.video
  }

  get ready () {
    return this._readyStatus.video && this._readyStatus.audio
  }

  get played () {
    return {
      length: this.currentTime ? 1 : 0,
      start: () => 0,
      end: () => this.currentTime
    }
  }

  get seeking () {
    return this._seeking
  }

  get decodeFps () {
    return this.videoRender.decodeFps
  }

  get decodeCost () {
    return this.videoRender.decodeCost
  }

  get renderCost () {
    return this.videoRender.renderCost
  }

  get wasmInitCost () {
    return this.videoRender.wasmInitCost
  }

  get fps () {
    return this.videoRender.fps
  }

  get totalSize () {
    return this.videoRender.totalSize
  }

  get bitrate () {
    return this.videoRender.bitrate
  }

  get gopLength () {
    return this.videoRender.gopLength
  }

  get currentTime () {
    if (this._noAudio) return this.videoRender.currentTime
    return this.audioRender.currentTime
  }

  get timelinePosition () {
    if (this._noAudio) return performance.now() / 1000 // s
    return this.audioRender.currentTime
  }

  get canvas () {
    return this.videoRender.canvas
  }

  get readyState () {
    return this.videoRender.readyState
  }

  get buffered () {
    if (this._noAudio) return this.videoRender.buffered
    return this.audioRender.buffered
  }

  get duration () {
    if (this._noAudio) return this.videoRender.duration
    return this.audioRender.duration
  }

  get paused () {
    return this._paused
  }

  set paused (v) {
    this._paused = v
  }

  get lowlatency () {
    return this._parent.lowlatency
  }

  // 播放器初始化时第一个WebAudio能否自动播放的状态,后续重新创建的不算,用于safari下非用户交互创建的 webaudio 不能自动播放
  get audioCanAutoplay () {
    return this._parent._audioCanAutoplay
  }

  get currentAudioCanAutoplay () {
    return this.audioRender.audioCanAutoplay
  }

  _getController (videoDecode, config) {
    if (videoDecode) {
      return new VideoRenderFromVideo(config, this)
    } else {
      return new VideoRenderFromWasm(config, this)
    }
  }

  _resetReadyStatus () {
    this._readyStatus.audio = false
    this._readyStatus.video = false
  }

  _bindEvent () {
    this.on(Events.DECODE_EVENTS.REMUX, (remux) => {
      this.videoRender.setRemux(remux)
    })
    // 硬解追帧流程是在视频追帧完成之后触发音频追帧
    this.on(Events.DECODE_EVENTS.CHASE_VIDEO_FRAME_END, (keyframe) => {
      this.emit(Events.DECODE_EVENTS.CHASE_AUDIO_FRAME, keyframe)
    })

    this.audioRender.on(Events.AUDIO.AUDIO_READY, () => {
      logger.log(this.TAG, 'audio ready!')
      if (this._readyStatus.video) {
        this._startRender()
      }
      this._readyStatus.audio = true
    })

    this.audioRender.on(Events.AUDIO.AUDIO_WAITING, () => {
      if (this._noAudio) return
      logger.warn(this.TAG, 'lack data, audio waiting,currentTime:', this.currentTime)
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE)
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING)
      this.emit(Events.TIMELINE.DO_PAUSE)
      this._readyStatus.audio = false
    })

    // only used for no audio exist
    this.videoRender.on(Events.VIDEO.VIDEO_WAITING, () => {
      logger.warn(this.TAG, 'lack data, video waiting')
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING)
      this.emit(Events.TIMELINE.DO_PAUSE)
      this._readyStatus.video = false
    })

    this.onVideoReady = () => {
      logger.log(this.TAG, 'video ready!')
      if (this._readyStatus.audio) {
        this._startRender('video')
      }
      this._readyStatus.video = true
    }

    this.videoRender.on(Events.VIDEO.VIDEO_READY, this.onVideoReady)

    this.videoRender.on(Events.VIDEO.DECODE_LOW_FPS, () => {
      const canSwitchToMultiWorker =
        this._parent.live &&
        this.videoRender.decodeMode === 2 &&
        !this._switchToMultiWorker &&
        !this._noAudio &&
        this.fps / this.decodeFps < 2

      if (canSwitchToMultiWorker) {
        logger.warn(this.TAG, `switch to multi worker , decodeFps:${this.decodeFps} , fps:${this.fps}`)
        this._switchToMultiWorker = true
        this.videoRender.switchToMultiWorker()
        return
      }
      if (this.currentTime < 5) return
      // 对外只触发一次
      if (this._lowdecodeEmited) return
      this._lowdecodeEmited = true
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOW_DECODE)
    })

    this.on(Events.TIMELINE.ADJUST_SEEK_TIME, (time) => {
      this.videoRender.ajustSeekTime(time)
    })

    this.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true
      this._readyStatus.audio = true
    })

    this.on(Events.TIMELINE.DESTROY, () => {
      this.removeAllListeners()
      this.videoRender = null
      this.audioRender = null
    })

    // 点播暂停后重新起播
    this.on(Events.TIMELINE.DO_PLAY, (e) => {
      if (!this._parent.startPlayed) {
        this._parent.startPlayed = true
        this.emit(Events.TIMELINE.START_RENDER)
      }
      this._paused = false
    })
  }

  _startRender (from) {
    if (this._parent.error || !this.videoRender) return
    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, 0)
    }
    logger.log(this.TAG, 'startRender: time=', this.currentTime, 'paused:', this.paused, 'seeking:', this.seeking)

    // 首帧画面显示
    this.videoRender.forceRender()

    if (!this._parent.live && this._paused && this.seeking) {
      this._seeking = false
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.SEEKED)
      return
    }

    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.CANPLAY)

    if (!this._parent.startPlayed) {
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.FIRST_FRAME)
    }

    // 对autoplay:false 起播阶段不执行这个,在外面调用play()时分发 START_RENDER
    if (this._parent.autoplay || this._parent.startPlayed) {
      this._parent.startPlayed = true
      this.emit(Events.TIMELINE.START_RENDER, from)
    }
    this.emit(Events.TIMELINE.READY)
    if (this._seeking) {
      if (!this.currentAudioCanAutoplay || this._paused) {
        this.pause()
      }
      this._seeking = false
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.SEEKED)
      logger.groupEnd()
    }
  }

  // 对点播、分片不连续时resetDts
  _checkResetBaseDts (vTrack, aTrack) {
    const vSamp0 = vTrack && vTrack.samples[0]
    const aSamp0 = aTrack && aTrack.samples[0]
    if (!vSamp0 || !aSamp0) {
      if (!this.buffered.length) {
        // 暂不支持只有单track
        this.emit(Events.TIMELINE.PLAY_EVENT, 'error', new Error('lack video or audio sample'))
      }
      return
    }
    const frag = vSamp0.options
    if (!frag) return
    let breakedFrag
    if (!this._lastSegment) {
      breakedFrag = true
    }
    // discontinue
    if (this._lastSegment && this._lastSegment.cc !== frag.cc) {
      breakedFrag = true
    }
    // 考虑不存在不连续标记、但流时间戳变化了
    const fStart = frag.start / 1000
    const fEnd = fStart + frag.duration / 1000
    const isSeekingFrag = fStart < this.currentTime && fEnd > this.currentTime
    if (!breakedFrag && isSeekingFrag) {
      const expectDts = this.videoRender.getDtsOfTime(fStart)
      if (Math.abs(vSamp0.dts - expectDts) > 5000) {
        // 5s
        breakedFrag = true
      }
    }

    if (breakedFrag) {
      const vBaseDts = vSamp0.dts - frag.start
      const aBaseDts = aSamp0.dts - frag.start
      logger.warn(this.TAG, `segment discontinue, id:${frag.id} reset vBaseDts=${vBaseDts} , aBaseDts=${aBaseDts}`)
      this.emit(Events.TIMELINE.RESET_BASE_DTS, aBaseDts, 'audio')
      this.emit(Events.TIMELINE.RESET_BASE_DTS, vBaseDts, 'video')
    }

    this._lastSegment = frag
  }

  appendBuffer (videoTrack, audioTrack) {
    if (!this._parent.live) {
      this._checkResetBaseDts(videoTrack, audioTrack)
    }
    this.emit(Events.TIMELINE.APPEND_CHUNKS, videoTrack, audioTrack)
  }

  play () {
    return new Promise((resolve, reject) => {
      let resumed = this.currentAudioCanAutoplay

      if (!this._parent.startPlayed) {
        this.emit(Events.TIMELINE.START_RENDER)
        this._parent.startPlayed = true
      }

      if (this._noAudio) {
        resumed = true
      } else if (this.audioRender) {
        this.audioRender.resume().then(() => {
          logger.log(this.TAG, 'audioCtx 开始播放')
          if (this._paused) {
            // resume()返回晚于timer时
            this.emit(Events.TIMELINE.DO_PAUSE)
            return
          }
          resumed = true
        })
      }

      setTimeout(() => {
        this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.TIMEUPDATE)

        if (!resumed) {
          logger.log(this.TAG, 'audioCtx 不能自动播放')
          if (this._parent.firstWebAudio) {
            this._paused = true
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              name: 'NotAllowedError'
            })
          } else {
            this.pause()
            resolve()
          }
          return
        }
        // 暂时没有和音频不能自动播放合到一起
        if (this.videoRender && !this.videoRender.canAutoPlay) {
          console.warn('video render 不能自动播放')
          this.pause()
          // this.emit(Events.TIMELINE.PLAY_EVENT, 'notautoplay')
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            name: 'NotAllowedError'
          })
          return
        }
        this._paused = false
        resolve()
      }, 50)
    })
  }

  pause () {
    if (this._paused || (!this.ready && !this._seeking)) return
    this.emit(Events.TIMELINE.DO_PAUSE)
    setTimeout(() => {
      this._paused = true
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PAUSE)
    })
  }

  seek (time) {
    if (this._seeking) {
      logger.groupEnd()
    }

    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, this.videoRender.getDtsOfTime(time))
      return
    }

    if (this._parent.live) {
      if (this.currentTime < 0.1 || !this.audioCanAutoplay) return

      /**
       * 追帧流程
       * 1. 从 time 位置往前找最近的关键帧, time - keyframePosition < preloadTime
       * 2. 对 audio._timeRange, 从keyframePosition 往后找最近的buffer块 A, 可能找不到。
       * 3. videoRender刷新解码器,清空解码帧、删除keyframePosition之间的压缩帧
       * 4. audioRender 删除 A 之前的buffer块,重建 audioCtx
       * 5. 音频播放，视频解码 (视频位置 < 音频块位置)会短暂追帧
       */
      const keyframe = this.videoRender.getChaseFrameStartPosition(time, this._parent.preloadTime + 1)
      if (keyframe) {
        const audioCanSeek = this.audioRender.canSeek(keyframe.position)
        const videoCanSeek = this.videoRender.canSeek(keyframe)
        if (!audioCanSeek || !videoCanSeek) {
          logger.log(this.TAG, 'seek, !!!!!!!!!can not seek, audioCanSeek:', audioCanSeek, 'videoCanSeek:', videoCanSeek)
          return
        }
        logger.warn(this.TAG, 'seek, chase frame to time: ', keyframe.position, this.duration)
        if (this.videoRender.videoDecode) {
          this.audioRender._doPause()
          keyframe.position = keyframe.position - 1.5
          this.emit(Events.DECODE_EVENTS.CHASE_VIDEO_FRAME, keyframe)
        } else {
          this.emit(Events.TIMELINE.CHASE_FRAME, keyframe)
        }
      }
      return
    }

    if (this._lastSeekTime === time) return

    this._lastSeekTime = time

    // 调整为最后一个分片
    if (time >= this.duration) {
      time = this.duration - 1
    }

    if (time < 0) {
      time = 0
    }

    logger.group(this.TAG, 'start seek to:', time)

    /** 点播 seek 链路:
     *  音视频流程暂停, videoRender 销毁audioCtx并新建、videoRender timer暂停,清空_frameQueue
     *  1. seek位置无buffer,emit waiting,等待下载,下载完后 audioRender中调整seek时间，通知videoRender解码
     *  2. seek位置有buffer,直接切换buffer,中调整seek时间，通知videoRender解码
     *  3. audioRender emit ready、videoRender emit ready
     *  4. timeline 监听到READY, 分发 START_RENDER
     */
    this._seeking = true
    this._resetReadyStatus()
    this.emit(Events.TIMELINE.DO_SEEK, time)
    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.SEEKING)
  }

  dump () {
    return this.audioRender.dump()
  }
}
