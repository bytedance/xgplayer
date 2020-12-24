import Player from 'xgplayer'
import { EVENTS, Context, common } from 'xgplayer-helper-utils'
import FLV from './flv-live-mobile'
import defaultConfig from './config'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;
const { BasePlugin, Events } = Player;
const {softSolutionProbe} = common

class FlvPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvLiveMobile'
  }

  static isSupported () {
    return softSolutionProbe();
  }

  constructor (options) {
    super(options);
    this.options = Object.assign({}, defaultConfig, this.config)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.switchURL = this.switchURL.bind(this);
    this.progress = this.progress.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  beforePlayerInit () {
    const { player } = this;
    if (player.video && player.config.innerDegrade) {
      player.video.setAttribute('innerdegrade', player.config.innerDegrade);
    }
    this.context = new Context(flvAllowedEvents)
    this.initFlv()
    this.context.init()
    this.loadData()
    this.initEvents()
  }

  afterCreate () {
    const { video, config } = this.player;
    video.width = Number.parseInt(config.width || 600)
    video.height = Number.parseInt(config.height || 337.5)
    video.style.outline = 'none';
  }

  initFlvEvents (flv) {
    const { player } = this;

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!player.paused) {
        const timer = setInterval(() => {
          const end = player.getBufferedRange()[1]
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended')
            window.clearInterval(timer)
          }
        }, 200)
      }
    })
  }

  initEvents () {
    this.lowdecode = () => {
      this.emit('lowdecode', this.player.video.degradeInfo);

      // 内部降级到mse
      if (this.player.config.innerDegrade === 2) {
        const {player} = this;
        let mVideo = player.video;
        if (mVideo && mVideo.TAG === 'MVideo') {
          let newVideo = player.video.degradeVideo;
          this.destroy();
          player.video = newVideo;
          mVideo.degrade(null, true);
        }
        const {backupConstructor, backupURL} = player.config;
        if (backupConstructor) {
          player.config.url = backupURL;
          let flvMsePlayer = player.registerPlugin(backupConstructor)
          flvMsePlayer.beforePlayerInit();
          Promise.resolve().then(() => {
            player.video.src = player.url;
            const mobilePluginName = FlvPlayer.pluginName.toLowerCase();
            player.plugins[mobilePluginName] = null;
          })
        }
      }
    }
    this.on(Events.PLAY, this.play);
    this.on(Events.PAUSE, this.pause);
    this.on(Events.URL_CHANGE, this.switchURL);
    this.on(Events.DEFINITION_CHANGE, this.handleDefinitionChange);
    this.on(Events.PROGRESS, this.progress)
    this.player.video.addEventListener('lowdecode', this.lowdecode)
  }

  offEvents () {
    this.off(Events.PLAY, this.play);
    this.off(Events.PAUSE, this.pause);
    this.off(Events.URL_CHANGE, this.switchURL);
    this.off(Events.PROGRESS, this.progress);
    this.off(Events.DEFINITION_CHANGE, this.handleDefinitionChange);
    this.player.video.removeEventListener('lowdecode', this.lowdecode)
  }

  initFlv () {
    const { player } = this;
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(player, this.options)
    this.initFlvEvents(flv)
    this.flv = flv
  }

  play () {
    const { player } = this;
    if (this.played) {
      this._destroy()
      player.hasStart = false;
      player.start()
    } else {
      this.addLiveFlag();
    }
    this.played = true
  }

  pause () {
    if (this.flv) {
      this.flv.pause()
    }
  }

  loadData (time = this.player.currentTime) {
    if (this.flv) {
      this.flv.seek(time)
    }
  }

  switchURL (url) {
    this._destroy()
    const {player} = this;
    player.config.url = url;
    player.hasStart = false;
    player.start()
  }

  handleDefinitionChange (change) {
    const { to } = change;
    this.switchURL(to);
  }

  progress () {
    if (!this.player || !this.player.video) return;
    const {buffered, currentTime, config} = this.player;
    let bufferEnd = buffered.end(0);
    let waterLevel = bufferEnd - currentTime;
    let preloadTime = config.preloadTime;
    if (waterLevel > preloadTime * 2) {
      if (bufferEnd - preloadTime > currentTime) {
        this.player.video.currentTime = bufferEnd - preloadTime;
      }
    }
  }

  destroy () {
    this._destroy()
  }

  addLiveFlag () {
    const { player } = this;
    BasePlugin.Util.addClass(player.root, 'xgplayer-is-live')
  }

  _destroy () {
    if (!this.context) return;
    this.offEvents();
    this.context.destroy()
    this.flv = null
    this.context = null
  }
}

export default FlvPlayer
