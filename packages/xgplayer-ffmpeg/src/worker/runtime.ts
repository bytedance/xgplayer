import type { WorkerCommand, WorkerEvent, WorkerRequest } from '../transcoder/protocol'
import { FFmpegError } from '../types'
import { type CoreFactory, type FFmpegCore, loadCore } from './core'
import { NativePipeline } from './pipeline'

/** A module survives source changes. Only native entry commands use the serial queue. */
export class StreamingWorker {
  private core: FFmpegCore | null = null
  private loading: Promise<FFmpegCore> | null = null
  private readonly pipeline = new NativePipeline(() => {
    if (!this.core) throw new FFmpegError('runtime', 'Native core is not loaded')
    return this.core
  })
  private epoch = 0
  private controller = new AbortController()
  private tail: Promise<void> = Promise.resolve()

  constructor(
    private readonly post: (event: WorkerEvent, transfer?: Transferable[]) => void,
    private readonly factory?: CoreFactory
  ) {}

  receive(request: WorkerRequest): Promise<void> {
    if (request.epoch > this.epoch) {
      this.epoch = request.epoch
      this.controller.abort()
      this.controller = new AbortController()
    }
    if (request.type === 'cancel') return Promise.resolve()
    const execute = async (): Promise<void> => {
      if (request.epoch !== this.epoch) return
      await this.execute(request, this.controller.signal)
    }
    const result = this.tail.then(execute)
    this.tail = result.catch(() => undefined)
    return result
  }

  private async execute(request: WorkerCommand, signal: AbortSignal): Promise<void> {
    const identity = { id: request.id, epoch: request.epoch }
    try {
      switch (request.type) {
        case 'open': {
          this.loading ??= loadCore(
            request.ffmpeg,
            {
              readSource: (offset, destination, length) =>
                this.pipeline.read(offset, destination, length),
              isInterrupted: () => this.pipeline.interrupted()
            },
            this.factory
          )
          this.core = await this.loading
          if (signal.aborted) return
          const metadata = await this.pipeline.open(request, signal)
          this.post({ ...identity, type: 'opened', metadata })
          return
        }
        case 'seek':
          await this.pipeline.seek(request.time, signal)
          break
        case 'pull': {
          const output = await this.pipeline.pull(signal)
          const progress = this.pipeline.progress
          progress.inputEnded = output.kind === 'eof'
          this.post(
            { ...identity, type: 'output', output, progress },
            'data' in output ? [output.data.buffer] : undefined
          )
          return
        }
        case 'close':
          this.pipeline.close()
          break
      }
      this.post({ ...identity, type: 'complete' })
    } catch (reason) {
      const cancelled = signal.aborted
      // A cancelled seek keeps demux/cache state for the next seek. An open
      // failure has no reusable source, and is closed only after WASM returns.
      if (request.type === 'open') this.pipeline.close()
      this.post({
        ...identity,
        type: 'error',
        cancelled,
        stage: reason instanceof FFmpegError ? reason.stage : 'runtime',
        message: reason instanceof Error ? reason.message : String(reason)
      })
    }
  }
}
