import { getConfig } from '../src/mp4/config'
import util from '../src/util'

describe('MP4 config', () => {
  test('normalizes legacy aliases without overriding explicit new keys', () => {
    const media = document.createElement('video')
    const config = getConfig({
      media,
      retry: 1,
      retryCount: 5,
      tickInSeconds: 0.25
    })

    expect(config.media).toBe(media)
    expect(config.retry).toBe(5)
    expect(config.tickInterval).toBe(250)
    expect(config.maxBufferLength).toBe(40)
    expect(config.minBufferLength).toBe(5)
    expect(config.bufferBehind).toBe(10)
    expect(config.preferMMS).toBe(false)
    expect(config.mseAttachMode).toBe('auto')
  })

  test('keeps explicit tickInterval over the legacy seconds value', () => {
    const config = getConfig({
      tickInterval: 800,
      tickInSeconds: 0.1
    })

    expect(config.tickInterval).toBe(800)
  })
})

describe('MP4 util', () => {
  test('concatenates available audio and video buffers', () => {
    expect(
      util.concatData(new Uint8Array([1, 2]), new Uint8Array([3]))
    ).toEqual(new Uint8Array([1, 2, 3]))
    expect(util.concatData(undefined, new Uint8Array([4]))).toEqual(
      new Uint8Array([4])
    )
  })
})
