import observer from '../utils/Observer'
import Errors from '../models/error'

/**
 * 转码器基类
 */
class TransCoder {
  constructor (store) {
    if (store) {
      this._store = store
    }
    this._observer = observer
    this.on = observer.on.bind(observer)
    this.emit = observer.emit.bind(observer)
    this.off = observer.off.bind(observer)
    this.flush = observer.flush.bind(observer)
    this.once = observer.once.bind(observer)
  }
  emitError (type, errorDetail = {line: '', handle: '', msg: '', version: ''}) {
    const { player, state } = this._store
    if (player) {
      const errorToEmit = new Errors(type, player.currentTime, state.duration, '', true, player.config.url, player.config.url, player.ended, errorDetail)
      player.emit('error', errorToEmit)
    }
  }
}
export default TransCoder
