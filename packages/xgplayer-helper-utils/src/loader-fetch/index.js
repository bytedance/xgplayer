import EVENTS from '../events';
import Speed from './speed'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const READ_STREAM = 0;
const READ_TEXT = 1;
const READ_JSON = 2;
const READ_BUFFER = 3;
class FetchLoader {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = null
    this.status = 0
    this.error = null
    this._reader = null;
    this._canceled = false;
    this._destroyed = false;
    this.readtype = this.configs.readtype;
    this.buffer = this.configs.buffer || 'LOADER_BUFFER';
    this._loaderTaskNo = 0;
    this._speed = new Speed()
    if (window.AbortController) {
      this.abortControllerEnabled = true;
    }
  }

  init () {
    this.on(LOADER_EVENTS.LADER_START, this.load.bind(this))
  }

  static get type () {
    return 'loader'
  }

  fetch (url, params, timeout) {
    let timer = null
    if (this.abortControllerEnabled) {
      this.abortController = new window.AbortController();
    }
    Object.assign(params, {signal: this.abortController ? this.abortController.signal : undefined})
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
            this.abortController.abort();
          }
        }, timeout || 1e4) // 10s
      })
    ]).then((response) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      return response
    })
  }

  internalLoad (url, params, retryTimes, totalRetry, delayTime = 0) {
    if (this._destroyed) return
    this.loading = true;
    return this.fetch(this.url, params).then((response) => {
      !this._destroyed && this.emit(LOADER_EVENTS.LOADER_RESPONSE_HEADERS, this.TAG, response.headers)

      if (response.ok) {
        this.status = response.status
        Promise.resolve().then(() => {
          this._onFetchResponse(response);
        })

        return Promise.resolve(response)
      }

      if (retryTimes-- > 0) {
        this._retryTimer = setTimeout(() => {
          this.emit(LOADER_EVENTS.LOADER_RETRY, this.TAG, {
            response: response,
            reason: 'response not ok',
            retryTime: totalRetry - retryTimes
          })
          return this.internalLoad(url, params, retryTimes, totalRetry, delayTime)
        }, delayTime)
      } else {
        this.loading = false;
        this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, {
          code: response.status || 21,
          message: `${response.status} (${response.statusText})`
        });
      }
    }).catch((error) => {
      this.loading = false;
      if (this._destroyed) {
        return;
      }

      if (retryTimes-- > 0) {
        this._retryTimer = setTimeout(() => {
          this.emit(LOADER_EVENTS.LOADER_RETRY, this.TAG, {
            error: error,
            reason: 'fetch error',
            retryTime: totalRetry - retryTimes
          })
          return this.internalLoad(url, params, retryTimes, totalRetry, delayTime)
        }, delayTime);
      } else {
        if (error && error.name === 'AbortError') {
          return;
        }
        this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, Object.assign({code: 21}, error));
      }
    })
  }

  load (url, opts = {}, retryTimes, delayTime) {
    retryTimes = retryTimes === undefined ? 3 : retryTimes
    this.url = url;
    this._canceled = false;

    // TODO: Add Ranges
    let params = this.getParams(opts)

    return this.internalLoad(url, params, retryTimes, retryTimes, delayTime)
  }

  _onFetchResponse (response) {
    let _this = this;
    let buffer = this._context.getInstance(this.buffer);
    this._loaderTaskNo++;
    let taskno = this._loaderTaskNo;
    if (response.ok === true) {
      switch (this.readtype) {
        case READ_JSON:
          response.json().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data);
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_TEXT:
          response.text().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data);
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_BUFFER:
          response.arrayBuffer().then((data) => {
            _this.loading = false
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(new Uint8Array(data));
                this._speed.addBytes(data.byteLength)
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_STREAM:
        default:
          return this._onReader(response.body.getReader(), taskno);
      }
    }
  }

  _onReader (reader, taskno) {
    let buffer = this._context.getInstance(this.buffer);
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
        return;
      }
      if (val.done) {
        this.loading = false
        this.status = 0;
        Promise.resolve().then(() => {
          this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer)
        })
        return;
      }

      buffer.push(val.value)
      this._speed.addBytes(val.value.byteLength)
      Promise.resolve().then(() => {
        this.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer)
      })
      return this._onReader(reader, taskno)
    }).catch((error) => {
      clearTimeout(this._noDataTimer)
      this.loading = false;
      this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, error);
      throw error;
    })
  }

  getParams (opts) {
    let options = Object.assign({}, opts)
    let headers = new Headers()

    let params = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }

    // add custmor headers
    // 添加自定义头
    if (typeof this.configs.headers === 'object') {
      let configHeaders = this.configs.headers
      for (let key in configHeaders) {
        if (configHeaders.hasOwnProperty(key)) {
          headers.append(key, configHeaders[key])
        }
      }
    }

    if (typeof options.headers === 'object') {
      let optHeaders = options.headers
      for (let key in optHeaders) {
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
    return params;
  }

  // in KB/s
  get currentSpeed () {
    return this._speed.lastSamplingKBps;
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
    this._canceled = true;
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  destroy () {
    this._destroyed = true
    clearTimeout(this._retryTimer);
    clearTimeout(this._noDataTimer)
    this.cancel();
    this._speed.reset()
  }
}

export default FetchLoader
