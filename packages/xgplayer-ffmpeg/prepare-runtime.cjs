const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { createHash } = require('node:crypto')
const { execFile, spawnSync } = require('node:child_process')
const { promisify } = require('node:util')

const execute = promisify(execFile)
const coreVersion = '0.12.10'
const flags = ['--asyncify', '-O2']
const execMarker = 'Module["exec"]=exec;'

function digest(content) {
  return createHash('sha256').update(content).digest('hex')
}

function findOptimizer() {
  if (process.env.WASM_OPT) return process.env.WASM_OPT
  if (spawnSync('wasm-opt', ['--version']).status === 0) return 'wasm-opt'
  const config = spawnSync('em-config', ['BINARYEN_ROOT'], { encoding: 'utf8' })
  if (config.status === 0) return path.join(config.stdout.trim(), 'bin', 'wasm-opt')
  throw new Error(
    'Install Binaryen/Emscripten or set WASM_OPT to prepare the streaming core'
  )
}

function uniqueMatch(glue, expression, name) {
  const matches = [...glue.matchAll(expression)]
  if (matches.length !== 1)
    throw new Error(`Unsupported FFmpeg core glue: expected one ${name}`)
  return matches[0][1]
}

function describeCore(glue, wasm) {
  const read = uniqueMatch(glue, /"([^"]+)":_fd_read/g, 'read import')
  const write = uniqueMatch(glue, /"([^"]+)":_fd_write/g, 'write import')
  const entry = uniqueMatch(
    glue,
    /Module\["_ffmpeg"\]=Module\["asm"\]\["([^"]+)"\]/g,
    'FFmpeg entry'
  )
  const probeEntry = uniqueMatch(
    glue,
    /Module\["_ffprobe"\]=Module\["asm"\]\["([^"]+)"\]/g,
    'FFprobe entry'
  )
  uniqueMatch(glue, /Module\["exec"\]=exec;/g, 'exec insertion point')
  uniqueMatch(glue, /Module\.ret=\$0/g, 'native exit-code callback')
  const module = new WebAssembly.Module(wasm)
  for (const name of [entry, probeEntry]) {
    if (
      !WebAssembly.Module.exports(module).some(
        (item) => item.name === name && item.kind === 'function'
      )
    )
      throw new Error('WASM command entry does not match glue')
  }
  const imports = WebAssembly.Module.imports(module)
  const names = [read, write].map((name) => {
    const matches = imports.filter(
      (item) => item.name === name && item.kind === 'function'
    )
    if (matches.length !== 1)
      throw new Error(`WASM I/O import does not match glue: ${name}`)
    return `${matches[0].module}.${name}`
  })
  return { entry, probeEntry, imports: `--pass-arg=asyncify-imports@${names.join(',')}` }
}

function streamingGlue(glue, entry, probeEntry) {
  // The pinned native exit callback writes ret before invoking WASM abort.
  // Normalize that exit here; the runner never inspects exception message text.
  const bridge = `Module["streamExec"]=(argc,argv)=>{try{Module["asm"]["${entry}"](argc,argv)}catch(error){if(!(error instanceof WebAssembly.RuntimeError)||Module["ret"]<0)throw error;return true}return false};Module["streamProbe"]=(argc,argv)=>{const result=Module["asm"]["${probeEntry}"](argc,argv);if(Module["asm"]["asyncify_get_state"]()===1)return false;Module["ret"]=result;return true};`
  return glue.replace(execMarker, `${execMarker}${bridge}`)
}

async function cacheExists(directory, fingerprint) {
  try {
    const stamp = JSON.parse(
      await fs.readFile(path.join(directory, 'runtime.json'), 'utf8')
    )
    const [core, wasm] = await Promise.all([
      fs.readFile(path.join(directory, 'ffmpeg-core.js')),
      fs.readFile(path.join(directory, 'ffmpeg-core.wasm'))
    ])
    if (
      stamp.fingerprint !== fingerprint ||
      stamp.coreHash !== digest(core) ||
      stamp.wasmHash !== digest(wasm)
    )
      throw new Error(`Invalid FFmpeg runtime cache: ${directory}`)
    return true
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

async function prepareRuntime(outputDirectory) {
  const installed = path.resolve(
    path.dirname(require.resolve('@ffmpeg/core')),
    '..',
    '..'
  )
  const metadata = JSON.parse(
    await fs.readFile(path.join(installed, 'package.json'), 'utf8')
  )
  if (metadata.version !== coreVersion)
    throw new Error(`Streaming core preparation requires @ffmpeg/core ${coreVersion}`)
  const sourceWasm = path.join(installed, 'dist/esm/ffmpeg-core.wasm')
  const [glue, wasm] = await Promise.all([
    fs.readFile(path.join(installed, 'dist/esm/ffmpeg-core.js'), 'utf8'),
    fs.readFile(sourceWasm)
  ])
  const core = describeCore(glue, wasm)
  const preparedGlue = streamingGlue(glue, core.entry, core.probeEntry)
  const fingerprint = digest(
    `xgplayer-asyncify-v3:${digest(preparedGlue)}:${digest(wasm)}:${JSON.stringify([...flags, core.imports])}`
  )
  const base = outputDirectory
    ? path.resolve(outputDirectory)
    : path.join(os.tmpdir(), 'xgplayer-ffmpeg-runtime')
  const directory = path.join(base, fingerprint.slice(0, 16))
  if (await cacheExists(directory, fingerprint)) return directory
  const optimizer = findOptimizer()
  await fs.mkdir(base, { recursive: true })
  const staging = await fs.mkdtemp(path.join(base, '.prepare-'))
  try {
    console.log('Preparing Asyncify FFmpeg core (first run only)…')
    const wasmPath = path.join(staging, 'ffmpeg-core.wasm')
    await execute(optimizer, [sourceWasm, ...flags, core.imports, '-o', wasmPath], {
      maxBuffer: 10 * 1024 * 1024
    })
    const preparedWasm = await fs.readFile(wasmPath)
    const module = new WebAssembly.Module(preparedWasm)
    const exports = new Set(WebAssembly.Module.exports(module).map((item) => item.name))
    for (const name of [
      'asyncify_get_state',
      'asyncify_start_unwind',
      'asyncify_stop_unwind',
      'asyncify_start_rewind',
      'asyncify_stop_rewind'
    ]) {
      if (!exports.has(name)) throw new Error(`Prepared core is missing ${name}`)
    }
    await fs.writeFile(path.join(staging, 'ffmpeg-core.js'), preparedGlue)
    await fs.writeFile(
      path.join(staging, 'runtime.json'),
      `${JSON.stringify(
        {
          fingerprint,
          coreVersion,
          coreHash: digest(preparedGlue),
          wasmHash: digest(preparedWasm)
        },
        null,
        2
      )}\n`
    )
    try {
      // Immutable, fingerprinted directories let concurrent preparers publish
      // a complete JS/WASM pair without locking or overwriting active resources.
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

module.exports = { prepareRuntime }
if (require.main === module) {
  prepareRuntime(process.argv[2])
    .then(console.log)
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}
