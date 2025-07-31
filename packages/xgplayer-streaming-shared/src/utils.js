export function createPublicPromise() {
  let res, rej
  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  promise.used = false
  promise.resolve = (...args) => {
    promise.used = true
    return res(...args)
  }
  promise.reject = (...args) => {
    promise.used = true
    return rej(...args)
  }
  return promise
}

export function nowTime() {
  try {
    return parseInt(performance.now(), 10)
  } catch (_e) {
    return Date.now()
  }
}

export const SafeJSON = {
  stringify(obj) {
    try {
      return JSON.stringify(obj)
    } catch (_e) {
      return ''
    }
  },
  parse(obj) {
    try {
      return JSON.parse(obj)
    } catch (_e) {
      return undefined
    }
  }
}
