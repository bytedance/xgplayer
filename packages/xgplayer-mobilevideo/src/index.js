import './polyfills/custom-elements.min';
import './polyfills/native-element';
import { getTicker, DEFAULT_FPS, validateFPS } from './helpers/ticker';
import VideoCtx, {VIDEO_CANVAS_EVENTS} from './core/video-context';
import AudioCtx from './core/audio-context';
import AVReconciler from './helpers/reconciler';
import WorkerTicker from './helpers/worker-ticker'
// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor () {
    super();
    this._canvas = document.createElement('canvas')
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this)
    this.played = false;
    this.pendingPlayTask = null
    this._waiting = false;
    this._paused = true;
    this.videoMetaInited = false;
    this.audioMetaInited = false;
    this.handleVCtxInnerEvent = this.handleVCtxInnerEvent.bind(this)
    this._err = null
    this._lastTimeupdateStamp = 0
    this._volumeEventStamp = 0
    this._hasDispatch = false
    this._fps = DEFAULT_FPS
  }

  init () {
    this._destroyed = false
    if (this.vCtx) {
      this.vCtx.destroy();
    }
    this.vCtx = new VideoCtx(Object.assign({
      canvas: this._canvas,
      preloadTime: this.preloadTime
    }, { style: { width: this.width, height: this.height } }));

    // this._innerDispatchEvent('waiting')
    this.vCtx.oncanplay = () => {
      if (!this.played) {
        if (!this.contains(this._canvas)) {
          this.appendChild(this._canvas);
          // if (this.autoplay) {
          //   this._innerDispatchEvent('play')
          // }
        }
      }
    }
    this.vCtx.on(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, this.handleVCtxInnerEvent)
  }

  _initAudio () {
    let attrVolume = this.getAttribute('volume')
    const volume = this.muted ? 0 : Number.parseFloat(attrVolume)
    if (!this.noAudio) {
      this.aCtx = new AudioCtx({
        volume
      });
    }
    this.ticker = new WorkerTicker({interval: 1000 / this._fps})
    // this.ticker = new (getTicker({interval: 1000 / this._fps}))()
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx,
      video: this
    })
    if (!this.noAudio) {
      this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
    }
  }

  handleVCtxInnerEvent (eventName) {
    this._innerDispatchEvent(eventName)
  }

  handleAudioSourceEnd () {
    this.reconciler.doReconcile()
    this.vCtx.cleanBuffer();
    this.aCtx.preload();
    this.vCtx.preload();
  }

  _cleanBuffer () {
    this.vCtx.cleanBuffer()
  }

  _destroyAudio () {
    this.audioMetaInited = false;
    if (!this.noAudio && this.aCtx) {
      this.aCtx.removeListener('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
      this.aCtx.destroy()
    }
    this.start = null;
    this.aCtx = null;
    this.ticker.stop()
    this.ticker = null;
    this.pendingPlayTask = null;
    this.played = false;
    this._hasDispatch = false;
  }

  _destroyVideo () {
    this.videoMetaInited = false;
    this.vCtx.removeAllListeners();
    this.vCtx.destroy()
    this.vCtx = null;
  }

  destroy () {
    if (this._destroyed) {
      return
    }

    this.reconciler.destroy()
    this._destroyed = true
    this._destroyVideo()
    this._destroyAudio()
  }

  onDemuxComplete (videoTrack, audioTrack) {
    if (!this.noAudio) {
      this.aCtx.decodeAudio(audioTrack);
    }
    this.vCtx.decodeVideo(videoTrack);
  }

  decodeVideoBuffer (buffer) {
    this.vCtx.decodeVideoBuffer(buffer)
  }

  setAudioMeta (meta) {
    if (this.noAudio) {
      return;
    }
    this.aCtx.setAudioMetaData(meta);
    this.audioMetaInited = true;
  }

  setVideoMeta (meta) {
    this.vCtx.setVideoMetaData(meta);
    this.videoMetaInited = true;
  }

  handleMediaInfo () {
    this._innerDispatchEvent('durationchange');
    this._innerDispatchEvent('loadedmetadata');
    this._innerDispatchEvent('seeking');
    this._innerDispatchEvent('seeked');
  }

  handleEnded () {
    this._innerDispatchEvent('ended');
  }

  handleErr (code, message) {
    this._err = {}
    this._err.code = code
    this._err.message = message
    this._innerDispatchEvent('error')
  }

  _innerDispatchEvent (type) {
    this.dispatchEvent(new Event(type))
  }

  disconnectedCallback () {
    this.destroy()
  }

  connectedCallback () {
    // console.log('connected callback', this.noAudio)
    this._currentTime = 0;
    this.start = undefined;
    this.init()
    this._initAudio();
    this.vCtx.reset()
  }

  get width () {
    return this.getAttribute('width') || this.videoWidth
  }

  set width (val) {
    this.style.display = 'inline-block'
    const pxVal = typeof val === 'number' ? `${val}px` : val
    this.setAttribute('width', pxVal)
    this.style.width = pxVal
    this._canvas.width = val;
  }

  get height () {
    return this.getAttribute('height')
  }

  set height (val) {
    this.style.display = 'inline-block'
    const pxVal = typeof val === 'number' ? `${val}px` : val
    this.setAttribute('height', pxVal)
    this.style.height = pxVal
    this._canvas.height = val;
  }

  get videoWidth () {
    if (this.vCtx && this.vCtx.videoWidth) {
      return this.vCtx.videoWidth
    }
    return 0
  }

  get videoHeight () {
    if (this.vCtx && this.vCtx.videoHeight) {
      return this.vCtx.videoHeight
    }
    return 0
  }

  get src () {
    return this.getAttribute('src');
  }

  set src (val) {
    this.setAttribute('src', val);
  }

  get readyState () {
    return this.videoMetaInited ? this.vCtx.readyState : 0
  }

  get seeking () {
    return this.videoMetaInited ? this.vCtx.seeking : false
  }

  get currentTime () {
    return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0
  }

  set currentTime (val) {
    const nVal = Number.parseFloat(val)
    if (!isNaN(nVal)) {
      if (this.start && this.currentTime) {
        this.vCtx.setVideoSeeking()
        const gap = this.currentTime - nVal;
        this.start += (gap * 1000)
      }
    }
    return nVal;
  }

  get duration () {
    return this.audioMetaInited ? this.aCtx.duration : 0
  }

  get paused () {
    return this._paused
  }

  get playbackRate () {
    if (this.hasAttribute('playbackRate')) {
      return this.getAttribute('playbackRate')
    } else {
      return 1.0
    }
  }

  set playbackRate (val) {
    this.setAttribute('playbackrate', val);
    if (!this.noAudio) {
      this.aCtx.playbackRate = val;
    }
    this.vCtx.playbackRate = val;

    this._innerDispatchEvent('ratechange')
  }

  get ended () {
    if (this.audioMetaInited) {
      return this.aCtx.ended;
    }
    return false;
  }

  get autoplay () {
    if (this.hasAttribute('autoplay')) {
      return this.getAttribute('autoplay') == 'true'
    } else {
      return false
    }
  }
  set autoplay (value) {
    this.setAttribute('autoplay', value)
  }
  play () {
    if (this.pendingPlayTask) {
      return;
    }

    if (this.played) {
      this.connectedCallback()
    }

    if (!this.autoplay && !this._hasDispatch) {
      this._innerDispatchEvent('waiting')
      this._hasDispatch = true
      this._waiting = true
    }

    this._paused = false
    this._innerDispatchEvent('play')
    let audioPlayTask = null

    if (this.noAudio) {
      audioPlayTask = Promise.resolve()
    } else {
      audioPlayTask = this.aCtx.play()
    }
    this.pendingPlayTask = Promise.all([
      this.vCtx.play(),
      audioPlayTask.then(() => {
        if (this.aCtx) {
          this.aCtx.muted = true
        }
      })
    ]).then(() => {
      if (this.aCtx) {
        this.aCtx.muted = false
      }
      this.ticker.start(() => {
        this.vCtx.preload()
        if (!this.start) {
          this.start = Date.now()
          this._lastTimeupdateStamp = this.start
        }
        const prevTime = this._currentTime;

        this._currentTime = Date.now() - this.start

        // console.log(this._currentTime, ' ', this.start)
        const rendered = this.vCtx._onTimer(this._currentTime)
        if (rendered) {
          if (this._waiting) {
            this._innerDispatchEvent('playing')
            this._waiting = false;
          }
          let now = Date.now()
          if (now - this._lastTimeupdateStamp >= 250) { // debounce
            this._lastTimeupdateStamp = now
            this._innerDispatchEvent('timeupdate')
          }
        } else {
          this._currentTime = prevTime;
          this.start += (Date.now() - this.start - prevTime);
          if (!this._waiting && !this.paused) {
            this._waiting = true;
            this._innerDispatchEvent('waiting')
          }
        }
      });
      this.pendingPlayTask = null
      this.played = true;
      // this._innerDispatchEvent('playing')
    }).catch((e) => {
      this.pendingPlayTask = null
      this._paused = true;
      console.error(e);
      throw e;
    })
    return this.pendingPlayTask;
  }

  pause () {
    this._paused = true;
    if (!this.noAudio) {
      this.aCtx.pause();
      this.aCtx.destroy();
    }

    this.vCtx.pause();

    this.ticker.stop()

    Promise.resolve().then(() => {
      this._innerDispatchEvent('pause')
    })
  }

  load () {
    // no-op for now
  }

  get volume () {
    if (this.noAudio) {
      return 0;
    }
    return this.aCtx ? this.aCtx.volume : 0;
  }

  set volume (vol) {
    if (this.noAudio) {
      return;
    }
    this.setAttribute('volume', vol);
    this.aCtx.volume = vol
    if (vol > 0 && this.muted) {
      this.aCtx.mute()
    }
    this.onValueChange()
  }

  onValueChange () {
    let now = Date.now()
    if (now - this._volumeEventStamp < 200) {
      return
    }
    this._volumeEventStamp = now
    this._innerDispatchEvent('volumechange')
  }

  get muted () {
    const attrMuted = this.getAttribute('muted') === 'true'
    if (attrMuted !== undefined) {
      return attrMuted;
    } else if (this.getAttribute('volume')) {
      return Number.parseInt(this.getAttribute('volume')) === 0
    } else {
      return false
    }
  }

  set muted (val) {
    if (this.noAudio) {
      return;
    }
    this.setAttribute('muted', val);
    if (!val) {
      this.aCtx.muted = false
    } else {
      this.aCtx.muted = true
    }
    this.onValueChange()
  }

  get error () {
    return this._err || this.vCtx.error || (this.noAudio ? null : this.aCtx.error);
  }

  get buffered () {
    return this.vCtx.buffered
  }

  get noAudio () {
    return this.getAttribute('noaudio') === 'true'
  }

  get networkState () {
    return 0
  }

  get fps () {
    return this._fps
  }

  set fps (val) {
    if (!validateFPS(val)) {
      val = DEFAULT_FPS
    }
    this._fps = val
    if (this.ticker) {
      this.ticker.setInterval(1000 / val)
    }
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
      this.vCtx.config.preloadTime = this.preloadTime;
    }
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);
