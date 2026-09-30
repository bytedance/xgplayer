import { NetError } from './error'
import { createResponse, getRangeValue, setUrlParams, calculateSpeed, getRangeResponseMismatchReason } from './helper'
import { ResponseType } from './types'
import { EVENT } from '../event'
import EventEmitter from 'eventemitter3'
export class XhrLoader extends EventEmitter {

  _xhr = null
  _aborted = false
  _timeoutTimer = null
  _range = null
  _receivedLength = 0
  _url = null
  _onProgress = null
  _index = -1
  _headers = null
  // _chunkSizeKBList = [
  //   128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192
  // ]

  _currentChunkSizeKB = 384
  _timeout = null
  _xhr = null
  _withCredentials = null
  _startTime = -1
  // _speedSampler = new SpeedSampler()
  _loadCompleteResolve = null
  _loadCompleteReject = null
  _runing = false
  _logger = false
  _vid = ''
  _responseType
  _credentials
  _method
  _transformResponse
  _firstRtt
  _onCancel = null
  _priOptions = null // 比较私有化的参数传递，回调时候透传
  _dynamicTimeoutIns = null
  _rangeRequestZeroContentLengthAsError = false
  _rangeRequestMustReturn206 = false
  _abortByHeaderValidation = false
  _currentRequestRange = null


  constructor () {
    super()
  }

  load (req) {
    clearTimeout(this._timeoutTimer)
    this._logger = req.logger
    this._range = req.range
    this._onProgress = req.onProgress
    this._index = req.index
    this._headers = req.headers
    this._withCredentials = req.credentials === 'include' || req.credentials === 'same-origin'
    this._body = req.body || null
    req.method && (this._method = req.method)
    this._timeout = req.timeout || null
    this._runing = true
    this._vid = req.vid || req.url
    this._responseType = req.responseType
    this._transformResponse = req.transformResponse
    this._dynamicTimeoutIns = req.dynamicTimeoutIns
    this._firstRtt = -1
    this._onTimeout = req.onTimeout
    this._onCancel = req.onCancel
    this._request = req.request
    this._priOptions = req.priOptions || {}
    this._rangeRequestZeroContentLengthAsError = !!req.rangeRequestZeroContentLengthAsError
    this._rangeRequestMustReturn206 = !!req.rangeRequestMustReturn206
    this._abortByHeaderValidation = false
    this._currentRequestRange = null
    this._logger.debug('【xhrLoader task】, range', this._range)

    this._url = setUrlParams(req.url, req.params)

    const startTime = Date.now()
    return new Promise((resolve, reject) => {
      this._loadCompleteResolve = resolve
      this._loadCompleteReject = reject
      this._startLoad()
    }).catch((error) => {
      clearTimeout(this._timeoutTimer)
      this._runing = false
      if (this._aborted && error.message !== 'timeout') return
      error = error instanceof NetError ? error : new NetError(this._url, this._request)
      error.startTime = startTime
      error.endTime = Date.now()
      error.options = {index: this._index, vid: this._vid, priOptions: this._priOptions}
      throw error
    })
  }

  _startLoad () {
    let range = null
    if (this._responseType === ResponseType.ARRAY_BUFFER && this._range && this._range.length > 1) {
      if (this._onProgress) {
        this._firstRtt = -1
        const chunkSize = this._currentChunkSizeKB * 1024
        const from = this._range[0] + this._receivedLength
        let to = this._range[1]
        if (chunkSize < this._range[1] - from) {
          to = from + chunkSize
        }
        range = [from, to]
        this._logger.debug('[xhr_loader->],tast :', this._range, ', SubRange, ', range)
      } else {
        range = this._range
        this._logger.debug('[xhr_loader->],tast :', this._range, ', allRange, ', range)
      }
    }
    this._internalOpen(range)
  }

