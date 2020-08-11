import Player from 'xgplayer'
import { EVENTS, Context } from 'xgplayer-helper-utils'

import HLS from './hls-live-mobile'
const hlsAllowedEvents = EVENTS.HlsAllowedEvents;
const { BasePlugin, Events } = Player;

class HlsPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLiveMobile'
  }

  static get defaultConfig () {
    return {
      preloadTime: 4
    }
  }

  static isSupported () {
    let webAudioEnable = false;
    let webglEnable = false;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      let ctx = new AudioContext();
      ctx.close();
      ctx = null;
      webAudioEnable = true;
    } catch (e) {}

    try {
      let cvs = document.createElement('canvas');
      var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
      for (let i = 0; i < validContextNames.length; i++) {
        let glCtx = cvs.getContext(validContextNames[i]);
        if (glCtx) {
          glCtx = null;
          cvs = null;
          webglEnable = true;
          break;
        }
      }
    } catch (e) {}

    const WebComponentSupported = 'customElements' in window && window.customElements.define;
    let isComponentDefined;
    if (WebComponentSupported) {
      isComponentDefined = window.customElements.get('mobile-video');
    }
    return webAudioEnable && webglEnable && isComponentDefined;
  }

  constructor (options) {
    super(options);
    this.play = this.play.bind(this)
    this.switchURL = this.switchURL.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  beforePlayerInit () {
    const { player } = this;
    if (player.video) {
      player.video.setAttribute('preloadtime', this.config.preloadTime);
      player.video.setAttribute('innerdegrade', player.config.innerDegrade);
    }
    this._initProcess();
    this.initEvents()
  }

  _initProcess () {
    this.context = new Context(hlsAllowedEvents)
    this.initHls()
    this.context.init()
    this.loadData()
  }

  afterCreate () {
    const { video, config } = this.player;
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none';
  }

  initEvents () {
    const {player} = this;

    this.seeking = () => {
      const time = this.currentTime
      const range = player.getBufferedRange()
      if (time > range[1] || time < range[0]) {
        this.hls.seek(this.currentTime)
      }
    }

    this.lowdecode = () => {
      this.emit('lowdecode', player.video.degradeInfo);
      if (player.config.innerDegrade) {
        let mVideo = player.video;
        let newVideo = player.video.degradeVideo;
        this.destroy();
        player.video = newVideo;
        mVideo.degrade();
      }
    }

    this.on(Events.PLAY, this.play);
    this.on(Events.SEEKING, this.seeking);
    this.on(Events.URL_CHANGE, this.switchURL);
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange);
    player.video.addEventListener('lowdecode', this.lowdecode);
  }

  initHls () {
    const { player, config } = this;
    this.hls = this.context.registry('HLS_CONTROLLER', HLS)({ player, preloadTime: config.preloadTime, retryTimes: config.retryTimes })
  }

  play () {
    if (this.played) {
      this._destroy();
      this._initProcess();
    } else {
      this.addLiveFlag();
    }
    this.played = true
  }

  loadData () {
    const { player } = this;
    if (this.hls) {
      this.hls.load(player.config.url)
    }
  }

  handleDefinitionChange (change) {
    const { to } = change;
    this.switchURL(to);
  }

  switchURL (url) {
    this.player.config.url = url
    this._destroy();
    this._initProcess();
  }

  addLiveFlag () {
    const { player } = this;
    Player.Util.addClass(player.root, 'xgplayer-is-live')
  }

  destroy () {
    super.offAll();
    this._destroy()
  }

  _destroy () {
    this.context.destroy()
    this.hls = null
    this.context = null
  }
}

export default HlsPlayer
