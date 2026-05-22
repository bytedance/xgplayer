
export class Logger {
  constructor (name, enable) {
    this.name = name || ''
    this._prefix = `[${this.name}]`
    Logger.disabled = enable
  }

  debug (...args) {
    if (Logger.disabled) return
    console.debug(this._prefix, ...args)
  }

  log (...args) {
    if (Logger.disabled) return
    console.log(this._prefix, ...args)
  }

  warn (...args) {
    if (Logger.disabled) return
    console.warn(this._prefix, ...args)
  }

  error (...args) {
    if (Logger.disabled) return
    console.error(this._prefix, ...args)
  }

  table (...args) {
    if (Logger.disabled) return
    console.group(this._prefix)
    console.table(...args)
    console.groupEnd()
  }

  static disabled = true

  static enable () {
    Logger.disabled = false
  }

  static disable () {
    Logger.disabled = true
  }
}
