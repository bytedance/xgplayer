export type PublicPromise<T = unknown> = Promise<T> & {
  used: boolean
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: unknown) => void
}

export function createPublicPromise<T = unknown>(): PublicPromise<T> {
  let resolvePromise: (value: T | PromiseLike<T>) => void
  let rejectPromise: (reason?: unknown) => void
  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve
    rejectPromise = reject
  }) as PublicPromise<T>

  promise.used = false
  promise.resolve = (value) => {
    promise.used = true
    resolvePromise(value as T | PromiseLike<T>)
  }
  promise.reject = (reason) => {
    promise.used = true
    rejectPromise(reason)
  }
  return promise
}

export function nowTime(): number {
  try {
    return parseInt(String(performance.now()), 10)
  } catch {
    return new Date().getTime()
  }
}

export const SafeJSON = {
  stringify(obj: unknown): string | undefined {
    try {
      return JSON.stringify(obj)
    } catch {
      return ''
    }
  },
  parse(obj: string): unknown {
    try {
      return JSON.parse(obj)
    } catch {
      return undefined
    }
  }
}
