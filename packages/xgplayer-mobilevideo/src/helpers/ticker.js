/**
 * @author fuyuhao@bytedance.com
 */

 export const DEFAULT_FPS = 30

 export function  validateFPS(fps){
  if(fps < 20 || fps > 80){
    return false
  }
  return true
}
export default class Ticker {
  constructor (options) {
    this.options = Object.assign({}, options || {})
    if(!this.options.interval || !validateFPS(1000 / this.options.interval)){
      this.options.interval = 1000 / 30;
    }
    this.callbacks = []
  }

  start (...callbacks) {
    this.callbacks = callbacks
  }

  onTick () {
    for (let i = 0, len = this.callbacks.length; i < len; i++) {
      const callback = this.callbacks[i]
      callback()
    }
  }

  setInterval (interval) {
    if(!validateFPS(1000 / interval)){
      interval = 1000 / 30
    }
    this.options.interval = interval
    return this;
  }
}

/**
 * ticker use requestAnimationFrame
 */
export class RafTicker extends Ticker {
  constructor (props) {
    super(props);
    this.prev = null;
    this.timerId = null
    this._subTimerId = null

    this._tickFunc = RafTicker.getTickFunc()
    this.tick = this.tick.bind(this)
  }

  start (...callbacks) {
    super.start(...callbacks)
    this.tick()
  }

  tick () {
    this.nextTick();
    this.onTick()
  }

  nextTick () {
    const { _tickFunc } = this;
    this.timerId = _tickFunc(this.tick)
  }

  stop () {
    if (this.timerId) {
      const cancelFunc = RafTicker.getCancelFunc()

      cancelFunc(this.timerId)
    }
  }

  resume () {
    this.nextTick();
  }

  static getTickFunc () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
  }

  static getCancelFunc () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame
  }

  static isSupported () {
    return RafTicker.getTickFunc() !== undefined
  }
}

/**
 * use setTimeout for browsers without raf support
 */
export class TimeoutTicker extends Ticker {
  constructor (config) {
    super(config)
    this.timeoutId = null
  }

  start (...callbacks) {
    super.start(...callbacks)
    this.tick()
  }

  tick () {
    this.nextTick();
    this.onTick()
  }

  nextTick () {
    this.timeoutId = window.setTimeout(() => {
      this.stop();
      this.tick();
    }, this.options.interval)
  }

  stop () {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId)
    }
  }
}

/**
 * 返回Ticker构造函数
 * @returns {Ticker}
 * 使用TimeoutTicker 1.可控制间隔 2.防止页面切换降频
 */
export const getTicker = () => {
  if (RafTicker.isSupported()) {
    return RafTicker
  } else {
    return TimeoutTicker
  }
}
