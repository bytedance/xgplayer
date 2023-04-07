
export const LogCacheLevel = {
  'DEBUG': 1,
  'LOG': 2,
  'WARN': 3,
  'ERROR': 4
}
const LOG_MAX_SIZE = 200 * 1024
const SIMPLE_TYPE = ['Boolean', 'Number' ,'String', 'Undefined','Null', 'Date','Object']
export class Logger {
  constructor (name,config) {
    this.name = name || ''
    this._prefix = `[${this.name}]`
    Logger.disabled = config?.disabled || true
    this.logCacheLevel = config?.logCacheLevel || 3
    this.logMaxSize = config?.logMaxSize || LOG_MAX_SIZE
    this.logSize = 0
    this.logTextArray = []
  }

  debug (...args) {
    this.logCache(LogCacheLevel.DEBUG,...args)
    if (Logger.disabled) return
    console.debug(this._prefix, nowTime(), ...args)
  }

  log (...args) {
    this.logCache(LogCacheLevel.LOG,...args)
    if (Logger.disabled) return
    console.log(this._prefix, nowTime(), ...args)
  }

  warn (...args) {
    this.logCache(LogCacheLevel.WARN,...args)
    if (Logger.disabled) return
    console.warn(this._prefix, nowTime(), ...args)
  }

  error (...args) {
    this.logCache(LogCacheLevel.ERROR,...args)
    if (Logger.disabled) return
    console.error(this._prefix, nowTime(), ...args)
  }

  logCache (logCacheLevel, ...logText) {
    if (logCacheLevel < this.logCacheLevel) return
    let text = ''
    try {
      const finLogText = logText.map( item => logable(item))
      text = this._prefix + nowTime() + (JSON.stringify(finLogText))
    } catch (e) {
      return
    }
    if (logCacheLevel >= this.logCacheLevel) {
      this.logSize += text.length
      this.logTextArray.push(text)
    }
    if (this.logSize > this.logMaxSize) {
      const delLog = this.logTextArray.shift()
      this.logSize -= delLog.length
    }
  }

  getLogCache () {
    const logText = this.logTextArray.join('\n')
    this.reset()
    return logText
  }

  reset () {
    this.logTextArray = []
    this.logSize = 0
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

  setLogLevel (val) {
    this.logCacheLevel = val
  }
}
function nowTime () {
  return new Date().toLocaleString()
}

function reduceDepth (val) {
  if (typeof val !== 'object') {
    return val
  }
  const objType = Object.prototype.toString.call(val).slice(8, -1)
  switch (objType) {
    case 'Array':
    case 'Uint8Array':
    case 'ArrayBuffer':

      return objType + '[' + val.length + ']'
    case 'Object':
      return '{}'
    default:
      return objType
  }
}

function logable (obj, maxDepth, depth) {
  if (!depth) depth = 1
  if (!maxDepth) maxDepth = 2
  const result = {}

  if (!obj || typeof obj !== 'object') {
    return obj
  }

  const objType = Object.prototype.toString.call(obj).slice(8, -1)
  if (!SIMPLE_TYPE.includes(objType)) {
    return objType
  }

  if (depth > maxDepth) {
    return undefined
  }


  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (depth === maxDepth) {
        result[key] = reduceDepth(obj[key])
      } else if (typeof obj[key] === 'object') {
        result[key] = logable(obj[key], maxDepth, depth + 1)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

