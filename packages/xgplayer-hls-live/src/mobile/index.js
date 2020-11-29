import Player from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'

import HLS from './hls-live-mobile'
import defaultConfig from './config'
const hlsAllowedEvents = EVENTS.HlsAllowedEvents;
const { BasePlugin, Events } = Player;
const {softSolutionProbe} = common

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
    return softSolutionProbe();
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
    const options = Object.assign({}, defaultConfig, config, { player })
    this.hls = this.context.registry('HLS_CONTROLLER', HLS)(options)
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
