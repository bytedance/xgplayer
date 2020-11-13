class Playlist {
  constructor (configs) {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = configs.autoclear || false;
    this.downloadedUrls = [];
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

  push (ts, duration, discontinue, id, cc) {
    if (!this._ts[ts]) {
      this._ts[ts] = {duration: duration,
        downloaded: false,
        downloading: false,
        start: this.duration,
        discontinue: !!discontinue,
        id,
        cc
      };
      this._list[this.duration] = ts;
      this.duration += duration;
      this.fragLength += 1;
    }
  }

  deleteFrag (url) {
    if (this._ts[url]) {
      if (this._ts[url].start > this._lastget.time) {
        this._lastget = {
          duration: this._ts[url].duration,
          time: this._ts[url].start,
          downloaded: false,
          downloading: false,
          url: url,
          id: this._ts[url].id
        }
      }
      delete this._list[this._ts[url].start];
      delete this._ts[url];
      this.fragLength -= 1;
    }
  }

  pushM3U8 (data, deletepre) {
    // 常规信息替换
    if (!data) {
      throw new Error(`No m3u8 data received.`);
    }
    this.version = data.version;
    this.targetduration = data.targetduration;
    if (data.encrypt && !this.encrypt) {
      this.encrypt = data.encrypt;
    }

    if (!data.sequence) {
      data.sequence = 0;
    }

    // 新分片信息
    if (data.sequence > this.sequence) {
      this.sequence = data.sequence;
      let newfraglist = []
      for (let i = 0; i < data.frags.length; i++) {
        let frag = data.frags[i];
        if (!this._ts[frag.url] && this.downloadedUrls.indexOf(frag.url) < 0) {
          newfraglist.push(frag.url)
          this.push(frag.url, frag.duration, frag.discontinue, frag.id, frag.cc);
        }
      }

      if (newfraglist.length < 1) {
        throw new Error(`Can not read ts file list.`);
      }

      if (deletepre) {
        let tslist = this.getTsList();
        for (let i = 0; i < tslist.length; i++) {
          if (newfraglist.indexOf(tslist[i]) < 0) {
            this.deleteFrag(tslist[i]);
          }
        }
      }
    } else {
      throw new Error(`Old m3u8 file received, ${data.sequence}`);
    }
  }

  getTsList () {
    return Object.keys(this._ts);
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
    timelist = timelist.sort((a, b) => {
      return parseFloat(a) - parseFloat(b)
    });
    for (let i = 0; i < timelist.length; i++) {
      if (time >= parseInt(timelist[i])) {
        let url = this._list[timelist[i]];
        let downloaded = this._ts[url].downloaded;
        let downloading = this._ts[url].downloading;
        ts = {
          url,
          downloaded,
          downloading,
          time: parseInt(timelist[i]),
          duration: parseInt(this._ts[url].duration),
          id: this._ts[url].id,
          cc: this._ts[url].cc
        };
        if (this.autoclear) {
          delete this._ts[this._lastget.url];
          delete this._list[this._lastget.time];
        }
        this._lastget = ts;
      } else {
        break;
      }
    }
    if (ts) {
      this.downloadedUrls.push(ts.url);
    }
    return ts;
  }

  getLastDownloadedTs () {
    let timelist = Object.keys(this._list).sort((a, b) => {
      const result = Number(a) - Number(b)
      return result;
    });
    let found;
    for (let i = 0; i < timelist.length; i++) {
      let url = this._list[timelist[i]];
      let downloaded = this._ts[url].downloaded;
      let downloading = this._ts[url].downloading;
      if (downloaded) {
        found = {url, downloaded, downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration)};
      } else {
        break;
      }
    }

    return found;
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

  clearDownloaded () {
    let list = Object.keys(this._ts);
    for (let i = 0, l = list.length; i < l; i++) {
      let ts = this._ts[list[i]];
      ts.downloaded = false;
      ts.downloading = false;
    }
  }

  destroy () {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = false;
  }

  resetSequence () {
    this.sequence = -1
  }
}

export default Playlist;
