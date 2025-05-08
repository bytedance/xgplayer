import { Flv } from './flv'
import Media from './media'

export default class PlayerWorker {
  constructor () {
    this._bindWorkerEvent()
    globalThis.inPlayerWorker = true
  }

  postMessage (type, data = {}) {
    self.postMessage({
      type,
      data
    })
  }

  _bindWorkerEvent () {
    self.addEventListener('message', this._handleMessage)
  }

  _handleMessage = (e) => {
    const { data } = e
    switch (data.type) {
      case 'init':
        this.flv = new Flv({
          media: new Media(this),
          ...data.data
        })
        break
      default:
        break
    }
  }
}

new PlayerWorker()