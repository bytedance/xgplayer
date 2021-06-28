/**
 * @typedef {Object} TSFrag
 * @property {number} duration
 * @property {boolean} downloaded
 * @property {boolean} downloading
 * @property {number=} start
 * @property {number} cc
 * @property {boolean} discontinue
 */

class Playlist {
  constructor (configs) {
    /** @type {string} */
    this._baseURL = ''
    /** @type {Object.<number, string>} */
    this._list = {}
    /** @type {Object.<string, TSFrag>} */
    this._ts = {}
    /** @type {number} */
    this.version = 0
    /** @type {number} */
    this.sequence = -1
    /** @type {number} */
    this.targetduration = 0
    /** @type {number} */
    this.duration = 0
    /** @type {number} */
    this.fragLength = 0
    /** @type {TSFrag | undefined} */
    this._lastget = undefined
    /** @type {boolean} */
    this.end = false // 判断live | vod , 对点播或直播结束时存在 EXT-X-ENDLIST
    /** @type {boolean} */
    this.autoclear = configs.autoclear || false
    /** @type {*} */
    this.logger = configs.logger
    /** @type {string[]} */
    this.downloadedUrls = []
  }

  /**
   * @return {Object<number, string>}
   */
  get list () {
    return this._list
  }

  /**
   * @param {string} baseURL
   */
  set baseURL (baseURL) {
    if (this.baseURL !== baseURL) {
      this.clear()
      this._baseURL = baseURL
    }
  }

  /**
   * base cdn url for ts fragments
   * @return {string}
   */
  get baseURL () {
    return this._baseURL
  }

  /**
   * add a ts frag to play list
   * @param {string} tsURL ts frag url
   * @param {number} duration ts frag duration
   * @param {boolean} discontinue has #EXT-X-DISCONTINUITY tag before this frag
   * @param {number} id
   * @param {number} cc
   */
  push (tsURL, duration, discontinue, id, cc, isLast) {
    if (!this._ts[tsURL]) {
      this._ts[tsURL] = {duration: duration,
        downloaded: false,
        downloading: false,
        start: this.duration,
        discontinue: !!discontinue,
        id,
        cc,
        isLast: isLast || false
      }
      this._list[this.duration] = tsURL
      this.duration += duration
      this.fragLength += 1
    }
  }

  /**
   * delete a fragment from playlist
   * @param {string} url
   */
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
      delete this._list[this._ts[url].start]
      delete this._ts[url]
      this.fragLength -= 1
    }
  }

  /**
   * add m3u8 to current play list
   * @param {*} data
   * @param {boolean} deletepre
   */
  pushM3U8 (data, deletepre) {
    // 常规信息替换
    if (!data) {
      throw new Error(`No m3u8 data received.`)
    }
    this.version = data.version
    this.targetduration = data.targetduration
    if (data.encrypt && !this.encrypt) {
      this.encrypt = data.encrypt
    }

    this.end = data.end || false

    if (!data.sequence) {
      data.sequence = 0
    }

    // 新分片信息
    if (data.sequence > this.sequence) {
      let len = data.frags.length
      if (this.logger) {
        this.logger.log('PLAYLIST', `new playlist [${data.sequence}, ${data.sequence + len}]`)
      }
      this.sequence = data.sequence
      let newfraglist = []
      for (let i = 0; i < len; i++) {
        let frag = data.frags[i]
        if (!this._ts[frag.url] && this.downloadedUrls.indexOf(frag.url) < 0) {
          newfraglist.push(frag.url)
          this.push(frag.url, frag.duration, frag.discontinue, frag.id, frag.cc, frag.isLast)
        }
      }

      if (newfraglist.length < 1) {
        throw new Error(`Can not read ts file list.`)
      }

      if (deletepre) {
        let tslist = this.getTsList()
        for (let i = 0; i < tslist.length; i++) {
          if (newfraglist.indexOf(tslist[i]) < 0) {
            this.deleteFrag(tslist[i])
          }
        }
      }
    } else {
      throw new Error(`Old m3u8 file received, ${data.sequence}`)
    }
  }

  /**
   * return ts url list
   * @return {string[]}
   */
  getTsList () {
    return Object.keys(this._ts)
  }

  /**
   * mark a ts frag as downloaded / not downloaded
   * @param {string} tsname
   * @param {boolean} isloaded
   */
  downloaded (tsname, isloaded) {
    let ts = this._ts[tsname]
    if (ts) {
      ts.downloaded = isloaded
    }
  }

  /**
   * mark a ts frag as loading / not loading
   * @param {string} tsname
   * @param {boolean} loading
   */
  downloading (tsname, loading) {
    let ts = this._ts[tsname]
    if (ts) {
      ts.downloading = loading
    }
  }

  /**
   * get a frag by ts name
   * @param name
   * @return {TSFrag}
   */
  getTsByName (name) {
    return this._ts[name]
  }

  /**
   * get ts frag by timestamp
   * @param {number} time
   * @return {undefined|TSFrag}
   */
  getTs (time) {
    let timelist = Object.keys(this._list)
    let ts

    if (time === undefined) {
      if (this._lastget) {
        time = this._lastget.time + this._lastget.duration
      } else {
        time = 0
      }
    }

    if (timelist.length < 1 || time >= this.duration) {
      return undefined
    }
    timelist = timelist.sort((a, b) => {
      return parseFloat(a) - parseFloat(b)
    })
    for (let i = 0; i < timelist.length; i++) {
      if (time >= parseInt(timelist[i])) {
        let url = this._list[timelist[i]]
        let downloaded = this._ts[url].downloaded
        let downloading = this._ts[url].downloading
        ts = {
          url,
          downloaded,
          downloading,
          time: parseInt(timelist[i]),
          duration: parseInt(this._ts[url].duration),
          id: this._ts[url].id,
          cc: this._ts[url].cc,
          isLast: this._ts[url].isLast
        }
        if (this.autoclear && this._lastget) {
          delete this._ts[this._lastget.url]
          delete this._list[this._lastget.time]
        }
        this._lastget = ts
      } else {
        break
      }
    }
    if (ts) {
      this.downloadedUrls.push(ts.url)
    }
    return ts
  }

  /**
   * get last downloaded ts frag
   * @return {TSFrag|undefined}
   */
  getLastDownloadedTs () {
    let timelist = Object.keys(this._list).sort((a, b) => {
      const result = Number(a) - Number(b)
      return result
    })
    let found
    for (let i = 0; i < timelist.length; i++) {
      let url = this._list[timelist[i]]
      let downloaded = this._ts[url].downloaded
      let downloading = this._ts[url].downloading
      if (downloaded) {
        found = {url, downloaded, downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration)}
      } else {
        break
      }
    }

    return found
  }

  clear () {
    this._baseURL = ''
    this._list = {}
    this._ts = {}
    this.version = 0
    this.sequence = -1
    this.targetduration = 0
    this.duration = 0
  }

  clearDownloaded () {
    let list = Object.keys(this._ts)
    for (let i = 0, l = list.length; i < l; i++) {
      let ts = this._ts[list[i]]
      ts.downloaded = false
      ts.downloading = false
    }
  }

  destroy () {
    this._baseURL = ''
    this._list = {}
    this._ts = {}
    this.version = 0
    this.sequence = -1
    this.targetduration = 0
    this.duration = 0
    this.fragLength = 0
    this._lastget = undefined
    this.autoclear = false
  }

  resetSequence () {
    this.sequence = -1
  }
}

export default Playlist
