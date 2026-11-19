const toString = Object.prototype.toString

export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (!isObject(value) || toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export function isDate(value: unknown): value is Date {
  return toString.call(value) === '[object Date]'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}
