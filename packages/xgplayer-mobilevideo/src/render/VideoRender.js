/* eslint-disable no-undef */
import { logger } from 'xgplayer-helper-utils';
import BaseRender from './BaseRender';
import VideoTimeRange from './VideoTimeRange';
import FrameRender from './FrameRender';
import FrameQueue from './FrameQueue';
import DecodeEstimate from './DecodeEstimate';
import DecodeWorkerManager from './DecodeWorkerManager'
import TickTimer from '../helper/TickTimer';
import Events from '../events';

const HAVE_NOTHING = 0;
const HAVE_METADATA = 1;
const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;
const HAVE_ENOUGH_DATA = 4;

const MEDIA_ERR_DECODE = 3;

export default class VideoRender extends BaseRender {
  constructor (config, parent) {
    super(config, parent);
    this.TAG = 'VideoRender';
    this._timeRange = new VideoTimeRange(this);
    this._decodeEstimate = new DecodeEstimate(this);
    this._frameQueue = new FrameQueue(this); // the queue of uncompressed frame
    this._decoderWorkerMananger = new DecodeWorkerManager(this);
    this._canvas = config.canvas || document.createElement('canvas');
    this._lastTimeupdate = 0;
    this._renderCost = 0;
    this._frameRender = null;
    this._render = this._render.bind(this);
    this._tickTimer = new TickTimer(this._render);
    this._initCanvas();
    this._bindEvents();
    this._workerMessageCallback = this._workerMessageCallback.bind(this);
    this._workerErrorCallback = this._workerErrorCallback.bind(this);
  }

  get canvas () {
    return this._canvas;
  }

  get timescale () {
    if (!this._meta) return 1000;
    return this._meta.timescale || 1000;
  }

  get fps () {
    return (
      this._decodeEstimate.fps ||
      (this._meta && this._meta.frameRate && this._meta.frameRate.fps) ||
      24
    );
  }

  get decodeFps () {
    return this._decodeEstimate.decodeFps;
  }

  get decodeCost () {
    return this._decodeEstimate.decodeCost;
  }

  get renderCost () {
    return this._renderCost;
  }

  get totalSize () {
    return this._timeRange.totalSize;
  }

  get bitrate () {
    return this._timeRange.bitrate;
  }

  set bitrate (v) {
    this._timeRange.bitrate = v;
  }

  get gopLength () {
    return this._decodeEstimate.gopLength;
  }

  get is540p () {
    return this._canvas.height < 720;
  }

  get duration () {
    return this._timeRange.duration;
  }

  get buffered () {
    return this._timeRange.buffered;
  }

  get interval () {
    return Math.floor(1000 / this.fps);
  }

  // video first frame dts
  get baseDts () {
    return this._timeRange.baseDts;
  }

  // noAudio时使用
  get currentTime () {
    return this._timeRange.getCurrentTime(this.preciseVideoDts);
  }

  get timelinePosition () {
    return this._parent.timelinePosition;
  }

  set lastTimelinePosition (ts) {
    this._lastTimelinePosition = ts;
  }

  // the startTime on timeline of the buffer audioCtx current playing
  // noAudio: the time record by perforamce.now() when play start or restart after waiting or stream changed
  get lastTimelinePosition () {
    return this._lastTimelinePosition || 0;
  }

  set audioSyncDts (dts) {
    this._audioDts = dts;
  }

  // the first sample's dts of the buffer audioCtx current playing
  get audioSyncDts () {
    return this._audioDts || this.baseDts;
  }

  // the precise video dts sync to timeline time
  get preciseVideoDts () {
    return (
      this.audioSyncDts +
      (this.timelinePosition - this.lastTimelinePosition) * 1000
    );
  }

  get readyState () {
    let len = this._frameQueue.length;
    if (!len) return HAVE_NOTHING;
    if (len >= 8) return HAVE_ENOUGH_DATA;
    if (len >= 4) return HAVE_FUTURE_DATA;
    if (len >= 2) return HAVE_CURRENT_DATA;
    return HAVE_METADATA;
  }

  get decodeMode () {
    return this._decoderWorkerMananger.decoderMode;
  }

  get isHevc () {
    return this._decoderWorkerMananger.isHevc;
  }

  getDtsOfTime (time) {
    return this._timeRange.getDtsOfTime(time);
  }

  updateReady () {
    this._whenReady();
  }

