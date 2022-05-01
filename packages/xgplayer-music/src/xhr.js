import EventEmitter from 'event-emitter'

class Xhr {
  constructor (url, callback) {
    EventEmitter(this)
    this.url = url
    let xhr = new window.XMLHttpRequest()
    xhr.target = this
    xhr.responseType = 'arraybuffer'
    xhr.open('get', url)
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (callback && callback instanceof Function) {
          callback(xhr.response)
        }
      }
    }
    xhr.onerror = function (e) {
      xhr.target.emit('error' + e.message)
    }
    this.xhr = xhr
    this.run()
  }

  destroy () {
    this.cancel()
    this.xhr = null
  }

  cancel () {
    if (this.xhr.readyState !== this.xhr.DONE) {
      this.xhr.abort()
    }
  }

  run () {
    if (this.xhr.readyState === this.xhr.OPENED) {
      this.xhr.send()
    }
  }
}

export default Xhr
