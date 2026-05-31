import { resolveCastMedia } from '../src/platform/cast-media'

describe('resolveCastMedia', () => {
  test('uses curDefinition.url first', () => {
    const player = {
      curDefinition: { url: 'https://cdn.example.com/main.m3u8' },
      config: { url: 'https://fallback.example.com/video.mp4' },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)
    expect(result.url).toBe('https://cdn.example.com/main.m3u8')
    expect(result.contentType).toBe('application/x-mpegURL')
  })

  test('falls back to player.url', () => {
    const player = {
      curDefinition: null,
      url: 'https://cdn.example.com/video.mpd',
      config: { url: 'https://fallback.example.com/video.mp4' },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)
    expect(result.url).toBe('https://cdn.example.com/video.mpd')
    expect(result.contentType).toBe('application/dash+xml')
  })

  test('falls back to config.url', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/video.mp4' },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)
    expect(result.url).toBe('https://cdn.example.com/video.mp4')
    expect(result.contentType).toBe('video/mp4')
  })

  test('skips blob player.url and falls back to config.url', () => {
    const player = {
      curDefinition: null,
      url: 'blob:https://example.com/123',
      config: { url: 'https://cdn.example.com/main.m3u8' },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)
    expect(result.url).toBe('https://cdn.example.com/main.m3u8')
    expect(result.contentType).toBe('application/x-mpegURL')
  })

  test('rejects blob URL', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'blob:https://example.com/123' },
      preProcessUrl: (url) => ({ url })
    }

    expect(() => resolveCastMedia(player)).toThrow('got blob URL')
  })

  test('rejects mediastream URL', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'mediastream:https://example.com/stream' },
      preProcessUrl: (url) => ({ url })
    }

    expect(() => resolveCastMedia(player)).toThrow('got mediastream URL')
  })

  test('rejects missing URL', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: {},
      preProcessUrl: (url) => ({ url })
    }

    expect(() => resolveCastMedia(player)).toThrow('Cast requires a string media URL')
  })

  test('applies preProcessUrl transformation', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/video.mp4' },
      preProcessUrl: (url, opts) => ({
        url: url + '?token=abc'
      })
    }

    const result = resolveCastMedia(player)
    expect(result.url).toBe('https://cdn.example.com/video.mp4?token=abc')
  })

  test('uses explicit contentType from curDefinition for extensionless URLs', () => {
    const player = {
      curDefinition: {
        url: 'https://cdn.example.com/play?id=1',
        contentType: 'application/x-mpegURL'
      },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)

    expect(result.contentType).toBe('application/x-mpegURL')
  })

  test('uses source array type before falling back to URL extension', () => {
    const player = {
      curDefinition: null,
      url: 'blob:https://example.com/current',
      config: {
        url: [
          { src: 'blob:https://example.com/old', type: 'video/mp4' },
          { src: 'https://cdn.example.com/live', type: 'hls' }
        ]
      },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)

    expect(result.url).toBe('https://cdn.example.com/live')
    expect(result.contentType).toBe('application/x-mpegURL')
  })

  test('lets preProcessUrl override content type metadata', () => {
    const player = {
      curDefinition: {
        url: 'https://cdn.example.com/play',
        contentType: 'video/mp4'
      },
      preProcessUrl: (url) => ({
        url,
        mimeType: 'application/dash+xml'
      })
    }

    const result = resolveCastMedia(player)

    expect(result.contentType).toBe('application/dash+xml')
  })

  test('passes optional MediaInfo fields from preProcessUrl', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/main.m3u8' },
      preProcessUrl: (url) => ({
        url,
        hlsSegmentFormat: 'FMP4',
        hlsVideoSegmentFormat: 'FMP4',
        customData: { token: 'abc' }
      })
    }

    const result = resolveCastMedia(player)

    expect(result).toEqual(
      expect.objectContaining({
        hlsSegmentFormat: 'FMP4',
        hlsVideoSegmentFormat: 'FMP4',
        customData: { token: 'abc' }
      })
    )
  })

  test('throws if preProcessUrl returns non-object', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/video.mp4' },
      preProcessUrl: () => 'invalid'
    }

    expect(() => resolveCastMedia(player)).toThrow('preProcessUrl must return an object')
  })

  test('throws if preProcessUrl returns blob url', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/video.mp4' },
      preProcessUrl: () => ({ url: 'blob:https://example.com/123' })
    }

    expect(() => resolveCastMedia(player)).toThrow('got blob URL')
  })

  test('rejects data URL', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'data:video/mp4;base64,AAAA' },
      preProcessUrl: (url) => ({ url })
    }

    expect(() => resolveCastMedia(player)).toThrow('got data URL')
  })

  test('infers mp4 content type as default', () => {
    const player = {
      curDefinition: null,
      url: null,
      config: { url: 'https://cdn.example.com/video' },
      preProcessUrl: (url) => ({ url })
    }

    const result = resolveCastMedia(player)
    expect(result.contentType).toBe('video/mp4')
  })
})
