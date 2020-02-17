import Player from 'xgplayer'
import EVENTS from 'xgplayer-transmuxer-constant-events';
import Context from 'xgplayer-transmuxer-context';
import FLV from './flv-vod'
const { BasePlugin, Events } = Player;

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

class FlvVodPlayer extends BasePlugin {
  static get pluginName () {
    return 'flvVod'
  }

  static isSupported () {
    return window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }

  beforePlayerInit () {
    this.context = new Context(flvAllowedEvents)

    this.initEvents()
    const flv = this.initFlv();
    this.context.init();
    const remuxer = this.remuxer;
    remuxer._dtsBase = 0;
    flv.loadMeta()
    this.player.swithURL = this.swithURL;
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        '__url': {
          get: () => {
            return this.flv.mse.url
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  initFlv () {
    const { player } = this;
    const flv = this.context.registry('FLV_CONTROLLER', FLV)(player)

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
    this.on(Events.TIME_UPDATE, this.handleTimeUpdate.bind(this))

    this.on(Events.SEEKING, this.handleSeek.bind(this))
    this.on(Events.URL_CHANGE, this.swithURL.bind(this))

    this.once(Events.DESTROY, this._destroy.bind(this))
  }

  handleTimeUpdate () {
    this.loadData()
    isEnded(this.player, this.flv)
  }

  handleSeek () {
    const time = this.player.currentTime
    const range = this.player.getBufferedRange()
    if (time > range[1] || time < range[0]) {
      this.flv.seek(time)
    }
  }

  _destroy () {
    this.context.destroy()
    this.context = null
  }

  loadData (time = this.player.currentTime) {
    const { player } = this;
    const range = player.getBufferedRange()
    if (range[1] - time < (player.config.preloadTime || 15) - 5) {
      this.flv.loadNext(range[1] + 1)
    }
  }

  swithURL (url) {
    const {player} = this;
    player.config.url = url;
    player.hasStart = false;
    if (!player.paused) {
      player.pause();
      player.once('pause', () => {
        player.start();
      });
      player.once('canplay', () => {
        player.play();
      });
    } else {
      player.start();
    }
    player.once('canplay', () => {
      player.currentTime = 0;
    });
  }

  get remuxer () {
    return this.context.getInstance('MP4_REMUXER');
  }

}

export default FlvVodPlayer
