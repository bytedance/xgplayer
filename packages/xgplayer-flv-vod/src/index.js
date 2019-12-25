import 'xgplayer-polyfills/babel/external-helpers';
import Player from 'xgplayer';
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-vod'

const flvAllowedEvents = EVENTS.FlvAllowedEvents;

const isEnded = (player, flv) => {
  if (!player.config.isLive) {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        player.emit('ended')
        flv.mse.endOfStream()
      }
    }
  }
}

class FlvVodPlayer extends Player {
  constructor (config) {
    super(config)
    this.context = new Context(flvAllowedEvents)
    this.initEvents()
    // const preloadTime = player.config.preloadTime || 15
  }

  start () {
    const flv = this.initFlv();

    flv.loadMeta()
    super.start(flv.mse.url)
  }

  initFlv () {
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(this)
    this.context.init();
    this.flv = flv
    this.mse = flv.mse;
    return flv;
  }

  initFlvBackupEvents (flv, ctx) {
    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      let mediaLength = 3;
      flv.on(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, () => {
        mediaLength -= 1;
        if (mediaLength === 0) {
          // ensure switch smoothly
          this.flv = flv;
          this.mse.resetContext(ctx);
          this.context.destroy();
          this.context = ctx;
        }
      })
    });

    flv.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, () => {
      ctx.destroy()
    })
  }

  initEvents () {
    this.on('timeupdate', this.handleTimeUpdate.bind(this))

    this.on('seeking', this.handleSeek.bind(this))

    this.once('destroy', this._destroy.bind(this))
  }

  handleTimeUpdate () {
    this.loadData()
    isEnded(this, this.flv)
  }

  handleSeek () {
    const time = this.currentTime
    const range = this.getBufferedRange()
    if (time > range[1] || time < range[0]) {
      this.flv.seek(this.currentTime)
    }
  }

  _destroy () {
    this.context.destroy()
    this.context = null
    this.flv = null
  }

  loadData (time = this.currentTime) {
    const range = this.getBufferedRange()
    if (range[1] - time < (this.config.preloadTime || 15) - 5) {
      this.flv.loadNext(range[1] + 1)
    }
  }

  swithURL (url) {
    this.config.url = url;
    const context = new Context(flvAllowedEvents);
    const flv = context.registry('FLV_CONTROLLER', FLV)(this, this.mse)
    context.init()
    const remuxer = context.getInstance('MP4_REMUXER');
    remuxer._dtsBase = 0;
    this.initFlvBackupEvents(flv, context);
    flv.loadMeta();
  }

  get remuxer () {
    return this.context.getInstance('MP4_REMUXER');
  }

  get src () {
    return this.currentSrc
  }

  set src (url) {
    return this.swithURL(url)
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }
}

export default FlvVodPlayer
