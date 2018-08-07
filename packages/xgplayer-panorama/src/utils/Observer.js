/**
 * @author fuyuhao
 */

export default class Observer {
  constructor () {
    this.fnId = 0
    this._listenerIdMap = new Map()
    this._listeners = new Map()
  }
  on (key, fn) {
    const fnId = this.fnId++
    const listeners = this._getListenersByKey(key)
    this._listenerIdMap.set(fnId, fn)
    if (listeners) {
      listeners.unshift(fnId)
      return
    }
    this._listeners.set(key, [fnId])
    return fnId
  }
  emit (key, ...params) {
    this._getListenersByKey(key).forEach(fnId => {
      const fn = this._getListenerById(fnId)
      fn && fn(...params)
    })
  }
  off (key, fnId) {
    const listeners = this._getListenersByKey(key)
    const fn = this._getListenerById(fnId)
    if (!fn || !listeners || !listeners.includes(fnId)) {
      return
    }
    this._listenerIdMap.delete(fnId)
    if (listeners.length === 1) {
      this._listeners.delete(key)
    } else {
      listeners.splice(listeners.indexOf(fnId), 1)
    }
  }
  _getListenersByKey (key) {
    return this._listeners.get(key)
  }
  _getListenerById (fnId) {
    return this._listenerIdMap.get(fnId)
  }
  flush (key) {
    const listeners = this._getListenersByKey(key)
    if (listeners) {
      listeners.forEach(fnId => {
        this._listenerIdMap.delete(fnId)
      })
      this._listeners.delete(key)
    }
  }
  destroy () {
    this._listeners.clear()
    this._listenerIdMap.clear()
  }
}
