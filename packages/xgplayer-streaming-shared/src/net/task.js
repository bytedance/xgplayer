import { FetchLoader } from './fetch'
import { XhrLoader } from './xhr'
import { LoaderType } from './types'
import { createPublicPromise } from '../utils'
import { Logger } from '../logger'
import EventEmitter from 'eventemitter3'

export class Task extends EventEmitter {
  constructor (type, config) {
    super()
    this.promise = createPublicPromise()
    this.alive = !!config.onProgress
    !config.logger && (config.logger = new Logger('Loader'))
    this._loaderType = type
    this._loader = type === LoaderType.FETCH && !!window.fetch ? new FetchLoader() : new XhrLoader()
    this._config = config
    this._retryCount = 0
    this._retryTimer = null
    this._canceled = false
    this._retryCheckFunc = config.retryCheckFunc
    this._logger = config.logger
    this._useUrlIdx = -1
    this._isRetry = false
    this._retryType = 0 // 0：初始地址 1 原地址重试，2 换地址重试
  }

  exec () {
    const {
      retry,
      retryDelay,
      onRetryError,
      transformError,
      changeUrlRetry,
      ...rest
    } = this._config
    const backUrlList = rest.urlList || this._config.urlList || []
    const request = async () => {
      try {
        let cfg = rest
        if (this._isRetry) {
          if (this._changeUrl) {
            this._changeUrl = false
            this._retryType = 2
            if (backUrlList?.[this._useUrlIdx]) {
              this._retryCount = 0
              cfg = Object.assign({}, cfg, {url: backUrlList[this._useUrlIdx]})
              this._logger.debug('[task],changeUrlRetry，urlIdx:', this._useUrlIdx, cfg.url)
            }
          } else {
            this._logger.debug('[task],originUrlRetry，urlIdx:', this._useUrlIdx, cfg.url)
            this._retryType = 1
          }
        }
        const response = await this._loader.load(cfg)
        this.promise.resolve(response)
      } catch (e) {
        this._loader.running = false
        this._logger.debug('[task request catch err]', e)
        if (this._canceled) return

        e.loaderType = this._loaderType
        e.retryCount = this._retryCount

        let error = e
        if (transformError) {
          error = transformError(error) || error
        }

        if (onRetryError && this._retryCount > 0) onRetryError(error, this._retryCount, {index: rest.index, vid: rest.vid, range: rest.range, priOptions: rest.priOptions})

        this._retryCount++
        let isRetry = true
        if (this._retryCheckFunc) {
          isRetry = this._retryCheckFunc(e)
        }
        // retryType, 0:原地址出错，1:原地址重试出错，2:换地址重试出错
        let retryType = 0
        // 外部换地址重试标识
        if (rest.outChangeUrlRetry > 0) {
          retryType = rest.outChangeUrlRetry
        } else if (this._isRetry) {
          if (retryType === 1) {
            retryType = 1
          } else if (retryType === 2) {
            retryType = 2
          }
        }
        this._logger.debug('[task error],isRetry', this._isRetry, ',outChangeUrlRetry,', rest.outChangeUrlRetry, ',retryType',retryType)
        this.emitNetErrorEvent(rest.url, retryType, e)
        if (isRetry && this._retryCount <= retry) {
          this._isRetry = true
          clearTimeout(this._retryTimer)
          this._logger.debug('[task request setTimeout],retry', this._retryCount, ',retry range,', rest.range)
          if (changeUrlRetry && this._useUrlIdx < backUrlList?.length - 1) {
            if (this._useUrlIdx < 0) {
              const parsed = new URL(rest.url)
              const domain = parsed.hostname
              this._useUrlIdx = backUrlList.findIndex(item => item.indexOf(domain) >= 0)
            }
            this._useUrlIdx++
            this._changeUrl = true
            this._logger.debug(
              'retry changeurl, urlIdx: ',
              this._useUrlIdx,
              ',retry range,',
              rest.range
            )
          }
          this._retryTimer = setTimeout(request, retryDelay)
          return
        }
        this._isRetry = false
        this.promise.reject(error)
      }
    }


    request()
    return this.promise
  }

  emitNetErrorEvent (url, retryType, error){
    const parsed = new URL(url)
    this.emit('networkError', {
      timeout: this._loader.curTimeout,
      retryType,
      url: url,
      domain: parsed.hostname,
      errCode: error?.response?.status || -1,
      message:error?.message,
      isTimeout:error?.isTimeout
    })
  }

  async cancel () {
    clearTimeout(this._retryTimer)
    this._canceled = true
    this._loader.running = false
    return this._loader.cancel()
  }

  get running () {
    return this._loader && this._loader.running
  }

  get loader () {
    return this._loader
  }
}
