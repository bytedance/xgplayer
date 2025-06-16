import { NetError } from './error'
import { createResponse, getRangeValue, setUrlParams, calculateSpeed } from './helper'
import { ResponseType } from './types'
import { EVENT } from '../event'
import EventEmitter from 'eventemitter3'
const CACHESIZE = 2 * 1024 * 1024
export class FetchLoader extends EventEmitter {
  _abortController = null
  _timeoutTimer = null
  _reader = null
  _response = null
  _aborted = false
  _index = -1
  _range = null
  _receivedLength = 0
  _running = false
  _logger = null
  _vid = ''
  _firtstByte = 0
  _onProcessMinLen = 0
  _onCancel = null
  _priOptions = null // 比较私有化的参数传递，回调时候透传

  constructor () {
    super()
  }

  load ({
    url,
    vid,
    timeout, // ms
    responseType,
    onProgress,
    index,
    onTimeout,
    onCancel,
    range,
    transformResponse,
    request,
    params,
    logger,

    method,
    headers,
    body,
    mode,
    credentials,
    cache,
    redirect,
    referrer,
    referrerPolicy,
    onProcessMinLen,
    priOptions,
    stream,
    firstMaxChunkSize
  }) {
    this._logger = logger
    this._aborted = false
    this._onProcessMinLen = onProcessMinLen
    this._onCancel = onCancel
    this._abortController = typeof AbortController !== 'undefined' && new AbortController()
    this._running = true
    this._index = index
    this._range = range || [0, 0]
    this._vid = vid || url
    this._priOptions = priOptions || {}
    this._firstMaxChunkSize = firstMaxChunkSize
    const init = {
      method,
      headers,
      body,
      mode,
      credentials,
      cache,
      redirect,
      referrer,
      referrerPolicy,
      signal: this._abortController?.signal
    }

    let isTimeout = false
    clearTimeout(this._timeoutTimer)

    url = setUrlParams(url, params)

    const rangeValue = getRangeValue(range)
    if (rangeValue) {
      if (request) {
        headers = request.headers
      } else {
        headers = init.headers = init.headers || (Headers ? new Headers() : {})
      }
      if (Headers && headers instanceof Headers) {
        headers.append('Range', rangeValue)
      } else {
        headers.Range = rangeValue
      }
    }

    if (timeout) {
      this._timeoutTimer = setTimeout(() => {
        isTimeout = true
        this.cancel()
        if (onTimeout) {
          const error = new NetError(url, init, null, 'timeout')
          error.isTimeout = true
          onTimeout(error, {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions})
        }
      }, timeout)
    }

    const startTime = Date.now()
    this._logger.debug('[fetch load start], index,', index, ',range,', range)
    return new Promise((resolve, reject) => {
      const promise = stream
        ? new Promise(r => {
          const response = new Response(stream)
          Object.defineProperty(response, 'url', { value: url })
          r(response)
          // r(streamRes)
        })
        : fetch(request || url, request ? undefined : init)
      promise.then(async (response) => {
        clearTimeout(this._timeoutTimer)
        this._response = response
        if (this._aborted || !this._running) return
        if (transformResponse) {
          response = transformResponse(response, url) || response
        }
        if (!response.ok) {
          throw new NetError(url, init, response, 'bad network response')
        }

        const firstByteTime = Date.now()
        let data
        if (responseType === ResponseType.TEXT) {
          data = await response.text()
          this._running = false
        } else if (responseType === ResponseType.JSON) {
          data = await response.json()
          this._running = false
        } else {
          if (onProgress) {
            this.resolve = resolve
            this.reject = reject
            this._loadChunk(response, onProgress, startTime, firstByteTime, url || request?.url)
            return
          } else {
            data = await response.arrayBuffer()
            data = new Uint8Array(data)
            this._running = false
            const costTime = Date.now() - startTime
            const speed = calculateSpeed(data.byteLength, costTime)
            this.emit(EVENT.REAL_TIME_SPEED, {speed,len: data.byteLength, time: costTime, vid: this._vid, index: this._index, range: this._range, priOptions: this._priOptions})
          }
        }
        this._logger.debug('[fetch load end], index,', index, ',range,', range)
        resolve(createResponse(
          data,
          true,
          response,
          response.headers.get('Content-Length'),
          response.headers.get('age'),
          startTime,
          firstByteTime,
          index,
          range,
          this._vid,
          this._priOptions
        ))
      }).catch((error) => {
        clearTimeout(this._timeoutTimer)
        this._running = false
        if (this._aborted && !isTimeout) return
        error = error instanceof NetError ? error : new NetError(url, init, null, error?.message)
        error.startTime = startTime
        error.endTime = Date.now()
        error.isTimeout = isTimeout
        error.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
        reject(error)
      })
    })
  }

  async cancel () {
    if (this._aborted) return
    this._aborted = true
    this._running = false
    if (this._response) {
      try {
        // await this._response.body.cancel()
        if (this._reader) {
          await this._reader.cancel()
        }
      } catch (error) {
        // ignore
      }
      this._response = this._reader = null
    }

    if (this._abortController) {
      try {
        this._abortController.abort()
      } catch (error) {
        // ignore
      }
      this._abortController = null
    }
    if (this._onCancel) {
      this._onCancel({index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions})
    }
  }

