import type { TranscodeRequest, WorkerEvent } from '../transcoder/protocol'
import { FFmpegError, type FFmpegProgress, type FFmpegStage } from '../types'
import { AsyncifyRunner } from './asyncify'
import { type CoreFactory, type DeviceStream, type FFmpegCore, loadCore } from './core'
import { HTTPInput } from './http-input'
import { MetadataProbe } from './metadata-probe'
import { ProbeInput } from './probe-input'

/** One Worker executes one core; cancellation is owned by main-thread termination. */
export class StreamingWorker {
  private started = false
  private outputId = 0
  private pendingOutput: { id: number; resolve: () => void } | null = null
  private readonly progress: FFmpegProgress = {
    progress: 0,
    time: 0,
    downloadedBytes: 0,
    inputEnded: false
  }

  constructor(
    private readonly post: (event: WorkerEvent, transfer?: Transferable[]) => void
  ) {}

  acknowledge(id: number): void {
    if (this.pendingOutput?.id !== id) return
    const pending = this.pendingOutput
    this.pendingOutput = null
    pending.resolve()
  }

  async run(request: TranscodeRequest, factory?: CoreFactory): Promise<void> {
    if (this.started) {
      this.post({
        type: 'error',
        stage: 'runtime',
        message: 'Worker already received a source'
      })
      return
    }
    this.started = true
    let input: HTTPInput | null = null
    let stage: FFmpegStage = 'download'
    let failure: FFmpegError | null = null
    try {
      input = await HTTPInput.open(request, (event) => {
        Object.assign(this.progress, event)
        this.postProgress()
      })
      stage = 'runtime'
      const core = await loadCore(request.ffmpeg, factory)
      const runner = new AsyncifyRunner(core)
      const probeInput = new ProbeInput(input)
      const outputFD = this.registerDevices(core, runner, probeInput, (data) =>
        this.write(data)
      )
      this.post({ type: 'ready' })
      const duration = await new MetadataProbe().run(core, runner, request.inputArguments)
      probeInput.startTranscode()
      if (duration !== null) this.post({ type: 'metadata', duration })
      const logs = this.observeCore(core)
      stage = 'transcode'
      // The file protocol can assume a character device is seekable. Declaring
      // a pipe prevents the MP4 muxer from seeking back across flushed output.
      await runner.execute([...request.args, `pipe:${outputFD}`])
      if (core.ret !== 0) throw new Error(`FFmpeg exited ${core.ret}: ${logs.last}`)
    } catch (reason) {
      failure = this.asError(stage, reason)
    }
    try {
      await input?.close()
    } catch (reason) {
      failure = failure
        ? new FFmpegError(failure.stage, failure.message, {
            execution: failure.reason || failure,
            cleanup: reason
          })
        : this.asError('download', reason)
    }
    if (failure)
      this.post({ type: 'error', stage: failure.stage, message: failure.message })
    else this.post({ type: 'done' })
  }

  private observeCore(core: FFmpegCore): { last: string } {
    const logs = { last: '' }
    core.setLogger(({ type, message }) => {
      if (type === 'stderr') logs.last = message
    })
    core.setProgress((event) => {
      Object.assign(this.progress, event)
      this.postProgress()
    })
    return logs
  }

  private registerDevices(
    core: FFmpegCore,
    runner: AsyncifyRunner,
    input: ProbeInput,
    output: (data: Uint8Array) => Promise<void>
  ): number {
    const open = (stream: DeviceStream): void => {
      stream.seekable = false
    }
    const llseek = (): never => {
      throw new core.FS.ErrnoError(70)
    }
    const inputDevice = core.FS.makedev(64, 0)
    core.FS.registerDevice(inputDevice, {
      open,
      llseek,
      read: (_stream, buffer, offset, length) =>
        runner.suspend(() => input.read(buffer, offset, length))
    })
    core.FS.mkdev('/input', 0o666, inputDevice)
    const outputDevice = core.FS.makedev(64, 1)
    core.FS.registerDevice(outputDevice, {
      open,
      llseek,
      write: (_stream, buffer, offset, length) =>
        runner.suspend(async () => {
          await output(new Uint8Array(buffer.buffer, buffer.byteOffset + offset, length))
          return length
        })
    })
    core.FS.mkdev('/output.mp4', 0o666, outputDevice)
    return core.FS.open('/output.mp4', 'w').fd
  }

  private async write(buffer: Uint8Array): Promise<void> {
    let written = 0
    while (written < buffer.length) {
      const size = Math.min(64 * 1024, buffer.length - written)
      const data = Uint8Array.from(buffer.subarray(written, written + size))
      this.outputId += 1
      const id = this.outputId
      await new Promise<void>((resolve) => {
        this.pendingOutput = { id, resolve }
        this.post({ type: 'chunk', id, data }, [data.buffer])
      })
      written += size
    }
  }

  private postProgress(): void {
    this.post({ type: 'progress', data: { ...this.progress } })
  }

  private asError(stage: FFmpegStage, reason: unknown): FFmpegError {
    return reason instanceof FFmpegError
      ? reason
      : new FFmpegError(
          stage,
          reason instanceof Error ? reason.message : String(reason),
          reason
        )
  }
}
