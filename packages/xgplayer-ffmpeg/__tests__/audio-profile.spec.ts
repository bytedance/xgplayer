import { AUDIO_MIME, createAudioProfile } from '../src/profiles/audio'

describe('AAC audio encoding profile', () => {
  test('keeps audio policy separate from transport and MSE', () => {
    expect(createAudioProfile()).toMatchObject({
      type: 'audio', mimeType: AUDIO_MIME, inputArguments: [],
      outputArguments: expect.arrayContaining(['-map', '0:a:0', '-c:a', 'aac', '-vn'])
    })
  })

  test.each([
    { inputFormat: 's16le' as const },
    { inputFormat: 'alaw' as const, inputSampleRate: 8000 },
    { inputChannels: NaN },
    { inputSampleRate: -1 }
  ])('rejects incomplete or invalid raw audio parameters: %p', (options) => {
    expect(() => createAudioProfile(options)).toThrow()
  })
})
