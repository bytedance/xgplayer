import { MSE } from '../../xgplayer-streaming-shared/src/mse'

describe('MSE AirPlay handoff restore', () => {
  const originalMediaSource = window.MediaSource
  const originalCreateObjectURL = URL.createObjectURL
  const originalRevokeObjectURL = URL.revokeObjectURL

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
  })

  afterEach(() => {
    window.MediaSource = originalMediaSource
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
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
