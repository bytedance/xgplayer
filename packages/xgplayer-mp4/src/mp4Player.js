/* eslint-disable array-callback-return */
// import 'core-js/modules/es7.string.pad-start';
import { BasePlugin, Events, Sniffer, Util } from 'xgplayer'
import MP4 from './mp4'
import MSE from './media/mse'
import Task from './media/task'
import Buffer from './fmp4/buffer'

// const AUDIO_CODECS = 'audio/mp4; codecs="mp4a.40.5"'

const VIDEO_CODECS = 'video/mp4; codecs="avc1.64001E, mp4a.40.5"'

const ONLY_VIDEO_CODECS = 'video/mp4; codecs="avc1.64001E"'

export default class Mp4Player extends BasePlugin {
  static get pluginName () {
    return 'mp4Player'
  }

  static get defaultConfig () {
    return {
      withCredentials: true,
      videoOnly: false,
      headers: {
      },
      reqTimeLength: 5,
      preloadTime: 60, // 预加载时长
      maxCache: 180,
      chunkSize: Math.pow(25, 3),
      mp4ProgressTimer: 1000
    }
  }

  static get version () {
    return '__XGPLAYER_MP4__'
  }

  constructor (options) {
    super(options)

    this.loadData = this.loadData.bind(this)
    this.destroy = this.destroy.bind(this)
    this.waiterTimer = null
    this.progressTimer = null
    this.timer = null
    this.timer1 = null
    this.mp4 = null
    this.mse = null
    this.rmbFlag = 0
  }

