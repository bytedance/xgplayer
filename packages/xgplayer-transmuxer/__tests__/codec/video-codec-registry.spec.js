import {
  getVideoCodec,
  videoCodecRegistry
} from '../../src/codec/video-codec-registry'
import { registerVideoCodec, unregisterVideoCodec } from '../../src'

describe('VideoCodecRegistry', () => {
  afterEach(() => {
    unregisterVideoCodec('test-codec')
    unregisterVideoCodec('private-codec')
  })

  test('finds codecs by sample entry, config box, codec string, and codec type', () => {
    const codec = {
      id: 'test-codec',
      kind: 'video',
      codecType: 'test-video',
      sampleEntries: ['tst1'],
      configBoxes: ['tstC'],
      codecStringPrefixes: ['tst1.']
    }

    registerVideoCodec(codec)

    expect(getVideoCodec({ sampleEntry: 'tst1' })).toBe(codec)
    expect(getVideoCodec({ configBox: 'tstC' })).toBe(codec)
    expect(getVideoCodec({ codec: 'tst1.1.2' })).toBe(codec)
    expect(getVideoCodec({ codecType: 'test-video' })).toBe(codec)
  })

  test('replaces an existing codec with the same id', () => {
    registerVideoCodec({
      id: 'test-codec',
      kind: 'video',
      codecType: 'old-video',
      sampleEntries: ['old1']
    })
    const replacement = {
      id: 'test-codec',
      kind: 'video',
      codecType: 'new-video',
      sampleEntries: ['new1']
    }

    registerVideoCodec(replacement)

    expect(getVideoCodec({ sampleEntry: 'old1' })).toBeUndefined()
    expect(getVideoCodec({ sampleEntry: 'new1' })).toBe(replacement)
    expect(videoCodecRegistry.list().filter(codec => codec.id === 'test-codec')).toHaveLength(1)
  })

  test('registers standard VVC by default and keeps private sample entries opt-in', () => {
    expect(getVideoCodec({ sampleEntry: 'vvc1' })?.id).toBe('vvc')
    expect(getVideoCodec({ sampleEntry: 'vvi1' })?.id).toBe('vvc')
    expect(getVideoCodec({ configBox: 'vvcC' })?.id).toBe('vvc')
    expect(getVideoCodec({ sampleEntry: 'prv1' })).toBeUndefined()
    expect(getVideoCodec({ configBox: 'prvC' })).toBeUndefined()

    const privateCodec = {
      id: 'private-codec',
      kind: 'video',
      codecType: 'private-video',
      sampleEntries: ['prv1'],
      configBoxes: ['prvC'],
      codecStringPrefixes: ['prv1.']
    }
    registerVideoCodec(privateCodec)

    expect(getVideoCodec({ sampleEntry: 'prv1' })).toBe(privateCodec)
    expect(getVideoCodec({ configBox: 'prvC' })).toBe(privateCodec)
    expect(getVideoCodec({ codec: 'prv1.1.2' })).toBe(privateCodec)
  })
})
