import VodTask from '../VodTask'
export default class FetchLoader {
  constructor (url, range, config = {}) {
    this.url = url
    this.on = false
    this.complete = false
    this.isStopped = false
    this.timeStamp = Date.now()
    const _config = {
      headers: {
        Range: `bytes=${range[0]}-${range[1]}`
      },
      method: 'GET',
      cache: 'default',
      mode: 'cors'
    }

    this.request = () => {
      this.on = true
      return window.fetch(url, Object.assign({}, _config, config)).then(res => res.arrayBuffer()).then(buffer => {
        this.complete = true
        this.byteLength = buffer.byteLength
        VodTask.remove(this)
        if (this.isStopped) return {}
        return {
          buffer,
          timeStamp: this.timeStamp
        }
      }).catch(e => {
        this.complete = true
        VodTask.remove(this)
        return e
      })
    }
  }

  run () {
    this._promise = this.request()
  }

  get readyState () {
    return 1
  }

  cancel () {
    this.isStopped = true
  }

  get promise () {
    return this.on ? this._promise : this.request()
  }
}
