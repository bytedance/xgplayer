import 'xgplayer-transmuxer'

declare global {
  const __VERSION__: string
}

declare module 'xgplayer-transmuxer' {
  interface MPEGHeader {
    bitRate: number
    channelCount: number
    channelMode: number
    frameLength: number
    layer: number
    paddingBit: number
    protectionBit: number
    sampleRate: number
    sampleRateIndex: number
    samplesPerFrame: number
    version: number
  }

  export const MPEG: {
    isHeader(data: Uint8Array, offset: number): boolean
    parseHeader(data: Uint8Array, offset: number): MPEGHeader | undefined
  }
}
