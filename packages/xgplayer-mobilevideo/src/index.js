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
    this._isLive = true;
    this._vMeta = null;
    this._degradeVideo = document.createElement('video');
    this._eventsBackup = [];
    this._init();
    this._firstWebAudio = true;
  }

  addEventListener (eventName, handler, capture) {
    super.addEventListener(eventName, handler, capture);
    this._eventsBackup.push([eventName, handler]);
    this._degradeVideo.addEventListener(eventName, handler, capture);
  }

  removeEventListener (eventName, handler, capture) {
    super.removeEventListener(eventName, handler, capture)
    this._degradeVideo.removeEventListener(eventName, handler, capture);
  }

  setAttribute (k, v) {
    super.setAttribute(k, v);
    if (k === 'src') return;
    this._degradeVideo.setAttribute(k, v);
  }

  _init () {
    this.timeline = new TimeLine({
      volume: this.volume,
      canvas: this.querySelector('canvas')
    }, this);
    this._firstWebAudio = false;
    this._noSleep = new NoSleep();
    this._logFirstFrame = false;
    this._playRequest = null;
    this._bindEvents();
    if (this._vMeta) {
      this.setVideoMeta(this._vMeta);
    }
    if (this._glCtxOptions) {
      this.glCtxOptions = this._glCtxOptions;
    }
    setTimeout(() => {
      if (!this.timeline) return;
      if (this.innerDegrade) {
        this.timeline.emit(Events.TIMELINE.INNER_DEGRADE);
      }
      this.setPlayMode(this._isLive && 'LIVE');
      if (this.noAudio) {
        this.setNoAudio();
      }
      this.muted = this.muted;
    });
  }

  _bindEvents () {
    this.timeline.on(Events.TIMELINE.PLAY_EVENT, (status, data) => {
      // console.log(status,'////////////');
      if (status === 'canplay') {
        if (!this.querySelector('canvas')) {
          this.appendChild(this.canvas);
        }
      }

      if (status === 'error') {
        logger.warn(this.TAG, 'detect error:', data.message);
        this.pause();
        if (this.innerDegrade) {
          // 内部降级的话,不对外emit error,改成lowdecode
          this.degradeInfo = {
            decodeFps: this.decodeFps,
            bitrate: this.bitrate,
            fps: this.fps,
            url: this.src,
            msg: data.message
          };
          this._innerDispatchEvent('lowdecode');
          return;
        }
        this._err = data;
      }

      if (status === 'lowdecode') {
        this.degradeInfo = {
          decodeFps: this.decodeFps,
          bitrate: this.bitrate,
          fps: this.fps,
          url: this.src
        };
        this._innerDispatchEvent(status);
        return;
      }

      if (status === 'ended') {
        this.pause();
      }

      this._innerDispatchEvent(status);
    });
  }

  // 降级到video播放
  degrade () {
    let url = this.src;
    let canvasAppended = !!this.querySelector('canvas');
    if (canvasAppended) {
      this.replaceChild(this._degradeVideo, this.canvas);
    } else {
      this.appendChild(this._degradeVideo);
    }
    this._degradeVideo.src = url;
    this.destroy();
    this._degradeVideo.muted = false;
    this._degradeVideo.play().then(() => {
      console.log('降级自动播放');
    }).catch(e => {
      console.log('degrade video play:', e.message, document.querySelector('video').muted);
    });

    // 销毁MVideo上的事件
    this._eventsBackup.forEach(([eName, eHandler]) => {
      super.removeEventListener.call(this, eName, eHandler)
    })
    this._eventsBackup = [];
    this._degradeVideo = null;
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

  _interceptAction () {
    if (this._degradeVideo) {
      this._degradeVideo.muted = true;
      this._degradeVideo.play().then(() => {
        this._degradeVideo.pause();
      }).catch(e => {
        console.log('interceptAction: ', e.message);
      })
    }
  }

  play (forceDestroy) {
    logger.log(
      this.TAG,
      `mvideo called play(),ready:${this.timeline.ready}, paused:${this.timeline.paused}`
    );

    this._interceptAction();

    // 直播: paused后 reset timeline
    // 点播: paused后 起播
    if ((this.timeline.ready && this.timeline.paused) || forceDestroy) {
      forceDestroy = forceDestroy || this._isLive;
      this._playRequest = null;
      if (forceDestroy) {
        this.destroy();
        this._init();
      } else {
        this.timeline.emit(Events.TIMELINE.DO_PLAY);
        this._innerDispatchEvent('play');
        return Promise.resolve();
      }
    }

    // 正在播放中 调play()
    if (!this._playRequest && this.timeline.ready && !this.timeline.paused) {
      return Promise.resolve();
    }

    this._playRequest =
      this._playRequest ||
      new Promise((resolve, reject) => {
        this.timeline._paused = false;
        this._innerDispatchEvent('timeupdate');
        this._innerDispatchEvent('play');
        this._innerDispatchEvent('waiting');
        try {
          this._noSleep.enable();
        } catch (e) {}
        this.timeline.once('ready', () => {
          logger.log(this.TAG, 'timeline emit ready');
          this.timeline.play()
            .then(resolve)
            .catch(reject)
            .then(() => {
              this._playRequest = null;
            });
        });
      });

    return this._playRequest;
  }

  pause () {
    this._playRequest = null;
    this.timeline.pause();
    try {
      this._noSleep.disable();
    } catch (e) {}
  }

  load () {}

  /** *************** 外部数据交互主要接口 */
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
    this.timeline.appendBuffer(videoTrack, audioTrack)
  }

  setNoAudio () {
    logger.log(this.TAG, 'video set noAudio!');
    this.timeline.emit(Events.TIMELINE.NO_AUDIO);
    this.noAudio = true;
  }

  setAudioMeta (meta) {
    this.timeline.emit(Events.TIMELINE.SET_METADATA, 'audio', meta);
  }

  // warn: 对点播,flush decoder应该放在分片被真实解码之前
  setVideoMeta (meta) {
    if (!this._isLive && this._vMeta) return;
    this.timeline.emit(Events.TIMELINE.SET_METADATA, 'video', meta);
    this._vMeta = meta;
  }

  setPlayMode (v) {
    this.timeline.emit(Events.TIMELINE.SET_PLAY_MODE, v);
    this._isLive = v === 'LIVE';
  }
  /** *************** 外部数据交互主要接口 end */

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
    if (this.timeline) {
      logger.log(this.TAG, 'call destroy');
      this.timeline.emit(Events.TIMELINE.DESTROY);
      this.timeline = null;
      this._err = null;
      this._noSleep = null;
    }
  }

  dump () {
    return this.timeline.dump();
  }

  get live () {
    return this._isLive;
  }

  get firstWebAudio () {
    return this._firstWebAudio;
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
    if (this.muted) return;
    this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v);
  }

  get muted () {
    return this.getAttribute('muted') === 'true';
  }

  set muted (v) {
    console.log('oopopop', v);
    this.setAttribute('muted', v);
    this._interceptAction();
    this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v ? 0 : this.volume);
  }

  get currentTime () {
    if (!this.timeline) return 0;
    let c = this.timeline.currentTime;
    let d = this.timeline.duration;
    return Math.min(c, d);
  }

  set currentTime (v) {
    this.timeline.seek(Number(v));
  }

  get duration () {
    return this.timeline.duration;
  }

  set duration (v) {
    this.timeline.emit(Events.TIMELINE.SET_VIDEO_DURATION, v);
  }

  get seeking () {
    return this.timeline.seeking;
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

  get gopLength () {
    return this.timeline.gopLength;
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
    if (this.src) {
      this._vMeta = null;
      this.play('destroy');
    }
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

  // 移动端软解 启用内部降级
  get innerDegrade () {
    return this.getAttribute('innerdegrade');
  }

  set glCtxOptions (v) {
    this._glCtxOptions = v;
    this.timeline.emit(Events.TIMELINE.UPDATE_GL_OPTIONS, v);
  }

  get error () {
    return this._err;
  }

  set error (v) {
    this.timeline.emit(Events.TIMELINE.PLAY_EVENT, 'error', v);
  }

  get degradeVideo () {
    return this._degradeVideo;
  }

  set degradeInfo (v) {
    this._deradeInfo = v;
  }

  get degradeInfo () {
    return this._deradeInfo;
  }
}

customElements.define('mobile-video', MVideo);
