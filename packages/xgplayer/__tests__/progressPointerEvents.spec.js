jest.mock('../src/plugin', () => ({
  __esModule: true,
  default: class Plugin {},
  Events: { PLAYER_FOCUS: 'focus' },
  Util: {},
  POSITIONS: { CONTROLS_CENTER: 'controls-center' },
  Sniffer: { device: 'desktop' }
}))

import Progress from '../src/plugins/progress'

describe('progress pointer events', () => {
  const OriginalPointerEvent = window.PointerEvent

  afterEach(() => {
    window.PointerEvent = OriginalPointerEvent
  })

  test('uses pointerdown instead of compatibility mouse and touch starts', () => {
    window.PointerEvent = class PointerEvent {}
    const root = { addEventListener: jest.fn() }
    const playerRoot = { addEventListener: jest.fn() }
    const progress = {
      root,
      player: { config: {}, root: playerRoot },
      domEventType: 'mouse',
      onMouseDown: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseOver: jest.fn(),
      onMouseOut: jest.fn(),
      onBodyClick: jest.fn(),
      _mouseDownHandler: jest.fn(),
      _mouseUpHandler: jest.fn(),
      _mouseMoveHandler: jest.fn(),
      hook: jest.fn((_name, handler) => handler),
      bind: jest.fn(),
      _supportsPointerEvents: Progress.prototype._supportsPointerEvents
    }

    Progress.prototype.bindDomEvents.call(progress)

    expect(root.addEventListener).toHaveBeenCalledWith('pointerdown', progress.onMouseDown)
    expect(root.addEventListener).not.toHaveBeenCalledWith('touchstart', progress.onMouseDown)
    expect(progress.bind).not.toHaveBeenCalledWith('mousedown', progress.onMouseDown)
  })

  test('tracks the complete pointer drag lifecycle on the owner document', () => {
    const dragDocument = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }
    const progress = {
      _getRootDocument: () => dragDocument,
      onMouseMove: jest.fn(),
      onMouseUp: jest.fn()
    }

    Progress.prototype._addDragDocumentEvents.call(progress, 'pointerdown')

    expect(dragDocument.addEventListener.mock.calls).toEqual([
      ['pointermove', progress.onMouseMove, false],
      ['pointerup', progress.onMouseUp, false],
      ['pointercancel', progress.onMouseUp, false]
    ])

    Progress.prototype._removeDragDocumentEvents.call(progress)
    expect(dragDocument.removeEventListener.mock.calls).toEqual([
      ['pointermove', progress.onMouseMove, false],
      ['pointerup', progress.onMouseUp, false],
      ['pointercancel', progress.onMouseUp, false]
    ])
  })
})
