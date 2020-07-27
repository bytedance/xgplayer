import NoSleep from './helper/nosleep';
import './polyfills/custom-elements.min';
import './polyfills/native-element';
import { logger } from 'xgplayer-helper-utils';
import TimeLine from './TimeLine';
import Events from './events';

class MVideo extends HTMLElement {
  constructor () {
    super();
    this.TAG = 'MVideo';
    this._init();
  }

  _init () {
    this.timeline = new TimeLine({
      preloadTime: this.preloadTime,
      volume: this.volume,
      canvas: this.querySelector('canvas')
    }, this);
    this._noSleep = new NoSleep();
    this._logFirstFrame = false;
    this._playRequest = null;
    this._bindEvents();
    setTimeout(() => {
      if (this.noAudio) {
        this.setNoAudio();
      }
    });
  }

  _bindEvents () {
    this.timeline.on(Events.TIMELINE.PLAY_EVENT, (status, data) => {
      if (status === 'canplay') {
        if (!this.querySelector('canvas')) {
          this.appendChild(this.canvas);
        }
      }
      if (status === 'error') {
        this._err = data;
        logger.warn(this.TAG, 'detect error:', data.message)
        this.pause();
      }
      if (status === 'ended') {
        this.pause();
      }
      this._innerDispatchEvent(status);
    });
  }

  disconnectedCallback () {
    logger.log(this.TAG, 'video disconnected');
    this.destroy();
  }

  connectedCallback () {
    logger.log(this.TAG, 'video connected to document');
    if (!this.timeline) {
      this._init();
    }
  }

  handleMediaInfo () {
    this._logFirstFrame = false;
  }

  play () {
    logger.log(
      this.TAG,
      'mvideo called play(),to reset video:',
      this.timeline.ready,
      this.timeline.paused
    );

    // 暂停后起播
    // 初始化后不能自动播放,手动播放
    if (this.timeline.ready && this.timeline.reset) {
      this.destroy();
      this._init();
      this.timeline.resetReadyStatus();
      this._playRequest = null;
    }

    this._playRequest =
      this._playRequest ||
      new Promise((resolve, reject) => {
        this._innerDispatchEvent('timeupdate');
        this._innerDispatchEvent('play');
        this._innerDispatchEvent('waiting');
        this._noSleep.enable();
        this.timeline.once('ready', () => {
          this._playRequest = null;
          this.timeline.play().then(resolve).catch(reject);
        });
      });

    return this._playRequest;
  }

  pause () {
    this._playRequest = null;
    this.timeline.pause();
    this._noSleep.disable();
  }

  load () {}

  onDemuxComplete (videoTrack, audioTrack) {
    if (this.error || !this.timeline) return;
    if (!this._logFirstFrame) {
      let vSam0 = videoTrack.samples[0];
      let aSam0 = this.noAudio ? null : audioTrack.samples[0];
      if ((vSam0 && aSam0) || (vSam0 && this.noAudio)) {
        logger.log(
          this.TAG,
          `video firstDts:${vSam0.dts} , audio firstDts:${
            this.noAudio ? 0 : aSam0.dts
          }`
        );
        this._logFirstFrame = true;
      }
    }
    this.timeline.emit(Events.TIMELINE.APPEND_CHUNKS, videoTrack, audioTrack);
  }

  setNoAudio () {
    logger.log(this.TAG, 'video set noAudio!');
    this.timeline.emit(Events.TIMELINE.NO_AUDIO);
    this.noAudio = true;
  }

  setAudioMeta (meta) {
    this.timeline.emit(Events.TIMELINE.SET_METADATA, 'audio', meta);
  }

  setVideoMeta (meta) {
    this.timeline.emit(Events.TIMELINE.SET_METADATA, 'video', meta);
  }

  handleEnded () {
    this.timeline.emit(Events.TIMELINE.PLAY_EVENT, 'ended');
  }

  handleErr (code, message) {
    this._err = {};
    this._err.code = code;
    this._err.message = message;
    this.timeline.emit(Events.TIMELINE.PLAY_EVENT, 'error');
  }

  _innerDispatchEvent (type) {
    this.dispatchEvent(new Event(type));
  }

  destroy () {
    logger.log(this.TAG, 'call destroy');
    this.timeline.emit(Events.TIMELINE.DESTROY);
    this.timeline = null;
    this._err = null;
    this._noSleep = null;
  }

  get noAudio () {
    return this.getAttribute('noaudio') === 'true';
  }

  set noAudio (val) {
    this.setAttribute('noaudio', val);
  }

  get canvas () {
    return this.timeline.canvas;
  }

  get width () {
    return this.getAttribute('width') || this.videoWidth;
  }

  set width (val) {
    this.style.display = 'inline-block';
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('width', pxVal);
    this.style.width = pxVal;
    this.canvas.width = val;
  }

  get height () {
    return this.getAttribute('height');
  }

  set height (val) {
    this.style.display = 'inline-block';
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('height', pxVal);
    this.style.height = pxVal;
    this.canvas.height = val;
  }

  get videoWidth () {
    return this.canvas.width;
  }

  get videoHeight () {
    return this.canvas.height;
  }

  get volume () {
    return Number(this.getAttribute('volume'));
  }

  set volume (v) {
    if (v <= 0) {
      v = 0;
    }
    if (v >= 1) {
      v = 1;
    }
    this.setAttribute('volume', v);
    this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v);
  }

  get muted () {
    return this.getAttribute('muted') === 'true' || this.volume == 0;
  }

  set muted (v) {
    this.setAttribute('muted', v);
    this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v ? 0 : this.volume);
  }

  get currentTime () {
    let c = this.timeline.currentTime;
    let d = this.timeline.duration;
    return c > d ? d : c;
  }

  set currentTime (v) {
    this.timeline.seek(v);
  }

  get duration () {
    return this.timeline.duration;
  }

  get seeking () {
    return false;
  }

  get paused () {
    return this.timeline.paused;
  }

  get fps () {
    return this.timeline.fps;
  }

  get decodeFps () {
    return this.timeline.decodeFps;
  }

  get decodeCost () {
    return parseInt(this.timeline.decodeCost);
  }

  get bitrate () {
    return this.timeline.bitrate;
  }

  get readyState () {
    return this.timeline.readyState;
  }

  get buffered () {
    return this.timeline.buffered;
  }

  get src () {
    return this.getAttribute('src');
  }

  set src (val) {
    this.setAttribute('src', val);
  }

  set playbackRate (v) {}

  get playbackRate () {
    return 1;
  }

  get networkState () {
    return 0;
  }

  get preloadTime () {
    const attrPreloadTime = this.getAttribute('preloadtime');
    if (attrPreloadTime) {
      const preloadTime = Number.parseFloat(attrPreloadTime);
      if (preloadTime > 0 && !Number.isNaN(preloadTime)) {
        return preloadTime;
      }
    }
    return Infinity;
  }

  set preloadTime (val) {
    if (val && Number(val) > 0) {
      this.setAttribute('preloadtime', val);
    }
  }

  get error () {
    return this._err;
  }
}

customElements.define('mobile-video', MVideo);
