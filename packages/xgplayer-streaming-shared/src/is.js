const toString = Object.prototype.toString

export function isObject (a) {
  return a !== null && typeof a === 'object'
}

export function isPlainObject (val) {
  if (toString.call(val) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}

export function isDate (a) {
  return toString.call(a) === '[object Date]'
}

export function isNumber (n) {
  return typeof n === 'number' && !Number.isNaN(n)
}
