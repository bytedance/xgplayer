/** All retained source bytes, including format indexes, share one LRU budget. */
export class BlockCache {
  private readonly blocks = new Map<number, Uint8Array<ArrayBuffer>>()
  private bytes = 0

  constructor(readonly limit: number) {}

  get size(): number {
    return this.bytes
  }

  get(offset: number): Uint8Array<ArrayBuffer> | undefined {
    const block = this.blocks.get(offset)
    if (block) {
      this.blocks.delete(offset)
      this.blocks.set(offset, block)
    }
    return block
  }

  set(offset: number, block: Uint8Array<ArrayBuffer>): void {
    const previous = this.blocks.get(offset)
    if (previous) this.bytes -= previous.byteLength
    this.blocks.delete(offset)
    if (block.byteLength > this.limit) return
    this.blocks.set(offset, block)
    this.bytes += block.byteLength
    while (this.bytes > this.limit) {
      const first = this.blocks.entries().next().value
      if (!first) break
      this.blocks.delete(first[0])
      this.bytes -= first[1].byteLength
    }
  }

  clear(): void {
    this.blocks.clear()
    this.bytes = 0
  }
}
