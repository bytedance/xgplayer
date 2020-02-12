// import 'core-js/modules/es7.string.pad-start';
import Player from 'xgplayer';
import MP4 from './mp4';
import MSE from './media/mse';
import Task from './media/task';
import Buffer from './fmp4/buffer';

const {BasePlugin, Events} = Player;

export default class Mp4Player extends BasePlugin {
  static get pluginName () {
    return 'Mp4Player'
  }

  constructor (options) {
    super(options);

    this.loadData = this.loadData.bind(this);
    this.destroy = this.destroy.bind(this)
    this.replay = this.replay.bind(this)
    this.onTimeUpdate = this.onTimeUpdate.bind(this)
    this.onSeeking = this.onSeeking.bind(this)
    this.initEvents();
  }

  beforePlayerInit () {
    return this.initMp4().then(() => {
      try {
        BasePlugin.defineGetterOrSetter(this.player, {
          '__url': {
            get: () => {
              return this.mse.url;
            }
          }
        });
      } catch (e) {
        // NOOP
      }
    });

  }

  initEvents () {
    const {player} = this;
    player.once('canplay', () => {
      // safari decoder time offset
      if (BasePlugin.Sniffer.browser === 'safari' && player.buffered.length) {
        let start = player.buffered.start(0);
        player.currentTime = start + 0.1;
      }
    });

    player.once(Events.DESTROY, this.destroy);
    player.on(Events.TIME_UPDATE, this.onTimeUpdate);
    player.on(Events.SEEKING, this.onSeeking);
    player.on(Events.WAITING, this.onWaiting);
    player.on(Events.REPLAY, this.replay);

    this.progressTimer = setInterval(() => {
      this.onTimeUpdate()
    }, 300)
  }

  initMp4 () {
    const {player} = this;
    const mp4 = new MP4(player.config.url, player.config.withCredentials);
    return new Promise((resolve, reject) => {
      mp4.once('moovReady', () => {
        const mse = new MSE();
        mse.on('sourceopen', () => {
          mse.appendBuffer(mp4.packMeta());
          mse.once('updateend', this.loadData);
        });

        this.mse = mse;
        this.mp4 = mp4;
        resolve(mp4);
      });

      mp4.on('error', (e) => {
        reject(e);
      });
    });
  }

  cut (start = 0, end) {
    const {player} = this;
    let segment = new Buffer();
    let mp4 = new MP4(player.config.url, player.config.withCredentials);
    return new Promise((resolve, reject) => {
      mp4.once('moovReady', () => {
        if (!end || end <= start) {
          end = start + 15;
        }
        if (end > mp4.meta.duration) {
          start = mp4.meta.duration - (end - start);
          end = mp4.meta.duration;
        }
        mp4.cut(start, end).then(buffer => {
          if (buffer) {
            let meta = BasePlugin.Util.deepCopy({
              duration: end - start,
              audioDuration: end - start,
              endTime: end - start
            }, mp4.meta);
            meta.duration = end - start;
            meta.videoDuration = end - start;
            meta.audioDuration = end - start;
            meta.endTime = end - start;
            segment.write(mp4.packMeta(meta), buffer);
            resolve(new Blob([segment.buffer], {type: 'video/mp4; codecs="avc1.64001E, mp4a.40.5"'}));
          }
        });
      });
      mp4.on('error', (e) => {
        reject(e);
      });
    });
  };

  loadData (i = 0, time = this.player.currentTime) {
    const {player} = this;
    if (player.timer) {
      clearTimeout(player.timer);
    }
    time = Math.max(time, player.currentTime);
    player.timer = setTimeout(() => {
      this.mp4.seek(time + i * 0.1).then(buffer => {
        if (buffer) {
          const {mse} = this;
          mse.updating = true;
          mse.appendBuffer(buffer);
          mse.once('updateend', () => {
            mse.updating = false;
          });
        }
      }, () => {
        if (i < 10) {
          setTimeout(() => {
            this.loadData(i + 1);
          }, 2000);
        }
      });
    }, 50);
  }

  switchURL (url) {
    const {player} = this;
    let mp5 = new MP4(url, player.config.withCredentials);
    let mp4 = this.mp4;
    mp5.on('moovReady', () => {
      let curTime = player.currentTime;
      const timeRange = mp4.timeRage;
      let start = timeRange.find(item => item[0] - curTime > 2)[0];
      let end = player.getBufferedRange()[1];
      if (end - start > 0 && BasePlugin.Sniffer.browser !== 'safari') {
        this.mse.removeBuffer(start, end);
      }
      if (!BasePlugin.util.hasClass(player.root, 'xgplayer-ended')) {
        player.emit(Events.URL_CHANGE, url);
      }
      this.mp4 = mp5;
      this.mse.appendBuffer(mp5.packMeta());
    });
    mp5.on('error', err => {
      this.errorHandle(player, err);
    });
  };

