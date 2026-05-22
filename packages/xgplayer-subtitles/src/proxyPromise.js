
export default class ProxyPromise {
  constructor () {
    let resolvePromise
    let rejectPromise

    const promise = new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    const publicPromise = promise
    publicPromise.resolve = function (data) {
      resolvePromise(data)
      publicPromise.state = 'fulfilled'
    }
    publicPromise.reject = function (error) {
      rejectPromise(error)
      publicPromise.state = 'rejected'
      publicPromise.isBreak = error === 'DESTROYED'
    }
    publicPromise.state = 'pending'

    return publicPromise
  }

  /** @param {T=} value */
  resolve (value) {}

  /** @param {*=} reason */
  reject (reason) {}
}