  _internalOpen (range) {
    try {
      this._currentRequestRange = range
      this._startTime = Date.now()
      const xhr = this._xhr = new XMLHttpRequest()
      xhr.open(this._method || 'GET', this._url, true)
      xhr.responseType = this._responseType
      let timeoutMs = this._timeout
      if( this._dynamicTimeoutIns &&
        typeof this._dynamicTimeoutIns.getTimeout === 'function'){
          timeoutMs = this._dynamicTimeoutIns.getTimeout(this._timeout) * (this._priOptions.useTimeoutRatio ? this._dynamicTimeoutIns.timeoutRatio : 1)
          timeoutMs = this._dynamicTimeoutIns.getClampedTimeout(timeoutMs)
      }
      if (timeoutMs) {
        xhr.timeout = timeoutMs
        this.curTimeout = timeoutMs
      }
      this._logger.debug('[dytimeout] xhr set timeout', timeoutMs)
      xhr.withCredentials = this._withCredentials
      xhr.onload = this._onLoad.bind(this)
      xhr.onreadystatechange = this._onReadyStatechange.bind(this)
      xhr.onerror = (errorEvent) => {
        this._running = false
        if (this._abortByHeaderValidation) return
        const error = new NetError(this._url, this._request, errorEvent?.currentTarget?.response, ('xhr.onerror.status:' + errorEvent?.currentTarget?.status + ',statusText,' + errorEvent?.currentTarget?.statusText))
        error.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
        this._loadCompleteReject(error)
      }
      xhr.ontimeout = (event) => {
        if (
          this._dynamicTimeoutIns &&
          typeof this._dynamicTimeoutIns.update === 'function'
        ) {
          this._logger.debug('[dytimeout] xhr timeout update rtt,', xhr.timeout * 5)
          this._dynamicTimeoutIns.update(xhr.timeout * 5)
        }
        this.cancel()
        const error = new NetError(this._url, this._request, {status:408}, 'timeout')
        error.isTimeout = true
        if (this._onTimeout) {
          this._onTimeout(error,{index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions})
        }
        error.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
        this._loadCompleteReject(error)
      }
      const headers = this._headers || {}
      const rangeValue = getRangeValue(range)
      if (rangeValue) {
        headers.Range = rangeValue
      }
      if (headers) {
        Object.keys(headers).forEach(k => {
          xhr.setRequestHeader(k, headers[k])
        })
      }
      this._logger.debug('[xhr.send->] tast,', this._range, ',load sub range, ', range,',[dytimeout],', timeoutMs)
      xhr.send(this._body)
    } catch (e) {
      e.options = {index: this._index, range, vid: this._vid, priOptions: this._priOptions}
      this._loadCompleteReject(e)
    }
  }

  _onReadyStatechange (e) {
    const xhr = e.target
    if (xhr.readyState === 2) {
      const responseHeaders = this._getHeaders(xhr)
      if (this._firstRtt < 0) {
        this._firstRtt = Date.now()
        this._priOptions.rtt = this._firstRtt - this._startTime
      }
      if (
        this._dynamicTimeoutIns &&
        typeof this._dynamicTimeoutIns.update === 'function'
      ) {
        this._logger.debug('[dytimeout] xhr update rtt,', this._priOptions.rtt)
        this._dynamicTimeoutIns.update(this._priOptions.rtt)
      }
      const headerValidationError = this._getRangeHeaderValidationError(xhr.status, responseHeaders, xhr.responseURL)
      if (headerValidationError) {
        this._abortByHeaderValidation = true
        this._running = false
        xhr.abort()
        headerValidationError.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
        this._loadCompleteReject(headerValidationError)
      }
    }
  }

