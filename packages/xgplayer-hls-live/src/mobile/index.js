import { BasePlugin, Events } from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'

import HLS from './hls-live-mobile'
import defaultConfig from './config'
const hlsAllowedEvents = EVENTS.HlsAllowedEvents;
const {softSolutionProbe} = common

class HlsPlayer extends BasePlugin {
  static get pluginName () {
    return 'hlsLiveMobile'
  }

  static get defaultConfig () {
    return Object.assign({}, defaultConfig, {
      preloadTime: 10,
      retryTimes: 3,
      retryCount: 3,
      retryDelay: 0
    })
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
    this.largeavgap = this.largeavgap.bind(this);
  }

  beforePlayerInit () {
    const { player } = this;
    if (player.video) {
      player.video.setAttribute('preloadtime', this.player.config.preloadTime || this.config.preloadTime);
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
    this._context = new Context(this.player, this.config, hlsAllowedEvents)
    this.initHls()
    this._context.init()
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
    player.video.addEventListener('largeavgap', this.largeavgap);
  }

  largeavgap () {
    this.emit('largeavgap', this.player.video.unsyncInfo)
  }

  lowdecode () {
    const { player } = this;

    this.emit('lowdecode', player.video.degradeInfo);

    // 降级到mse
    if (player.config.innerDegrade === 2) {
      this._degrade();
      this._toUseMse();
      return;
    }

    // 降级到video直接播放hls
    if (player.config.innerDegrade === 1) {
      this._degrade(player.video.src);
    }
  }

  /**
   * @param {string} url  降级到的地址
   * @param {boolean} useMse 是否是降级到mse,true的话软解内部处理不用给video设置src
   */
  _degrade (url) {
    const {player} = this;
    let mVideo = player.video;
    if (mVideo && mVideo.TAG === 'MVideo') {
      let newVideo = player.video.degradeVideo;
      this.destroy();
      player.video = newVideo;
      mVideo.degrade(url);
      if (url) {
        player.config.url = url;
      }

      // 替换下dom元素
      let firstChild = player.root.firstChild;
      if (firstChild.TAG === 'MVideo') {
        player.root.replaceChild(newVideo, firstChild)
      }

      // play
      player.once('canplay', () => {
        player.play();
      })
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

  // 外部强制降级
  // m3u8 -> h5 m3u8
  // m3u8 -> web mse
  forceDegradeToVideo (url) {
    this.player.removeClass('xgplayer-is-error')
    const { player } = this;

    // 降级到mse
    if (player.config.innerDegrade === 2) {
      player.config.backupURL = url;
      this._degrade();
      this._toUseMse();
      return;
    }

    // 降级到video直接播放hls
    if (player.config.innerDegrade === 1) {
      this._degrade(url);
    }
  }

  initHls () {
    this.hls = this._context.registry('HLS_CONTROLLER', HLS)()
    this.emit('core_inited', this.hls);
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
    this.played = false;
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
    if (this._context) {
      this._context.destroy()
    }
    this.hls = null
    this._context = null
  }

  get core () {
    return this.hls;
  }

  get context () {
    return this._context;
  }
}

export default HlsPlayer
