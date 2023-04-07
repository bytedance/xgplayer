import EventEmitter from 'eventemitter3'

class Task extends EventEmitter {
  constructor (url, _callback, range) {
    super()
    this.url = url
    this.on = false
    if (Task.queue.some(item => item.url === url)) {
      return
    }
    const xhr = new XMLHttpRequest()
    xhr.target = this
    xhr.responseType = 'arraybuffer'
    xhr.open('get', url)
    if (range) {
      this.range = range
      this.id = range.join('-')
      xhr.setRequestHeader('Range', `bytes=${range.join('-')}`)
    }
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (_callback && _callback instanceof Function) {
          _callback(xhr.response)
        }
      } else if (xhr.status === 404) {
        if (_callback && _callback instanceof Function) {
          _callback('Not Found')
        }
      }
      xhr.target.remove()
    }
    xhr.onerror = function () {
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
      if (item.url === this.url) {
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
window.Task = Task

export default Task
