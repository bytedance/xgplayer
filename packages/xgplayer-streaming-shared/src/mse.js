/* eslint-disable no-undef */
import { createPublicPromise, nowTime } from './utils'
import { Buffer } from './buffer'
import { StreamingError, ERR } from './error'
import { isBrowser } from './env'
import { Logger } from './logger'

function getMediaSource () {
  try {
    return isBrowser ? window.MediaSource : null
  } catch (e) {}
}

const MediaSource = getMediaSource()

/** @enum {string} */
export const MSEErrorType = {
  UPDATE_ERROR: 'updateError'
}

const OP_NAME = {
  APPEND: 'appendBuffer',
  REMOVE: 'removeBuffer',
  UPDATE_DURATION:'updateDuration'
}

export class MSEError extends Error {
  /**
   * @param {MSEErrorType} type
   * @param {any} [msg]
   */
  constructor (type, msg) {
    super(msg || type)
    this.type = type
    this.msg = msg
  }
}

export class MSE {
  /** @type { HTMLMediaElement | null } */
  media = null

  /** @type { MediaSource | null } */
  mediaSource = null

  _openPromise = createPublicPromise()

  _queue = Object.create(null)

  _sourceBuffer = Object.create(null)

  static VIDEO = 'video'

  static AUDIO = 'audio'

  _mseFullFlag = {}

  _st = 0

  _opst = 0

  _logger = null

  _config = null
  _url = null


  static getDefaultConfig () {
    return {
      openLog: false
    }
  }

  /**
   * @param {HTMLMediaElement} [media]
   */
  constructor (media, config) {
    this._config = Object.assign(MSE.getDefaultConfig(), config)
    if (media) this.bindMedia(media)
    this._logger = new Logger('MSE')
    if (this._config.openLog) {
      Logger.enable()
    }
  }

  get isOpened () {
    return this.mediaSource?.readyState === 'open'
  }

  get url () {
    return this._url
  }

  get duration () {
    return this.mediaSource?.duration || -1
  }

  get isEnded () {
    return this.mediaSource ? this.mediaSource.readyState === 'ended' : false
  }

  isFull (type) {
    return type ? this._mseFullFlag[type] : this._mseFullFlag[MSE.VIDEO]
  }

  /**
   * @param { number } duration
   * @return { Promise }
   */
  updateDuration (duration) {
    const isReduceDuration = this.mediaSource && this.mediaSource.duration > duration
    if (this.mediaSource && this.mediaSource.duration > duration) {
      let bufferEnd = 0
      Object.keys(this._sourceBuffer).forEach(k => {
        try {
          bufferEnd = Math.max(this.bufferEnd(k) || 0, bufferEnd)
        } catch (error) {
          // ignore
        }
      })
      if (duration < bufferEnd) {
        // 设置值比bufferEnd值小，会导致异常
        return Promise.resolve()
      }
    }

    return this._enqueueBlockingOp(() => {
      if (this.isEnded) {
        this._logger.debug('[debug mse] setDuration ended')
        return
      }
      if (this.mediaSource) {
        this.mediaSource.duration = duration
        this._logger.debug('[debug mse] setDuration')
      }
    }, OP_NAME.UPDATE_DURATION, {isReduceDuration})
  }

  /** @return { Promise } */
  open () {
    if (this._openPromise.used && !this.isOpened && this.mediaSource) {
      const ms = this.mediaSource
      const onOpen = () => {
        const costtime = nowTime() - this._st
        this._logger.debug('MSE OPEN', costtime)
        ms.removeEventListener('sourceopen', onOpen)
        this._openPromise.resolve({costtime})
      }
      ms.addEventListener('sourceopen', onOpen)
      this._openPromise = createPublicPromise()
    }

    return this._openPromise
  }

  /**
   * @param { HTMLMediaElement } media
   * @return { Promise }
   */
  async bindMedia (media) {
    if (this.mediaSource || this.media) await this.unbindMedia()
    if (!media || !MediaSource) throw new Error('Param media or MediaSource does not exist')
    this.media = media
    const ms = this.mediaSource = new MediaSource()
    this._st = nowTime()

    const onOpen = () => {
      const costtime = nowTime() - this._st
      this._logger.debug('MSE OPEN')
      ms.removeEventListener('sourceopen', onOpen)
      URL.revokeObjectURL(media.src)
      this._openPromise.resolve({costtime})
    }
    ms.addEventListener('sourceopen', onOpen)
    this._url = URL.createObjectURL(ms)
    media.src = this._url
    return this._openPromise
  }

