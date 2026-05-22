class Xhr {
  constructor (url, callback) {
    this.url = url
    const xhr = new window.XMLHttpRequest()
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
      // TODO: 改成回调家或者promise
      // xhr.target.emit('error' + e.message)
    }
    this.xhr = xhr
    this.run()
  }

  cancel () {
    this.xhr.abort()
  }

  run () {
    if (this.xhr.readyState === 1) {
      this.xhr.send()
    }
  }
}

export default Xhr
