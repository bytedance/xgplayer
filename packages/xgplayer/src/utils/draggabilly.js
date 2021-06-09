import EventEmitter from 'event-emitter'

function getStyleSize (value) {
  const num = parseFloat(value)
  // not a percent like '100%', and a number
  const isValid = value.indexOf('%') === -1 && !isNaN(num)
  return isValid && num
}

const measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
]

const measurementsLength = measurements.length

function getZeroSize () {
  const size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  }
  for (let i = 0; i < measurementsLength; i++) {
    const measurement = measurements[i]
    size[ measurement ] = 0
  }
  return size
}

function getStyle (elem) {
  const style = window.getComputedStyle(elem)
  // if ( !style ) {
  //   logError( 'Style returned ' + style +
  //     '. Are you running this code in a hidden iframe on Firefox? ' +
  //     'See http://bit.ly/getsizebug1' );
  // }
  return style
}

function getSize (elem) {
  // use querySeletor if elem is string
  if (typeof elem === 'string') {
    elem = document.querySelector(elem)
  }

  // do not proceed on non-objects
  if (!elem || typeof elem !== 'object' || !elem.nodeType) {
    return
  }

  var style = getStyle(elem)

  // if hidden, everything is 0
  if (style.display === 'none') {
    return getZeroSize()
  }

  var size = {}
  size.width = elem.offsetWidth
  size.height = elem.offsetHeight

  var isBorderBox = size.isBorderBox = style.boxSizing === 'border-box'

  // get all measurements
  for (var i = 0; i < measurementsLength; i++) {
    var measurement = measurements[i]
    var value = style[ measurement ]
    var num = parseFloat(value)
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN(num) ? num : 0
  }

  var paddingWidth = size.paddingLeft + size.paddingRight
  var paddingHeight = size.paddingTop + size.paddingBottom
  var marginWidth = size.marginLeft + size.marginRight
  var marginHeight = size.marginTop + size.marginBottom
  var borderWidth = size.borderLeftWidth + size.borderRightWidth
  var borderHeight = size.borderTopWidth + size.borderBottomWidth

  var isBorderBoxSizeOuter = isBorderBox// isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize(style.width)
  if (styleWidth !== false) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth)
  }

  var styleHeight = getStyleSize(style.height)
  if (styleHeight !== false) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)
  }

  size.innerWidth = size.width - (paddingWidth + borderWidth)
  size.innerHeight = size.height - (paddingHeight + borderHeight)

  size.outerWidth = size.width + marginWidth
  size.outerHeight = size.height + marginHeight

  return size
}

function getTouch (touches, dentifier) {
  for (let i = 0; i < touches.length; i++) {
    const touch = touches[i]
    if (touch.identifier === dentifier) {
      return touch
    }
  }
};

const EVENTS = {
  START: 'dragStart',
  MOVE: 'dragMove',
  ENDED: 'dragEnded'
}

const POST_START_EVENTS = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ]
}

export default class Draggabilly {
  constructor (root, options = {}) {
    EventEmitter(this)
    this.isEnabled = true
    this.isDragging = false
    this.isDown = false
    this.position = {}
    this.downPoint = {}
    this.dragPoint = {x: 0, y: 0}
    this.startPos = {x: 0, y: 0}
    // eslint-disable-next-line no-undef
    this._root = root instanceof Element ? root : document.querySelector(root)
    // eslint-disable-next-line no-undef
    this._handlerDom = options.handle instanceof Element ? options.handle : document.querySelector(options.handle)
    if (!this._root || !this._handlerDom) {
      return
    }
    // ['onDown', 'onUp', 'onMove', 'onCancel', 'onDocUp'].map(key => {
    //   this[key] = this[key].bind(this)
    // })

    // if ('ontouchstart' in window) {
    //   this._handlerKeys = TOUCH_HANDLERS
    //   this._startKey = 'touchstart'
    //   this._endKey = 'touchend'
    // } else {
    //   this._handlerKeys = HANDLERS
    //   this._startKey = 'mousedown'
    //   this._endKey = 'mouseup'
    // }
    // this._handlerDom.addEventListener(this._startKey, this.onDown)
    this._bindStartEvent()
  }

  _bindStartEvent () {
    if ('ontouchstart' in window) {
      this._startKey = 'touchstart'
    } else {
      this._startKey = 'mousedown'
    }
    this[`on${this._startKey}`] = this[`on${this._startKey}`].bind(this)
    this._handlerDom.addEventListener(this._startKey, this[`on${this._startKey}`])
    POST_START_EVENTS[this._startKey].map(key => {
      this[`on${key}`] = this[`on${key}`].bind(this)
    })
  }

  _unbindStartEvent () {
    this._handlerDom.removeEventListener(this._startKey, this[`on${this._startKey}`])
  }

  _bindPostStartEvents (event) {
    if (!event) {
      return
    }
    const events = POST_START_EVENTS[ this._startKey ]
    // bind events to node
    events.map(eventName => {
      window.addEventListener(eventName, this[`on${eventName}`])
    })
    // save these arguments
    this._boundPointerEvents = events
  }

  _unbindPostStartEvents () {
    if (!this._boundPointerEvents) {
      return
    }
    this._boundPointerEvents.map(eventName => {
      // console.log('eventName', eventName, this[`on${eventName}`])
      window.removeEventListener(eventName, this[`on${eventName}`])
    })

    delete this._boundPointerEvents
  }

  enable () {
    this.isEnabled = true
  }

  disable () {
    this.isEnabled = false
    if (this.isDragging) {
      this.onUp()
    }
  }

  onDocUp (e) {
    this.onUp()
  }

  animate () {
    // only render and animate if dragging
    if (!this.isDragging) {
      return
    }

    this.positionDrag()

    window.requestAnimationFrame(() => {
      this.animate()
    })
  }