  switchToMultiWorker () {
    // 新建worker
    this._decoderWorkerMananger.addDecodeWorker(
      () => {
        let nextFrame = this._timeRange.nextFrame();
        return nextFrame ? nextFrame.gopId : 0;
      },
      this.gopLength
    ).then(() => {
      this._decodeEstimate.reset();
    })
  }

  // 链路: audioRender中选择好要播放的buffer后,调整seek时间,通知 videoRender开始切换buffer、解码
  ajustSeekTime (time) {
    logger.log(this.TAG, 'ajust seek time: ', time);
    this._decoderWorkerMananger.flushDecoder();
    this._switchVideoBuffer(time);
  }

  getChaseFrameStartPosition (time, preloadTime) {
    return this._timeRange.getChaseFrameStartPosition(time, preloadTime);
  }

  forceRender () {
    this._render(true);
  }

  _assembleErr (msg) {
    let err = new Error(msg);
    err.code = MEDIA_ERR_DECODE;
    return err;
  }

  _emitTimelineEvents (e, v, d) {
    this._parent.emit(e, v, d);
  }

  _initCanvas () {
    this._canvas.style.margin = 'auto';
    this._canvas.style.position = 'absolute';
    this._canvas.style.pointerEvents = 'none';
  }

  _bindEvents () {
    super._bindEvents();

    let waitingTimer;

    this._parent.on(Events.VIDEO.UPDATE_VIDEO_FILLTYPE, (type, {width, height}) => {
      const {width: cvsWidth, height: cvsHeight} = this._canvas;
      let isGapX = (width / height) > (cvsWidth / cvsHeight); // 左右有黑边
      console.warn('isGapX: ', isGapX, type, cvsWidth, cvsHeight, width, height);
      if (type === 'cover') {
        if (isGapX) {
          this._canvas.style.height = 'auto';
          this._canvas.style.width = '100%';
          return;
        }
        this._canvas.style.width = 'auto';
        this.canvas.style.height = '100%';
        return;
      }

      if (type === 'fill') {
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        return;
      }

      this._canvas.style.top = 0;
      this._canvas.style.bottom = 0;
      this._canvas.style.left = 0;
      this._canvas.style.right = 0;
      this._canvas.style.maxWidth = '100%';
      this._canvas.style.maxHeight = '100%';
    })

    // 容器宽高比 > 视频宽高比， 应该左右移动
    // 容器宽高比 < 视宽高比，应该上下移动
    this._parent.on(Events.VIDEO.UPDATE_VIDEO_COVER_POSITION, ({width, height}, left = 0, top = 0) => {
      const {width: cvsWidth, height: cvsHeight} = this._canvas;
      let scaleCvsWidth = height * cvsWidth / cvsHeight;
      let scaleCvsHeight = width * cvsHeight / cvsWidth;
      let deltaX = width - scaleCvsWidth;
      let deltaY = height - scaleCvsHeight
      let pX = deltaX * left + 'px';
      let pY = deltaY * top + 'px'
      this._canvas.style.left = pX;
      this._canvas.style.top = pY;
      console.warn(`cvsWidth=${cvsWidth}, cvsHeight=${cvsHeight}, scaleCvsWidth=${scaleCvsWidth}, scaleCvsHeight=${scaleCvsHeight}`);
      console.warn(`cover position: deltaX=${deltaX}, deltaY=${deltaY}, width=${width}, height=${height}, pX=${pX}, pY=${pY}`);
    })

    // 同步时机
    // 1. 音频一小段buffer起播时
    // 2. 对noAudio的场景 1. 视频变流时,dts发生变化 2. 卡顿waiting后,_parent.timelinePosition已不准确
    this._parent.on(Events.TIMELINE.SYNC_DTS, (dts) => {
      let nextFrame = this._frameQueue.nextFrame();
      this.lastTimelinePosition = this.timelinePosition;
      if (this._noAudio) {
        dts = dts || (nextFrame && nextFrame.info.dts) || 0;
      }
      this.audioSyncDts = dts;

      let nextFrameDts = nextFrame && nextFrame.info && nextFrame.info.dts;

      // 下一帧视频和音频时间差距较大,对外通知
      if (nextFrameDts && nextFrameDts - dts > 500) {
        this._emitTimelineEvents(
          Events.TIMELINE.PLAY_EVENT,
          Events.VIDEO_EVENTS.LARGE_AV_GAP,
          {
            aDts: dts,
            vDts: nextFrameDts,
            frameLength: this._frameQueue.length,
            currentTime: this._parent.currentTime,
            duration: this._parent.duration
          }
        );
      }

      logger.log(
        this.TAG,
        'audio current buffer play finish, next buffer dts=',
        dts,
        'currentTime:',
        this._parent.currentTime,
        'next video frame dts:',
        nextFrameDts,
        'frame length:',
        this._frameQueue.length
      );

      // 点播考虑当前分片音频播放完成，视频解码太慢,要自动切到新buffer
      if (!this._isLive) {
        let nextDecodeFrame = this._timeRange.nextFrame();
        if (nextDecodeFrame) {
          let position = (nextDecodeFrame.dts - nextDecodeFrame.baseDts) / 1000;
          if (this._parent.currentTime - position > 1) {
            // 音频播完了,视频还有> 1s没解码的话,直接切到新分片
            logger.warn(this.TAG, '视频解码太慢,丢帧!');
            this.ajustSeekTime(this._parent.currentTime);
          }
        }
      }
    });

    this._parent.on(Events.TIMELINE.UPDATE_GL_OPTIONS, (v) => {
      this._config.glCtxOptions = v;
    });

    this.on(Events.VIDEO.AUTO_RUN, this._startRender.bind(this));

    this.on(Events.VIDEO.VIDEO_WAITING, () => {
      if (this.bitrate === 0) return;
      clearInterval(waitingTimer);
      let i = 1;
      waitingTimer = setInterval(() => {
        logger.log(this.TAG, '卡顿', i);
        i++;
        this.bitrate = this.bitrate / i;
        if (this.bitrate < 40000) {
          // 5KB
          this.bitrate = 0;
          clearInterval(waitingTimer);
        }
      }, 1000);
    });

    this._parent.on(Events.TIMELINE.START_RENDER, () => {
      clearInterval(waitingTimer);
    });

    this._parent.on(Events.TIMELINE.DESTROY, () => {
      clearInterval(waitingTimer);
    });
  }