  playNext (url) {
    const { player } = this
    let mp5 = new MP4(url, player.config.withCredentials);
    let mp4 = this.mp4;
    mp5.on('moovReady', () => {
      let range = [0, 0];
      let buffered = player.video.buffered;
      let currentTime = player.video.currentTime;
      let max = 0;
      if (buffered) {
        for (let i = 0, len = buffered.length; i < len; i++) {
          range[0] = buffered.start(i);
          range[1] = buffered.end(i);
          if (range[0] <= currentTime && range[1] <= currentTime) {
            max = range[1] > max ? range[1] : max;
            player.mse.removeBuffer(range[0], range[1]);
          }
        }
      }
      this.mp4 = mp5;
      this.mse.appendBuffer(mp5.packMeta());
      let flag = true;
      player.on('timeupdate', function () {
        if (flag && mp4.meta.endTime - player.currentTime < 2) {
          let range = player.getBufferedRange();
          if (player.currentTime - range[1] < 0.1) {
            flag = false;
            player.currentTime = 0;
            buffered = player.video.buffered;
            if (buffered) {
              for (let i = 0, len = buffered.length; i < len; i++) {
                range[0] = buffered.start(i);
                range[1] = buffered.end(i);
                if (range[0] >= max) {
                  player.mse.removeBuffer(range[0], range[1]);
                }
              }
            }
          }
        }
      });
    });
    mp5.on('error', err => {
      this.errorHandle(err);
    });
  }

  replay () {
    const { player } = this;
    Task.clear();
    this.mp4.bufferCache.clear();
    player.hasStart = false;
    player.start()

    this.once(Events.COMPLETE, () => {
      player.play()
    })
  }

  onTimeUpdate () {
    const { player } = this;
    let mse = this.mse;
    let mp4 = this.mp4;
    if (mse && !mse.updating && mp4.canDownload) {
      let timeRage = mp4.timeRage;
      let range = player.getBufferedRange();
      let cacheMaxTime = player.currentTime + (this.playerConfig.preloadTime || 30);
      if (range[1] - cacheMaxTime > 0) {
        return;
      }
      timeRage.every((item, idx) => {
        let start = item[0];
        let end = item[1] !== -1 ? item[1] : player.duration;
        let center = (start + end) / 2;
        if (range[1] === 0) {
          return false;
        } else {
          if (center > range[1] && !mp4.bufferCache.has(idx)) {
            this.loadData(0, center);
          } else {
            return true;
          }
        }
      });
      this.isEnded(player, mp4);// hack for older webkit
    }
  }

  onWaiting () {
    const { player } = this;
    let mp4 = this.mp4;
    if (!mp4 || !mp4.meta) {
      return;
    }
    let range = player.getBufferedRange();
    let duration = mp4.meta.videoDuration;
    if (duration - player.currentTime < 0.5 && duration - range[1] < 0.5) {
      this.mse.endOfStream();
    } else {
      this.loadData(0, range[1] + 1);
      this.waiterTimer = setTimeout(function () {
        let buffered = player.buffered;
        let start;
        for (let i = 0, len = buffered.length; i < len; i++) {
          start = buffered.start(i);
          if (start >= player.currentTime) {
            player.currentTime = start;
            break;
          }
        }
      }, 1500);
    }
  }

  onSeeking () {
    const { player } = this;
    let buffered = player.buffered;
    let hasBuffered = false;

    let curTime = player.video.currentTime;
    Task.clear();
    if (buffered.length) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
          hasBuffered = true;
          break;
        }
      }
      if (!hasBuffered) {
        this.loadData(0, curTime);
      }
    } else {
      this.loadData(0, player.currentTime);
    }
  }

  errorHandle (err) {
    const {player} = this;
    err.url = player.src;
    if (err.errd && typeof err.errd === 'object') {
      if (this.mp4) {
        err.errd.url = this.mp4.url;
        err.url = this.mp4.url;
        this.mp4.canDownload = false;
      }
    }
    Task.clear();
    if (this.mp4 && this.mp4.bufferCache) {
      this.mp4.bufferCache.clear();
    }

    clearInterval(this.mp4ProgressTimer);
  }

  isEnded () {
    const { player, mp4, mse } = this;
    if (mp4.meta.endTime - player.currentTime < 2) {
      let range = player.getBufferedRange();
      if (player.currentTime - range[1] < 0.1) {
        mse.endOfStream();
      }
    }
  };

  destroy () {
    Task.clear()
    if (this.player.timer) {
      clearTimeout(this.player.timer)
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
    }
  }
}
