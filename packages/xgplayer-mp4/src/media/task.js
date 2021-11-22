import EventEmitter from 'event-emitter'
import Errors from '../error'
import {CUSTOM_EVENTS, TASK_ERROR, TASK_ERROR_TYPES} from '../constants'
import getResponseHeaders from '../util/getHeaders';

class Task {
  constructor (url, range, xhrSetup, callback, ext = {}) {
    EventEmitter(this)
    window.Task = Task
    this.url = url
    this.range = range
    ext.start = range[0]
    ext.end = range[1]
    this.uniqueTag = `${this.url}&range=${range[0]}-${range[1]}`
    this.playerId = ext.playerId;
    //处理重复分片请求,只拦截同一播放器的相同请求
    if (Task.queue.some(item => item.url === url && JSON.stringify(item.range) === JSON.stringify(range)  && item.playerId === ext.playerId)) {
      // console.log('task repeat playerid', ext.playerId)
      return;
    }
    this.xhrSetup = xhrSetup
    this.id = this.playerId + range.join('-')
    this.running = false
    this.canceled = false
    this.initialize(url, range, callback);
  }
  initialize(url, range, callback) {
    let xhr = new window.XMLHttpRequest()
    xhr.target = this
    xhr.responseType = 'arraybuffer'
    xhr.withCredentials = this.withCredentials || false
    xhr.open('get', url)
    if(typeof this.xhrSetup === 'function') {
      this.xhrSetup(xhr, url)
    }
    xhr.setRequestHeader('Range', `bytes=${range[0]}-${range[1]}`)
    let self = this;
    xhr.onreadystatechange = function (e) {
      // HEADERS_RECEIVED
      if (xhr.readyState === 2) {
          self.headers = getResponseHeaders(xhr);
          // self.emit('getHeaders', self.headers);
          self.status = xhr.status;
          // self.startDownloadTime = nowTime();
      }
      // OPENED
      if (xhr.readyState === 1) {
          // self.lastTime = nowTime();
      }
    };
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (callback && callback instanceof Function) {
          callback(xhr.response)
        }
      } else{
        if(xhr.status === 403){
          self.emit(CUSTOM_EVENTS.MEDIA_EXPIRED);
        }else{
          self._emitTaskError(TASK_ERROR_TYPES.CODE_ERROR);
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
    if (!self.canceled) {
      self.xhr = xhr;
      Task.queue.push(self);
    }
    self.update()
  }
  cancel () {
    this.xhr.abort()
    this._emitTaskError(TASK_ERROR_TYPES.CANCEL);
    this.canceled = true;
  }

  _emitTaskError(code){
    this.emit(TASK_ERROR, {code , url: this.uniqueTag, readyState: this.xhr.readyState, status: this.xhr.status})
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
    let sended = Queue.filter((item) => item.running)
    let wait = Queue.filter(item => !item.running)
    let max = Task.limit - sended.length
    wait.forEach((item, idx) => {
      if (idx < max) {
        item.run()
      }
    })
  }

  run () {
    if (this.xhr.readyState === 1) {
      this.running = true
      this.xhr.send()
    } else {
      this.remove()
    }
  }

  /***
   * 同时存在多播放器实例，存在问题
   */
  static clear (playerId) {
    let queue = Task.queue;
    for(let i = queue.length - 1; i > -1; i--){
      let item = queue[i];
      if(item.running && item.playerId === playerId){
        item.cancel();
      }
      queue.splice(i, 1)
    }
  }
}

Task.queue = []
Task.limit = 2

export default Task
