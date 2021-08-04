import EVENTS from '../events'
import { Err } from '../errors'
import Speed from './speed'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const READ_STREAM = 0
const READ_TEXT = 1
const READ_JSON = 2
const READ_BUFFER = 3
class FetchLoader {
  constructor (configs) {
    this.configs = Object.assign({}, configs)
    this.url = null
    this.status = 0
    this.error = null
    this._reader = null
    this._canceled = false
    this._destroyed = false
    this.readtype = this.configs.readtype
    this.buffer = this.configs.buffer || 'LOADER_BUFFER'
    this._loaderTaskNo = 0
    this._ttfb = 0
    this._speed = new Speed()
    if (window.AbortController) {
      this.abortControllerEnabled = true
    }
  }

  static isSupported () {
    return !!window.fetch
  }

  init () {
    this.on(LOADER_EVENTS.LOADER_START, this.load.bind(this))
  }

  static get type () {
    return 'loader'
  }

  /**
   * @param {string}      url
   * @param {RequestInit} params
   * @param {number}      timeout
   * @return {Promise<unknown>}
   */
  fetch (url, params, timeout) {
    let timer = null
    if (this.abortControllerEnabled) {
      this.abortController = new window.AbortController()
    }
    Object.assign(params, { signal: this.abortController ? this.abortController.signal : undefined })
    const start = new Date().getTime()
    return Promise.race([
      fetch(url, params),
      new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          /* eslint-disable-next-line */
          reject({
            code: 999,
            message: 'fetch timeout'
          })
          if (this.abortController) {
            this.abortController.abort()
          }
        }, timeout || 1e4) // 10s
      })
    ]).then((response) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      const end = new Date().getTime()
      this.emit(LOADER_EVENTS.LOADER_TTFB, {
        start,
        end,
        elapsed: end - start,
        url
      })
      return response
    })
  }

  /**
   * @param {string}      url
   * @param {RequestInit} params
   * @param {number}      retryTimes
   * @param {number}      totalRetry
   * @param {number}      delayTime
   * @return {Promise<{ok} | minimist.Opts.unknown>}
   */
  internalLoad (url, params, retryTimes, totalRetry, delayTime = 0, loadTimeout) {
    if (this._destroyed) return
    this.loading = true
    return this.fetch(this.url, params, loadTimeout).then((response) => {
      !this._destroyed && this.emit(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, response.headers)

      if (response.ok) {
        this.status = response.status
        Promise.resolve().then(() => {
          this._onFetchResponse(response)
        })

        return Promise.resolve(response)
      }

      if (retryTimes-- > 0) {
        this._retryTimer = setTimeout(() => {
          this.emit(LOADER_EVENTS.LOADER_RETRY, {
            response: response,
            reason: 'response not ok',
            retryTime: totalRetry - retryTimes
          })
          return this.internalLoad(url, params, retryTimes, totalRetry, delayTime, loadTimeout)
        }, delayTime)
      } else {
        this.loading = false
        this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, {
          code: response.status || 21,
          message: `${response.status} (${response.statusText})`,
          // TODO: 重构老对象
          err: Err.NETWORK(new Error(response.statusText), url, response.status, response)
        })
      }
    }).catch((error) => {
      if (this._destroyed) {
        this.loading = false
        return
      }

      if (retryTimes-- > 0) {
        this._retryTimer = setTimeout(() => {
          this.emit(LOADER_EVENTS.LOADER_RETRY, {
            error: error,
            reason: 'fetch error',
            retryTime: totalRetry - retryTimes
          })
          return this.internalLoad(url, params, retryTimes, totalRetry, delayTime, loadTimeout)
        }, delayTime)
      } else {
        this.loading = false
        if (error && error.name === 'AbortError') {
          return
        }
        // TODO: 重构老对象
        this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, Object.assign({
          code: 21,
          err: Err.NETWORK_UNEXPECTED(error, url)
        }, error))
      }
    })
  }

  /**
   * @param {string}      url
   * @param {options, retryCount, retryDelay, loadTimeout}  pluginConfig
   * @return {Promise<{ok} | minimist.Opts.unknown>}
   */
  load (url, { options = {}, retryCount, retryDelay, loadTimeout } = {}) {
    retryCount = retryCount === undefined ? 3 : retryCount
    this.url = url
    this._canceled = false

    // TODO: Add Ranges
    const params = this.getParams(options)

    return this.internalLoad(url, params, retryCount, retryCount, retryDelay, loadTimeout)
  }

  _onFetchResponse (response) {
    const _this = this
    const buffer = this._context.getInstance(this.buffer)
    this._loaderTaskNo++
    const taskno = this._loaderTaskNo
    if (response.ok === true) {
      switch (this.readtype) {
        case READ_JSON:
          response.json().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data)
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer)
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data)
              }
            }
          })
          break
        case READ_TEXT:
          response.text().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data)
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer)
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data)
              }
            }
          })
          break
        case READ_BUFFER:
          response.arrayBuffer().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(new Uint8Array(data))
                this._speed.addBytes(data.byteLength)
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer)
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data)
              }
            }
          })
            .catch(() => {})
          break
        case READ_STREAM:
        default:
          return this._onReader(response.body.getReader(), taskno)
      }
    }
  }

  _onReader (reader, taskno) {
    const buffer = this._context.getInstance(this.buffer)
    if ((!buffer && this._reader) || this._destroyed) {
      try {
        this._reader.cancel()
      } catch (e) {
        // DO NOTHING
      }
    }

    this._reader = reader
    if (this.loading === false) {
      return
    }

    // reader read function returns a Promise. get data when callback and has value.done when disconnected.
    // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
    this._noDataTimer = setTimeout(() => {
      if (this.loading === false) return
      this.emit(LOADER_EVENTS.LOADER_COMPLETE)
    }, 3000)
    this._reader && this._reader.read().then((val) => {
      clearTimeout(this._noDataTimer)
      if (this._canceled || this._destroyed) {
        if (this._reader) {
          try {
            this._reader.cancel()
          } catch (e) {
            // DO NOTHING
          }
        }
        return
      }
      if (val.done) {
        this.loading = false
        this.status = 0
        Promise.resolve().then(() => {
          this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer)
        })
        return
      }

      buffer.push(val.value)
      this._speed.addBytes(val.value.byteLength)
      Promise.resolve().then(() => {
        this.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer)
      })
      return this._onReader(reader, taskno)
    }).catch((error) => {
      clearTimeout(this._noDataTimer)
      this.loading = false
      if (error && error.name === 'AbortError') return
      // TODO: 重构老对象
      this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, {
        ...error,
        err: Err.NETWORK_OTHER(error)
      })
    })
  }

  /**
   *
   * @param {RequestInit} opts
   * @return {{mode: string, headers: Headers, cache: string, method: string}}
   */
  getParams (opts) {
    const options = Object.assign({}, opts)
    const headers = new Headers()

    const params = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }

    // add custmor headers
    // 添加自定义头
    if (typeof this.configs.headers === 'object') {
      const configHeaders = this.configs.headers
      for (const key in configHeaders) {
        if (configHeaders.hasOwnProperty(key)) {
          headers.append(key, configHeaders[key])
        }
      }
    }

    if (typeof options.headers === 'object') {
      const optHeaders = options.headers
      for (const key in optHeaders) {
        if (optHeaders.hasOwnProperty(key)) {
          headers.append(key, optHeaders[key])
        }
      }
    }

    if (options.cors === false) {
      params.mode = 'same-origin'
    }

    // withCredentials is disabled by default
    // withCredentials 在默认情况下不被使用。
    if (options.withCredentials) {
      params.credentials = 'include'
    }

    // TODO: Add ranges;
    return params
  }

  // in KB/s
  get currentSpeed () {
    return this._speed.lastSamplingKBps
  }

  cancel () {
    if (this._reader) {
      try {
        this._reader.cancel()
      } catch (e) {
        // 防止failed: 200错误被打印到控制台上
      }
      this._reader = null
      this.loading = false
    }
    clearTimeout(this._noDataTimer)
    this._canceled = true
    if (this.abortController) {
      this.abortController.abort()
    }
  }

  destroy () {
    this._destroyed = true
    clearTimeout(this._retryTimer)
    clearTimeout(this._noDataTimer)
    this.cancel()
    this._speed.reset()
  }
}

export default FetchLoader
