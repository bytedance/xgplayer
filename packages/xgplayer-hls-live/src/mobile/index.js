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
      preloadTime: 10
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
    this.lowdecode = this.lowdecode.bind(this);
  }

  beforePlayerInit () {
    const { player } = this;
    if (player.video) {
      player.video.setAttribute('preloadtime', this.config.preloadTime);
      // 先兼容传递 innerDegrade = true
      if (player.config.innerDegrade === true) {
        player.config.innerDegrade = 1;
      }
      if (player.config.innerDegrade) {
        player.video.setAttribute('innerdegrade', player.config.innerDegrade);
      }
    }
    this._initProcess();
    this.initEvents();
  }

  _initProcess () {
    const { player } = this;
    this.context = new Context(hlsAllowedEvents)
    this.initHls()
    this.context.init()
    this.loadData()
    if (!player.forceDegradeToVideo) {
      player.forceDegradeToVideo = this.forceDegradeToVideo.bind(this);
    }
  }

  afterCreate () {
    const { video, config } = this.player;
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none';
  }

  initEvents () {
    const {player} = this;
    this.on(Events.PLAY, this.play);
    this.on(Events.URL_CHANGE, this.switchURL);
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange);
    player.video.addEventListener('lowdecode', this.lowdecode);
  }

  lowdecode () {
    const { player } = this;

    this.emit('lowdecode', player.video.degradeInfo);

    // 降级到mse
    if (player.config.innerDegrade === 2) {
      this._degrade(null, true);
      this._toUseMse();
      return;
    }

    // 降级到video直接播放hls
    if (player.config.innerDegrade === 1) {
      this._degrade();
    }
  }

  /**
   * @param {string} url  降级到的地址
   * @param {boolean} useMse 是否是降级到mse,true的话软解内部处理不用给video设置src
   */
  _degrade (url, useMse) {
    const {player} = this;
    let mVideo = player.video;
    if (mVideo && mVideo.TAG === 'MVideo') {
      let newVideo = player.video.degradeVideo;
      this.destroy();
      player.video = newVideo;
      mVideo.degrade(url, useMse);
      // 替换下dom元素
      let firstChild = player.root.firstChild;
      if (firstChild.TAG === 'MVideo') {
        player.root.replaceChild(newVideo, firstChild)
      }
    }
  }

  _toUseMse () {
    const { player } = this;
    const {backupConstructor, backupURL} = player.config;
    if (backupConstructor) {
      player.config.url = backupURL;
      let hlsMsePlayer = player.registerPlugin(backupConstructor)
      hlsMsePlayer.beforePlayerInit();
      Promise.resolve().then(() => {
        player.video.src = player.url;
        const mobilePluginName = HlsPlayer.pluginName.toLowerCase();
        player.plugins[mobilePluginName] = null;
      })
    }
  }

  // 外部强制降级到video
  forceDegradeToVideo (url) {
    this._degrade(url);
  }

  initHls () {
    const { player } = this;
    const preloadTime = player.config.preloadTime || HlsPlayer.defaultConfig.preloadTime;
    const options = Object.assign({}, defaultConfig, player.config, { player, preloadTime })
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
    if (this.context) {
      this.context.destroy()
    }
    this.hls = null
    this.context = null
  }
}

export default HlsPlayer
