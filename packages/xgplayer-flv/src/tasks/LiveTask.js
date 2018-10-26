class LiveTask {
  constructor (url, config) {
    const _headers = new window.Headers()

    const _config = {
      headers: Object.assign({}, _headers),
      method: 'GET',
      cache: 'default',
      mode: 'cors'
    }
    this._stop = false
    this.request = new Request(url, Object.assign({}, _config, config)) // eslint-disable-line
  }

  run (callback) {
    const self = this
    function resolve (reader) {
      reader.read().then(result => {
        if (self._stop) {
          reader.cancel()
          return
        }
        callback(result.done ? undefined : result.value)
        resolve(reader)
      })
    }

    const prom = new Promise((resolve, reject) => {
      let isTimeout = true

      fetch(this.request).then((res) => { // eslint-disable-line
        isTimeout = false
        resolve(res)
      })
      setTimeout(() => {
        isTimeout && reject() // eslint-disable-line
      }, 5000)
    })

    prom
      .then(res => {
        const reader = res.body.getReader()
        resolve(reader)
      })
      .catch(res => {
        callback()
      })

    return this
  }
  cancel () {
    this._stop = true
  }
}

export default LiveTask
