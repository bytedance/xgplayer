export default function ProxyPromise() {
  let resolvePromise
  let rejectPromise

  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve
    rejectPromise = reject
  })

  const publicPromise = promise
  publicPromise.resolve = data => {
    resolvePromise(data)
    publicPromise.state = 'fulfilled'
  }
  publicPromise.reject = error => {
    rejectPromise(error)
    publicPromise.state = 'rejected'
    publicPromise.isBreak = error === 'DESTROYED'
  }
  publicPromise.state = 'pending'

  return publicPromise
}