  positionDrag () {
    // this._root.style.transform = 'translate3d( ' + this.dragPoint.x +
    // 'px, ' + this.dragPoint.y + 'px, 0)';
    const transform = `translate3d(${this.dragPoint.x}px, ${this.dragPoint.y}px, 0)`
    this._root.style.transform = transform
    this._root.style.webKitTransform = transform
  }

  setLeftTop () {
    this._root.style.left = this.position.x + 'px'
    this._root.style.top = this.position.y + 'px'
  }

  onmousedown (e) {
    this.dragStart(e, e)
  }

  onmousemove (e) {
    this.dragMove(e, e)
  }

  onmouseup (e) {
    this.dragEnd(e, e)
  }

  ontouchstart (e) {
    const touch = e.changedTouches[0]
    this.dragStart(e, touch)
    this.touchIdentifier = touch.pointerId !== undefined
      ? touch.pointerId : touch.identifier
    e.preventDefault()
  }

  ontouchmove (e) {
    const touch = getTouch(e.changedTouches, this.touchIdentifier)
    if (touch) {
      this.dragMove(e, touch)
    }
  }

  ontouchend (e) {
    const touch = getTouch(e.changedTouches, this.touchIdentifier)
    if (touch) {
      this.dragEnd(e, touch)
    }
    e.preventDefault()
  }

  ontouchcancel (e) {
    const touch = getTouch(e.changedTouches, this.touchIdentifier)
    if (touch) {
      this.dragCancel(e, touch)
    }
  }

  dragStart (e, pointer) {
    if (!this._root || this.isDown || !this.isEnabled) {
      return
    }
    this.downPoint = pointer
    this.dragPoint.x = 0
    this.dragPoint.y = 0

    this._getPosition()

    const size = getSize(this._root)

    this.startPos.x = this.position.x
    this.startPos.y = this.position.y
    this.startPos.maxY = window.innerHeight - size.height
    this.startPos.maxX = window.innerWidth - size.width
    this.setLeftTop()

    this.isDown = true
    this._bindPostStartEvents(e)
  }

  dragRealStart (e, pointer) {
    this.isDragging = true
    this.animate()
    this.emit(EVENTS.START, this.startPos)
  }

  dragEnd (e, pointer) {
    if (!this._root) {
      return
    }
    this._unbindPostStartEvents()
    if (this.isDragging) {
      this._root.style.transform = ''
      this.setLeftTop()
      this.emit(EVENTS.ENDED)
    }
    this.presetInfo()
  }

  _dragPointerMove (e, pointer) {
    var moveVector = {
      x: pointer.pageX - this.downPoint.pageX,
      y: pointer.pageY - this.downPoint.pageY
    }
    // 检测是否有移动
    if (!this.isDragging && this.hasDragStarted(moveVector)) {
      this.dragRealStart(e, pointer)
    }
    return moveVector
  }

  dragMove (e, pointer) {
    e = e || window.event
    if (!this.isDown) {
      return
    }
    const {x, y} = this.startPos
    const moveVector = this._dragPointerMove(e, pointer)
    let dragX = moveVector.x
    let dragY = moveVector.y
    dragX = this.checkContain('x', dragX, x)
    dragY = this.checkContain('y', dragY, y)
    this.position.x = x + dragX
    this.position.y = y + dragY
    this.dragPoint.x = dragX
    this.dragPoint.y = dragY
    this.emit(EVENTS.MOVE, this.position)
  }

  dragCancel (e, pointer) {
    this.dragEnd(e, pointer)
  }

  presetInfo () {
    this.isDragging = false
    this.startPos = {
      x: 0,
      y: 0
    }
    this.dragPoint = {
      x: 0,
      y: 0
    }
    this.isDown = false
  }

  destroy () {
    this._unbindStartEvent()
    this._unbindPostStartEvents()
    if (this.isDragging) {
      this.dragEnd()
    }
    this._handlerDom = null
  }

  hasDragStarted (moveVector) {
    return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3
  };

  checkContain (axis, drag, grid) {
    if (drag + grid < 0) {
      return 0 - grid
    }

    if (axis === 'x' && drag + grid > this.startPos.maxX) {
      return this.startPos.maxX - grid
    }
    if (axis === 'y' && drag + grid > this.startPos.maxY) {
      return this.startPos.maxY - grid
    }
    return drag
  }

  _getPosition () {
    var style = window.getComputedStyle(this._root)
    var x = this._getPositionCoord(style.left, 'width')
    var y = this._getPositionCoord(style.top, 'height')
    // clean up 'auto' or other non-integer values
    this.position.x = isNaN(x) ? 0 : x
    this.position.y = isNaN(y) ? 0 : y

    this._addTransformPosition(style)
  }

  _addTransformPosition (style) {
    const transform = style.transform
    // bail out if value is 'none'
    if (transform.indexOf('matrix') !== 0) {
      return
    }
    // split matrix(1, 0, 0, 1, x, y)
    const matrixValues = transform.split(',')
    // translate X value is in 12th or 4th position
    const xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4
    const translateX = parseInt(matrixValues[ xIndex ], 10)
    // translate Y value is in 13th or 5th position
    const translateY = parseInt(matrixValues[ xIndex + 1 ], 10)
    this.position.x += translateX
    this.position.y += translateY
  }

  _getPositionCoord (styleSide, measure) {
    if (styleSide.indexOf('%') !== -1) {
      // convert percent into pixel for Safari, #75
      const parentSize = getSize(this._root.parentNode)
      // prevent not-in-DOM element throwing bug, #131
      return !parentSize ? 0
        : (parseFloat(styleSide) / 100) * parentSize[ measure ]
    }
    return parseInt(styleSide, 10)
  }
}