  afterCreate () {
    window.__mp4player = this
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            try {
              return this.mse ? this.mse.url : this.config.url
            } catch (error) {
              return null
            }
          }
        }
      })
    } catch (e) {
      // NOOP
    }
    this.attachEvents()
  }

  beforePlayerInit () {
    return this.initMp4()
  }

  attachEvents () {
    // this.on(Events.TIME_UPDATE, this.onTimeupdate);
    this.on(Events.SEEKING, this.onSeeking)
    this.on(Events.WAITING, this.onWaiting)
    this.on(Events.ENDED, this.onEnded)
    this.on(Events.URL_CHANGE, this.onUrlChange)
  }

  detachEvents () {
    // this.off(Events.TIME_UPDATE, this.onTimeupdate);
    this.off(Events.SEEKING, this.onSeeking)
    this.off(Events.WAITING, this.onWaiting)
    this.off(Events.URL_CHANGE, this.onUrlChange)
    this.stopBuffer()
  }

  initMp4 (url) {
    const { player, config } = this
    const mp4 = new MP4(url || player.config.url, this.config, this.config.chunkSize)
    mp4.reqTimeLength = config.reqTimeLength
    return new Promise((resolve, reject) => {
      mp4.once('moovReady', () => {
        const codec = !mp4.meta.audioConfig || this.config.videoOnly ? ONLY_VIDEO_CODECS : VIDEO_CODECS
        const mse = new MSE(codec)
        mse.on('sourceopen', () => {
          mse.appendBuffer(mp4.packMeta())
          mse.once('updateend', this.loadData)
        })
        this.mse = mse
        this.mp4 = mp4
        this.once(Events.CANPLAY, this.onOnceCanplay)
        this.startBuffer()
        resolve(mp4)
      })

      mp4.on('error', (e) => {
        // reject(e);
        console.log('mp4 error', e)
        this.emit(Events.ERROR, e)
        resolve()
      })
    }).catch(e => {
      console.error('[initMp4]error', e)
      throw e
    })
  }

  cut (start = 0, end) {
    const { player } = this
    const segment = new Buffer()
    const mp4 = new MP4(player.config.url, this.config, player.config.withCredentials)
    return new Promise((resolve, reject) => {
      mp4.once('moovReady', () => {
        if (!end || end <= start) {
          end = start + 15
        }
        if (end > mp4.meta.duration) {
          start = mp4.meta.duration - (end - start)
          end = mp4.meta.duration
        }
        mp4.cut(start, end).then(buffer => {
          if (buffer) {
            const meta = Util.deepCopy({
              duration: end - start,
              audioDuration: end - start,
              endTime: end - start
            }, mp4.meta)
            meta.duration = end - start
            meta.videoDuration = end - start
            meta.audioDuration = end - start
            meta.endTime = end - start
            segment.write(mp4.packMeta(meta), buffer)
            resolve(new window.Blob([segment.buffer], { type: 'video/mp4; codecs="avc1.64001E, mp4a.40.5"' }))
          }
        })
      })
      mp4.on('error', (e) => {
        reject(e)
      })
    })
  };

  startBuffer () {
    if (this.progressTimer) {
      this.stopBuffer()
    }
    this.progressTimer = setInterval(() => {
      this.onLoadBufferupdate()
      if (this.rmbFlag > 4) {
        this.rmbFlag = 0
      }
      this.rmbFlag === 0 && this.onRemoveBuffer()
    }, this.config.mp4ProgressTimer)
  }

  stopBuffer () {
    clearInterval(this.progressTimer)
    this.progressTimer = null
  }

  loadData (i = 0, time = this.player.currentTime) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.mp4.seek(time + i * 0.1).then(buffer => {
        if (buffer) {
          const { mse } = this
          mse.updating = true
          mse.appendBuffer(buffer)
          mse.once('updateend', () => {
            mse.updating = false
          })
        }
      }, (error) => {
        console.error(error)
        if (i < 10) {
          this.timer1 = setTimeout(() => {
            this.loadData(i + 1)
          }, 2000)
        }
      })
    }, 50)
  }

  onUrlChange = (url) => {
    const { player } = this
    this.stopBuffer()
    this.initMp4(url).then(data => {
      player.video.src = this.mse.url
      player.play()
    }).catch(err => {
      console.error(err)
    })
  }

  /**
   * 定期检测移除已经播放或的buffer
   **/
  onRemoveBuffer () {
    const { player, config, mse } = this
    if (mse.updating) {
      return
    }
    const buffered = this.player.buffered
    const min = player.currentTime - config.maxCache
    const max = player.currentTime + config.maxCache
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.end(i) < min || buffered.start > max) {
        mse.removeBuffer(buffered.start(i), buffered.end(i))
      } else if (buffered.start(i) < min) {
        mse.removeBuffer(buffered.start(i), min)
      } else if (buffered.end(i) > max) {
        mse.removeBuffer(max, buffered.end(i))
      }
    }
  }

  /**
   * 定时检测buffer并加载内容
   **/
  onLoadBufferupdate () {
    const { player, config } = this
    const mse = this.mse
    const mp4 = this.mp4
    if (mse && !mse.updating && mp4.canDownload) {
      const timeRage = mp4.timeRage
      const range = player.getBufferedRange()
      const cacheMaxTime = player.currentTime + config.preloadTime / 2
      // console.log('onLoadBufferupdate', range[1] - cacheMaxTime > 0)
      if (range[1] - cacheMaxTime > 0) {
        return
      }
      // console.log('[onLoadBufferupdate]loadData', range[1])
      timeRage.every((item, idx) => {
        const start = item[0]
        const end = item[1] !== -1 ? item[1] : player.duration
        const center = (start + end) / 2
        if (range[1] === 0) {
          return false
        } else {
          if (center > range[1] && !mp4.bufferCache.has(idx)) {
            // console.log('onLoadBufferupdate', center)
            this.loadData(0, center)
          } else {
            return true
          }
        }
      })
      this.isEnded(player, mp4)// hack for older webkit
    }
  }

  onWaiting = () => {
    const { player } = this
    const mp4 = this.mp4
    if (!mp4 || !mp4.meta) {
      return
    }
    const range = player.getBufferedRange()
    const duration = mp4.meta.videoDuration
    if (duration - player.currentTime < 0.5 && duration - range[1] < 0.5) {
      this.mse.endOfStream()
    } else {
      this.loadData(0, range[1] + 1)
      if (this.waiterTimer) {
        Util.clearTimeout(this.waiterTimer)
        this.waiterTimer = null
      }
      this.waiterTimer = setTimeout(() => {
        const buffered = player.buffered
        let start
        for (let i = 0, len = buffered.length; i < len; i++) {
          start = buffered.start(i)
          if (start >= player.currentTime) {
            player.currentTime = start
            break
          }
        }
      }, 1500)
    }
  }

  onOnceCanplay = () => {
    const { player } = this
    // safari decoder time offset
    if (Sniffer.browser === 'safari' && player.buffered.length) {
      const start = player.buffered.start(0)
      player.currentTime = start + 0.1
    }
  }

  onSeeking = () => {
    const { player } = this
    const buffered = player.buffered
    let hasBuffered = false

    const curTime = player.video.currentTime
    Task.clear()
    if (player.ended) {
      this.mp4.clear()
    }
    if (!this.progressTimer) {
      this.startBuffer()
    }
    if (buffered.length) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
          hasBuffered = true
          break
        }
      }
      if (!hasBuffered) {
        this.loadData(0, curTime)
      }
    } else {
      this.loadData(0, curTime)
    }
  }

  onEnded = (e) => {
    console.log('>>>onEnded')
    this.stopBuffer()
    this.mse.clearBuffer()
    // this.mse.addSourceBuffer()
    this.mp4.clear()
  }

  errorHandle (err) {
    const { player } = this
    err.url = player.src
    if (err.errd && typeof err.errd === 'object') {
      if (this.mp4) {
        err.errd.url = this.mp4.url
        err.url = this.mp4.url
        this.mp4.canDownload = false
      }
    }
    Task.clear()
    if (this.mp4 && this.mp4.bufferCache) {
      this.mp4.bufferCache.clear()
    }
    this.stopBuffer()
  }

  isEnded () {
    const { player, mp4, mse } = this
    if (mp4.meta.endTime - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        mse.endOfStream()
      }
    }
  };

  destroy () {
    Task.clear()
    if (this.timer) {
      clearTimeout(this.timer)
    }
    clearTimeout(this.waiterTimer)
    clearTimeout(this.timer1)
    this.detachEvents()
  }
}