  /** @return { Promise } */
  async unbindMedia () {
    if (!this._openPromise.used) this._openPromise.resolve()
    const ms = this.mediaSource

    if (ms) {
      Object.keys(this._queue).forEach((t) => {
        const queue = this._queue[t]
        if (queue) {
          queue.forEach(x => x.promise?.resolve?.())
        }
      })

      const hasMetadata = !!this.media && this.media.readyState >= 1
      const mseOpen = ms.readyState === 'open'

      if (hasMetadata && mseOpen) {
        try {
          ms.endOfStream()
        } catch (error) {
          // ignore
        }
      }

      Object.keys(this._sourceBuffer).forEach(k => {
        try {
          ms.removeSourceBuffer(this._sourceBuffer[k])
        } catch (error) {
          // ignore
        }
      })
    }

    if (this.media) {
      this.media.removeAttribute('src')
      try {
        this.media.load()
      } catch (error) {
        // ignore
      }
      this.media = null
    }

    this.mediaSource = null
    this._openPromise = createPublicPromise()
    this._queue = Object.create(null)
    this._sourceBuffer = Object.create(null)
  }

  /**
   * @param { string } type
   * @param { string } mimeType
   */
  createSource (type, mimeType) {
    if (this._sourceBuffer[type] || !this.mediaSource) return
    let sb
    try {
      sb = this._sourceBuffer[type] = this.mediaSource.addSourceBuffer(mimeType)
    } catch (error) {
      throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_ADD_SB, error)
    }
    sb.mimeType = mimeType
    sb.addEventListener('updateend', this._onSBUpdateEnd.bind(this, type))
    sb.addEventListener('error', this._onSBUpdateError.bind(this, type))
  }

  /**
   * @param { string } type
   * @param { string } mimeType
   * @return { Promise }
   */
  changeType (type, mimeType) {
    const sb = this._sourceBuffer[type]
    if (!this.mediaSource || !sb || sb.mimeType === mimeType) return Promise.resolve()

    if (typeof sb.changeType !== 'function') return Promise.reject()

    return this._enqueueOp(type, () => {
      sb.changeType(mimeType)
      sb.mimeType = mimeType
      this._onSBUpdateEnd(type)
    }, 'changeType', {mimeType})
  }

  /**
   * @param { string } type
   * @param { string } mimeType
   * @return { Promise }
   */
  createOrChangeSource (type, mimeType) {
    this.createSource(type, mimeType)
    return this.changeType(type, mimeType)
  }

  /**
   * @param { string } type
   * @param { BufferSource } buffer
   * @return { Promise }
   */
  append (type, buffer, context) {
    if (!buffer || !buffer.byteLength) {
      return Promise.resolve()
    }

    if (!this._sourceBuffer[type]) return Promise.resolve()

    return this._enqueueOp(type, () => {
      if (!this.mediaSource || this.media.error) return
      this._logger.debug('MSE APPEND START', context)
      this._opst = nowTime()
      this._sourceBuffer[type]?.appendBuffer(buffer)
    }, OP_NAME.APPEND, context)

  }

  /**
   * @param { string } type
   * @param { number } startTime
   * @param { number } endTime
   * @return { Promise }
   */
  remove (type, startTime, endTime, context) {
    // if (Object.keys(this._sourceBuffer).length === 1) return Promise.resolve()
    let isInsertHead = false
    if (this._mseFullFlag[type]) {
      isInsertHead = true
    }
    return this._enqueueOp(type, () => {
      if (!this.mediaSource || this.media.error) return
      const sb = this._sourceBuffer[type]
      if (startTime >= endTime || !sb) {
        this._onSBUpdateEnd(type)
        return
      }
      this._opst = nowTime()
      this._logger.debug('MSE REMOVE START', type, startTime, endTime, context)
      sb.remove(startTime, endTime)
    }, OP_NAME.REMOVE, context, isInsertHead)
  }

  clearBuffer (startTime, endTime) {
    let p
    Object.keys(this._sourceBuffer).forEach(k => {
      p = this.remove(k, startTime, endTime)
    })
    return p || Promise.resolve()
  }

  clearAllBuffer () {
    let p
    Object.keys(this._sourceBuffer).forEach(k => {
      const sb = this._sourceBuffer[k]
      p = this.remove(k, 0, Buffer.end(Buffer.get(sb)))
    })
    return p
  }

  clearOpQueues (type, allClear) {
    this._logger.debug('MSE clearOpQueue START')
    const queue = this._queue[type]
    if (allClear && queue) {
      this._queue[type] = []
      return
    }
    if (!queue || !queue[type] || queue.length < 5) return
    const initOpque = []
    queue.forEach(op => {
      if (op.context && op.context.isinit) {
        initOpque.push(op)
      }
    })
    this._queue[type] = queue.slice(0, 2)
    initOpque.length > 0 && this._queue[type].push(...initOpque)
  }

  /**
   * @param {EndOfStreamError} [reason]
   * @returns {Promise}
   */
  endOfStream (reason) {
    if (!this.mediaSource || this.mediaSource.readyState !== 'open') return Promise.resolve()
    return this._enqueueBlockingOp(() => {
      const ms = this.mediaSource
      if (!ms || ms.readyState !== 'open') return
      this._logger.debug('MSE endOfStream START')
      if (reason) {
        ms.endOfStream(reason)
      } else {
        ms.endOfStream()
      }
    }, 'endOfStream')
  }

  setLiveSeekableRange (start, end) {
    const ms = this.mediaSource
    if (start < 0 || end < start || !ms?.setLiveSeekableRange || ms.readyState !== 'open') return
    ms.setLiveSeekableRange(start, end)
  }

  /**
   * @param {string} type
   * @returns {?SourceBuffer}
   */
  getSourceBuffer (type) {
    return this._sourceBuffer[type]
  }

  /**
   * @param { string } type
   * @return { TimeRanges | void }
   */
  buffered (type) {
    return Buffer.get(this._sourceBuffer[type])
  }

  /**
   * @param { string } type
   * @return { number }
   */
  bufferStart (type) {
    return Buffer.start(this.buffered(type))
  }

  /**
   * @param { string } type
   * @return { number }
   */
  bufferEnd (type) {
    return Buffer.end(this.buffered(type))
  }

  _enqueueOp (type, exec, opName, context, isInsertHead) {
    if (!this.mediaSource) return Promise.resolve()
    const queue = this._queue[type] = this._queue[type] || []
    const op = {
      exec,
      promise: createPublicPromise(),
      opName,
      context
    }

    if (isInsertHead) {
      queue.splice(0, 0, op)
      this._mseFullFlag[type] = false
      this._startQueue(type)
    } else {
      queue.push(op)
    }

    if (this.isOpened || this.isEnded) {
      if (queue.length === 1) {
        this._startQueue(type)
      }
    } else {
      this._openPromise.then(() => {
        if (queue.length === 1) {
          this._startQueue(type)
        }
      })
    }


    return op.promise
  }

  async _enqueueBlockingOp (exec, opName, context) {
    if (!this.mediaSource) return Promise.resolve()
    const types = Object.keys(this._sourceBuffer)
    if (!types.length) {
      return exec()
    }

    const waiters = []
    types.forEach(t => {
      const queue = this._queue[t]
      const prom = createPublicPromise()
      waiters.push(prom)
      queue.push({exec: () => {
        prom.resolve()}, promise: prom, opName, context})
      if (queue.length === 1) {
        this._startQueue(t)
      }
    })

    return Promise.all(waiters).then(() => {
      try {
        return exec()
      } finally {
        types.forEach(t => {
          const queue = this._queue[t]
          const sb = this._sourceBuffer[t]
          queue?.shift()
          if (!sb || !sb.updating) {
            this._startQueue(t)
          }
        })
      }
    })
  }

  _startQueue (type) {
    const queue = this._queue[type]
    if (queue) {
      const op = queue[0]
      if (op && !this._mseFullFlag[type]) {
        try {
          op.exec()
        } catch (error) {
          if (error && error.message && error.message.indexOf('SourceBuffer is full') >= 0) {
            this._mseFullFlag[type] = true
            this._logger.error('[MSE error],  context,', op.context, ' ,name,', op.opName, ',err,SourceBuffer is full')
            op.promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_FULL, error))
          } else {
            this._logger.error(error)
            op.promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error))
            queue.shift()
            this._startQueue(type)
          }
        }
      }
    }
  }

  _onSBUpdateEnd = (type) => {
    const queue = this._queue[type]
    if (queue) {
      const op = queue[0]
      if (!(op?.opName === OP_NAME.UPDATE_DURATION)) {
        queue.shift()
      }
      if (op) {
        const costtime = nowTime() - this._opst
        this._logger.debug('UpdateEnd', op.opName, costtime, op.context)
        op.promise.resolve({name: op.opName, context: op.context, costtime})
        this._startQueue(type)
      }
    }
  }

  _onSBUpdateError = (type, event) => {
    const queue = this._queue[type]
    if (queue) {
      const op = queue[0]
      if (op) {
        this._logger.error('UpdateError', type, op.opName, op.context)
        op.promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_APPEND_BUFFER, event))
        // Do not shift from queue, 'updateend' event will fire next
      }
    }
  }

  /**
   * @param {string} [mime='video/mp4; codecs="avc1.42E01E,mp4a.40.2"']
   * @returns {boolean}
   */
  static isSupported (mime = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"') {
    if (!MediaSource) return false
    try {
      return MediaSource.isTypeSupported(mime)
    } catch (error) {
      this._logger.error(mime, error)
      return false
    }
  }

  setTimeoffset (type, timestampOffset, context) {
    return this._enqueueOp(type, () => {
      if (timestampOffset < 0) {
        timestampOffset += 0.001
      }
      this._sourceBuffer[type].timestampOffset = timestampOffset
      this._onSBUpdateEnd(type)
    }, 'setTimeoffset', context)
  }

  /** *重置decode时间戳 */
  abort (type, context) {
    if (!this.isOpened) {
      return Promise.resolve()
    }
    return this._enqueueOp(type, () => {
      this._sourceBuffer[type].abort()
      this._onSBUpdateEnd(type)
    }, 'abort', context)
  }
}
