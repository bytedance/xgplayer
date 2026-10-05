import { TextDecoder } from 'util'
import { UTF8 } from '../../src/utils'

describe('UTF8.decode', () => {
  // Encoder for the differential oracle. Packs the RAW unicode scalar into
  // canonical UTF-8. NOTE: the 4-byte form uses the raw 21-bit codepoint
  // directly (11110xxx 10xxxxxx 10xxxxxx 10xxxxxx) — it must NOT subtract
  // 0x10000; that is the UTF-16 surrogate-pair offset and would mis-pack the
  // astral plane (e.g. U+10000 -> F0 80 80 80 instead of F0 90 80 80).
  const encodeUtf8 = cp => {
    if (cp < 0x80) return [cp]
    if (cp < 0x800) return [0xc0 | (cp >> 6), 0x80 | (cp & 0x3f)]
    if (cp < 0x10000) return [0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f)]
    return [
      0xf0 | (cp >> 18),
      0x80 | ((cp >> 12) & 0x3f),
      0x80 | ((cp >> 6) & 0x3f),
      0x80 | (cp & 0x3f),
    ]
  }
  // Surrogate halves (U+D800..U+DFFF) are not encodable in UTF-8. U+FEFF is
  // skipped because the stream TextDecoder strips a leading BOM whereas this
  // length-prefixed decoder keeps it.
  const encodable = cp => !(cp >= 0xd800 && cp <= 0xdfff) && cp !== 0xfeff

  test('encoder packs canonical UTF-8 bytes (fixed vectors)', () => {
    expect(encodeUtf8(0x10000)).toEqual([0xf0, 0x90, 0x80, 0x80])
    expect(encodeUtf8(0x10ffff)).toEqual([0xf4, 0x8f, 0xbf, 0xbf])
    expect(encodeUtf8(0x4e2d)).toEqual([0xe4, 0xb8, 0xad])
    expect(encodeUtf8(0x80)).toEqual([0xc2, 0x80])
    for (let cp = 0xd800; cp <= 0xdfff; cp++) expect(encodable(cp)).toBe(false)
  })

  test('passes through ASCII', () => {
    expect(UTF8.decode(new Uint8Array([0x61, 0x62, 0x63]))).toBe('abc')
  })

  test('decodes the minimum 2-byte sequence U+0080', () => {
    // C2 80
    expect(UTF8.decode(new Uint8Array([0xc2, 0x80]))).toBe('\u0080')
  })

  test('decodes BMP characters from 3-byte sequences', () => {
    // E4 B8 AD = U+4E2D (中)
    expect(UTF8.decode(new Uint8Array([0xe4, 0xb8, 0xad]))).toBe('\u4e2d')
  })

  test('decodes the minimum 4-byte sequence U+10000 (astral plane)', () => {
    // F0 90 80 80 is the canonical encoding of U+10000, matching the
    // WHATWG Encoding Standard UTF-8 decoder. It must not be rejected as
    // an overlong sequence.
    const decoded = UTF8.decode(new Uint8Array([0xf0, 0x90, 0x80, 0x80]))
    expect(decoded).toBe('\u{10000}')
    expect(decoded).toHaveLength(2) // surrogate pair
    expect(decoded.codePointAt(0)).toBe(0x10000)
  })

  test('decodes the maximum 4-byte sequence U+10FFFF', () => {
    // F4 8F BF BF
    const decoded = UTF8.decode(new Uint8Array([0xf4, 0x8f, 0xbf, 0xbf]))
    expect(decoded).toBe('\u{10ffff}')
    expect(decoded.codePointAt(0)).toBe(0x10ffff)
  })

  test('decodes another astral codepoint above the boundary', () => {
    // F0 A0 80 80 = U+20000
    expect(UTF8.decode(new Uint8Array([0xf0, 0xa0, 0x80, 0x80]))).toBe('\u{20000}')
  })

  test('rejects overlong 2-byte encodings of ASCII', () => {
    // C0 80 overlong-encodes U+0000
    const decoded = UTF8.decode(new Uint8Array([0xc0, 0x80]))
    expect([...decoded].every(c => c.codePointAt(0) === 0xfffd)).toBe(true)
  })

  test('rejects encoded surrogate code points (U+D800..U+DFFF)', () => {
    // ED A0 80 encodes U+D800, a surrogate
    const decoded = UTF8.decode(new Uint8Array([0xed, 0xa0, 0x80]))
    expect(decoded.includes('\ufffd')).toBe(true)
    expect(decoded).not.toBe('\ud800')
  })

  test('rejects overlong 4-byte encodings of BMP codepoints', () => {
    // F0 80 80 80 overlong-encodes U+0000
    const decoded = UTF8.decode(new Uint8Array([0xf0, 0x80, 0x80, 0x80]))
    expect([...decoded].every(c => c.codePointAt(0) === 0xfffd)).toBe(true)
  })

  test('rejects codepoints above U+10FFFF', () => {
    // F4 90 80 80 would encode U+110000
    const decoded = UTF8.decode(new Uint8Array([0xf4, 0x90, 0x80, 0x80]))
    expect(decoded.includes('\ufffd')).toBe(true)
  })

  test('replaces a truncated trailing sequence', () => {
    // lead byte for U+4E2D missing its continuation bytes
    const decoded = UTF8.decode(new Uint8Array([0xe4, 0xb8]))
    expect(decoded[0]).toBe('\ufffd')
  })

  test('replaces an invalid continuation byte', () => {
    // C3 followed by a non-continuation byte
    const decoded = UTF8.decode(new Uint8Array([0xc3, 0x41]))
    expect(decoded.includes('\ufffd')).toBe(true)
    expect(decoded[decoded.length - 1]).toBe('A')
  })

  test('matches the WHATWG TextDecoder for boundary and sampled codepoints', () => {
    const td = new TextDecoder('utf-8')
    const check = cp => {
      const bytes = new Uint8Array(encodeUtf8(cp))
      expect(UTF8.decode(bytes)).toBe(td.decode(bytes))
    }
    // Exhaustively probe just around each sequence-length boundary, where
    // off-by-one errors live: 0x7F/0x80/0x81, 0x7FF/0x800/0x801,
    // the surrogate edge 0xD7FF..0xE000, and the astral boundary
    // 0xFFFF/0x10000/0x10001 up to 0x10FFFF.
    const windows = [
      [0x7e, 0x82], [0x7fe, 0x802], [0xd7fd, 0xe001],
      [0xfffe, 0x10002], [0x10ff00, 0x10ffff],
    ]
    for (const [lo, hi] of windows) {
      for (let cp = lo; cp <= hi; cp++) {
        if (encodable(cp)) check(cp)
      }
    }
    // Deterministic wide sample across the whole range (mulberry32 PRNG).
    let seed = 0x1f2e3d4c
    const rand = () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    for (let i = 0; i < 50000; i++) {
      const cp = Math.floor(rand() * 0x110000)
      if (encodable(cp)) check(cp)
    }
  })
})
