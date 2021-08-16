
export default class SEIOnDemand {
    _seiQueue = []
    _baseDts = Infinity
    _timer = 0

    constructor (player, parent) {
      this._player = player
      this._parent = parent
    }

    updateBaseDts (baseDts) {
      this._baseDts = baseDts
      this._bootCheckEmitSEI()
    }

    append (sei) {
      if (this._baseDts === Infinity) return

      this._seiQueue.push({
        time: (sei.dts - this._baseDts) / 1000,
        data: sei
      })
    }

    _bootCheckEmitSEI () {
      if (this._timer) {
        clearInterval(this._timer)
      }

      this._timer = setInterval(this._checkEmitSEI, 30)
    }

    _checkEmitSEI = () => {
      const cTime = this._player?.currentTime || 0

      if (!cTime) return

      let index = -1

      for (let i = 0, len = this._seiQueue.length; i < len; i++) {
        const cSei = this._seiQueue[i]

        if (cSei?.time > cTime) {
          index = i
          break
        }
      }

      if (index < 0) return

      this._seiQueue.splice(0, index)

      let sei = this._seiQueue[0]

      while (sei) {
        if (!sei) break

        const delta = sei?.time - cTime

        if (delta >= 0.05) {
          break
        }

        this._seiQueue.shift()
        this._player?.emit('SEI_PARSED', sei.data)
        this._parent?.emitCoreEvent('core.seiparsed', sei.data)
        sei = this._seiQueue[0]
      }
    }

    destroy () {
      clearInterval(this._timer)
      this._player = null
      this._seiQueue = []
    }
}