  _loadChunk (response, onProgress, st, firstByteTime, url) {
    if (!response.body || !response.body.getReader) {
      this._running = false
      const err = new NetError(response.url, '', response, 'onProgress of bad response.body.getReader')
      err.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
      this.reject(err)
      return
    }
    if (this._onProcessMinLen > 0) {
      this._cache = new Uint8Array(CACHESIZE)
      this._writeIdx = 0
    }
    const reader = this._reader = response.body.getReader()
    let data

    let startTime
    let endTime
    const pump = async () => {
      startTime = Date.now()
      try {
        data = await reader.read()
        endTime = Date.now()
      } catch (e) {
        // request aborted
        endTime = Date.now()
        if (!this._aborted) {
          this._running = false
          e.options = {index: this._index, range: this._range, vid: this._vid, priOptions: this._priOptions}
          this.reject(e)
        }
        return
      }
      const startRange = this._range?.length > 0 ? this._range[0] : 0
      const startByte = startRange + this._receivedLength
      if (this._aborted) {
        this._running = false
        onProgress(undefined, false, { range: [startByte, startByte], vid: this._vid, index: this._index, startTime, endTime, st, firstByteTime, priOptions:this._priOptions }, response)
        return
      }
      const curLen = data.value ? data.value.byteLength : 0
      this._receivedLength += curLen
      this._logger.debug('【fetchLoader,onProgress call】,task,', this._range, ', start,', startByte, ', end,', startRange + this._receivedLength, ', done,', data.done)
      let retData
      if (this._onProcessMinLen > 0) {
        if (this._writeIdx + curLen >= this._onProcessMinLen || data.done) {
          retData = new Uint8Array(this._writeIdx + curLen)
          retData.set(this._cache.slice(0, this._writeIdx), 0)
          curLen > 0 && retData.set(data.value, this._writeIdx)
          this._writeIdx = 0
          this._logger.debug('【fetchLoader,onProgress enough】,done,', data.done, ',len,', retData.byteLength, ', writeIdx,', this._writeIdx)
        } else {
          if (curLen > 0 && this._writeIdx + curLen < CACHESIZE) {
            this._cache.set(data.value, this._writeIdx)
            this._writeIdx += curLen
            this._logger.debug('【fetchLoader,onProgress cache】,len,', curLen, ', writeIdx,', this._writeIdx)
          } else if (curLen > 0) {
            const temp = new Uint8Array(this._writeIdx + curLen + 2048)
            this._logger.debug('【fetchLoader,onProgress extra start】,size,', this._writeIdx + curLen + 2048, ', datalen,', curLen, ', writeIdx,', this._writeIdx)
            temp.set(this._cache.slice(0, this._writeIdx), 0)
            curLen > 0 && temp.set(data.value, this._writeIdx)
            this._writeIdx += curLen
            delete this._cache
            this._cache = temp
            this._logger.debug('【fetchLoader,onProgress extra end】,len,', curLen, ', writeIdx,', this._writeIdx)
          }
        }
      } else {
        retData = data.value
      }
      if (retData && retData.byteLength > 0 || data.done) {
        if (this._firstMaxChunkSize) {
          if (!this._firtstByte) {
            this._firtstByte++
            const tmp = retData.slice(0, this._firstMaxChunkSize)
            this._cacheData = retData.slice(this._firstMaxChunkSize)
            retData = tmp
          } else if (this._cacheData) {
            const tmp = new Uint8Array(this._cacheData.byteLength + retData.byteLength)
            tmp.set(this._cacheData, 0)
            tmp.set(retData, this._cacheData.byteLength)
            retData = tmp
            this._cacheData = null
          }
        }
        onProgress(retData, data.done, {
          range: [this._range[0] + this._receivedLength - (retData ? retData.byteLength : 0), this._range[0] + this._receivedLength],
          vid: this._vid,
          index: this._index,
          startTime,
          endTime,
          st,
          firstByteTime,
          priOptions: this._priOptions,
          is_redirect: url !== response.url
        }, response)
      }
      if (!data.done) {
        if (this._firstMaxChunkSize) {
          // this._firtstByte++
          setTimeout(() => {
            pump()
          }, 0)
        } else {
          pump()
        }
        // pump()
      } else {
        const costTime = Date.now() - st
        const speed = calculateSpeed(this._receivedLength, costTime)
        this.emit(EVENT.REAL_TIME_SPEED, {speed,len: this._receivedLength, time: costTime, vid: this._vid, index: this._index, range: this._range, priOptions: this._priOptions})
        this._running = false
        this._logger.debug('[fetchLoader onProgress end],task,', this._range, ',done,', data.done)
        this.resolve(createResponse(
          data,
          true,
          response,
          response.headers.get('Content-Length'),
          response.headers.get('age'),
          st,
          firstByteTime,
          this._index,
          this._range,
          this._vid,
          this._priOptions
        ))
      }
    }
    pump()
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

  static isSupported () {
    return !!(typeof fetch !== 'undefined')
  }
}
