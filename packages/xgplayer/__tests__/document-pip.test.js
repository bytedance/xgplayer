jest.mock('../src/plugin', () => ({
  __esModule: true,
  default: class Plugin {
    constructor () {
      this.config = {}
    }
  },
  Events: {
    PIP_CHANGE: 'pip_change'
  },
  POSITIONS: {
    CONTROLS_CENTER: 'controlsCenter',
    CONTROLS_RIGHT: 'controlsRight'
  },
  Sniffer: {
    device: 'pc'
  },
  Util: {
    addClass: (el, className) => el.classList.add(className),
    removeClass: (el, className) => el.classList.remove(className),
    checkIsFunction: fn => typeof fn === 'function',
    event: e => {
      e._target = e.target
    },
    getEventPos: e => ({
      x: e.x,
      y: e.y,
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      pageX: e.pageX,
      pageY: e.pageY
    }),
    setTimeout: (ctx, callback) => callback.call(ctx),
    typeOf: value => Object.prototype.toString.call(value).slice(8, -1)
  }
}))

jest.mock('../src/plugins/common/iconPlugin', () => ({
  __esModule: true,
  default: class IconPlugin {}
}))

jest.mock('../src/plugins/common/iconTools', () => ({
  xgIconTips: () => ''
}))

import Progress from '../src/plugins/progress'
import PIP from '../src/plugins/pip'

function createProgressStub (ownerDocument = document) {
  const root = ownerDocument.createElement('div')
  const progressBtn = ownerDocument.createElement('div')
  root.appendChild(progressBtn)

  const progress = new Progress({})
  Object.assign(progress, {
    root,
    progressBtn,
    pos: {
      x: 0,
      y: 0,
      moving: false,
      isDown: false,
      isEnter: false,
      isLocked: false
    },
    _state: {
      time: 0,
      prePlayTime: 0
    },
    config: {
      closeMoveSeek: false,
      miniMoveStep: 5,
      miniStartStep: 2,
      onMoveStart: jest.fn(),
      onMoveEnd: jest.fn()
    },
    playerConfig: {
      allowSeekAfterEnded: false,
      isMobileSimulateMode: 'pc'
    },
    player: {
      zoom: 1,
      rotateDeg: 0,
      isMini: false,
      ended: false,
      duration: 100,
      currentTime: 0,
      isPlaying: true,
      config: {
        mediaType: 'video'
      },
      controls: {
        pauseAutoHide: jest.fn(),
        recoverAutoHide: jest.fn()
      },
      plugins: {},
      focus: jest.fn()
    },
    domEventType: 'mouse',
    unbind: jest.fn(),
    bind: jest.fn(),
    computeTime: jest.fn(() => ({
      currentTime: 10,
      seekTime: 10,
      percent: 0.1
    })),
    _mouseDownHandlerHook: jest.fn(),
    _mouseUpHandlerHook: jest.fn(),
    triggerCallbacks: jest.fn(),
    emitUserAction: jest.fn(),
    resetSeekState: jest.fn()
  })

  return progress
}

describe('Document Picture-in-Picture controls', () => {
  test('progress drag events are bound to the current owner document', () => {
    const pipDocument = document.implementation.createHTMLDocument('pip')
    const progress = createProgressStub(pipDocument)
    const pipDocumentAddEventListener = jest.spyOn(pipDocument, 'addEventListener')
    const documentAddEventListener = jest.spyOn(document, 'addEventListener')

    progress.onMouseDown({
      type: 'mousedown',
      clientX: 20,
      clientY: 0,
      x: 20,
      y: 0,
      offsetX: 20,
      offsetY: 0,
      pageX: 20,
      pageY: 0,
      stopPropagation: jest.fn()
    })

    expect(pipDocumentAddEventListener).toHaveBeenCalledWith('mousemove', progress.onMouseMove, false)
    expect(pipDocumentAddEventListener).toHaveBeenCalledWith('mouseup', progress.onMouseUp, false)
    expect(documentAddEventListener).not.toHaveBeenCalledWith('mousemove', progress.onMouseMove, false)
    expect(documentAddEventListener).not.toHaveBeenCalledWith('mouseup', progress.onMouseUp, false)
  })

  test('closing document picture-in-picture clears progress drag state before restoring the node', async () => {
    const pagehideListeners = []
    const pipDocument = document.implementation.createHTMLDocument('pip')
    const pipWindow = {
      document: pipDocument,
      addEventListener: jest.fn((type, listener) => {
        if (type === 'pagehide') {
          pagehideListeners.push(listener)
        }
      })
    }
    const originalDocumentPictureInPicture = window.documentPictureInPicture
    window.documentPictureInPicture = {
      requestWindow: jest.fn(() => Promise.resolve(pipWindow))
    }

    const pipRoot = document.createElement('div')
    const parentNode = document.createElement('div')
    parentNode.appendChild(pipRoot)
    const resetDragState = jest.fn()
    const pip = Object.create(PIP.prototype)
    Object.assign(pip, {
      config: {
        preferDocument: true
      },
      playerConfig: {},
      player: {
        root: pipRoot,
        media: {
          readyState: 4
        },
        plugins: {
          progress: {
            resetDragState
          }
        }
      },
      isPIPAvailable: () => true,
      isDocPIPAvailable: () => true,
      copyStyleIntoPiPWindow: jest.fn(),
      enterPIPCallback: jest.fn(),
      leavePIPCallback: jest.fn()
    })

    expect(pip.requestPIP()).toBe(true)
    await Promise.resolve()

    pagehideListeners[0]()

    expect(resetDragState).toHaveBeenCalled()
    expect(parentNode.contains(pipRoot)).toBe(true)

    window.documentPictureInPicture = originalDocumentPictureInPicture
  })

  test.each([
    ['https:', 'example.com', true],
    ['file:', '', true],
    ['http:', '127.0.0.1', true],
    ['http:', 'localhost', true],
    ['http:', 'example.com', false]
  ])('document picture-in-picture availability for %s//%s', (protocol, hostname, expected) => {
    const originalDocumentPictureInPicture = window.documentPictureInPicture
    window.documentPictureInPicture = {}
    const pip = Object.create(PIP.prototype)
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        protocol,
        hostname
      }
    })

    expect(pip.isDocPIPAvailable()).toBe(expected)

    window.documentPictureInPicture = originalDocumentPictureInPicture
  })
})
