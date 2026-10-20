import type { AudioSample } from '../model/audio-sample'

/**
 * Opus documentation, https://opus-codec.org/docs/
 * Ogg Encapsulation for the Opus Audio Codec, https://datatracker.ietf.org/doc/html/rfc7845.html
 *
 * Packet Organization:
 *
 *      Page 0         Pages 1 ... n        Pages (n+1) ...
 *    +------------+ +---+ +---+ ... +---+ +-----------+ +---------+ +--
 *    |            | |   | |   |     |   | |           | |         | |
 *    |+----------+| |+-----------------+| |+-------------------+ +-----
 *    |||ID Header|| ||  Comment Header || ||Audio Data Packet 1| | ...
 *    |+----------+| |+-----------------+| |+-------------------+ +-----
 *    |            | |   | |   |     |   | |           | |         | |
 *    +------------+ +---+ +---+ ... +---+ +-----------+ +---------+ +--
 *    ^      ^                           ^
 *    |      |                           |
 *    |      |                           Mandatory Page Break
 *    |      |
 *    |      ID header is contained on a single page
 *    |
 *    'Beginning Of Stream'
 */
export interface OPUSHeader {
  outputGain: number
  sampleRate: number
  channelCount: number
  config: number[]
  codec: string
  originCodec: string
}

export class OPUS {
  static getFrameDuration(_samples: AudioSample[], _timescale = 1000): number {
    return 20
  }

  static parseHeaderPackets(data: Uint8Array): OPUSHeader | undefined {
    if (!data.length) return

    const dv = new DataView(data.buffer, data.byteOffset, data.byteLength)

    // Identification Header
    let magicSignature = ''
    for (let i = 0; i < 8; i++) {
      magicSignature += String.fromCodePoint(data[i])
    }
    if (magicSignature !== 'OpusHead') {
      throw new Error('Invalid Opus MagicSignature')
    }

    // skip version
    // data[8]

    const channelCount = data[9]

    const sampleRate = dv.getUint32(12, true)
    const outputGain = dv.getInt16(16, true)

    // const mappingFamily = dv.getUint8(18)

    // play as no audio track stream
    if (!sampleRate) return

    const codec = 'opus'
    const originCodec = 'opus'
    const config = Array.from(data.subarray(8))

    return {
      outputGain,
      sampleRate,
      channelCount,
      config,
      codec,
      originCodec
    }
  }
}
