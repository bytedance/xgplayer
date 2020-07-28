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
    this.videoRender = new VideoRender(config, this);
    this.audioRender = new AudioRender(config, this);
    this._readyStatus = {
      audio: false,
      video: false
    };
    this._paused = true;
    this._reset = false;
    this._noAudio = false;
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

  get reset () {
    return this._reset;
  }

  _bindEvent () {
    this.audioRender.on(Events.AUDIO.AUDIO_READY, () => {
      logger.log(this.TAG, 'audio ready!');
      this._readyStatus.audio = true;
      if (this._readyStatus.video) {
        this._startRender();
      }
    });

    this.audioRender.on(Events.AUDIO.AUDIO_WAITING, () => {
      if (this._noAudio) return;
      logger.warn(this.TAG, 'lack data, audio waiting,currentTime:', this.currentTime);
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
      this.emit(
        Events.TIMELINE.PLAY_EVENT,
        Events.VIDEO_EVENTS.TIMEUPDATE
      );
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
      this._readyStatus.video = true;
      if (this._readyStatus.audio) {
        this._startRender();
      }
    };

    this.videoRender.on(Events.VIDEO.VIDEO_READY, this.onVideoReady);

    this.videoRender.on(Events.VIDEO.DECODE_LOW_FPS, () => {
      if (this.currentTime < 20) return;
      if (this._paused) return;
      this.pause();
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.LOW_DECODE);
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
  }

  _startRender () {
    if (this._parent.error) return;
    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, 0);
    }
    logger.log(this.TAG, 'startRender: time=', this.currentTime);
    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.CANPLAY);
    this.emit(Events.TIMELINE.START_RENDER);
    this.emit(Events.TIMELINE.READY)
  }

  resetReadyStatus () {
    this._readyStatus = {
      audio: false,
      video: false
    }
  }

  play () {
    return new Promise((resolve, reject) => {
      let resumed = false;

      if (this._noAudio) {
        resumed = true;
      } else {
        this.audioRender.resume().then(() => {
          logger.log(this.TAG, 'audioCtx 开始播放');
          resumed = true;
        })
      }

      setTimeout(() => {
        this.emit(
          Events.TIMELINE.PLAY_EVENT,
          Events.VIDEO_EVENTS.TIMEUPDATE
        );
        if (!resumed) {
          this._reset = true;
          logger.log(this.TAG, 'audioCtx 不能自动播放');
          reject();
          return;
        }
        this._paused = false;
        this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAY);
        resolve();
      }, 30);
    });
  }

  pause () {
    if (this._paused) return;
    this.emit(Events.TIMELINE.DO_PAUSE);
    setTimeout(() => {
      this._paused = true;
      this._reset = true;
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PAUSE);
    }, 10);
  }

  seek () {
    this._reset = true;
  }
}
