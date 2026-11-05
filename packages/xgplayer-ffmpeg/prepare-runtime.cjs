const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { createHash } = require('node:crypto')
const { execFile } = require('node:child_process')
const { promisify } = require('node:util')

const execute = promisify(execFile)
const version = '8.0'
const sourceURL = `https://ffmpeg.org/releases/ffmpeg-${version}.tar.xz`
const sourceHash = 'b2751fccb6cc4c77708113cd78b561059b6fa904b24162fa0be2d60273d27b8e'
const configureFlags = [
  '--target-os=none',
  '--arch=wasm32',
  '--enable-cross-compile',
  '--cc=emcc',
  '--cxx=em++',
  '--ar=emar',
  '--ranlib=emranlib',
  '--nm=emnm',
  '--disable-everything',
  '--disable-autodetect',
  '--disable-programs',
  '--disable-doc',
  '--disable-debug',
  '--disable-network',
  '--disable-pthreads',
  '--disable-w32threads',
  '--disable-os2threads',
  '--disable-asm',
  '--disable-x86asm',
  '--disable-avdevice',
  '--disable-avfilter',
  '--disable-swscale',
  '--disable-symver',
  '--enable-small',
  '--enable-decoder=wmav1,wmav2,wmapro,wmalossless,wmavoice,flac,pcm_s16le,pcm_s16be,pcm_s8,pcm_u8,pcm_alaw,pcm_mulaw',
  '--enable-demuxer=asf,flac,wav,pcm_s16le,pcm_s16be,pcm_s8,pcm_u8,pcm_alaw,pcm_mulaw',
  '--enable-parser=flac,aac',
  '--enable-encoder=aac',
  '--enable-muxer=mp4',
  '--extra-cflags=-O2'
]
const linkFlags = [
  '-O2',
  '-std=c++17',
  '-sMODULARIZE=1',
  '-sEXPORT_ES6=1',
  '-sENVIRONMENT=web,worker,node',
  '-sFILESYSTEM=0',
  '-sALLOW_MEMORY_GROWTH=1',
  '-sINITIAL_MEMORY=33554432',
  '-sMAXIMUM_MEMORY=268435456',
  '-sSTACK_SIZE=1048576',
  '-sASYNCIFY=1',
  '-sASYNCIFY_STACK_SIZE=131072',
  '-sASYNCIFY_IMPORTS=source_read',
  '-sEXPORTED_RUNTIME_METHODS=ccall,UTF8ToString,HEAPU8'
]

function digest(content) {
  return createHash('sha256').update(content).digest('hex')
}

async function run(command, args, cwd) {
  return execute(command, args, { cwd, maxBuffer: 16 * 1024 * 1024 })
}

async function cacheExists(directory, fingerprint) {
  try {
    const stamp = JSON.parse(
      await fs.readFile(path.join(directory, 'runtime.json'), 'utf8')
    )
    const core = await fs.readFile(path.join(directory, 'ffmpeg-core.js'))
    const wasm = await fs.readFile(path.join(directory, 'ffmpeg-core.wasm'))
    if (
      stamp.fingerprint !== fingerprint ||
      stamp.coreHash !== digest(core) ||
      stamp.wasmHash !== digest(wasm)
    )
      throw new Error(`Invalid native runtime cache: ${directory}`)
    return true
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

async function prepareRuntime(outputDirectory) {
  const toolchain = (await run('emcc', ['--version'])).stdout.split('\n')[0]
  if (!/\b6\.0\.10\b/.test(toolchain))
    throw new Error(
      'Native core requires Emscripten 6.0.10; activate the pinned toolchain'
    )
  const bridge = path.join(__dirname, 'native/pipeline.cpp')
  const fingerprint = digest(
    JSON.stringify({
      sourceHash,
      toolchain,
      configureFlags,
      linkFlags,
      bridge: digest(await fs.readFile(bridge))
    })
  )
  const base = path.resolve(
    outputDirectory || path.join(os.tmpdir(), 'xgplayer-ffmpeg-runtime')
  )
  // Build sources, authentication state and intermediate output stay outside the repo.
  const relative = path.relative(path.resolve(__dirname, '../..'), base)
  if (!relative.startsWith('..') && !path.isAbsolute(relative))
    throw new Error('Native build output must be outside the repository')
  const directory = path.join(base, fingerprint.slice(0, 16))
  if (await cacheExists(directory, fingerprint)) return directory
  await fs.mkdir(base, { recursive: true })
  const staging = await fs.mkdtemp(path.join(base, '.build-'))
  try {
    console.log('Building FFmpeg 8.0 audio libraries and the Asyncify bridge…')
    const archive = path.join(staging, 'ffmpeg.tar.xz')
    const response = await fetch(sourceURL)
    if (!response.ok) throw new Error(`FFmpeg source download failed: ${response.status}`)
    const source = Buffer.from(await response.arrayBuffer())
    if (digest(source) !== sourceHash) throw new Error('FFmpeg source checksum mismatch')
    await fs.writeFile(archive, source)
    await run('tar', ['-xf', archive, '-C', staging])
    const sourceDirectory = path.join(staging, `ffmpeg-${version}`)
    const install = path.join(staging, 'install')
    await run(
      'emconfigure',
      ['./configure', `--prefix=${install}`, ...configureFlags],
      sourceDirectory
    )
    await run(
      'emmake',
      ['make', `-j${Math.min(8, os.cpus().length)}`, 'install'],
      sourceDirectory
    )
    await run('em++', [
      bridge,
      `-I${install}/include`,
      ...linkFlags,
      `${install}/lib/libavformat.a`,
      `${install}/lib/libavcodec.a`,
      `${install}/lib/libswresample.a`,
      `${install}/lib/libavutil.a`,
      '-o',
      path.join(staging, 'ffmpeg-core.js')
    ])
    const core = await fs.readFile(path.join(staging, 'ffmpeg-core.js'))
    const wasm = await fs.readFile(path.join(staging, 'ffmpeg-core.wasm'))
    await fs.copyFile(
      path.join(sourceDirectory, 'COPYING.LGPLv2.1'),
      path.join(staging, 'COPYING.LGPLv2.1')
    )
    await fs.writeFile(
      path.join(staging, 'runtime.json'),
      `${JSON.stringify(
        {
          fingerprint,
          version,
          sourceURL,
          sourceHash,
          toolchain,
          configureFlags,
          linkFlags,
          coreHash: digest(core),
          wasmHash: digest(wasm)
        },
        null,
        2
      )}\n`
    )
    // Publish only the immutable JS/WASM pair and its source/license information.
    await fs.rm(sourceDirectory, { recursive: true })
    await fs.rm(install, { recursive: true })
    await fs.rm(archive)
    try {
      await fs.rename(staging, directory)
    } catch (error) {
      if (!['EEXIST', 'ENOTEMPTY'].includes(error.code)) throw error
      if (!(await cacheExists(directory, fingerprint))) throw error
    }
    return directory
  } finally {
    await fs.rm(staging, { recursive: true, force: true })
  }
}

module.exports = { prepareRuntime, configureFlags, linkFlags }
if (require.main === module) {
  prepareRuntime(process.argv[2])
    .then(console.log)
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
