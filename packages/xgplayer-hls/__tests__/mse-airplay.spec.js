import { MSE } from '../../xgplayer-streaming-shared/src/mse'

describe('MSE AirPlay handoff restore', () => {
  const originalMediaSource = window.MediaSource
  const originalCreateObjectURL = URL.createObjectURL
  const originalRevokeObjectURL = URL.revokeObjectURL
  const originalWebKitPlaybackTargetAvailabilityEvent =
    window.WebKitPlaybackTargetAvailabilityEvent

  beforeEach(() => {
    class FakeMediaSource {
      static isTypeSupported() {
        return true
      }

      addEventListener() {}

      removeEventListener() {}
    }

    window.MediaSource = FakeMediaSource
    URL.createObjectURL = jest.fn(() => 'blob:https://example.com/mse')
    URL.revokeObjectURL = jest.fn()
    delete window.WebKitPlaybackTargetAvailabilityEvent
  })

  afterEach(() => {
    window.MediaSource = originalMediaSource
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
    if (originalWebKitPlaybackTargetAvailabilityEvent === undefined) {
      delete window.WebKitPlaybackTargetAvailabilityEvent
    } else {
      window.WebKitPlaybackTargetAvailabilityEvent =
        originalWebKitPlaybackTargetAvailabilityEvent
    }
  })

  test('auto keeps non-AirPlay MSE attached through media src', async () => {
    const media = document.createElement('video')
    const mse = new MSE(null, {
      attachMode: 'auto'
    })

    mse.bindMedia(media)

    expect(media.getAttribute('src')).toBe('blob:https://example.com/mse')
    expect(media.querySelectorAll('source')).toHaveLength(0)

    await mse.unbindMedia()
  })

  test('auto uses source element for AirPlay-capable WebKit MSE', async () => {
    window.WebKitPlaybackTargetAvailabilityEvent =
      function WebKitPlaybackTargetAvailabilityEvent() {}
    const media = document.createElement('video')
    media.webkitShowPlaybackTargetPicker = jest.fn()

    const mse = new MSE(null, {
      attachMode: 'auto'
    })

    mse.bindMedia(media)

    const sources = Array.from(media.querySelectorAll('source'))

    expect(media.getAttribute('src')).toBe(null)
    expect(media.src).toBe('')
    expect(sources.map(source => source.src)).toEqual([
      'blob:https://example.com/mse'
    ])

    await mse.unbindMedia()
  })

  test('binds owned MSE source element without removing cast fallback source', () => {
    const media = document.createElement('video')
    media.src = 'https://cdn.example.com/native.m3u8'

    const airplaySource = document.createElement('source')
    airplaySource.src = 'https://cdn.example.com/airplay.m3u8'
    airplaySource.setAttribute('data-xgplayer-cast-airplay', 'true')
    media.appendChild(airplaySource)

    const mse = new MSE(null, {
      attachMode: 'source-element'
    })

    mse.bindMedia(media)

    const sources = Array.from(media.querySelectorAll('source'))

    expect(media.getAttribute('src')).toBe(null)
    expect(media.src).toBe('')
    expect(sources.map(source => source.src)).toEqual([
      'blob:https://example.com/mse',
      'https://cdn.example.com/airplay.m3u8'
    ])
    expect(sources[0].getAttributeNames()).toEqual(['type', 'src'])
    expect(sources[1].getAttribute('data-xgplayer-cast-airplay')).toBe('true')
  })

  test('unbind only removes the owned MSE source element', async () => {
    const media = document.createElement('video')
    const airplaySource = document.createElement('source')
    airplaySource.src = 'https://cdn.example.com/airplay.m3u8'
    airplaySource.setAttribute('data-xgplayer-cast-airplay', 'true')
    media.appendChild(airplaySource)

    const mse = new MSE(null, {
      attachMode: 'source-element'
    })

    mse.bindMedia(media)
    await mse.unbindMedia()

    const sources = Array.from(media.querySelectorAll('source')).map(
      source => source.src
    )

    expect(sources).toEqual(['https://cdn.example.com/airplay.m3u8'])
    expect(media.querySelectorAll('source')).toHaveLength(1)
  })
})
