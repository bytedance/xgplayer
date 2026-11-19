export type BufferRange = [start: number, end: number]

export interface BufferInfo {
  start: number
  end: number
  buffers: BufferRange[]
  remaining: number
  index?: number
  nextStart?: number
  nextEnd?: number
  prevStart?: number
  prevEnd?: number
  currentTime?: number
  behind?: number
  length?: number
}

export class Buffer {
  static start(buf?: TimeRanges | null): number {
    if (!buf || !buf.length) return 0

    // Safari bug: https://bit.ly/2trx6O8
    if (buf.length === 1 && buf.end(0) - buf.start(0) < 1e-6) return 0
    // Edge bug: https://bit.ly/2JYLPeB
    if (buf.length === 1 && buf.start(0) < 0) return 0

    return buf.start(0)
  }

  static end(buf?: TimeRanges | null): number {
    if (!buf || !buf.length) return 0

    // Safari bug: https://bit.ly/2trx6O8
    if (buf.length === 1 && buf.end(0) - buf.start(0) < 1e-6) return 0

    return buf.end(buf.length - 1)
  }

  static get(source?: { buffered?: TimeRanges } | null): TimeRanges | undefined {
    if (!source) return
    try {
      return source.buffered
    } catch {
      // ignore
    }
  }

  static buffers(buf?: TimeRanges | null, maxHole = 0): BufferRange[] {
    if (!buf || !buf.length) return []

    const buffers: BufferRange[] = []
    for (let i = 0, l = buf.length; i < l; i++) {
      const bufLen = buffers.length
      if (!bufLen || !maxHole) {
        buffers.push([buf.start(i), buf.end(i)])
      } else {
        const last = buffers[bufLen - 1]
        const lastEnd = last[1]
        const start = buf.start(i)
        if (start - lastEnd <= maxHole) {
          const end = buf.end(i)
          if (end > lastEnd) {
            last[1] = end
          }
        } else {
          buffers.push([buf.start(i), buf.end(i)])
        }
      }
    }
    return buffers
  }

  static totalLength(buffers?: BufferRange[] | null): number {
    if (!buffers || !buffers.length) return 0
    return buffers.reduce((a, c) => (a += c[1] - c[0]), 0)
  }

  static info(buf?: TimeRanges | null, pos = 0, maxHole = 0): BufferInfo {
    if (!buf || !buf.length) {
      return { start: 0, end: 0, buffers: [], remaining: 0 }
    }

    let start = 0
    let end = 0
    let index = 0
    let nextStart = 0
    let nextEnd = 0
    let prevStart = 0
    let prevEnd = 0
    const buffers = Buffer.buffers(buf, maxHole)

    for (let i = 0, l = buffers.length; i < l; i++) {
      const item = buffers[i]
      if (pos + maxHole >= item[0] && pos <= item[1]) {
        start = item[0]
        end = item[1]
        index = i
      } else if (pos + maxHole < item[0]) {
        nextStart = item[0]
        nextEnd = item[1]
        break
      } else if (pos + maxHole > item[1]) {
        prevStart = item[0]
        prevEnd = item[1]
      }
    }

    return {
      start,
      end,
      index,
      buffers,
      nextStart,
      nextEnd,
      prevStart,
      prevEnd,
      currentTime: pos,
      behind: pos - start,
      remaining: end ? end - pos : 0,
      length: Buffer.totalLength(buffers)
    }
  }

  static isBuffered(media: HTMLMediaElement | null | undefined, pos: number): boolean {
    if (media) {
      const buffered = Buffer.get(media)

      if (buffered?.length) {
        for (let i = 0; i < buffered.length; i++) {
          if (pos >= buffered.start(i) && pos <= buffered.end(i)) {
            return true
          }
        }
      }
    }
    return false
  }
}
