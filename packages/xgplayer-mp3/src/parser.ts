import { MPEG } from 'xgplayer-transmuxer'
import type {
  MP3Frame,
  MP3FrameHeader,
  MP3Metadata,
  MP3SeekPoint,
  MPEGVersion
} from './types'

const XING = 'Xing'
const INFO = 'Info'
const VBRI = 'VBRI'

export class MP3ParserError extends Error {
  constructor(
    readonly code: string,
    message: string
  ) {
    super(message)
    this.name = 'MP3ParserError'
  }
}

function readAscii(data: Uint8Array, offset: number, length: number): string {
  let value = ''
  for (let i = 0; i < length && offset + i < data.length; i++) {
    value += String.fromCharCode(data[offset + i])
  }
  return value
}

function readUint16(data: Uint8Array, offset: number): number {
  return (data[offset] << 8) | data[offset + 1]
}

function readUint32(data: Uint8Array, offset: number): number {
  return (
    data[offset] * 0x1000000 +
    (data[offset + 1] << 16) +
    (data[offset + 2] << 8) +
    data[offset + 3]
  )
}

function versionFromBits(version: number): MPEGVersion | undefined {
  if (version === 3) return 1
  if (version === 2) return 2
  if (version === 0) return 2.5
}

interface ID3Frame {
  complete: boolean
  size: number
}

function getID3v2Frame(data: Uint8Array, offset: number): ID3Frame | null {
  if (readAscii(data, offset, 3) !== 'ID3') return null
  if (offset + 10 > data.length) return { complete: false, size: 0 }

  const sizeBytes = data.subarray(offset + 6, offset + 10)
  if (sizeBytes.some((value) => value > 0x7f)) return null

  const payloadSize =
    (sizeBytes[0] << 21) | (sizeBytes[1] << 14) | (sizeBytes[2] << 7) | sizeBytes[3]
  const footerSize = data[offset + 5] & 0x10 ? 10 : 0
  const size = 10 + payloadSize + footerSize
  return { complete: offset + size <= data.length, size }
}

function skipMetadata(data: Uint8Array, offset: number): number | null {
  const id3 = getID3v2Frame(data, offset)
  if (id3) return id3.complete ? offset + id3.size : null
  if (readAscii(data, offset, 3) === 'TAG' && offset + 128 <= data.length) {
    return offset + 128
  }
  return offset
}

export function parseFrameHeader(
  data: Uint8Array,
  offset: number
): MP3FrameHeader | undefined {
  if (offset + 4 > data.length || !MPEG.isHeader(data, offset)) return

  const parsed = MPEG.parseHeader(data, offset)
  const version = parsed && versionFromBits(parsed.version)
  if (!parsed || !version || parsed.layer !== 1 || !parsed.frameLength) return

  return {
    bitRate: parsed.bitRate,
    channelCount: parsed.channelCount,
    channelMode: parsed.channelMode,
    frameLength: parsed.frameLength,
    layer: 3,
    paddingBit: parsed.paddingBit,
    protectionBit: parsed.protectionBit,
    sampleRate: parsed.sampleRate,
    sampleRateIndex: parsed.sampleRateIndex,
    samplesPerFrame: parsed.samplesPerFrame,
    version
  }
}

function headersMatch(left: MP3FrameHeader, right: MP3FrameHeader): boolean {
  return (
    left.version === right.version &&
    left.layer === right.layer &&
    left.sampleRate === right.sampleRate &&
    left.channelCount === right.channelCount
  )
}

export function findFirstFrameOffset(data: Uint8Array, start = 0): number | undefined {
  let offset = start
  while (offset + 4 <= data.length) {
    const metadataEnd = skipMetadata(data, offset)
    if (metadataEnd == null) return
    if (metadataEnd !== offset) {
      offset = metadataEnd
      continue
    }

    const header = parseFrameHeader(data, offset)
    if (!header || offset + header.frameLength > data.length) {
      offset++
      continue
    }

    let nextOffset = offset + header.frameLength
    const metadataAfterFrame = skipMetadata(data, nextOffset)
    if (metadataAfterFrame == null) return offset
    if (metadataAfterFrame !== nextOffset) nextOffset = metadataAfterFrame
    if (nextOffset + 4 > data.length) return offset

    const nextHeader = parseFrameHeader(data, nextOffset)
    if (nextHeader && headersMatch(header, nextHeader)) return offset
    offset++
  }
}