  _onLoad (e) {
    const status = e.target.status
    if (status < 200 || status > 299) {
      const error = new NetError(this._url, null, { ...e.target.response, status }, 'bad response,status:' + status)
      error.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
      return this._loadCompleteReject(error)
    }
    const responseHeaders = this._getHeaders(this._xhr)
    if (this._shouldTreatRangeZeroContentLengthAsError(status, responseHeaders)) {
      const error = new NetError(
        this._url,
        this._request,
        { status, headers: responseHeaders },
        'bad response,range request returned 200 with zero content-length'
      )
      error.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
      return this._loadCompleteReject(error)
    }
    let data = null
    let done = false
    let byteStart
    const startRange = (this._range?.length > 0 ? this._range [0] : 0 )
    if (this._responseType === ResponseType.ARRAY_BUFFER) {
      const chunk = new Uint8Array(e.target.response)
      byteStart = startRange + this._receivedLength
      if (chunk && chunk.byteLength > 0) {
        this._receivedLength += chunk.byteLength
        const costTime = Date.now() - this._startTime
        const speed = calculateSpeed(this._receivedLength, costTime)
        this.emit(EVENT.REAL_TIME_SPEED, {speed, len: this._receivedLength, time: costTime, vid: this._vid, index: this._index, range: [byteStart, startRange + this._receivedLength], priOptions: this._priOptions})
      }
      data = chunk
      if (this._range?.length > 1 && this._range[1] && this._receivedLength < this._range[1] - this._range[0]) {
        done = false
      } else {
        done = true
      }
      this._logger.debug('[xhr load done->], tast :', this._range, ', start', byteStart, 'end ', startRange + this._receivedLength, ',dataLen,', (chunk ? chunk.byteLength : 0), ',receivedLength', this._receivedLength, ',index,', this._index, ', done,', done)
    } else {
      done = true
      data = e.target.response
    }
    let response = {
      ok: status >= 200 && status < 300,
      status,
      statusText: this._xhr.statusText,
      url: this._xhr.responseURL,
      headers: responseHeaders,
      body: this._xhr.response
    }
    if (this._transformResponse) {
      response = this._transformResponse(response, this._url) || response
    }
    if (this._onProgress) {
      this._onProgress(data, done, { index: this._index, vid: this._vid, range: [byteStart, startRange + this._receivedLength], startTime: this._startTime, endTime: Date.now(), priOptions: this._priOptions }, response)
    }

    if (!done) {
      this._startLoad()
    } else {
      this._runing = false
      this._loadCompleteResolve && this._loadCompleteResolve(createResponse(
        this._onProgress ? null : data,
        done,
        response,
        response.headers['content-length'],
        response.headers.age,
        this._startTime,
        this._firstRtt,
        this._index,
        this._range,
        this._vid,
        this._priOptions
      ))
    }
  }

  cancel () {
    if (this._aborted) return
    this._aborted = true
    this._runing = false
    super.removeAllListeners()
    if (this._onCancel) {
      this._onCancel({index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions})
    }
    if (this._xhr) {
      return this._xhr.abort()
    }
  }

  static isSupported () {
    return typeof XMLHttpRequest !== 'undefined'
  }

  get receiveLen () {
    return this._receivedLength
  }

  get running () {
    return this._running
  }

  set running (status) {
    this._running = status
  }

  _getHeaders (xhr) {
    const headerLines = xhr.getAllResponseHeaders().trim().split('\r\n')
    const headers = {}
    for (const header of headerLines) {
      const parts = header.split(': ')
      headers[parts[0].toLowerCase()] = parts.slice(1).join(': ')
    }
    return headers
  }

  _shouldTreatRangeZeroContentLengthAsError (status, headers) {
    if (!this._rangeRequestZeroContentLengthAsError) return false
    if (!Array.isArray(this._range) || this._range.length < 2) return false
    if (status !== 200) return false
    const contentLength = parseInt(headers?.['content-length'] || '', 10)
    return contentLength === 0
  }

  _getRangeHeaderValidationError (status, headers, responseURL) {
    if (this._shouldAbortRangeRequestForNon206(status, responseURL)) {
      return new NetError(
        this._url,
        this._request,
        { status, headers, url: responseURL },
        'bad response,range request must return 206 unless redirected'
      )
    }
    const rangeMismatchReason = this._getRangeResponseMismatchReason(headers)
    if (rangeMismatchReason) {
      return new NetError(
        this._url,
        this._request,
        { status, headers, url: responseURL },
        `bad response,${rangeMismatchReason}`
      )
    }
    if (this._shouldTreatRangeZeroContentLengthAsError(status, headers)) {
      return new NetError(
        this._url,
        this._request,
        { status, headers, url: responseURL },
        'bad response,range request returned 200 with zero content-length'
      )
    }
  }

  _shouldAbortRangeRequestForNon206 (status, responseURL) {
    if (!this._rangeRequestMustReturn206) return false
    if (!Array.isArray(this._range) || this._range.length < 2) return false
    if (status === 206) return false
    return !this._isRedirectedResponse(responseURL)
  }

  _isRedirectedResponse (responseURL) {
    return !!(responseURL && responseURL !== this._url)
  }

  _getRangeResponseMismatchReason (headers) {
    if (!this._rangeRequestMustReturn206) return false
    return getRangeResponseMismatchReason(
      this._currentRequestRange || this._range,
      headers?.['content-range'],
      headers?.['content-length']
    )
  }
}
