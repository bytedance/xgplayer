export class Logger {
  constructor (name) {
    this.name = name || ''
    this._prefix = `[${this.name}]`
  }

  warn (...args) {
    if (Logger.disabled) return
    console.warn(this._prefix, ...args)
  }

  static disabled = true

  static enable () {
    Logger.disabled = false
  }

  static disable () {
    Logger.disabled = true
  }
}
