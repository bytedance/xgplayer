import { AUDIO_MIME, FLAC_MIME, createAudioProfile } from '../src/profiles/audio'

describe('native audio policy', () => {
  test('preserves source parameters and allows capability-driven FLAC copying', () => {
    expect(createAudioProfile()).toEqual({
      type: 'audio', mimeType: AUDIO_MIME, audio: { outputCodec: 'auto' }
    })
    expect(createAudioProfile({ outputCodec: 'flac' }).mimeType).toBe(FLAC_MIME)
  })

  test('copies options so a later caller mutation cannot change the policy', () => {
    const options = { sampleRate: 16000, channels: 1 }
    const profile = createAudioProfile(options)
    options.channels = 2
    expect(profile.audio.channels).toBe(1)
  })

  test.each([
    [{ inputFormat: 's16le' as const }, 'Raw audio requires'],
    [{ inputFormat: 'alaw' as const, inputSampleRate: 8000 }, 'Raw audio requires'],
    [{ inputFormat: 'invalid' as never, inputSampleRate: 8000, inputChannels: 1 }, 'Raw audio requires'],
    [{ inputChannels: NaN }, 'positive integers'],
    [{ inputSampleRate: -1 }, 'positive integers'],
    [{ channels: 9 }, 'at most eight channels'],
    [{ inputChannels: 9 }, 'at most eight channels'],
    [{ sampleRate: 12345 }, 'Unsupported AAC sample rate'],
    [{ bitrate: 1.5 }, 'positive integers'],
    [{ outputCodec: 'invalid' as never }, 'Unsupported output codec'],
    [{ outputCodec: 'flac' as const, channels: 1 }, 'cannot change encoding'],
    [{ outputCodec: 'flac' as const, bitrate: 64000 }, 'cannot change encoding']
  ] as const)('rejects unsupported or incomplete policy: %p', (options, message) => {
    expect(() => createAudioProfile(options)).toThrow(message)
  })

  test.each(['s16le', 's16be', 's8', 'u8', 'alaw', 'mulaw'] as const)(
    'retains explicit raw input parameters for %s', (inputFormat) => {
      expect(createAudioProfile({
        inputFormat, inputSampleRate: 8000, inputChannels: 1, outputCodec: 'aac'
      }).audio).toEqual({
        inputFormat, inputSampleRate: 8000, inputChannels: 1, outputCodec: 'aac'
      })
    }
  )

  test.each([{ sampleRate: 48000 }, { channels: 1 }])('FLAC cannot change encoding: %p', (option) => {
    expect(() => createAudioProfile({ outputCodec: 'flac', ...option })).toThrow('cannot change encoding')
  })
})