export function scanMP3Frames(data: Uint8Array, start = 0): MP3Frame[] {
  const frames: MP3Frame[] = []
  let offset = findFirstFrameOffset(data, start)
  if (offset == null) return frames

  while (offset + 4 <= data.length) {
    const metadataEnd = skipMetadata(data, offset)
    if (metadataEnd == null) break
    if (metadataEnd !== offset) {
      offset = metadataEnd
      continue
    }

    const header = parseFrameHeader(data, offset)
    if (!header) {
      offset++
      continue
    }
    if (offset + header.frameLength > data.length) break

    frames.push({
      offset,
      end: offset + header.frameLength,
      duration: header.samplesPerFrame / header.sampleRate,
      header
    })
    offset += header.frameLength
  }

  return frames
}

interface VBRHeader {
  byteCount?: number
  frameCount: number
  isVBR: boolean
  mode: 'xing' | 'vbri'
  seekPoints?: MP3SeekPoint[]
  toc?: Uint8Array
}

function parseXingHeader(data: Uint8Array, frame: MP3Frame): VBRHeader | undefined {
  const header = frame.header
  const crcSize = header.protectionBit ? 0 : 2
  const sideInfoSize =
    header.version === 1
      ? header.channelCount === 1
        ? 17
        : 32
      : header.channelCount === 1
        ? 9
        : 17
  const offset = frame.offset + 4 + crcSize + sideInfoSize
  const tag = readAscii(data, offset, 4)
  if (tag !== XING && tag !== INFO) return
  if (offset + 8 > data.length) return

  const flags = readUint32(data, offset + 4)
  let cursor = offset + 8
  let frameCount = 0
  let byteCount: number | undefined
  let toc: Uint8Array | undefined

  if (flags & 0x1) {
    if (cursor + 4 > data.length) return
    frameCount = readUint32(data, cursor)
    cursor += 4
  }
  if (flags & 0x2) {
    if (cursor + 4 > data.length) return
    byteCount = readUint32(data, cursor)
    cursor += 4
  }
  if (flags & 0x4) {
    if (cursor + 100 > data.length) return
    toc = new Uint8Array(data.subarray(cursor, cursor + 100))
  }
  if (!frameCount) return

  return {
    byteCount,
    frameCount,
    isVBR: tag === XING,
    mode: 'xing',
    toc
  }
}

function readVariableInteger(
  data: Uint8Array,
  offset: number,
  byteLength: number
): number {
  let value = 0
  for (let i = 0; i < byteLength; i++) value = value * 256 + data[offset + i]
  return value
}

function parseVBRIHeader(data: Uint8Array, frame: MP3Frame): VBRHeader | undefined {
  const offset = frame.offset + 36
  if (readAscii(data, offset, 4) !== VBRI || offset + 26 > data.length) return

  const byteCount = readUint32(data, offset + 10)
  const frameCount = readUint32(data, offset + 14)
  const entryCount = readUint16(data, offset + 18)
  const scale = readUint16(data, offset + 20)
  const entrySize = readUint16(data, offset + 22)
  const framesPerEntry = readUint16(data, offset + 24)
  const tableOffset = offset + 26
  const tableSize = entryCount * entrySize
  if (
    !frameCount ||
    !entryCount ||
    !scale ||
    !entrySize ||
    entrySize > 4 ||
    tableOffset + tableSize > data.length
  ) {
    return
  }

  const seekPoints: MP3SeekPoint[] = [{ time: 0, offset: 0 }]
  let accumulatedBytes = 0
  let accumulatedFrames = 0
  for (let i = 0; i < entryCount; i++) {
    accumulatedBytes +=
      readVariableInteger(data, tableOffset + i * entrySize, entrySize) * scale
    accumulatedFrames += framesPerEntry
    seekPoints.push({
      time: (accumulatedFrames * frame.header.samplesPerFrame) / frame.header.sampleRate,
      offset: accumulatedBytes
    })
  }

  return {
    byteCount,
    frameCount,
    isVBR: true,
    mode: 'vbri',
    seekPoints
  }
}

