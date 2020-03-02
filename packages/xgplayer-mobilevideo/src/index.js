import './polyfills/custom-elements.min';
import './polyfills/native-element';
import { getTicker } from './helpers/ticker';
import VideoCtx from './core/video-context';
import AudioCtx from './core/audio-context';
import AVReconciler from './helpers/reconciler';

// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  /**
   * 保证当前播放的视频以gop为单位
   * @param videoTrack
   */
  static resolveVideoGOP (videoTrack) {
    const { samples } = videoTrack;
    if (!samples.length) {
      return;
    }

    let firstIframeIdx = null
    let lastIframeIdx = null

    if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
      // 将缓存帧放置到队列的头部
      samples.unshift.apply(samples, videoTrack.tempSamples);
    }

    // 寻找第一个I帧
    for (let i = 0, len = samples.length; i < len; i++) {
      const current = samples[i];
      if (current.isKeyframe) {
        firstIframeIdx = i;
        break;
      }
    }

    // 寻找最后一个I帧
    for (let i = samples.length - 1; i > 0; i++) {
      const current = samples[i]

      if (current.isKeyframe) {
        lastIframeIdx = i;
        break;
      }
    }

    if (firstIframeIdx !== 0) {
      samples.splice(0, firstIframeIdx - 1)
    }

    videoTrack.samples = samples.slice(0, lastIframeIdx)
    const rest = samples.slice(lastIframeIdx)
    if (videoTrack.tempSamples) {
      videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest)
    } else {
      // 将剩下的帧缓存，等待一个完整的gop
      videoTrack.tempSamples = rest
    }
  }

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
    this.init()
  }

  init () {
    const attrVolume = this.getAttribute('volume')
    const volume = this.muted ? 0 : attrVolume

    this.vCtx = new VideoCtx(Object.assign({
      canvas: this._canvas
    }, { style: { width: this.width, height: this.height } }));

    this.aCtx = new AudioCtx({
      volume
    });
    this.ticker = new (getTicker())()
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx,
      video: this
    })

    this.dispatchEvent(new Event('waiting'));
    this.vCtx.oncanplay = () => {
      if (!this.played) {
        this.appendChild(this._canvas);
      }
      this.dispatchEvent(new Event('canplay'));
    }

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
  }

  handleAudioSourceEnd () {
    this.reconciler.doReconcile()
    this.vCtx.cleanBuffer();
  }

  _cleanBuffer () {
    this.vCtx.cleanBuffer()
  }

  destroy () {
    this.videoMetaInited = false;
    this.audioMetaInited = false;

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd)
    this.aCtx.destroy()
    this.vCtx.destroy()
    this.ticker.stop()
    this.start = null;
    this.reconciler.destroy()
    this.aCtx = null;
    this.vCtx = null;
    this.ticker = null;
  }

  onDemuxComplete (videoTrack, audioTrack) {
    // MobileVideo.resolveVideoGOP(videoTrack)
    this.aCtx.decodeAudio(audioTrack);
    this.vCtx.decodeVideo(videoTrack);
  }

  setAudioMeta (meta) {
    if (this.audioMetaInited) {
      this.aCtx.destroy();
      this.aCtx = new AudioCtx({});
    }
    this.aCtx.setAudioMetaData(meta);
    this.audioMetaInited = true;
  }

  setVideoMeta (meta) {
    if (this.videoMetaInited) {
      this.vCtx.destroy();
      this.vCtx = new VideoCtx(Object.assign({
        canvas: this._canvas
      }, { style: { width: this.width, height: this.height } }));
    }
    this.vCtx.setVideoMetaData(meta);
    this.videoMetaInited = true;
  }

  disconnectedCallback () {
    this.destroy();
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
    this.aCtx.playbackRate = val;
    this.vCtx.playbackRate = val;

    this.dispatchEvent(new Event('ratechange'))
  }

  get ended () {
    if (this.audioMetaInited) {
      return this.aCtx.ended;
    }
    return false;
  }

  get autoplay () {
    if (this.hasAttribute('autoplay')) {
      return this.getAttribute('autoplay')
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
      this.destroy()
      this.init()
    }
    this.dispatchEvent(new Event('play'))
    this.pendingPlayTask = Promise.all([
      this.vCtx.play(),
      this.aCtx.play().then(() => {
        // this.aCtx.muted = true
      })
    ]).then(() => {
      // this.aCtx.muted = false
      this.ticker.start(() => {
        if (!this.start) {
          this.start = Date.now()
        }
        const prevTime = this._currentTime;
        this._currentTime = Date.now() - this.start

        const rendered = this.vCtx._onTimer(this._currentTime)
        if (rendered) {
          if (this._waiting) {
            this.dispatchEvent(new Event('playing'))
            this._waiting = false;
          }
          this.dispatchEvent(new Event('timeupdate'))
        } else {
          this._currentTime = prevTime;
          if (!this._waiting) {
            this._waiting = true;
            this.dispatchEvent(new Event('waiting'))
          }
        }
      })

      this.pendingPlayTask = null
      this.played = true;
      this.dispatchEvent(new Event('playing'))
      this.dispatchEvent(new Event('play'))
      this._paused = false
    })
  }

  pause () {
    this._paused = true;
    this.aCtx.pause()
    this.vCtx.pause()

    this.dispatchEvent(new Event('pause'))
  }

  load () {
    // no-op for now
  }

  get volume () {
    return this.aCtx.volume
  }

  set volume (vol) {
    this.setAttribute('volume', vol);
    this.aCtx.volume = vol
    if (vol > 0 && this.muted) {
      this.aCtx.mute()
    }
    this.dispatchEvent(new Event('volumechange'))
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
    this.setAttribute('muted', val);
    if (!val) {
      this.aCtx.muted = false
    } else {
      this.aCtx.muted = true
    }
    this.dispatchEvent(new Event('volumechange'))
  }

  get error () {
    return this.vCtx.error || this.aCtx.error;
  }

  get buffered () {
    return this.vCtx.buffered
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);