  _workerErrorCallback (msg) {
    this._emitTimelineEvents(
      Events.TIMELINE.PLAY_EVENT,
      'error',
      this._assembleErr(msg)
    );
  }

  _workerMessageCallback ({type, data}) {
    switch (type) {
      case 'DECODER_READY':
        if (!this._frameRender) {
          let config = Object.assign(this._config, { meta: this._meta, canvas: this._canvas });
          try {
            this._frameRender = new FrameRender(config);
          } catch (e) {
            this._emitTimelineEvents(
              Events.TIMELINE.PLAY_EVENT,
              'error',
              this._assembleErr(e && e.message)
            );
          }
        }
        this._startDecode();
        break;
      case 'RECEIVE_FRAME':
        if (this._inChaseFrame) return;
        this._receiveFrame(data);
        break;
      case 'BATCH_FINISH':
        if (!this._decodeEstimate) return;
        this._decodeEstimate.resetDecodeDot();
        if (this._inChaseFrame) {
          this._inChaseFrame = false;
          this._frameQueue.empty();
        }
        break;
    }
  }

  _initDecodeWorker () {
    this._decoderWorkerMananger.initDecodeWorker(
      this._workerMessageCallback,
      this._workerErrorCallback,
      this._meta
    )
  }

  _receiveFrame (frame) {
    if (!this._parent) {
      return
    };
    let info = frame.info;
    this._decodeEstimate.addDecodeInfo(info);

    if (!this._isLive) {
      let t = info && (info.baseDts !== undefined) && (info.dts - info.baseDts) / 1000;
      if (t !== undefined && this._parent) {
        if (Math.abs(t - this._parent.currentTime) >= 4) return;
      }
    }

    if (this._isLive) {
      this._frameQueue.append(frame);
    } else {
      this._frameQueue.appendVodFrame(frame);
    }

    if (!this._ready) {
      if (this.readyState >= HAVE_METADATA) {
        this._whenReady();
      }
    }
  }

  _setMetadata (type, meta) {
    if (type === 'audio') return;
    logger.warn(this.TAG, 'video set metadata');
    this._meta = meta;
    let fps = meta && meta.frameRate && meta.frameRate.fps;
    if (fps) {
      logger.log(this.TAG, 'detect fps:', fps);
    } else {
      logger.warn(this.TAG, 'no detect fps,start estimate');
    }
    this._initDecodeWorker();
  }

  _resetDts (dts, type) {
    if (type === 'audio') return;
    this._timeRange.resetDts(dts);
  }

  _doPlay () {
    this._tickTimer.start();
  }

  _doPause () {
    this._tickTimer.stop();
  }

  // 清空解码帧,尝试解码seek位置buffer
  _doSeek () {
    this._tickTimer.stop();
    this._ready = false;
    this._frameQueue.destroy();
  }

