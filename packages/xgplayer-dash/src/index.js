import 'core-js/modules/es6.promise.js';
import 'core-js/modules/es7.string.pad-start';
import Player from 'xgplayer';
import DASH from './dash';
import Task from './media/task';

const {BasePlugin, Events} = Player;

const isEnded = (player, dash) => {
  if (dash.type === 'vod') {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange();
      if (player.currentTime - range[1] < 0.1) {
        // console.log('player.mse.endOfStream')
        player.mse.endOfStream();
        if (player.dash.mse.progressTimer) {
          clearInterval(player.dash.mse.progressTimer);
          player.dash.mse.progressTimer = null;
        }
      }
    }
  }
};

let errorHandle = (player, err) => {
  err.vid = player.config.vid;
  err.url = player.src;
  if (err.errd && typeof err.errd === 'object') {
    if (player.dash) {
      err.errd.url = player.dash.url;
      err.url = player.dash.url;
      // player.dash.canDownload = false
    }
  }
  player.emit('DATA_REPORT', err);
  if (err.errt === 'network' && player.config._backupURL) {
    player.src = player.config._backupURL;
  } else {
    player.src = player.config._mainURL;
  }
  player.switchURL = null;
  player._replay = null;
};

class DashPlayer extends BasePlugin {
  constructor (options) {
    super(options);
    this.definitions = [];

    this.destroy = this.destroy.bind(this)
    this.timeUpdate = this.timeUpdate.bind(this)
  }

  initEvents () {
    this.on(Events.DESTROY, this.destroy)
    this.on(Events.TIME_UPDATE, this.timeUpdate)
  }

  beforePlayerInit () {
    const {player, playerConfig} = this;
    if (this.config.drm) {
      if (!navigator.requestMediaKeySystemAccess) {
        console.log('EME API is not supported. Enable pref media.eme.enabled to true in about:config');
        return;
      }
    }
    const dash = new DASH(playerConfig.url, playerConfig, player.video);
    dash.init(playerConfig.url).then((res) => {
      dash.mpd.mediaList['video'].forEach((item) => {
        this.definitions.push({
          name: item.height + 'P',
          url: item.id,
          selected: false
        });
      });
      this.definitions[0].selected = true;
      player.emit('resourceReady', this.definitions);

      let mse = res;
      this.dash = dash;
      this.mse = mse;
      dash.on('error', err => {
        errorHandle(player, err);
      });
    });

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
  }

  loadData (time = this.player.currentTime) {
    const { dash } = this;
    let range = this.findRangeForPlaybackTime(time);
    let appendTime = (range && range.end) || time;
    if (appendTime > time + 15) return;
    dash.seek(appendTime);
  };

  download () {
    this.dash.download();
  }

  findRangeForPlaybackTime (time) {
    const { player } = this;
    let ranges = player.buffered;
    if (!ranges) return;
    for (let i = 0; i < ranges.length; i++) {
      if (ranges.start(i) <= time && ranges.end(i) >= time) {
        return {
          start: ranges.start(i),
          end: ranges.end(i)
        };
      }
    }
  }

  switchURL (url) {
    const {player} = this;
    player.config.url = url;
    player.hasStart = false;
    if (!player.paused) {
      player.pause();
      player.once('pause', () => {
        player.start(url);
      });
      player.once('canplay', () => {
        player.play();
      });
    } else {
      player.start(url);
    }
    player.once('canplay', () => {
      player.currentTime = 0;
    });
  }

  timeUpdate () {
    const { player, dash } = this;
    this.loadData(player.currentTime + 1);
    isEnded(player, dash);
  }

  switchBW (idx) {
    const { dash } = this;
    idx = idx.split('/')[idx.split('/').length - 1];
    let vl = dash.mpd.mediaList['video'];
    let newIdx = vl.selectedIdx;

    vl.every((item, index) => {
      if (item.id === idx) {
        newIdx = index;
        dash.getData(vl[newIdx].initSegment, vl[newIdx].initSegmentRange).then(function (videoInitRes) {
          changeBitWidth(videoInitRes);
        });
        return false;
      } else {
        return true;
      }
    });

    const changeBitWidth = (videoInitRes) => {
      const {player} = this;
      let curTime = player.currentTime;
      let temp = vl[vl.selectedIdx].mediaSegments.find(item => item.start - curTime > 6);
      let start = temp.start;
      let end = player.getBufferedRange()[1];
      if (end - start > 0 && BasePlugin.Sniffer.browser !== 'safari') {
        player.mse.removeBuffer(`${vl[0].mimeType};codecs="${vl[0].codecs}"`, start, end);
      }
      vl[vl.selectedIdx].mediaSegments.every(item => {
        item.downloaded = false;
        return true;
      });
      this.mse.appendBuffer(`${vl[0].mimeType};codecs="${vl[0].codecs}"`, videoInitRes);
      this.mse.once(`${vl[0].mimeType};codecs="${vl[0].codecs}" updateend`, () => {
        vl[newIdx].inited = true;
        vl.selectedIdx = newIdx;
        this.loadData((temp.start + temp.end) / 2);
      });
    };
  }

  replay () {
    const { player, playerConfig } = this;
    Task.clear();
    let selectedIdx = this.dash.mpd.mediaList['video'].selectedIdx;
    const dash = new DASH(playerConfig.url, playerConfig, player.video);
    dash.init(playerConfig.url).then((result) => {
      this.definitions[selectedIdx].selected = true;
      player.emit('resourceReady', this.definitions);
      let mse = result;
      this.dash = dash;
      this.mse = mse;
      player.currentTime = 0;
      player.play();
    });

    dash.on('error', err => {
      errorHandle(player, err);
    });
  }

  destroy () {
    if (this.dash) {
      window.clearTimeout(this.dash.mpd.timer);
    }
  }
}

export default DashPlayer;
