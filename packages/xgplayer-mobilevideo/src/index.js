/* eslint-disable no-undef */
import NoSleep from './helper/nosleep';
import { playSlienceAudio } from './helper/audio-helper'
import './polyfills/custom-elements.min';
import './polyfills/native-element';
// eslint-disable-next-line standard/object-curly-even-spacing
import { logger, common} from 'xgplayer-helper-utils';
import TimeLine from './TimeLine';
import Events from './events';

const { debounce } = common;

class MVideo extends HTMLElement {
  constructor () {
    super();
    this.TAG = 'MVideo';
    this._proxyProps();
    this._isLive = true;
    this._vMeta = null;
    this._aMeta = null;
    this._degradeVideo = document.createElement('video');
    this._eventsBackup = [];
    this._audioCanAutoplay = true;
    this._init();
    this._firstWebAudio = true;
    this._startPlayed = false;
    this._debounceSeek = debounce(this._seek.bind(this), 600);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  }

  // 代理外部常用属性,容错处理
  _proxyProps () {
    Object.getOwnPropertyNames(MVideo.prototype).forEach(prop => {
      if (!/^__/.test(prop)) return;
      const p = prop.replace('__', '');
      Object.defineProperty(this, p, {
        get: function () {
          try {
            return this[prop];
          } catch (e) {}
          return 0;
        },
        set: function (v) {
          try {
            this[prop] = v;
          } catch (e) {}
        }
      })
    })
  }

  static isSupported () {
    let v = localStorage.getItem('mvideo_dis265');
    if (!v) return true;

    if (v === '1') return false;

    if (v === '2') {
      let disTime = localStorage.getItem('mvideo_disTime') || 0;
      disTime = Number(disTime);
      let disDuration = (new Date().getTime() - disTime) / 1000;

      if (disDuration < 3600 * 24) {
        return false;
      }
      localStorage.removeItem('mvideo_disTime');
      localStorage.removeItem('mvideo_dis265');
    }
    return true;
  }

  addEventListener (eventName, handler, capture) {
    super.addEventListener(eventName, handler, capture);
    this._eventsBackup.push([eventName, handler, capture]);
  }

