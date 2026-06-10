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

  test('clears native AirPlay src before binding MSE source tags', () => {
    const media = document.createElement('video')
    media.src = 'https://cdn.example.com/native.m3u8'

    const airplaySource = document.createElement('source')
    airplaySource.src = 'https://cdn.example.com/airplay.m3u8'
    media.appendChild(airplaySource)

    const mse = new MSE(null, {
      useSourceTag: true,
      alternativeSource: {
        type: 'application/vnd.apple.mpegURL',
        src: 'https://cdn.example.com/main.m3u8'
      }
    })

    mse.bindMedia(media)

    const sources = Array.from(media.querySelectorAll('source')).map(
      source => source.src
    )

    expect(media.getAttribute('src')).toBe(null)
    expect(media.src).toBe('')
    expect(sources).toEqual([
      'blob:https://example.com/mse',
      'https://cdn.example.com/main.m3u8'
    ])
  })
})
