import EventEmitter from 'event-emitter'

const EVENTS = {
  START: 'dragStart',
  MOVE: 'dragMove',
  ENDED: 'dragEnded'
}

const HANDLERS = {
  'mouseup': 'onUp',
  'mousemove': 'onMove'
  // 'mouseleave': 'onCancel'
}

const TOUCH_HANDLERS = {
  'touchend': 'onUp',
  'touchmove': 'onMove',
  'touchcancel': 'onCancel'
}

function _typeOf (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0]
}

function clientX (e) {
  if (e.touches && e.touches.length > 0) {
    return e.touches[0].clientX
  } else {
    return e.clientX
  }
}

function clientY (e) {
  if (e.touches && e.touches.length > 0) {
    return e.touches[0].clientY
  } else {
    return e.clientY
  }
}

export default class Draggabilly {
  constructor (root, options = {}) {
    EventEmitter(this)
    this._pos = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      currentX: 0,
      currentY: 0,
      isMoving: false
    }
    // eslint-disable-next-line no-undef
    this._root = root instanceof Element ? root : document.querySelector(root)
    // eslint-disable-next-line no-undef
    this._handlerDom = options.handle instanceof Element ? options.handle : document.querySelector(options.handle);
    if (!this._root || !this._handlerDom) {
      return
    }
    ['onDown', 'onUp', 'onMove', 'onCancel', 'onDocUp'].map(key => {
      this[key] = this[key].bind(this)
    })
    if ('ontouchstart' in window) {
      this._handlerKeys = TOUCH_HANDLERS
      this._startKey = 'touchstart'
      this._endKey = 'touchend'
    } else {
      this._handlerKeys = HANDLERS
      this._startKey = 'mousedown'
      this._endKey = 'mouseup'
    }
    this._handlerDom.addEventListener(this._startKey, this.onDown)
  }

  onDocUp (e) {
    this.onUp()
  }

  onDown (e) {
    const {_pos, _root} = this
    if (!_root || _pos.isMoving) {
      return
    }
    _pos.isMoving = true
    _pos.currentX = clientX(e)
    _pos.currentY = clientY(e)
    const _rec = _root.getBoundingClientRect()
    _pos.width = _rec.width
    _pos.height = _rec.height
    _pos.top = _rec.top
    _pos.left = _rec.left
    _pos.maxTop = window.innerHeight - _rec.height
    _pos.maxLeft = window.innerWidth - _rec.width
    Object.keys(this._handlerKeys).map(key => {
      this._handlerDom.addEventListener(key, this[this._handlerKeys[key]])
    })
    document.addEventListener(this._endKey, this.onDocUp)
    this.emit(EVENTS.START, _pos)
  }

  onUp (e) {
    const {_pos, _root} = this
    if (!_root) {
      return
    }
    _pos.isMoving = false
    _pos.top += _pos.y
    _pos.left += _pos.x
    this.setPosition(0, 0, _pos.left, _pos.top)
    _pos.x = 0
    _pos.y = 0
    Object.keys(this._handlerKeys).map(key => {
      this._handlerDom.removeEventListener(key, this[this._handlerKeys[key]])
    })
    document.removeEventListener(this._endKey, this.onDocUp)
    this.emit(EVENTS.ENDED, _pos)
  }

  onMove (e) {
    const {_pos} = this
    e = e || window.event
    const {maxTop, maxLeft, left, top, isMoving} = this._pos
    if (isMoving) {
      const nowX = clientX(e)
      const nowY = clientY(e)
      let disX = nowX - _pos.currentX
      let disY = nowY - _pos.currentY
      let _ctop = parseInt(top) + disY
      let _cleft = parseInt(left) + disX
      if (_cleft < 0) {
        _cleft = 0
      } else if (_cleft > maxLeft) {
        _cleft = maxLeft
      }

      if (_ctop < 0) {
        _ctop = 0;
      } else if (_ctop > maxTop) {
        _ctop = maxTop
      }
      _pos.x = _cleft - left
      _pos.y = _ctop - top
      this.setPosition(_pos.x, _pos.y)
      // if (e.preventDefault) {
      //   e.preventDefault()
      // }
      this.emit(EVENTS.ENDED, _pos)
      return false
    }
  }

  onCancel (e) {
    // this.onUp(e)
  }

  destroy () {
    this._handlerDom.removeEventListener(this._startKey, this.onDown)
    Object.keys(this._handlerKeys).map(key => {
      this._handlerDom.removeEventListener(key, this[HANDLERS[key]])
    })
    document.removeEventListener(this._endKey, this.onDocUp)
    this._handlerDom = null
  }

  setPosition (x, y, left, top) {
    const {_root} = this
    const transform = `translate3d(${x}px, ${y}px, 0)`
    _root.style.transform = transform
    _root.style.webKitTransform = transform
    if (_typeOf(top) === 'Number') {
      _root.style.top = `${top}px`
    }
    if (_typeOf(left) === 'Number') {
      _root.style.left = `${left}px`
    }
  }
}