  removeEventListener (eventName, handler, capture) {
    super.removeEventListener(eventName, handler, capture)
    this._eventsBackup = this._eventsBackup.filter(x => !(x.eventName === eventName && x.handler === handler && x.capture === capture))
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
    this._degradeVideoUserGestured = false;
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
      this.muted = this.muted;
    });
  }

  _bindEvents () {
    this.timeline.on(Events.TIMELINE.PLAY_EVENT, (status, data) => {
      if (status === 'canplay') {
        if (!this.querySelector('canvas')) {
          this.appendChild(this.canvas);
        }
      }

      if (status === 'loadeddata') {
        Promise.resolve().then(() => {
          this.timeline.emit(Events.VIDEO.UPDATE_VIDEO_FILLTYPE, this.xgfillType, this.containerLayout)
        })
      }

      if (status === 'error') {
        logger.warn(this.TAG, 'detect error:', data.message);
        this.pause();
        // 发生错误时 禁用
        this._disabled(true);

        if (this.innerDegrade) {
          // 内部降级的话,不对外emit error,改成lowdecode,同时degrade()中控制禁用
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
        this._disabled();
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

      if (status === 'progress') {
        this._noSleep.toPlay();
      }

      this._innerDispatchEvent(status);
    });
  }

  // 禁用逻辑
  _disabled (force) {
    // 永久禁用
    if (force || !this.decodeFps || (this.decodeFps / this.fps <= 0.8 && this.bitrate < 2000000)) {
      localStorage.setItem('mvideo_dis265', 1);
      return
    }
    if (localStorage.getItem('mvideo_dis265')) return;
    // 禁用24h
    localStorage.setItem('mvideo_dis265', 2);
    localStorage.setItem('mvideo_disTime', new Date().getTime())
  }

  /**
   *  内部降级
   *  innerDegrade==1 : 降级到video直接播放hls
   *  innerDegrade==2 : 降级到mse
   *  @param {string} url  强制切换到url地址并且使用video直接播放
   *  @param {boolean} useMse 降级到mse来播放时 不用设置degradeVideo.src
   */
  degrade (url, useMse) {
    url = url || this.src;
    let canvasAppended = !!this.querySelector('canvas');
    if (canvasAppended) {
      this.replaceChild(this._degradeVideo, this.canvas);
    } else {
      this.appendChild(this._degradeVideo);
    }
    this.destroy();

    // 销毁MVideo上的事件
    this._eventsBackup.forEach(([eName, eHandler, capture]) => {
      super.removeEventListener.call(this, eName, eHandler, capture)
      // 给degradeVideo 绑定事件
      this._degradeVideo.addEventListener(eName, eHandler, capture)
    })

    this._eventsBackup = [];

    this._degradeVideo.muted = false;

    if (!useMse) {
      this._degradeVideo.src = url;
      this._degradeVideo.load();
      this._degradeVideo.play().then(() => {
        console.log('降级自动播放');
      }).catch(e => {
        console.log('degrade video:', e.message);
      });
    }
    this._degradeVideo = null;
  }

  disconnectedCallback () {
    logger.log(this.TAG, 'video disconnected');
    document.removeEventListener('touchend', this._onTouchEnd, true)
    this.destroy();
  }

  connectedCallback () {
    logger.log(this.TAG, 'video connected to document');
    if (!this.timeline) {
      this._init();
    }
    document.addEventListener('touchend', this._onTouchEnd, true)
  }

  // 监听手势交互,对防息屏video、背景audio、降级用到video来调用play
  _onTouchEnd () {
    playSlienceAudio();
    this._degradeVideoInteract();
    if (this._noSleep) {
      this._noSleep.enable();
    }
  }

  handleMediaInfo () {
    this._logFirstFrame = false;
  }

  _degradeVideoInteract () {
    // Note
    if (this._degradeVideo && (this.innerDegrade === 1 || this.innerDegrade === 3)) {
      if (this._degradeVideoUserGestured) return;
      this._degradeVideo.muted = true;
      this._degradeVideo.play().then(() => {
        this._degradeVideo.pause();
        this._degradeVideoUserGestured = true;
      }).catch(e => {
        console.log('degrade video: ', e.message);
      })
    }
  }

  play (forceDestroy) {
    logger.log(
      this.TAG,
      `mvideo called play(),ready:${this.timeline.ready}, paused:${this.timeline.paused}`
    );

    this._degradeVideoInteract();

    // 直播: paused后 reset timeline
    // 点播: paused后 起播
    if ((this.timeline.ready && this.timeline.paused) || forceDestroy) {
      forceDestroy = forceDestroy || this._isLive;
      this._playRequest = null;
      if (forceDestroy) {
        this.destroy();
        this._init();
        this._innerDispatchEvent('waiting');
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
        this._noSleep.enable();
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
      let vSam0 = videoTrack && videoTrack.samples[0];
      let aSam0 = audioTrack && audioTrack.samples[0];
      if (!vSam0 && !aSam0) return;
      if (vSam0 || aSam0) {
        logger.warn(
          this.TAG,
          `video firstDts:${vSam0 && vSam0.dts} , audio firstDts:${aSam0 && aSam0.dts}`
        );
        this._logFirstFrame = true;
      }
      if (this.lowlatency || (!aSam0 && !this._aMeta)) {
        let type = this.lowlatency ? 1 : 2;
        logger.warn(this.TAG, 'video set noAudio! type=', type);
        this.timeline.emit(Events.TIMELINE.NO_AUDIO, type);
      }
    }
    this.timeline.appendBuffer(videoTrack, audioTrack)
  }

  setAudioMeta (meta) {
    this._aMeta = meta;
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
    if (!this.timeline) return;
    this._noSleep.destroy();
    logger.log(this.TAG, 'call destroy');
    this.timeline.emit(Events.TIMELINE.DESTROY);
    this.timeline = null;
    this._err = null;
    this._noSleep = null;
  }

  // 只初始化播放器时记录一次
  updateCanplayStatus (canplay) {
    if (canplay) return;
    let ua = navigator.userAgent;
    // chrome下首个webaudio不能自动播放，但手势交互后后续新建的webaudio可自动播放
    if (/Chrome/.test(ua)) return;
    this._audioCanAutoplay = canplay;
  }

  updateObjectPosition (left, top) {
    this.timeline.emit(Events.VIDEO.UPDATE_VIDEO_COVER_POSITION, this.containerLayout, left, top);
    if (this._degradeVideo) {
      this._degradeVideo.style.objectPosition = `${left * 100}% ${top * 100}%`;
    }
  }

  dump () {
    return this.timeline.dump();
  }

  get startPlayed () {
    return this._startPlayed;
  }

  set startPlayed (v) {
    this._startPlayed = v;
  }

  get live () {
    return this._isLive;
  }

  get firstWebAudio () {
    return this._firstWebAudio;
  }

  get lowlatency () {
    return this.getAttribute('lowlatency') === 'true';
  }

  set lowlatency (val) {
    this.setAttribute('lowlatency', val);
  }

  get autoplay () {
    return this.getAttribute('autoplay') === 'true';
  }

  set autoplay (v) {
    this.setAttribute('autoplay', v);
  }

  get __canvas () {
    return this.timeline.canvas;
  }

  get __width () {
    return this.getAttribute('width') || this.videoWidth;
  }

  set __width (val) {
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('width', pxVal);
    this.canvas.width = val;
  }

  get __height () {
    return this.getAttribute('height');
  }

  set __height (val) {
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('height', pxVal);
    this.canvas.height = val;
  }

  get __videoWidth () {
    return this.canvas.width;
  }

  get __videoHeight () {
    return this.canvas.height;
  }

  get __volume () {
    return Number(this.getAttribute('volume'));
  }

  set __volume (v) {
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

  get __muted () {
    return this.getAttribute('muted') === 'true';
  }

  set __muted (v) {
    this.setAttribute('muted', v);
    this._degradeVideoInteract();
    this._noSleep.enable();
    this.timeline.emit(Events.TIMELINE.UPDATE_VOLUME, v ? 0 : this.volume);
  }

  get __currentTime () {
    if (!this.timeline) return 0;
    let c = this.timeline.currentTime;
    let d = this.timeline.duration;
    return Math.min(c, d);
  }

  set __currentTime (v) {
    this._debounceSeek(v);
  }

  _seek (v) {
    if (!this.timeline) return;
    this.timeline.seek(Number(v));
  }

  get __duration () {
    return this.timeline.duration;
  }

  set __duration (v) {
    this.timeline.emit(Events.TIMELINE.SET_VIDEO_DURATION, v);
  }

  get __seeking () {
    return this.timeline.seeking;
  }

  get __paused () {
    return this.timeline.paused;
  }

  get __fps () {
    return this.timeline.fps;
  }

  get __decodeFps () {
    return this.timeline.decodeFps;
  }

  get __decodeCost () {
    return parseInt(this.timeline.decodeCost);
  }

  get __bitrate () {
    return this.timeline.bitrate;
  }

  get __gopLength () {
    return this.timeline.gopLength;
  }

  get __readyState () {
    return this.timeline.readyState;
  }

  get __buffered () {
    return this.timeline.buffered;
  }

  get src () {
    return this.getAttribute('src');
  }

  set src (val) {
    if (this.src && this.buffered.length) {
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

  get innerDegrade () {
    let v = this.getAttribute('innerdegrade');
    return parseInt(v);
  }

  set __glCtxOptions (v) {
    this._glCtxOptions = v;
    this.timeline.emit(Events.TIMELINE.UPDATE_GL_OPTIONS, v);
  }

  get __error () {
    return this._err;
  }

  set __error (v) {
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

  get xgfillType () {
    return this.parentNode.getAttribute('data-xgfill');
  }

  get containerLayout () {
    let p = this.parentNode;
    return {
      width: p.clientWidth,
      height: p.clientHeight
    }
  }
}

customElements.define('mobile-video', MVideo);
