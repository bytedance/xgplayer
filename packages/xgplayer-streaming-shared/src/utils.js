export function createPublicPromise () {
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

export function nowTime () {
  try {
    return parseInt(performance.now(), 10)
  } catch (e) {
    return new Date().getTime()
  }
}
