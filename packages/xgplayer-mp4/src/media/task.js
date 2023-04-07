/* eslint-disable array-callback-return */
import EventEmitter from 'event-emitter'
import Errors from '../error'
import { getResponseHeaders } from '../util'
// TODO: 增加请求到的数据的信息回传 以及下载速度、建连速度、请求状态等
class Task {
  constructor (url, range, headers = {}, withCredentials, _callback) {
    EventEmitter(this)
    this.url = url
    this.range = range
    this.withCredentials = withCredentials
    this.id = range.join('-')
    this.on = false
    const xhr = new window.XMLHttpRequest()
    xhr.target = this
    xhr.responseType = 'arraybuffer'
    xhr.withCredentials = this.withCredentials || false
    xhr.open('get', url)
    xhr.setRequestHeader('Range', `bytes=${range[0]}-${range[1]}`)
    Object.keys(headers).map(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.onload = function () {
      const headers = getResponseHeaders(xhr)
      xhr.target.remove()
      if (xhr.status === 200 || xhr.status === 206) {
        if (_callback && _callback instanceof Function) {
          _callback({
            response: xhr.response,
            headers,
            status: xhr.status
          })
        }
      } else {
        xhr.target.emit('error', new Errors('network', '', { status: xhr.status, headers, line: 25, handle: '[Task] constructor', msg: xhr.status, url }))
      }
    }
    xhr.onerror = function (e) {
      xhr.target.emit('error', new Errors('network', '', { line: 25, handle: '[Task] constructor', msg: e.message, url }))
      xhr.target.remove()
    }
    xhr.onabort = function () {
      xhr.target.remove()
    }
    this.xhr = xhr
    Task.queue.push(this)
    this.update()
  }

  cancel () {
    this.xhr.abort()
  }

  remove () {
    Task.queue.filter((item, idx) => {
      if (item.url === this.url && item.id === this.id) {
        Task.queue.splice(idx, 1)
        return true
      } else {
        return false
      }
    })
    this.update()
  }

  update () {
    const Queue = Task.queue
    const sended = Queue.filter((item) => item.on)
    const wait = Queue.filter(item => !item.on)
    const max = Task.limit - sended.length
    wait.forEach((item, idx) => {
      if (idx < max) {
        item.run()
      }
    })
  }

  run () {
    if (this.xhr.readyState === 1) {
      this.on = true
      this.xhr.send()
    } else {
      this.remove()
    }
  }

  static clear () {
    Task.queue.forEach(item => {
      if (item.on) {
        item.cancel()
      }
    })
    Task.queue.length = 0
  }
}

Task.queue = []
Task.limit = 2
// window.Task = Task

export default Task
