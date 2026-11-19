export const LogCacheLevel = {
  DEBUG: 1,
  LOG: 2,
  WARN: 3,
  ERROR: 4
} as const

export type LogCacheLevelValue = (typeof LogCacheLevel)[keyof typeof LogCacheLevel]

export interface LoggerConfig {
  logCacheLevel?: number
  logMaxSize?: number
}

const LOG_MAX_SIZE = 200 * 1024
const SIMPLE_TYPES = new Set([
  'Boolean',
  'Number',
  'String',
  'Undefined',
  'Null',
  'Date',
  'Object'
])

export class Logger {
  static disabled = true

  name: string
  logCacheLevel: number
  logMaxSize: number
  logSize = 0
  logTextArray: string[] = []

  private readonly _prefix: string

  constructor(name?: string, config: LoggerConfig = {}) {
    this.name = name || ''
    this._prefix = `[${this.name}]`
    this.logCacheLevel = config.logCacheLevel || LogCacheLevel.WARN
    this.logMaxSize = config.logMaxSize || LOG_MAX_SIZE
  }

  debug(...args: unknown[]) {
    this.logCache(LogCacheLevel.DEBUG, ...args)
    if (Logger.disabled) return
    console.debug(`[${nowTime()}]`, this._prefix, ...args)
  }

  log(...args: unknown[]) {
    this.logCache(LogCacheLevel.LOG, ...args)
    if (Logger.disabled) return
    console.log(`[${nowTime()}]`, this._prefix, ...args)
  }

  warn(...args: unknown[]) {
    this.logCache(LogCacheLevel.WARN, ...args)
    if (Logger.disabled) return
    console.warn(`[${nowTime()}]`, this._prefix, ...args)
  }

  error(...args: unknown[]) {
    this.logCache(LogCacheLevel.ERROR, ...args)
    if (Logger.disabled) return
    console.error(`[${nowTime()}]`, this._prefix, ...args)
  }

  logCache(logCacheLevel: number, ...logText: unknown[]) {
    if (logCacheLevel < this.logCacheLevel) return

    let text: string
    try {
      const serializableLog = logText.map((item) => toLoggable(item))
      text = `[${nowTime()}]${this._prefix}${JSON.stringify(serializableLog)}`
    } catch {
      return
    }

    this.logSize += text.length
    this.logTextArray.push(text)
    if (this.logSize > this.logMaxSize) {
      const removedLog = this.logTextArray.shift()
      if (removedLog) this.logSize -= removedLog.length
    }
  }

  getLogCache(): string {
    const logText = this.logTextArray.join('\n')
    this.reset()
    return logText
  }

  reset() {
    this.logTextArray = []
    this.logSize = 0
  }

  table(tabularData?: unknown, properties?: string[]) {
    if (Logger.disabled) return
    console.group(this._prefix)
    console.table(tabularData, properties)
    console.groupEnd()
  }

  static enable() {
    Logger.disabled = false
  }

  static disable() {
    Logger.disabled = true
  }

  setLogLevel(value: number) {
    this.logCacheLevel = value
  }
}

function nowTime(): string {
  return new Date().toLocaleString()
}

function reduceDepth(value: unknown): unknown {
  if (typeof value !== 'object') return value
  const objectType = Object.prototype.toString.call(value).slice(8, -1)
  switch (objectType) {
    case 'Array':
    case 'Uint8Array':
    case 'ArrayBuffer': {
      const length =
        value && 'length' in value ? (value as { length?: number }).length : undefined
      return `${objectType}[${length}]`
    }
    case 'Object':
      return '{}'
    default:
      return objectType
  }
}

function toLoggable(value: unknown, maxDepth = 2, depth = 1): unknown {
  if (!value || typeof value !== 'object') return value

  const objectType = Object.prototype.toString.call(value).slice(8, -1)
  if (!SIMPLE_TYPES.has(objectType)) return objectType
  if (depth > maxDepth) return undefined

  const result: Record<string, unknown> = {}
  const record = value as Record<string, unknown>
  for (const key in record) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue
    const item = record[key]
    if (depth === maxDepth) {
      result[key] = reduceDepth(item)
    } else if (item && typeof item === 'object') {
      result[key] = toLoggable(item, maxDepth, depth + 1)
    } else {
      result[key] = item
    }
  }
  return result
}
