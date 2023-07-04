
const EVENTS = {
  PRESS: 'press',
  PRESS_END: 'pressend',
  DOUBlE_CLICK: 'doubleclick',
  CLICK: 'click',
  TOUCH_MOVE: 'touchmove',
  TOUCH_START: 'touchstart',
  TOUCH_END: 'touchend'
}

const TOUCHS = {
  start: 'touchstart',
  end: 'touchend',
  move: 'touchmove',
  cancel: 'touchcancel'
}

const MOUSES = {
  start: 'mousedown',
  end: 'mouseup',
  move: 'mousemove',
  cancel: 'mouseleave'
}

function getTouch (touches) {
  if (touches && touches.length > 0) {
    return touches[touches.length - 1]
  } else {
    return null
  }
}

// function preventToucheDefault (e) {
//   const ua = navigator.userAgent;
//   /(?:iPhone|iPad)/.test(ua) && e.cancelable && e.preventDefault()
// }

function getDefaultConfig () {
  return {
    pressDelay: 600,
    dbClickDelay: 200,
    disablePress: false,
    disableDbClick: false,
    miniStep: 2,
    needPreventDefault: true
  }
}

class Touche {
  constructor (dom, config = { eventType: 'touch' }) {
    this._pos = {
      moving: false,
      start: false,
      x: 0,
      y: 0
    }
    this.config = getDefaultConfig()
    Object.keys(config).map(key => {
      this.config[key] = config[key]
    })
    this.root = dom
    this.events = config.eventType === 'mouse' ? MOUSES : TOUCHS
    this.pressIntrvalId = null
    this.dbIntrvalId = null
    this.__handlers = {}
    this._initEvent()
  }

  _initEvent () {
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchCancel = this.onTouchCancel.bind(this)
    this.root.addEventListener(this.events.start, this.onTouchStart)
  }

  __setPress (e) {
    const { config } = this
    if (this.pressIntrvalId) {
      this.__clearPress()
    }
    this.pressIntrvalId = setTimeout(() => {
      this.trigger(EVENTS.PRESS, e)
      this._pos.press = true
      this.__clearPress()
    }, config.pressDelay)
  }

  __clearPress () {
    window.clearTimeout(this.pressIntrvalId)
    this.pressIntrvalId = null
  }

  __setDb (e) {
    const { config } = this
    if (this.dbIntrvalId) {
      this.__clearDb()
      this.trigger(EVENTS.DOUBlE_CLICK, e)
      return
    }
    this.dbIntrvalId = setTimeout(() => {
      this.__clearDb()
      if (!this._pos.start && !this._pos.press && !this._pos.moving) {
        this.trigger(EVENTS.CLICK, e)
      }
    }, config.dbClickDelay)
  }

  __clearDb () {
    clearTimeout(this.dbIntrvalId)
    this.dbIntrvalId = null
  }

  on (event, handler) {
    if (!this.__handlers[event]) {
      this.__handlers[event] = []
    }
    this.__handlers[event].push(handler)
  }

  off (event, handler) {
    if (!this.__handlers[event]) {
      return
    }
    const handlers = this.__handlers[event]
    let index = -1
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        index = i
        break
      }
    }
    if (index >= 0) {
      this.__handlers[event].splice(index, 1)
    }
  }

  trigger (event, e) {
    if (!this.__handlers[event]) {
      return
    }
    this.__handlers[event].map(handler => {
      try {
        handler(e)
      } catch (error) {
        console.error(`trigger>>:${event}`, error)
      }
    })
  }

  onTouchStart (e) {
    const { _pos, root } = this
    // config.needPreventDefault && preventToucheDefault(e)
    const touch = getTouch(e.touches)
    _pos.x = touch ? parseInt(touch.pageX, 10) : e.pageX
    _pos.y = touch ? parseInt(touch.pageX, 10) : e.pageX
    _pos.start = true
    this.__setPress(e)
    root.addEventListener(this.events.end, this.onTouchEnd)
    root.addEventListener(this.events.cancel, this.onTouchCancel)
    root.addEventListener(this.events.move, this.onTouchMove)
    this.trigger(EVENTS.TOUCH_START, e)
  }

  onTouchCancel (e) {
    this.onTouchEnd(e)
  }

  onTouchEnd (e) {
    const { _pos, root } = this
    // config.needPreventDefault && preventToucheDefault(e)
    this.__clearPress()
    root.removeEventListener(this.events.cancel, this.onTouchCancel)
    root.removeEventListener(this.events.end, this.onTouchEnd)
    root.removeEventListener(this.events.move, this.onTouchMove)    e.moving = _pos.moving
    e.press = _pos.press
    _pos.press && this.trigger(EVENTS.PRESS_END, e)
    this.trigger(EVENTS.TOUCH_END, e)
    !_pos.press && !_pos.moving && this.__setDb(e)
    _pos.press = false
    _pos.start = false
    _pos.moving = false
  }

  onTouchMove (e) {
    const { _pos, config } = this
    const touch = getTouch(e.touches)
    const x = touch ? parseInt(touch.pageX, 10) : e.pageX
    const y = touch ? parseInt(touch.pageY, 10) : e.pageX
    const diffx = x - _pos.x
    const diffy = y - _pos.y
    if (Math.abs(diffy) < config.miniStep && Math.abs(diffx) < config.miniStep) {
      return
    }
    this.__clearPress()
    _pos.press && this.trigger(EVENTS.PRESS_END, e)
    _pos.press = false
    _pos.moving = true
    this.trigger(EVENTS.TOUCH_MOVE, e)
  }

  destroy () {
    const map = {
      touchend: 'onTouchEnd',
      touchmove: 'onTouchMove',
      touchstart: 'onTouchStart'
    }
    Object.keys(map).map(key => {
      this.root.removeEventListener('touchend', this[map[key]])
    })
  }
}

export default Touche
