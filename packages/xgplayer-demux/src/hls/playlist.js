class Playlist {
  constructor (configs) {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this._lastget = undefined;
    this._audoclear = configs.autoclear || false;
  }

  get list () {
    return this._list;
  }

  set baseURL (baseURL) {
    if (this.baseURL !== baseURL) {
      this.clear();
      this._baseURL = baseURL;
    }
  }

  get baseURL () {
    return this._baseURL;
  }

  push (ts, duration) {
    this._ts[ts] = {duration: duration, downloaded: false, downloading: false, start: this.duration};
    this._list[this.duration] = ts;
    this.duration += duration;
  }

  pushM3U8 (data) {
    // 常规信息替换
    this.version = data.version;
    this.targetduration = data.targetduration;

    // 新分片信息
    if (data.sequence > this.sequence) {
      this.sequence = data.sequence;
      for (let i = 0; i < data.frags.length; i++) {
        let frag = data.frags[i];
        if (!this._ts[frag.url]) {
          this.push(frag.url, frag.duration);
        }
      }
    }
  }

  downloaded (tsname, isloaded) {
    let ts = this._ts[tsname];
    if (ts) {
      ts.downloaded = isloaded
    }
  }

  downloading (tsname, loading) {
    let ts = this._ts[tsname];
    if (ts) {
      ts.downloading = loading
    }
  }

  getTsByName (name) {
    return this._ts[name];
  }

  getTs (time) {
    let timelist = Object.keys(this._list);
    let ts;

    if (time === undefined) {
      if (this._lastget) {
        time = this._lastget.time + this._lastget.duration;
      } else {
        time = 0;
      }
    }

    if (timelist.length < 1 || time >= this.duration) {
      return undefined;
    }
    timelist.sort((a, b) => {
      return parseFloat(a) - parseFloat(b)
    });
    for (let i = 0; i < timelist.length; i++) {
      console.log(timelist[i]);
      if (time >= parseInt(timelist[i])) {
        console.log(parseInt(timelist[i]));
        let url = this._list[timelist[i]];
        let downloaded = this._ts[url].downloaded;
        let downloading = this._ts[url].downloading;
        ts = {url, downloaded, downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration)};
        if (this.autoclear) {
          delete this._ts[this._lastget.url];
          delete this._list[this._lastget.time];
        }
        this._lastget = ts;
      } else {
        console.log(this._lastget);
        break;
      }
    }
    return ts;
  }

  clear () {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
  }
}

export default Playlist;
