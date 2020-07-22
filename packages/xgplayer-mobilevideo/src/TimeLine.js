import EventEmitter from "events";
import { logger } from "xgplayer-helper-utils";
import AudioRender from "./render/AudioRender";
import VideoRender from "./render/VideoRender";
import Events from "./events";

export default class TimeLine extends EventEmitter {
  constructor(config) {
    super();
    this.TAG = "TimeLine";
    this.videoRender = new VideoRender({}, this);
    this.audioRender = new AudioRender(config, this);
    this._readyStatus = {
      audio: false,
      video: false,
    };
    this._reset = false; // 控制下次调play,是否需要销毁实例
    this._paused = true;
    this._noAudio = false;
    this._bindEvent();
  }

  get ready() {
    return this._readyStatus.video && this._readyStatus.audio;
  }

  get played() {
    return {
      length: this.currentTime ? 1 : 0,
      start: () => 0,
      end: () => this.currentTime,
    };
  }

  get decodeFps(){
    return this.videoRender.decodeFps;
  }

  get fps() {
    return this.videoRender.fps;
  }

  get currentTime() {
    if (this._noAudio) return this.videoRender.currentTime;
    return this.audioRender.currentTime;
  }

  get timelinePosition() {
    if (this._noAudio) return performance.now() / 1000; // s
    return this.audioRender.currentTime;
  }

  get canvas() {
    return this.videoRender.canvas;
  }

  get readyState() {
    return this.videoRender.readyState;
  }

  get buffered() {
    if (this._noAudio) return this.videoRender.buffered;
    return this.audioRender.buffered;
  }

  get duration() {
    if (this._noAudio) return this.videoRender.duration;
    return this.audioRender.duration;
  }

  get paused() {
    return this._paused;
  }

  get needReset() {
    return this._reset;
  }

  _bindEvent() {
    this.audioRender.on(Events.AUDIO.AUDIO_READY, () => {
      logger.log(this.TAG, "audio ready!");
      this._readyStatus.audio = true;
      if (this._readyStatus.video) {
        this._startRender();
      }
    });

    this.audioRender.on(Events.AUDIO.AUDIO_WAITING, () => {
      if (this._noAudio) return;
      logger.warn(this.TAG, "lack data, audio waiting");
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
      this.emit(Events.TIMELINE.DO_PAUSE);
      this._readyStatus.audio = false;
    });

    // only used for no audio exist
    this.videoRender.on(Events.VIDEO.VIDEO_WAITING, () => {
      logger.warn(this.TAG, "lack data, video waiting");
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.WAITING);
      this.emit(Events.TIMELINE.DO_PAUSE);
      this._readyStatus.video = false;
    });

    this.videoRender.on(Events.VIDEO.VIDEO_DECODER_INIT, () => {
      logger.log(this.TAG, "video decoder init!");
      setTimeout(() => {
        if (!this._readyStatus.video) {
          logger.warn(this.TAG, "video 首次解码无解码帧返回! auto ready!");
          this.videoRender.updateReady();
          this.onVideoReady();
        }
      }, 1000);
    });

    this.onVideoReady = () => {
      logger.log(this.TAG, "video ready!");
      this._readyStatus.video = true;
      if (this._readyStatus.audio) {
        this._startRender();
      }
    };

    this.videoRender.on(Events.VIDEO.VIDEO_READY, this.onVideoReady);

    this.videoRender.on(Events.VIDEO.DECODE_LOW_FPS,()=>{
      if(this.currentTime < 25) return;
      
      this.pause();
      this.emit(Events.TIMELINE.LOW_DECODE);
    })

    this.on(Events.TIMELINE.NO_AUDIO, () => {
      this._noAudio = true;
      this._readyStatus.audio = true;
    });


    this.on(Events.TIMELINE.PLAY_EVENT, (status) => {
      if (status === "playing") {
        this._paused = false;
        // for 安卓暂停后切后台 再切回自动播放
        if(!this.videoRender.running){
            this.videoRender.emit(Events.VIDEO.AUTO_RUN)
        }
      }
      if (status === "error") {
        this._reset = true;
      }
    });

  }

  _startRender() {
    this.emit(Events.TIMELINE.READY)
    if (this._noAudio) {
      this.emit(Events.TIMELINE.SYNC_DTS, 0);
    }
    logger.log(this.TAG, "startRender: time=", this.currentTime);
    this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.CANPLAY);
    this.emit(Events.TIMELINE.START_RENDER);
  }

  play() {
    return new Promise((resolve, reject) => {
      let resumed = false;

      if (this._noAudio) {
        resumed = true;
      } else {
        this.audioRender.resume().then(() => {
          resumed = true;
        });
      }

      setTimeout(() => {
        if (!resumed) {
          logger.log(this.TAG,'audioCtx 不能自动播放');
          this._reset = true; // 不能自动播放
          reject();
          return;
        }
        this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PLAY);
        resolve();
      }, 30);
    });
  }

  pause() {
    if (this._paused) return;
    this._paused = true;
    this._reset = true;
    this.emit(Events.TIMELINE.DO_PAUSE);
    setTimeout(() => {
      this.emit(Events.TIMELINE.PLAY_EVENT, Events.VIDEO_EVENTS.PAUSE);
    });
  }

  seek() {}
}
