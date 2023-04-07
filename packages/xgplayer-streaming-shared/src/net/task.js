import { FetchLoader } from './fetch'
import { XhrLoader } from './xhr'
import { LoaderType } from './types'
import { createPublicPromise } from '../utils'
import { Logger } from '../logger'

export class Task {
  constructor (type, config) {
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
  }

  exec () {
    const {
      retry,
      retryDelay,
      onRetryError,
      transformError,
      ...rest
    } = this._config

    const request = async () => {
      try {
        const response = await this._loader.load(rest)
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
        if (isRetry && this._retryCount <= retry) {
          clearTimeout(this._retryTimer)
          this._logger.debug('[task request setTimeout],retry', this._retryCount, ',retry range,', rest.range)
          this._retryTimer = setTimeout(request, retryDelay)
          return
        }
        this.promise.reject(error)
      }
    }

    request()
    return this.promise
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
