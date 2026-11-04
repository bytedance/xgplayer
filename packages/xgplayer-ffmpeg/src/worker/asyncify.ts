export interface AsyncifyCore {
  asm: {
    asyncify_get_state(): number
    asyncify_start_unwind(stack: number): void
    asyncify_stop_unwind(): void
    asyncify_start_rewind(stack: number): void
    asyncify_stop_rewind(): void
  }
  HEAPU32: Uint32Array
  DEFAULT_ARGS: string[]
  DEFAULT_ARGS_FFPROBE: string[]
  ret: number
  _malloc(size: number): number
  stringsToPtr(args: string[]): number
  /** Prepared glue returns true only after the native exit code is recorded. */
  streamExec(argc: number, argv: number): boolean
  /** FFprobe returns its exit code normally, including after an Asyncify rewind. */
  streamProbe(argc: number, argv: number): boolean
}

/** Suspend synchronous WASM I/O while the Worker's event loop handles fetch/ACK. */
export class AsyncifyRunner {
  private readonly stack: number
  private pending: Promise<number> | null = null
  private result = 0

  constructor(private readonly core: AsyncifyCore) {
    if (!core.asm?.asyncify_get_state || !core.streamExec || !core.streamProbe) {
      throw new Error('FFmpeg core must be prepared with Asyncify streaming I/O')
    }
    const size = 64 * 1024
    this.stack = core._malloc(size + 8)
    if (!this.stack) throw new Error('Cannot allocate the Asyncify stack')
    core.HEAPU32[this.stack >> 2] = this.stack + 8
    core.HEAPU32[(this.stack + 4) >> 2] = this.stack + 8 + size
  }

  suspend(operation: () => Promise<number>): number {
    const hooks = this.core.asm
    if (hooks.asyncify_get_state() === 2) {
      hooks.asyncify_stop_rewind()
      return this.result
    }
    this.pending = operation()
    hooks.asyncify_start_unwind(this.stack)
    return 0
  }

  async execute(
    args: string[],
    mode: 'transcode' | 'probe' = 'transcode'
  ): Promise<void> {
    const core = this.core
    const hooks = core.asm
    core.ret = -1
    const defaults = mode === 'probe' ? core.DEFAULT_ARGS_FFPROBE : core.DEFAULT_ARGS
    const execute = mode === 'probe' ? core.streamProbe : core.streamExec
    const command = [...defaults, ...args]
    const argv = core.stringsToPtr(command)
    // Probe and transcode share this core; terminating its Worker frees allocations.
    while (true) {
      if (execute.call(core, command.length, argv)) break
      if (hooks.asyncify_get_state() !== 1)
        throw new Error('Native command stopped without an exit code or suspended I/O')
      hooks.asyncify_stop_unwind()
      if (!this.pending) throw new Error('Asyncify suspended without an I/O operation')
      this.result = await this.pending
      this.pending = null
      hooks.asyncify_start_rewind(this.stack)
    }
  }
}
