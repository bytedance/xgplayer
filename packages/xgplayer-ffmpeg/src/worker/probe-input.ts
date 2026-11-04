import type { HTTPInput } from './http-input'

/** FFprobe sees a bounded prefix; FFmpeg then replays it before continuing HTTP. */
export class ProbeInput {
  static readonly limit = 64 * 1024
  private prefix: Uint8Array | null = new Uint8Array(ProbeInput.limit)
  private size = 0
  private offset = 0
  private probing = true

  constructor(private readonly input: HTTPInput) {}

  startTranscode(): void {
    this.probing = false
  }

  async read(buffer: Int8Array, offset: number, length: number): Promise<number> {
    if (!length) return 0
    const prefix = this.prefix
    if (this.probing) {
      const available = Math.min(length, ProbeInput.limit - this.size)
      if (!available) return 0
      const size = await this.input.read(buffer, offset, available)
      prefix?.set(buffer.subarray(offset, offset + size), this.size)
      this.size += size
      return size
    }
    if (prefix && this.offset < this.size) {
      const size = Math.min(length, this.size - this.offset)
      buffer.set(prefix.subarray(this.offset, this.offset + size), offset)
      this.offset += size
      if (this.offset === this.size) this.prefix = null
      return size
    }
    this.prefix = null
    return this.input.read(buffer, offset, length)
  }
}
