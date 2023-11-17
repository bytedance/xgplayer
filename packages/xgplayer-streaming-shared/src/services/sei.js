import { EVENT } from '../event'

export class SeiService {
  _seiSet = new Set()

  constructor (emitter) {
    this.emitter = emitter

    emitter.on(EVENT.SEI, sei => {
      if (sei) this._seiSet.add(sei)
    })
  }

  throw (currentTime, isLive) {
    if (currentTime === null || currentTime === undefined || !this._seiSet.size) return
    const min = currentTime - 0.2
    const max = currentTime + 0.2
    const toThrow = []
    this._seiSet.forEach(sei => {
      if (sei.time >= min && sei.time <= max) {
        toThrow.push(sei)
      }
    })

    toThrow.forEach(sei => {
      this._seiSet.delete(sei)
      this.emitter.emit(EVENT.SEI_IN_TIME, sei)
    })

    if (!isLive) return

    this._seiSet.forEach(s => {
      if (s.time < currentTime - 5) {
        this._seiSet.delete(s)
      }
    })
  }

  reset () {
    this._seiSet.clear()
  }
}
