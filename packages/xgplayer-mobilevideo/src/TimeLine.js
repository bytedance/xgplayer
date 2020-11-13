import EventEmitter from 'events';
import { logger } from 'xgplayer-helper-utils';
import AudioRender from './render/AudioRender';
import VideoRender from './render/VideoRender';
import Events from './events';

export default class TimeLine extends EventEmitter {
  constructor (config, parent) {
    super();
    this.TAG = 'TimeLine';
    this._parent = parent;
    this._lastSegment = null;
    this._seeking = false;
    this.audioRender = new AudioRender(config, this);
    this.videoRender = new VideoRender(config, this);
    this._readyStatus = {
      audio: false,
      video: false
    };
    this._paused = false;
    this._noAudio = false;
    this._switchToMultiWorker = false;
    this._bindEvent();
  }

  get ready () {
    return this._readyStatus.video && this._readyStatus.audio;
  }

  get played () {
    return {
      length: this.currentTime ? 1 : 0,
      start: () => 0,
      end: () => this.currentTime
    };
  }

  get seeking () {
    return this._seeking;
  }

  get decodeFps () {
    return this.videoRender.decodeFps;
  }

  get decodeCost () {
    return this.videoRender.decodeCost;
  }

  get fps () {
    return this.videoRender.fps;
  }

  get bitrate () {
    return this.videoRender.bitrate;
  }

  get gopLength () {
    return this.videoRender.gopLength;
  }

  get currentTime () {
    if (this._noAudio) return this.videoRender.currentTime;
    return this.audioRender.currentTime;
  }

  get timelinePosition () {
    if (this._noAudio) return performance.now() / 1000; // s
    return this.audioRender.currentTime;
  }

  get canvas () {
    return this.videoRender.canvas;
  }

  get readyState () {
    return this.videoRender.readyState;
  }

  get buffered () {
    if (this._noAudio) return this.videoRender.buffered;
    return this.audioRender.buffered;
  }

  get duration () {
    if (this._noAudio) return this.videoRender.duration;
    return this.audioRender.duration;
  }

  get paused () {
    return this._paused;
  }

  set paused (v) {
    this._paused = v;
  }

  _resetReadyStatus () {
    this._readyStatus.audio = false;
    this._readyStatus.video = false;
  }

  _bindEvent () {
    this.audioRender.on(Events.AUDIO.AUDIO_READY, () => {
      logger.log(this.TAG, 'audio ready!');
      if (this._readyStatus.video) {
        this._startRender();
      }
      this._readyStatus.audio = true;
    });

    this.audioRender.on(Events.AUDIO.AUDIO_WAITING, () => {
      if (this._noAudio) return;
      logger.warn(this.TAG, 'lack data, audio waiting,currentTime:', this.currentTime);
      this.emit(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.TIMEUPDATE
      );
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
      this.emit(Events.TIMELINE.DO_PAUSE);
      this._readyStatus.audio = false;
    });

    // only used for no audio exist
    this.videoRender.on(Events.VIDEO.VIDEO_WAITING, () => {
      logger.warn(this.TAG, 'lack data, video waiting');
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
      this.emit(Events.TIMELINE.DO_PAUSE);
      this._readyStatus.video = false;
    });

    this.videoRender.on(Events.VIDEO.VIDEO_DECODER_INIT, () => {
      logger.log(this.TAG, 'video decoder init!');
      setTimeout(() => {
        if (!this._readyStatus.video) {
          logger.warn(this.TAG, 'video 首次解码无解码帧返回! auto ready!');
          this.videoRender.updateReady();
        }
      }, 1000);
    });

    this.onVideoReady = () => {
      logger.log(this.TAG, 'video ready!');
      if (this._readyStatus.audio) {
        this._startRender();
      }
      this._readyStatus.video = true;
    };

    this.videoRender.on(Events.VIDEO.VIDEO_READY, this.onVideoReady);

    this.videoRender.on(Events.VIDEO.DECODE_LOW_FPS, () => {
      if (this.currentTime < 10) return;

      let canSwitchToMultiWorker = this._parent.live &&
        !this._switchToMultiWorker &&
        !this._noAudio &&
        (this.fps / this.decodeFps < 2)

      if (canSwitchToMultiWorker) {
        logger.warn(this.TAG, `switch to multi worker , decodeFps:${this.decodeFps} , fps:${this.fps}`)
        this._switchToMultiWorker = true;
        this.videoRender.switchToMultiWorker(this._parent.preloadTime);
        return;
      }
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOW_DECODE);
    })