export function parseMP3Metadata(data: Uint8Array, fileSize: number): MP3Metadata {
  const frames = scanMP3Frames(data)
  const firstFrame = frames[0]
  if (!firstFrame) {
    throw new MP3ParserError('MP3_FRAME_NOT_FOUND', 'Cannot find an MP3 frame')
  }
  if (frames.length < 2 && data.length < fileSize) {
    throw new MP3ParserError(
      'MP3_PROBE_INCOMPLETE',
      'MP3 probe needs more data to validate the first frame'
    )
  }

  const vbr = parseXingHeader(data, firstFrame) || parseVBRIHeader(data, firstFrame)
  const dataSize = vbr?.byteCount || fileSize - firstFrame.offset
  let duration: number
  let bitRate: number
  let isVBR = vbr?.isVBR === true

  if (vbr) {
    if (vbr.mode === 'xing' && vbr.isVBR && !vbr.toc?.length) {
      throw new MP3ParserError(
        'MP3_VBR_INDEX_REQUIRED',
        'VBR Xing header requires a TOC for Range seeking'
      )
    }
    duration =
      (vbr.frameCount * firstFrame.header.samplesPerFrame) / firstFrame.header.sampleRate
    bitRate = duration > 0 ? (dataSize * 8) / duration : firstFrame.header.bitRate
  } else {
    const bitRates = new Set(frames.slice(0, 32).map((frame) => frame.header.bitRate))
    if (bitRates.size > 1) {
      throw new MP3ParserError(
        'MP3_VBR_INDEX_REQUIRED',
        'VBR MP3 requires a Xing, Info, or VBRI seek header'
      )
    }
    duration = (dataSize * 8) / firstFrame.header.bitRate
    bitRate = firstFrame.header.bitRate
    isVBR = false
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new MP3ParserError('MP3_DURATION_INVALID', 'Invalid MP3 duration')
  }

  return {
    fileSize,
    firstFrameOffset: firstFrame.offset,
    dataSize,
    duration,
    bitRate,
    sampleRate: firstFrame.header.sampleRate,
    channelCount: firstFrame.header.channelCount,
    version: firstFrame.header.version,
    layer: 3,
    samplesPerFrame: firstFrame.header.samplesPerFrame,
    frameDuration: firstFrame.duration,
    isVBR,
    seekMode: vbr?.mode || 'cbr',
    frameCount: vbr?.frameCount,
    xingToc: vbr?.toc,
    seekPoints: vbr?.seekPoints
  }
}

function interpolateSeekPoints(points: MP3SeekPoint[], time: number): number | undefined {
  for (let i = 1; i < points.length; i++) {
    const right = points[i]
    if (time > right.time) continue
    const left = points[i - 1]
    const duration = right.time - left.time
    const ratio = duration > 0 ? (time - left.time) / duration : 0
    return left.offset + (right.offset - left.offset) * ratio
  }
  return points[points.length - 1]?.offset
}

export function timeToByteOffset(metadata: MP3Metadata, time: number): number {
  const clampedTime = Math.max(0, Math.min(time, metadata.duration))
  let relativeOffset: number | undefined

  if (metadata.xingToc?.length) {
    const percent = (clampedTime / metadata.duration) * 100
    const index = Math.min(99, Math.floor(percent))
    const fraction = percent - index
    const left = metadata.xingToc[index]
    const right = index < 99 ? metadata.xingToc[index + 1] : 256
    relativeOffset = ((left + (right - left) * fraction) / 256) * metadata.dataSize
  } else if (metadata.seekPoints?.length) {
    relativeOffset = interpolateSeekPoints(metadata.seekPoints, clampedTime)
  }

  if (relativeOffset == null) {
    relativeOffset = (clampedTime / metadata.duration) * metadata.dataSize
  }

  return Math.min(
    metadata.fileSize - 1,
    metadata.firstFrameOffset + Math.max(0, Math.floor(relativeOffset))
  )
}
