/**
 * @author fuyuhao
 */

const nativeSlice = Array.prototype.slice

class Observer {
  constructor () {
    this.fnId = 1
    this._listenerIdMap = {}
    this._listeners = {}
  }
  on (key, fn) {
    const fnId = this.fnId++
    const listeners = this._getListenersByKey(key)
    this._listenerIdMap[fnId] = fn
    if (listeners) {
      listeners.unshift(fnId)
      return fnId
    }
    this._listeners[key] = [fnId]
    return fnId
  }
  emit (key) {
    const args = nativeSlice.call(arguments, 1)
    const listeners = this._getListenersByKey(key) || []
    for (let i = 0, len = listeners.length; i < len; i++) {
      const fn = this._getListenerById(listeners[i])
      fn && fn.apply(null, args)
    }
  }
  once (key, fn) {
    const fnId = this.fnId++
    const listeners = this._getListenersByKey(key)
    const _this = this

    function onceFunc () {
      const args = nativeSlice.call(arguments)
      fn.apply(null, args)
      _this.off(key, fnId)
    }
    this._listenerIdMap[fnId] = onceFunc
    if (listeners) {
      listeners.unshift(fnId)
      return fnId
    }
    this._listeners[key] = [fnId]
    return fnId
  }
  off (key, fnId) {
    const listeners = this._getListenersByKey(key)
    const fn = this._getListenerById(fnId)
    if (!fn || !listeners || listeners.indexOf(fnId) < 0) {
      return
    }
    delete this._listenerIdMap[fnId]
    if (listeners.length === 1) {
      delete this._listeners[key]
    } else {
      listeners[listeners.indexOf(fnId)] = undefined
    }
  }
  _getListenersByKey (key) {
    return this._listeners[key]
  }
  _getListenerById (fnId) {
    return this._listenerIdMap[fnId]
  }
  flush (key) {
    const listeners = this._getListenersByKey(key)
    if (listeners) {
      listeners.forEach(fnId => {
        delete this._listenerIdMap[fnId]
      })
      delete this._listeners[key]
    }
  }
  destroy () {
    this._listeners = null
    this._listenerIdMap = null
  }
}

export default new Observer()
