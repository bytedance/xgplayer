class DevLogger {
  constructor () {
    try {
      let matched = /xgd=(\d)/.exec(document.cookie)
      this._status = !!matched
      this._level = matched && matched[1]
    } catch (e) {
      this._status = false
    }

    ['group', 'groupEnd', 'log', 'warn', 'error'].forEach((funName) => {
      this[funName] = (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) => {
        if (!this._status) return
        let tagName = arg1
        let args = [arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10].filter(x => x !== undefined)
        console[funName]('[' + tagName + ']:', ...args)
      }
    })
  }

  /**
   * @return {*|boolean|boolean}
   */
  get enable () {
    return this._status
  }

  /**
   * @return {boolean}
   */
  get long () {
    return this._level === '2'
  }
}

export default new DevLogger()
