import XHRLoader from './loaders/XHRLoader'
import FetchLoader from './loaders/FetchLoader'
const LoadCls = (function (window) {
  if (window.fetch) {
    return FetchLoader
  }
  return XHRLoader
})(window)
class VodTask {
  constructor (url, range, headers) {
    this.url = url
    this.range = range
    this.id = range.join('-')
    this.on = false
    this.loader = new LoadCls(url, range, headers)
    this.isCanceled = false
    VodTask.queue.push(this)
    VodTask.update()
  }

  cancel () {
    this.isCanceled = true
    this.loader.cancel()
  }

  static remove (loader) {
    VodTask.queue.filter((item, idx) => {
      if (item.url === loader.url && item.id === loader.id) {
        VodTask.queue.splice(idx, 1)
        return true
      } else {
        return false
      }
    })
    VodTask.update()
  }

  static update () {
    let Queue = VodTask.queue
    let sended = Queue.filter((item) => item.on)
    let wait = Queue.filter(item => !item.on)
    let max = VodTask.limit - sended.length
    wait.forEach((item, idx) => {
      if (idx < max) {
        item.run()
      }
    })
  }

  run () {
    if (this.loader.readyState === 1) {
      this.on = true
      this.loader.run()
    } else {
      VodTask.remove()
    }
  }

  static clear () {
    VodTask.queue.forEach(item => {
      if (!item.loader.complete) {
        item.cancel()
      }
    })
    VodTask.queue.length = 0
  }

  get promise () {
    return this.loader.promise
  }
  get timeStamp () {
    return this.loader.timeStamp
  }
}

VodTask.queue = []
VodTask.limit = 2
window.VodTask = VodTask

export default VodTask
