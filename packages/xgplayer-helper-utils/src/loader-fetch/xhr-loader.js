/* eslint-disable no-undef */

import EVENTS from '../events'

const LOADER_EVENTS = EVENTS.LOADER_EVENTS
const READ_TEXT = 1 // text
const READ_JSON = 2 // json
const READ_BUFFER = 3 // arraybuffer

const DEFAULT_TIMEOUT_IMMS = 2000

class XhrLoader {
  constructor (configs) {
    this._xhr = null
    this.configs = Object.assign({}, configs)
    this.loading = false;
    this._readtype = this.configs.readtype
    this._bufferType = this.configs.buffer || 'LOADER_BUFFER'
    this._requestInfo = null;
    this._onReadyStateChange = this._onReadyStateChange.bind(this)
    this._onError = this._onError.bind(this)
    this._onAbort = this._onAbort.bind(this)
    this._onTimeout = this._onTimeout.bind(this)
  }

  static get type () {
    return 'loader'
  }

  get bufferIns () {
    return this._context.getInstance(this._bufferType);
  }

  init () {
    this.on(LOADER_EVENTS.LADER_START, this.load.bind(this))
  }

  _createXhr () {
    let xhr
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    return xhr
  }

  load (url, opts = {}, retryTimes = 0, delayTime = 0) {
    let options = Object.assign({}, opts)
    this._requestInfo = {
      url,
      options,
      retryTimes,
      totalRetry: retryTimes,
      delayTime
    }
    this._xhr = this._createXhr();
    this.loading = true;

    try {
      this._bindEvents();
      this._loadInternal(url, options);
    } catch (e) {
      this._whenError({
        code: this._xhr.status,
        message: e && e.message
      })
    }
  }

  _loadInternal (url, options) {
    const xhr = this._xhr;
    xhr.open('GET', url, true);
    this._setTimeout(xhr, options)
    this._setCredentails(xhr, options)
    this._setHeaders(xhr, options);
    this._setResponseType(xhr)
    xhr.send();
  }

  _bindEvents () {
    const xhr = this._xhr;
    xhr.addEventListener('readystatechange', this._onReadyStateChange);
    xhr.addEventListener('timeout', this._onTimeout);
    xhr.addEventListener('error', this._onError);
    xhr.addEventListener('abort', this._onAbort);
  }

  _setTimeout (xhr, options) {
    xhr.timeout = options.timeout || DEFAULT_TIMEOUT_IMMS
  }

  _setCredentails (xhr, options) {
    if (options.withCredentials) {
      xhr.withCredentials = true
    }
  }

  // call after open(), before send()
  _setHeaders (xhr, options) {
    if (typeof options.headers === 'object') {
      let optHeaders = options.headers
      for (let key in optHeaders) {
        if (optHeaders.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, optHeaders[key])
        }
      }
    }
  }

  _setResponseType (xhr) {
    switch (this._readtype) {
      case READ_BUFFER:
        xhr.responseType = 'arraybuffer'
        break
      case READ_JSON:
        xhr.responseType = 'json'
        break
      case READ_TEXT:
      default:
        xhr.responseType = ''
    }
  }

  _onReadyStateChange () {
    const {readyState, status} = this._xhr

    if (readyState === 4) {
      if (status >= 200 && status < 300) {
        this._onComplete(this._xhr);
        return;
      }

      // abort、timeout都会走到这, status === 0, 这些情况在事件监听中执行
      if (status === 0) return;

      this._onError()
    }
  }

  _onComplete (xhr) {
    let data;
    switch (this._readtype) {
      case READ_JSON:
        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {}
        break;
      case READ_BUFFER:
        let buffer = xhr.response;
        data = new Uint8Array(buffer)
        break;
      case READ_TEXT:
      default:
        data = xhr.responseText;
    }
    if (this.bufferIns) {
      this.bufferIns.push(data);
      this.emit(LOADER_EVENTS.LOADER_COMPLETE, this.bufferIns);
    } else {
      this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
    }
    this.loading = false;
  }

  _onError () {
    const xhr = this._xhr;
    const err = {
      code: xhr.status || 21,
      message: xhr.statusText
    }
    this._whenError(err);
  }

  _onTimeout () {
    console.warn('timeout');
    this._whenError({
      code: 999,
      message: 'fetch timeout'
    })
  }

  _onAbort () {
    console.warn('abort');
  }

  _whenError (info) {
    let {url, options, totalRetry, retryTimes, delayTime} = this._requestInfo;

    if (!retryTimes) {
      // emit error
      this.loading = false;
      this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, info);
      return;
    }

    retryTimes--;

    setTimeout(() => {
      this.emit(LOADER_EVENTS.LOADER_RETRY, this.TAG, {
        response: info,
        reason: 'response not ok',
        retryTime: totalRetry - retryTimes
      })
      this.load(url, options, retryTimes, delayTime)
    }, delayTime)
  }

  cancel () {
    if (this._xhr.readyState !== 4) {
      this._xhr.abort();
    }
  }

  destroy () {
    this.cancel();
    if (this._xhr) {
      this._xhr.removeEventListener('readystatechange', this._onReadyStateChange);
      this._xhr.removeEventListener('timeout', this._onTimeout);
      this._xhr.removeEventListener('error', this._onError);
      this._xhr.removeEventListener('abort', this._onAbort);
      this._xhr = null;
    }
  }
}

export default XhrLoader
