import { BasePlugin, Sniffer, Util, Events, Errors } from 'xgplayer'
import MP4 from './mp4'
import MSE from './media/mse'
import Task from './media/task'
import Buffer from './fmp4/buffer'
import FMP4 from './fmp4/mp4'

let MIME_TYPE = 'audio/mp4; codecs="mp4a.40.5"'

const isEnded = (player, mp4) => {
  if (mp4.meta.endTime - player.currentTime < 2) {
    const range = player.getBufferedRange()
    if (player.currentTime - range[1] < 0.1) {
      player.mse.endOfStream()
    }
  }
}

const errorHandle = (player, err) => {
  console.log('errorHandle')
}
class M4APlayer extends BasePlugin {
  static set MIME_TYPE (value) {
    MIME_TYPE = value
  }

  static get MIME_TYPE () {
    return MIME_TYPE
  }

  static get pluginName () {
    return 'm4aPlayer'
  }

  static get defaultConfig () {
    return {
      withCredentials: true,
      videoOnly: false,
      headers: {
      },
      chunkSize: Math.pow(25, 4),
      preloadTime: 15, // 预加载时长
      reqTimeLength: 5,
      segPlay: false,
      pluginRule: () => {
        return true
      }
    }
  }

  static isSupported () {
    return ['chrome', 'firfox', 'safari'].some(item => item === Sniffer.browser) && MSE.isSupported(MIME_TYPE)
  }

  constructor (options) {
    super(options)
    this.mp4 = null
    this.mse = null
    this.waiterTimer = null
    this.name = ''
    this.vid = ''
    // this.attachEvents();
  }

  afterCreate () {
    console.log('afterCreate')
    if (!M4APlayer.isSupported()) {
      return
    }
    // BasePlugin.defineGetterOrSetter(player, {
    //   '__url': {
    //     get: () => {
    //       return this.mse ? this.mse.url : player.config.url
    //     }
    //   }
    // });
    this.attachEvents()
  }

  beforePlayerInit () {
    if (!M4APlayer.isSupported()) {
      return
    }
    const { playerConfig, player } = this
    let urlInfo = {}
    if (Util.typeOf(playerConfig.url) === 'Array') {
      urlInfo = playerConfig.url
    } else {
      urlInfo = [{
        src: playerConfig.url,
        name: playerConfig.name,
        vid: playerConfig.vid,
        poster: playerConfig.poster
      }]
    }
    if (!urlInfo[0].src) {
      player.emit('error', new Errors('other', player.config.vid))
      return
    }
    this.urlInfo = urlInfo
    this.url = urlInfo[0].src
    // if (config.segPlay) {
    //   let sp = config.segPlay
    //   player.cut(sp.start, sp.end).then(blob => {
    //     if (blob) {
    //       player.config.url = URL.createObjectURL(blob)
    //       player.start(player.config.url)
    //     }
    //   }, () => {
    //     console.log('error')
    //   })
    //   return
    // }

    return this.initM4a(this.url).then(result => {
      const mp4 = result[0]; const mse = result[1]
      player.mp4 = mp4
      player.mse = mse
      player.url = this.mse.url
      mp4.on('error', err => {
        errorHandle(player, err)
      })
    })
  }

  attachEvents () {
    const { player } = this
    // player.once('canplay', () => {
    //   // safari decoder time offset
    //   if (Sniffer.browser === 'safari' && player.buffered.length) {
    //     let start = player.buffered.start(0);
    //     player.currentTime = start + 0.1;
    //   }
    // });
    player.on(Events.TIME_UPDATE, this.onTimeupdate)
    player.on(Events.SEEKING, this.onSeeking)
    player.on(Events.WAITING, this.onWaiting)
    player.on(Events.REPLAY, this.replay)
  }

  detachEvents () {
    const { player } = this
    player.off(Events.TIME_UPDATE, this.onTimeupdate)
    player.off(Events.SEEKING, this.onSeeking)
    player.off(Events.WAITING, this.onWaiting)
    player.off(Events.REPLAY, this.replay)
  }

  loadData (i = 0, time = 0, order = null, nextOrder = null) {
    const { player } = this
    if (player.timer) {
      clearTimeout(player.timer)
    }
    time = Math.max(time, player.currentTime)
    player.timer = setTimeout(function () {
      player.mp4.seek(time, order, nextOrder).then(buffer => {
        if (buffer) {
          const mse = player.mse
          mse.updating = true
          mse.appendBuffer(buffer)
          mse.once('updateend', () => {
            mse.updating = false
          })
        }
      }, () => {
        if (i < 10) {
          setTimeout(function () {
            this.loadData(i + 1)
          }, 2000)
        }
      })
    }, 50)
  }

  initM4a (url, replaying = false) {
    const { config } = this
    this.mp4 = new MP4(url)
    this.mp4.reqTimeLength = config.reqTimeLength
    return new Promise((resolve, reject) => {
      this.mp4.once('mdatReady', () => {
        this.mse = new MSE()
        if (replaying) {
          this.mse.replaying = true
        }
        this.mse.on('sourceopen', () => {
          this.mse.appendBuffer(this.mp4.packMeta(this.mp4.meta))
          this.mse.once('updateend', () => {
            this.loadData()
          })
        })
        this.mse.on('error', function (e) {
          reject(e)
        })
        resolve([this.mp4, this.mse])
      })
      this.mp4.on('error', (e) => {
        reject(e)
      })
    })
  }

