import EventEmitter from 'event-emitter'
import Errors from '../error'

class Task {
  constructor (url, range, withCredentials, callback) {
    EventEmitter(this)
    this.url = url
    this.range = range
    this.withCredentials = withCredentials
    this.id = range.join('-')
    this.on = false
    let xhr = new window.XMLHttpRequest()
    xhr.target = this
    xhr.responseType = 'arraybuffer'
    xhr.withCredentials = this.withCredentials || false
    xhr.open('get', url)
    xhr.setRequestHeader('Range', `bytes=${range[0]}-${range[1]}`)
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (callback && callback instanceof Function) {
          callback(xhr.response)
        }
      }
      xhr.target.remove()
    }
    xhr.onerror = function (e) {
      xhr.target.emit('error', new Errors('network', '', {line: 25, handle: '[Task] constructor', msg: e.message, url}))
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
    let Queue = Task.queue
    let sended = Queue.filter((item) => item.on)
    let wait = Queue.filter(item => !item.on)
    let max = Task.limit - sended.length
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
window.Task = Task

export default Task
