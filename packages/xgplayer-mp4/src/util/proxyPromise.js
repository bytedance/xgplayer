
export default class ProxyPromise {
 
  constructor() {
    let resolvePromise;
    let rejectPromise;

    const promise = new Promise(((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    }));

    const publicPromise = promise
    publicPromise.resolve = resolvePromise;
    publicPromise.reject = rejectPromise;

    return publicPromise;
  }


  /** @param {T=} value */
  resolve(value) {}


  /** @param {*=} reason */
  reject(reason) {}
};