    this.on(Events.TIMELINE.AJUST_SEEK_TIME, time => {
      this.videoRender.ajustSeekTime(time);
    })

    this.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true;
      this._readyStatus.audio = true;
    });

    this.on(Events.TIMELINE.DESTROY, () => {
      this.removeAllListeners();
      this.videoRender = null;
      this.audioRender = null;
    })

    this.on(Events.TIMELINE.DO_PLAY, e => {
      this._paused = false;
    })
  }

  _startRender () {
    if (this._parent.error) return;
    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, 0);
    }
    logger.log(this.TAG, 'startRender: time=', this.currentTime, 'seeking:', this.seeking);
    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.CANPLAY);
    this.emit(Events.TIMELINE.START_RENDER);
    this.emit(Events.TIMELINE.READY);
    if (this._seeking) {
      this._seeking = false;
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.SEEKED);
      logger.groupEnd();
    }
  }

  // 对点播、分片不连续时resetDts
  _checkResetBaseDts (vTrack) {
    const samp0 = vTrack.samples[0];
    if (!samp0) return;
    const frag = samp0.options;
    if (!frag) return;
    let breakedFrag;
    if (!this._lastSegment) {
      breakedFrag = frag;
    }
    // discontinue
    if (this._lastSegment && this._lastSegment.cc !== frag.cc) {
      breakedFrag = frag
    }
    if (breakedFrag) {
      const baseDts = samp0.dts - frag.start;
      console.log(`segment discontinue, id:${frag.id} reset baseDts=${baseDts}`);
      this.emit(Events.TIMELINE.RESET_BASE_DTS, baseDts);
    }

    this._lastSegment = frag;
  }

  appendBuffer (videoTrack, audioTrack) {
    this._checkResetBaseDts(videoTrack);
    this.emit(Events.TIMELINE.APPEND_CHUNKS, videoTrack, audioTrack);
  }

  play () {
    return new Promise((resolve, reject) => {
      let resumed = this.audioRender.audioCanAutoPlay;

      if (this._noAudio) {
        resumed = true;
      } else {
        this.audioRender.resume().then(() => {
          logger.log(this.TAG, 'audioCtx 开始播放');
          if (this._paused) {
            // resume()返回晚于timer时
            this.emit(Events.TIMELINE.DO_PAUSE);
            return;
          };
          resumed = true;
        })
      }

      setTimeout(() => {
        this.emit(
          Events.TIMELINE.PLAY_EVENT,
          Events.VIDEO_EVENTS.TIMEUPDATE
        );
        if (!resumed) {
          logger.log(this.TAG, 'audioCtx 不能自动播放');
          if (this._parent.firstWebAudio) {
            this._paused = true;
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              name: 'NotAllowedError'
            })
          } else {
            this.pause();
            resolve();
          }
          return;
        }
        this._paused = false;
        resolve();
      }, 50);
    });
  }

  pause () {
    if (this._paused || !this.ready) return;
    this.emit(Events.TIMELINE.DO_PAUSE);
    setTimeout(() => {
      this._paused = true;
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PAUSE);
    });
  }

  seek (time) {
    if (this._seeking) return;

    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, this.videoRender.getDtsOfTime(time));
      return;
    }

    if (this._parent.live) return;

    logger.group(this.TAG, 'start seek to:', time);

    /** 点播 seek 链路:
     *  音视频流程暂停, videoRender 销毁audioCtx并新建、videoRender timer暂停,清空_frameQueue
     *  1. seek位置无buffer,emit waiting,等待下载,下载完后 audioRender中调整seek时间，通知videoRender解码
     *  2. seek位置有buffer,直接切换buffer,中调整seek时间，通知videoRender解码
     *  3. audioRender emit ready、videoRender emit ready
     *  4. timeline 监听到READY, 分发 START_RENDER
     */
    this._seeking = true;
    this._resetReadyStatus();
    this.emit(Events.TIMELINE.DO_SEEK, time);
    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.SEEKING);
  }

  dump () {
    return this.audioRender.dump();
  }
}
