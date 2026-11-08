import { MSE } from '../src/mse'

describe('MSE ManagedSourceBuffer events', () => {
  const originalMediaSource = window.MediaSource
  const originalManagedMediaSource = self.ManagedMediaSource
  const originalTimeRanges = window.TimeRanges
  const originalCreateObjectURL = URL.createObjectURL
  const originalRevokeObjectURL = URL.revokeObjectURL

  class FakeSourceBuffer extends EventTarget {}

  class FakeManagedMediaSource extends EventTarget {
    static isTypeSupported() {
      return true
    }

    readyState = 'open'
    streaming = true
    sourceBuffer = new FakeSourceBuffer()

    get [Symbol.toStringTag]() {
      return 'ManagedMediaSource'
    }

    addSourceBuffer() {
      return this.sourceBuffer
    }

    removeSourceBuffer() {}

    endOfStream() {}
  }

  function createRanges(ranges) {
    const buffered = Object.create(TimeRanges.prototype)
    Object.defineProperties(buffered, {
      length: { value: ranges.length },
      start: { value: (index) => ranges[index].start },
      end: { value: (index) => ranges[index].end }
    })
    return buffered
  }

  function setMediaSources() {
    Object.defineProperty(window, 'MediaSource', {
      configurable: true,
      writable: true,
      value: undefined
    })
    Object.defineProperty(self, 'ManagedMediaSource', {
      configurable: true,
      writable: true,
      value: FakeManagedMediaSource
    })
    URL.createObjectURL = jest.fn(() => 'blob:https://example.com/mms')
    URL.revokeObjectURL = jest.fn()
    // jsdom has no TimeRanges constructor; keep the product's runtime check.
    if (!originalTimeRanges) window.TimeRanges = class TimeRanges {}
  }

  function restoreMediaSources() {
    if (originalMediaSource === undefined) {
      delete window.MediaSource
    } else {
      window.MediaSource = originalMediaSource
    }
    if (originalManagedMediaSource === undefined) {
      delete self.ManagedMediaSource
    } else {
      self.ManagedMediaSource = originalManagedMediaSource
    }
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
    if (!originalTimeRanges) delete window.TimeRanges
  }

  beforeEach(setMediaSources)
  afterEach(restoreMediaSources)

  test('dispatches MSE event for ManagedSourceBuffer bufferedchange', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const onBufferedChange = jest.fn()
    const mse = new MSE(null, {
      preferMMS: true
    })

    mse.on(MSE.BUFFERED_CHANGE, onBufferedChange)
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4; codecs="avc1.42E01E"')

    const event = new Event('bufferedchange')
    Object.defineProperties(event, {
      addedRanges: {
        value: createRanges([{ start: 10, end: 12 }])
      },
      removedRanges: {
        value: createRanges([{ start: 0, end: 2 }])
      }
    })
    mse.mediaSource.sourceBuffer.dispatchEvent(event)

    expect(onBufferedChange).toHaveBeenCalledWith({
      target: mse,
      type: MSE.VIDEO,
      event,
      addedRanges: [{ start: 10, end: 12 }],
      removedRanges: [{ start: 0, end: 2 }]
    })

    await mse.unbindMedia()
  })

  test('removes the bufferedchange listener when media is unbound', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const mse = new MSE(null, { preferMMS: true })
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')
    const sourceBuffer = mse.getSourceBuffer(MSE.VIDEO)
    const removeListener = jest.spyOn(sourceBuffer, 'removeEventListener')
    const onBufferedChange = jest.fn()
    mse.on(MSE.BUFFERED_CHANGE, onBufferedChange)

    await mse.unbindMedia()

    expect(removeListener).toHaveBeenCalledWith('bufferedchange', expect.any(Function))
    sourceBuffer.dispatchEvent(new Event('bufferedchange'))
    expect(onBufferedChange).not.toHaveBeenCalled()

    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')
    sourceBuffer.dispatchEvent(new Event('bufferedchange'))
    expect(onBufferedChange).not.toHaveBeenCalled()
    mse.getSourceBuffer(MSE.VIDEO).dispatchEvent(new Event('bufferedchange'))
    expect(onBufferedChange).toHaveBeenCalledTimes(1)
    expect(mse.listenerCount(MSE.BUFFERED_CHANGE)).toBe(1)
    await mse.unbindMedia()
  })

  test('ignores range-shaped objects that are not TimeRanges', async () => {
    const mse = new MSE(null, { preferMMS: true })
    const media = document.createElement('video')
    media.load = jest.fn()
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')
    const onBufferedChange = jest.fn()
    mse.on(MSE.BUFFERED_CHANGE, onBufferedChange)
    const start = jest.fn(() => 0)
    const end = jest.fn(() => 10)
    const event = new Event('bufferedchange')
    Object.defineProperty(event, 'removedRanges', {
      value: { length: 1, start, end }
    })

    mse.getSourceBuffer(MSE.VIDEO).dispatchEvent(event)

    expect(onBufferedChange.mock.calls[0][0].removedRanges).toEqual([])
    expect(start).not.toHaveBeenCalled()
    expect(end).not.toHaveBeenCalled()
    await mse.unbindMedia()
  })

  test('does not subscribe to bufferedchange for a regular MediaSource', async () => {
    class FakeMediaSource extends FakeManagedMediaSource {
      get [Symbol.toStringTag]() {
        return 'MediaSource'
      }
    }
    window.MediaSource = FakeMediaSource
    const mse = new MSE(null, { preferMMS: false })
    const media = document.createElement('video')
    media.load = jest.fn()
    mse.bindMedia(media)
    const sourceBuffer = mse.mediaSource.sourceBuffer
    const addListener = jest.spyOn(sourceBuffer, 'addEventListener')
    const onBufferedChange = jest.fn()
    mse.on(MSE.BUFFERED_CHANGE, onBufferedChange)

    mse.createSource(MSE.VIDEO, 'video/mp4')
    expect(addListener.mock.calls.map(([type]) => type)).toEqual(['updateend', 'error'])
    sourceBuffer.dispatchEvent(new Event('bufferedchange'))
    expect(onBufferedChange).not.toHaveBeenCalled()
    await mse.unbindMedia()
  })

  test('notifies multiple listeners and supports independent unsubscribe', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const mse = new MSE(null, { preferMMS: true })
    const firstListener = jest.fn()
    const secondListener = jest.fn()
    mse.on(MSE.BUFFERED_CHANGE, firstListener)
    mse.on(MSE.BUFFERED_CHANGE, secondListener)
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')

    const sourceBuffer = mse.getSourceBuffer(MSE.VIDEO)
    sourceBuffer.dispatchEvent(new Event('bufferedchange'))
    expect(firstListener).toHaveBeenCalledTimes(1)
    expect(secondListener).toHaveBeenCalledTimes(1)

    mse.off(MSE.BUFFERED_CHANGE, firstListener)
    sourceBuffer.dispatchEvent(new Event('bufferedchange'))
    expect(firstListener).toHaveBeenCalledTimes(1)
    expect(secondListener).toHaveBeenCalledTimes(2)
    await mse.unbindMedia()
  })

  test('does not enqueue setTimeoffset without a source buffer', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const mse = new MSE(null, { preferMMS: true })
    mse.bindMedia(media)

    await expect(mse.setTimeoffset(MSE.VIDEO, 1)).resolves.toBeUndefined()
    expect(mse.hasOpTasks).toBe(false)
    await mse.unbindMedia()
  })

  test('ignores a non-function operation callback', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const mse = new MSE(null, { preferMMS: true })
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')
    const sourceBuffer = mse.getSourceBuffer(MSE.VIDEO)
    sourceBuffer.appendBuffer = jest.fn()

    const append = mse.append(MSE.VIDEO, new Uint8Array([1]), {
      callback: 'invalid'
    })
    sourceBuffer.dispatchEvent(new Event('updateend'))

    await expect(append).resolves.toEqual(expect.objectContaining({
      name: 'appendBuffer'
    }))
    expect(mse.hasOpTasks).toBe(false)
    await mse.unbindMedia()
  })

  test('recognizes a source buffer full error by message', async () => {
    const media = document.createElement('video')
    media.load = jest.fn()
    const mse = new MSE(null, { preferMMS: true })
    mse.bindMedia(media)
    mse.createSource(MSE.VIDEO, 'video/mp4')
    const sourceBuffer = mse.getSourceBuffer(MSE.VIDEO)
    sourceBuffer.appendBuffer = jest.fn(() => {
      throw { message: 'SourceBuffer is full' }
    })

    await expect(
      mse.append(MSE.VIDEO, new Uint8Array([1]))
    ).rejects.toBeDefined()
    expect(mse.isFull(MSE.VIDEO)).toBe(true)
    await mse.unbindMedia()
  })
})