  cut (url, start = 0, end) {
    const segment = new Buffer()
    return new Promise((resolve, reject) => {
      const mp4 = new MP4(url)
      mp4.once('mdatReady', () => {
        if (!end || end <= start) {
          end = start + 15
        }
        if (end > mp4.meta.audioDuration) {
          start = mp4.meta.audioDuration - (end - start)
          end = mp4.meta.audioDuration
        }
        mp4.reqTimeLength = end - start
        mp4.cut = true
        mp4.seek(start).then(buffer => {
          if (buffer) {
            const meta = Util.deepCopy({
              duration: mp4.reqTimeLength,
              audioDuration: mp4.reqTimeLength,
              endTime: mp4.reqTimeLength
            }, mp4.meta)
            meta.duration = mp4.reqTimeLength
            meta.audioDuration = mp4.reqTimeLength
            meta.endTime = mp4.reqTimeLength
            segment.write(mp4.packMeta(meta), buffer)
            resolve(new window.Blob([segment.buffer], { type: MIME_TYPE }))
          }
        })
      })
      mp4.on('error', (e) => {
        reject(e)
      })
    })
  }

  switchURL (url) {

  }

  onTimeupdate = (e) => {
    const { config, player, mse, mp4 } = this
    // let mse = player.mse; let mp4 = player.mp4
    if (mse && !mse.updating && mp4.canDownload) {
      const timeRage = mp4.timeRage
      const range = player.getBufferedRange()
      const cacheMaxTime = player.currentTime + config.preloadTime
      if (range[1] - cacheMaxTime > 0) {
        return
      }
      timeRage.every((item, idx) => {
        if (range[1] === 0) {
          this.loadData(5)
          return false
        } else {
          if (item[0].time >= range[1] && !mp4.bufferCache.has(idx)) {
            this.loadData(0, item[0].time, item[0].order, item[1].order)
          } else {
            return true
          }
        }
      })
      isEnded(player, mp4)// hack for older webkit
    }
  }

  onSeeking = (e) => {
    const { player } = this
    const buffered = player.buffered
    let hasBuffered = false
    const curTime = player.currentTime
    Task.clear()
    const timeRage = player.mp4.timeRage
    if (buffered.length) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
          hasBuffered = true
          break
        }
      }
      if (!hasBuffered) {
        timeRage.every((item, idx) => {
          if (item[0].time <= curTime && item[1].time > curTime) {
            this.loadData(0, item[0].time, item[0].order, item[1].order)
            return false
          } else {
            return true
          }
        })
      }
    } else {
      timeRage.every((item, idx) => {
        if (item[0].time <= curTime && item[1].time > curTime) {
          this.loadData(0, item[0].time, item[0].order, item[1].order)
          return false
        } else {
          return true
        }
      })
    }
  }

  onPause = (e) => {
    Task.clear()
  }

  onPlaying = (e) => {
    if (this.waiterTimer) {
      clearTimeout(this.waiterTimer)
      this.waiterTimer = null
    }
  }

  onWaiting = (e) => {
    const { player } = this
    const buffered = player.buffered
    let hasBuffered = false
    const curTime = player.currentTime
    Task.clear()
    const timeRage = player.mp4.timeRage
    if (buffered.length) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
          hasBuffered = true
          break
        }
      }
      if (!hasBuffered) {
        timeRage.every((item, idx) => {
          if (item[0].time <= curTime && item[1].time > curTime) {
            this.loadData(0, item[0].time, item[0].order, item[1].order)
            return false
          } else {
            return true
          }
        })
      }
    } else {
      timeRage.every((item, idx) => {
        if (item[0].time <= curTime && item[1].time > curTime) {
          this.loadData(0, item[0].time, item[0].order, item[1].order)
          return false
        } else {
          return true
        }
      })
    }
  }

  onEnded = (e) => {
    const { player } = this
    // player.hasEnded = true
    if (player.config.offline) {
      const mdatCache = new Buffer()
      mdatCache.write(FMP4.size(player.mp4.mdatBox.size), FMP4.type('mdat'))
      player.mp4.mdatCache.sort((a, b) => {
        return a.start - b.start
      })
      let end = player.mp4.mdatCache[0].start - 1
      player.mp4.mdatCache.forEach((item, index) => {
        if (item.start === end + 1) {
          mdatCache.write(item.buffer)
          end = item.end
        }
      })
      if (end !== player.mp4.mdatCache[player.mp4.mdatCache.length - 1].end) {
        return
      }
      const m4aCache = new Buffer()
      if (player.mp4.freeBuffer) {
        m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), new Uint8Array(player.mp4.freeBuffer), mdatCache.buffer)
      } else {
        m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), mdatCache.buffer)
      }
      const offlineVid = this.vid || this.name
      player.database.openDB(() => {
        player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new window.Blob([m4aCache.buffer], { type: MIME_TYPE }) }])
        setTimeout(() => {
          player.database.closeDB()
        }, 5000)
      })
    }
  }

  replay = () => {}

  destroy () {
    const { player } = this
    Task.clear()
    this.detachEvents()
    if (player.timer) {
      clearTimeout(player.timer)
    }
  }
}

export default M4APlayer
