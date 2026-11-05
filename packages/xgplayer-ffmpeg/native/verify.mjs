// Run after ffmpeg:runtime. Test inputs and all generated output belong in /tmp.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const [runtime, inputPath, rawFormat = '', rawRate = '0', rawChannels = '0'] =
  process.argv.slice(2)
if (!runtime || !inputPath)
  throw new Error(
    'Usage: node native/verify.mjs <runtime> <input> [format rate channels]'
  )
const createCore = (
  await import(pathToFileURL(path.join(runtime, 'ffmpeg-core.js')).href)
).default
const file = await fs.open(inputPath, 'r')
const size = (await file.stat()).size
const blocks = new Map()
let readBytes = 0
let readCalls = 0
let interrupted = false
let cancelNextRead = false
const core = await createCore({
  wasmBinary: await fs.readFile(path.join(runtime, 'ffmpeg-core.wasm')),
  isInterrupted: () => interrupted,
  readSource: async (offset, destination, length) => {
    if (cancelNextRead) {
      cancelNextRead = false
      interrupted = true
      return -1414092869 // AVERROR_EXIT, distinct from EOF.
    }
    const start = Math.floor(offset / 131072) * 131072
    let block = blocks.get(start)
    if (!block) {
      block = new Uint8Array(Math.min(131072, size - start))
      const result = await file.read(block, 0, block.length, start)
      assert.equal(result.bytesRead, block.length)
      blocks.set(start, block)
      readBytes += block.length
      readCalls++
      if (blocks.size > 64) blocks.delete(blocks.keys().next().value)
    }
    const data = block.subarray(offset - start, offset - start + length)
    core.HEAPU8.set(data, destination)
    return data.length
  }
})
const call = (name, values = [], types = values.map(() => 'number')) =>
  core.ccall(name, 'number', types, values)
const handle = call(
  'xp_create',
  [size, rawFormat, Number(rawRate), Number(rawChannels)],
  ['number', 'string', 'number', 'number']
)
async function operation(name, values = []) {
  const result = await core.ccall(
    name,
    'number',
    ['number', ...values.map(() => 'number')],
    [handle, ...values],
    { async: true }
  )
  if (result < 0) throw new Error(core.UTF8ToString(call('xp_error', [handle])))
  return result
}
const destination = await fs.mkdtemp('/tmp/xgplayer-ffmpeg-native-verification-')
const results = []
try {
  await operation('xp_open')
  const metadata = JSON.parse(core.UTF8ToString(call('xp_metadata', [handle])))
  assert(metadata.sampleRate > 0)
  assert.equal(
    call('xp_configure', [
      handle,
      process.env.FFMPEG_PASSTHROUGH === '1' ? 1 : 0,
      0,
      0,
      0,
      1
    ]),
    0
  )
  const duration = metadata.duration ?? 1
  const targets =
    duration > 10 ? [0, duration * 0.8, duration * 0.1, duration - 0.5, 0] : [0]
  for (const [index, target] of targets.entries()) {
    if (duration > 10 && index === targets.length - 1) {
      cancelNextRead = true
      await assert.rejects(operation('xp_seek', [duration * 0.5]))
      assert.equal(
        cancelNextRead,
        false,
        'Cancellation must exit a suspended native read'
      )
      interrupted = false
    }
    const before = readBytes
    if (index) await operation('xp_seek', [target])
    let init
    let segment
    let start = 0
    let end = 0
    let bias = 0
    for (let batches = 0; batches < 500 && !segment; batches++) {
      const kind = await operation('xp_pull')
      if (kind === 3) break
      if (kind === 0) continue
      const data = core.HEAPU8.slice(
        call('xp_data', [handle]),
        call('xp_data', [handle]) + call('xp_length', [handle])
      )
      bias = call('xp_bias', [handle])
      if (kind === 1) init = data
      else {
        segment = data
        start = call('xp_start', [handle])
        end = call('xp_end', [handle])
      }
      core.ccall('xp_release', null, ['number'], [handle])
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
    assert(
      init?.length && segment?.length,
      'Each epoch must return complete init and media'
    )
    assert(
      start < target + 0.5 && end > target,
      `Target ${target} not covered by ${start}-${end}`
    )
    assert(
      readBytes - before <= 4 * 1024 * 1024,
      'Seek must fit its additional input budget'
    )
    const output = path.join(destination, `${index}.mp4`)
    await fs.writeFile(output, Buffer.concat([init, segment]))
    const probe = JSON.parse(
      execFileSync(
        'ffprobe',
        [
          '-v',
          'error',
          '-select_streams',
          'a:0',
          '-show_packets',
          '-show_entries',
          'packet=pts_time,dts_time,duration_time',
          '-of',
          'json',
          output
        ],
        { encoding: 'utf8' }
      )
    )
    assert(probe.packets.length > 0)
    assert(
      Math.abs(Number(probe.packets[0].pts_time) - bias - start) < 0.0001,
      'The real fMP4 packet timestamp must match the exported source timeline'
    )
    execFileSync('ffmpeg', ['-v', 'error', '-i', output, '-f', 'null', '-'])
    results.push({
      target,
      start,
      end,
      bias,
      additionalBytes: readBytes - before,
      packets: probe.packets.length
    })
    if (duration <= 10) {
      const fragments = [init, segment]
      let eof = false
      let finalEnd = end
      for (let batches = 0; batches < 500 && !eof; batches++) {
        const kind = await operation('xp_pull')
        if (kind === 3) {
          eof = true
          break
        }
        if (kind === 0) continue
        assert.equal(kind, 2)
        const offset = call('xp_data', [handle])
        fragments.push(core.HEAPU8.slice(offset, offset + call('xp_length', [handle])))
        finalEnd = call('xp_end', [handle])
        core.ccall('xp_release', null, ['number'], [handle])
      }
      assert(eof, 'Decoder, resampler and encoder must finish draining')
      assert(Math.abs(finalEnd - duration) < 0.1, 'EOF must include the final samples')
      await fs.writeFile(output, Buffer.concat(fragments))
      execFileSync('ffmpeg', ['-v', 'error', '-i', output, '-f', 'null', '-'])
      results[index].finalEnd = finalEnd
    }
  }
  console.log(
    JSON.stringify(
      { metadata, readBytes, readCalls, heapBytes: core.HEAPU8.length, results },
      null,
      2
    )
  )
} finally {
  core.ccall('xp_close', null, ['number'], [handle])
  await file.close()
  await fs.rm(destination, { recursive: true })
}
