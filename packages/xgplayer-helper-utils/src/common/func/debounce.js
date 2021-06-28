/**
 * @param {number} num
 * @param {number} fixed
 * @return {number}
 */
export default (fn, wait) => {
  let lastTime = Date.now()
  let timer = null
  let isFirstTime = true

  return (...args) => {
    const now = Date.now()
    if (isFirstTime) {
      lastTime = Date.now()
      isFirstTime = false
      fn(...args)
    }
    if (now - lastTime > wait) {
      lastTime = now
      fn(...args)
    } else {
      if (timer) {
        window.clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn(...args)
      }, wait)
    }
  }
}
