import Player from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import HlsVodMobileController from './hls-vod-mobile';

const { debounce } = common;
const { Events, BasePlugin } = Player;

const HlsAllowedEvents = EVENTS.HlsAllowedEvents;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const MSE_EVENTS = EVENTS.MSE_EVENTS;

class HlsVodMobilePlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsVod'
  }
  constructor (options) {
    super(options)
    this._handleSetCurrentTime = debounce(this._handleSetCurrentTime.bind(this), 200)
    this.destroy = this.destroy.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
  }

  beforePlayerInit () {
    const { player } = this;

    if (player.video) {
      player.video.setPlayMode('VOD');
      player.video.setAttribute('innerdegrade', player.config.innerDegrade);
    }

    if (!this._context) {
      this._context = new Context(HlsAllowedEvents)
    }
    this.hls = this._context.registry('HLS_VOD_CONTROLLER', HlsVodMobileController)({player: this.player, preloadTime: this.player.config.preloadTime});
    this._context.init();
    this.hls.load(this.player.config.url);
    this._initEvents();
  }

  handleUrlChange (url) {
    this._switch(url);
  }

  handleDefinitionChange (change) {
    const { to } = change;
    this.handleUrlChange(to);
  }

  _handleSetCurrentTime () {
    const time = parseFloat(this.player.video.currentTime);
    if (this._context) {
      this.hls.seek(time);
    }
  }

  play () {
    return this.player.play().catch((e) => {
      if (e && e.code === 20) { // fix: chrome The play() request was interrupted by a new load request.
        this.player.once('canplay', () => {
          this.player.play()
        })
      }
    })
  }

  _initEvents () {
    const {player} = this;

    this.hls.once(HLS_EVENTS.RETRY_TIME_EXCEEDED, () => {
      this.emit('error', new Player.Errors('network', this.config.url))
    })

    this.hls.on(MSE_EVENTS.SOURCE_UPDATE_END, () => {
      this._onSourceUpdateEnd();
    })

    this.once('canplay', () => {
      if (this.config.autoplay) {
        this.play()
      }
    });

    this.lowdecode = () => {
      this.emit('lowdecode', player.video.degradeInfo);
      if (player.config.innerDegrade) {
        let currentTime = player.currentTime;
        let mVideo = player.video;
        let newVideo = player.video.degradeVideo;
        this.destroy();
        this._context = null;
        player.video = newVideo;
        mVideo.degrade();
        player.once('canplay', () => {
          player.currentTime = currentTime;
        })
      }
    }

    this.on(Events.SEEKING, this._handleSetCurrentTime)
    this.on(Events.URL_CHANGE, this.handleUrlChange)
    this.on(Events.DESTROY, this.destroy)
    player.video.addEventListener('lowdecode', this.lowdecode);
  }

  _onSourceUpdateEnd () {
    if (this.player.video.readyState === 1 || this.player.video.readyState === 2) {
      const { gap, start, method } = this.detectBufferGap()
      if (gap) {
        if (method === 'ceil' && this.player.currentTime < Math[method](start)) {
          this.player.currentTime = Math[method](start);
        } else if (method === 'floor' && this.player.currentTime > Math[method](start)) {
          this.player.currentTime = Math[method](start);
        }
      }
    }
  }

  _switch (url) {
    this.config.url = url;
    this._context.destroy();
    this._context = null;
    this.hls = null;
    const context = new Context(HlsAllowedEvents);
    const hls = context.registry('HLS_VOD_CONTROLLER', HlsVodMobileController)({
      player: this.player,
      preloadTime: this.config.preloadTime
    })
    this._context = context;
    this.hls = hls;
    context.init()
    hls.load(url);
  }

  switchURL (url) {
    let cTime = this.player.currentTime;
    // reset MVideo timeline
    this.player.video.src = url;
    this._switch(url);
    this.once(Events.PLAYING, () => {
      this.player.currentTime = cTime;
    })
  }

  destroy () {
    if (this._context) {
      this._context.destroy();
    }
  }

  detectBufferGap () {
    const { video } = this.player;
    let result = {
      gap: false,
      start: -1
    }
    for (let i = 0; i < video.buffered.length; i++) {
      const bufferStart = video.buffered.start(i)
      const bufferEnd = video.buffered.end(i)
      if (!video.played.length || (bufferStart <= this.currentTime && bufferEnd - this.currentTime >= 0.5)) {
        break;
      }
      const startGap = bufferStart - this.currentTime;
      const endGap = this.currentTime - bufferEnd;
      if (startGap > 0.01 && startGap <= 2) {
        result = {
          gap: true,
          start: bufferStart,
          method: 'ceil'
        };
        break;
      } else if (endGap > 0.1 && endGap <= 2) {
        result = {
          gap: true,
          start: bufferEnd,
          method: 'floor'
        };
      } else {
        result = {
          gap: false,
          start: -1
        }
      }
    }

    return result;
  }
}

export default HlsVodMobilePlayer;