  _doChaseFrame ({frame}) {
    this._inChaseFrame = true;
    this._timeRange.deletePassed(frame.dts);
    this._frameQueue.empty();
  }

  _switchVideoBuffer (time) {
    this._timeRange.switchBuffer(time);
    this._setMetadata('video', this._meta);
    this._startDecode();
  }

  _appendChunk (videoTrack) {
    this._timeRange.append(videoTrack.samples, this._noAudio);
    videoTrack.samples = [];
    if (!this.isLive && !this._timeRange.frameLength) {
      this._switchVideoBuffer(this._parent.currentTime);
    }
    if (!this._ready && this._decoderWorkerMananger.wasmReady && this._noAudio) {
      this._startDecode();
    }
    if (this._noAudio) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.DURATION_CHANGE
      );
    }
    if (!this._frameQueue.length && !this._decoderWorkerMananger.inDecoding) {
      this._startDecode();
    }
  }

  // 1. decoder初始化预解码几帧
  // 2. render 过程,帧数过少时解码新帧
  _startDecode () {
    if (!this._decoderWorkerMananger.wasmReady || !this._timeRange) return;

    let rest = this._timeRange.frameLength;

    if (!rest) return;

    let len = this._decoderWorkerMananger.maxDecodeOnce;

    if (rest === 1) {
      this._decodeEstimate.resetDecodeDot(performance.now());
    }

    let frameList = [];
    while (len >= 0) {
      let sample = this._timeRange && this._timeRange.getFrame();
      if (!sample) break;
      frameList.push(sample);
      if (sample.gopId && (sample.gopId - 1 === 0)) {
        this._decodeEstimate.updateGopCount();
      }
      len--;
    }

    this._decoderWorkerMananger.doDecode(frameList);
  }

  _whenReady () {
    this._ready = true;
    this.emit(Events.VIDEO.VIDEO_READY);

    if (this.currentTime < 10) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.LOADEDDATA
      );
    };

    if (this._noAudio) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.PLAYING
      );
    }
  }

  // 检测需要解码的时机
  // 1. 解码worker初始化完成,提前解几帧
  // 2. 渲染ticker中
  _checkToDecode () {
    if (this._frameQueue.length < this._decoderWorkerMananger.needToDecode) {
      this._startDecode();
    }
  }

  _startRender () {
    this._tickTimer.start(this.interval);
  }

  _render (force) {
    let frame = this._frameQueue.nextFrame();

    if (!frame || !this._timeRange) {
      logger.log(this.TAG, 'lack frame', this._decoderWorkerMananger.inDecoding);
      this._checkToDecode();
      // waiting
      if (this._noAudio && !this._timeRange.frameLength) {
        this._ready = false;
        this.emit(Events.VIDEO.VIDEO_WAITING);
      }
      return;
    }

    let { info } = frame;

    if (!info) {
      this._frameQueue.shift();
      return;
    }

    let _renderDelay = info.dts - this.preciseVideoDts;
    // console.log('_renderDelay: ', info.dts, _renderDelay);

    if (!force && _renderDelay > 0 && _renderDelay < 60000) { // 60s
      return;
    }

    this._frameQueue.shift(this.preciseVideoDts);

    if (Math.abs(this._lastTimeupdate - info.dts) > 250) {
      this._emitTimelineEvents(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.TIMEUPDATE
      );
      this._lastTimeupdate = info.dts;
    }

    if (logger.long) {
      logger.log(
        this.TAG,
        `render delay:${_renderDelay} , timelinePosition:${this.preciseVideoDts} , dts:${info.dts} , cost:${info.cost} , gopID:${info.gopId} , rest:${this._frameQueue.length}, buffer frame:${this._timeRange.frameLength}`
      );
    }
    let ts = performance.now();
    this._frameRender.render(
      frame.buffer,
      frame.width,
      frame.height,
      frame.yLinesize,
      frame.uvLinesize
    );
    this._renderCost = performance.now() - ts;
    this._checkToDecode();
  }

  _destroy (reuseWorker) {
    this._decoderWorkerMananger.destroy(reuseWorker);
    this._tickTimer.destroy();
    this._frameQueue.destroy();
    if (this._frameRender) {
      this._frameRender.destroy();
    }
    this._canvas = null;
    this._timeRange = null;
    this._decodeEstimate = null;
    this._parent = null;
    this._decoderWorkerMananger = null;
    this.removeAllListeners();
  }
}
