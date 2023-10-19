import { FetchLoader } from './fetch'
import { LoaderType, ResponseType } from './types'
import { getConfig } from './config'
import { Task } from './task'
import { isPlainObject } from '../is'
import { sleep } from '../streaming-helper'
import { EVENT } from '../event'
import EventEmitter from 'eventemitter3'

export {
  LoaderType,
  ResponseType
}

export class NetLoader extends EventEmitter {
  type = LoaderType.FETCH

  _queue = []

  _alive = []

  _currentTask = null

  _finnalUrl = ''

  _config

  constructor (cfg) {
    super(cfg)
    this._config = getConfig(cfg)
    if (
      this._config.loaderType === LoaderType.XHR ||
      !FetchLoader.isSupported()
    ) {
      this.type = LoaderType.XHR
    }
    this.log = cfg.logger
  }

  isFetch () {
    return this.type === LoaderType.FETCH
  }

  get finnalUrl () {
    return this._finnalUrl
  }

  static isFetchSupport () {
    return FetchLoader.isSupported()
  }

  load (url, config = {}) {
    if (typeof url === 'string' || !url) {
      config.url = url || config.url || this._config.url
    } else {
      config = url
    }

    config = Object.assign({}, this._config, config)

    if (this._config.onPreProcessUrl) {
      config.url = this._config.onPreProcessUrl(config.url).url
    }

    this._finnalUrl = config.url

    if (config.params) config.params = Object.assign({}, config.params)
    if (config.headers && isPlainObject(config.headers)) config.headers = Object.assign({}, config.headers)
    if (config.body && isPlainObject(config.body)) config.body = Object.assign({}, config.body)

    if (config.transformRequest) {
      config = config.transformRequest(config) || config
    }
    config.logger = this.log

    const task = new Task(this.type, config)
    task.loader.on(EVENT.REAL_TIME_SPEED, (data) => {
      this.emit(EVENT.REAL_TIME_SPEED, data)
    })
    this._queue.push(task)
    if (this._queue.length === 1 && (!this._currentTask || !this._currentTask.running)) {
      this._processTask()
    }

    return task.promise
  }

  async cancel () {
    const cancels = this._queue.map(t => t.cancel()).concat(this._alive.map(t => t.cancel()))
    if (this._currentTask) {
      cancels.push(this._currentTask.cancel())
    }
    this._queue = []
    this._alive = []
    await Promise.all(cancels)
    await sleep()
  }

  _processTask () {
    this._currentTask = this._queue.shift()
    if (!this._currentTask) return

    if (this._currentTask.alive) {
      this._alive.push(this._currentTask)
    }
    const req = this._currentTask.exec().catch(e => {})

    if (!(req && typeof req.finally === 'function')) return

    req.finally(() => {
      if (this._currentTask?.alive && this._alive?.length > 0) {
        this._alive = this._alive.filter(task => task && task !== this._currentTask)
      }
      this._processTask()
    })

  }
}
