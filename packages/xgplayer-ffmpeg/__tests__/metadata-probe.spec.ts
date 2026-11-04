/** @jest-environment node */
import type { TranscodeRequest } from '../src/transcoder/protocol'
import type { AsyncifyRunner } from '../src/worker/asyncify'
import type { FFmpegCore } from '../src/worker/core'
import { HTTPInput } from '../src/worker/http-input'
import { MetadataProbe } from '../src/worker/metadata-probe'
import { ProbeInput } from '../src/worker/probe-input'

afterEach(() => jest.restoreAllMocks())

function probe(output: string, code = 0, failure?: Error) {
  const logger = jest.fn<void, [Parameters<FFmpegCore['setLogger']>[0]]>()
  const core = { ret: code, setLogger: logger } as unknown as FFmpegCore
  const execute = jest.fn(async () => {
    if (failure) throw failure
    logger.mock.calls[0][0]({ type: 'stderr', message: 'ignored' })
    for (const message of output.split('\n'))
      logger.mock.calls[0][0]({ type: 'stdout', message })
  })
  const runner = { execute } as unknown as AsyncifyRunner
  return { run: (args: string[] = []) => new MetadataProbe().run(core, runner, args), execute }
}

test('uses native FFprobe JSON and the same demuxer parameters as transcoding', async () => {
  const { run, execute } = probe('{\n"format": {"duration": "728.084"}\n}')
  const args = ['-f', 's16le', '-ar', '16000', '-ac', '1']
  await expect(run(args)).resolves.toBe(728.084)
  expect(execute).toHaveBeenCalledWith([
    '-v', 'error', '-probesize', '65536', '-analyzeduration', '1000000',
    ...args, '-show_entries', 'format=duration', '-of', 'json', '/input'
  ], 'probe')
})

test.each(['{}', '{"duration":"N/A"}', '{"duration":0}', '{"duration":-1}',
  '{"duration":"Infinity"}', '{"duration":null}', '{"duration":true}'])(
  'retains unknown duration for native format metadata: %s', async (format) => {
    await expect(probe(`{"format":${format}}`).run()).resolves.toBeNull()
  }
)

test('accepts finite numeric durations and a native probe failure without parsing its JSON', async () => {
  await expect(probe('{"format":{"duration":8}}').run()).resolves.toBe(8)
  await expect(probe('not json', 1).run()).resolves.toBeNull()
})

test.each(['not json', '{}', 'null', '{"format":null}', '{"format":1}'])(
  'rejects corrupt successful probe results: %s', async (output) => {
    await expect(probe(output).run()).rejects.toThrow()
  }
)

test('bounds native stdout and propagates native traps and read failures', async () => {
  await expect(probe('x'.repeat(16384)).run()).rejects.toThrow('16 KiB')
  const failure = new WebAssembly.RuntimeError('probe trap')
  await expect(probe('', 0, failure).run()).rejects.toBe(failure)
})

async function openInput(data: Uint8Array[], maxInputBytes?: number) {
  const progress = jest.fn()
  const cancel = jest.fn()
  const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(new ReadableStream<Uint8Array>({
      pull(controller) {
        const next = data.shift()
        if (next) controller.enqueue(next)
        else controller.close()
      },
      cancel
    }, { highWaterMark: 0 }))
  )
  const request: TranscodeRequest = {
    type: 'start', source: 'https://example.com/media', args: [], inputArguments: [],
    ffmpeg: { workerURL: '/worker.js', coreURL: '/core.js', wasmURL: '/core.wasm' },
    maxInputBytes
  }
  const http = await HTTPInput.open(request, progress)
  return { input: new ProbeInput(http), http, progress, cancel, fetchMock }
}

async function readAll(input: ProbeInput, length = 4097) {
  const output: Uint8Array[] = []
  const buffer = new Int8Array(length + 2)
  while (true) {
    const size = await input.read(buffer, 1, length)
    if (!size) break
    output.push(Uint8Array.from(buffer.subarray(1, 1 + size)))
  }
  return Buffer.concat(output)
}

test('probe EOF is synthetic at 64 KiB; replay continues the same reader without redownload', async () => {
  const source = Uint8Array.from({ length: ProbeInput.limit + 7777 }, (_, i) => i % 251)
  const { input, http, progress, fetchMock } = await openInput([source])
  expect(await input.read(new Int8Array(1), 0, 0)).toBe(0)
  const prefix = await readAll(input)
  expect(prefix).toEqual(Buffer.from(source.subarray(0, ProbeInput.limit)))
  expect(progress.mock.calls.at(-1)?.[0].inputEnded).toBe(false)
  input.startTranscode()
  expect(await readAll(input, 123)).toEqual(Buffer.from(source))
  expect(progress.mock.calls.at(-1)?.[0]).toMatchObject({
    downloadedBytes: source.length, inputEnded: true
  })
  expect(fetchMock).toHaveBeenCalledTimes(1)
  await http.close()
})

test('replays partial native probing across all source splits and retains real EOF', async () => {
  const source = Uint8Array.from({ length: 25 }, (_, i) => i)
  for (let split = 1; split < source.length; split++) {
    const { input, http } = await openInput([source.subarray(0, split), source.subarray(split)])
    const buffer = new Int8Array(7)
    await input.read(buffer, 0, buffer.length)
    input.startTranscode()
    expect(await readAll(input, 3)).toEqual(Buffer.from(source))
    await http.close()
  }
  const { input, http, progress } = await openInput([source])
  expect(await readAll(input)).toEqual(Buffer.from(source))
  expect(progress.mock.calls.at(-1)?.[0].inputEnded).toBe(true)
  input.startTranscode()
  expect(await readAll(input)).toEqual(Buffer.from(source))
  await http.close()
})

test('continues HTTP when probe read nothing and closes while retaining a prefix', async () => {
  const { input, http, cancel } = await openInput([new Uint8Array([1, 2])])
  input.startTranscode()
  expect(await input.read(new Int8Array(2), 0, 2)).toBe(2)
  await http.close()
  await http.close()
  expect(cancel).toHaveBeenCalledTimes(1)
  await expect(input.read(new Int8Array(2), 0, 2)).rejects.toMatchObject({ stage: 'download' })
})

test('does not turn HTTP limit errors during probing into unknown metadata', async () => {
  const { input, http, cancel } = await openInput([new Uint8Array([1, 2, 3])], 2)
  await expect(readAll(input)).rejects.toMatchObject({
    stage: 'download', message: 'Input exceeds 2 bytes'
  })
  await http.close()
  expect(cancel).toHaveBeenCalledTimes(1)
})
