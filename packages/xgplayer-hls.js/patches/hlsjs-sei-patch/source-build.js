const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

function getRepoRoot() {
  return path.resolve(__dirname, '..', '..', '..', '..')
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', ...options })
  if (result.status !== 0) {
    throw new Error(`[hlsjs-sei-patch] command failed: ${cmd} ${args.join(' ')}`)
  }
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function downloadTagTarball({ version, outFilePath }) {
  // Using codeload avoids git clone and tends to be more reliable.
  const url = `https://codeload.github.com/video-dev/hls.js/tar.gz/refs/tags/v${version}`
  run('curl', ['-L', '--retry', '3', '--retry-delay', '2', '-o', outFilePath, url])
}

function extractTarGz({ tarGzPath, outDir }) {
  run('tar', ['-xzf', tarGzPath, '-C', outDir])
}

function findExtractedSourceDir({ extractedRootDir, version }) {
  const entries = fs.readdirSync(extractedRootDir, { withFileTypes: true })
  const expected = `hls.js-${version}`
  const dir = entries.find(e => e.isDirectory() && e.name === expected)
  if (!dir) {
    throw new Error(`[hlsjs-sei-patch] failed to locate extracted source dir ${expected}`)
  }
  return path.join(extractedRootDir, dir.name)
}

function applySourcePatches({ srcDir, repoRoot, version }) {
  const patchesDir = path.join(
    repoRoot,
    'packages',
    'xgplayer-hls.js',
    'hlsjs-sei-patch',
    'patches-src',
    `hls.js+${version}`
  )
  if (!fs.existsSync(patchesDir)) {
    throw new Error(
      `[hlsjs-sei-patch] missing source patches directory: ${path.relative(repoRoot, patchesDir)}`
    )
  }

  // git apply works best inside a repo; init a temporary one.
  run('git', ['init'], { cwd: srcDir })

  const patchFiles = fs
    .readdirSync(patchesDir)
    .filter(f => f.endsWith('.patch'))
    .sort()

  if (patchFiles.length === 0) {
    throw new Error(`[hlsjs-sei-patch] no .patch files found in ${patchesDir}`)
  }

  for (const patchFile of patchFiles) {
    run('git', ['apply', path.join(patchesDir, patchFile)], { cwd: srcDir })
  }
}

function buildHlsJsFromSource({ srcDir }) {
  // Use npm ci for deterministic installs based on package-lock.json in tag source.
  run('npm', ['ci'], { cwd: srcDir })
  run('npm', ['run', 'build'], { cwd: srcDir })
}

function overwriteInstalledDistFiles({ repoRoot, srcDir, files }) {
  const installedDist = path.join(repoRoot, 'node_modules', 'hls.js', 'dist')
  const builtDist = path.join(srcDir, 'dist')
  for (const fileName of files) {
    const from = path.join(builtDist, fileName)
    const to = path.join(installedDist, fileName)
    if (!fs.existsSync(from)) {
      throw new Error(`[hlsjs-sei-patch] built dist missing: ${from}`)
    }
    fs.copyFileSync(from, to)
  }
}

function buildPatchedDistAndCopyToNodeModules({ version }) {
  const repoRoot = getRepoRoot()

  const hlsPkgJsonPath = path.join(repoRoot, 'node_modules', 'hls.js', 'package.json')
  if (!fs.existsSync(hlsPkgJsonPath)) {
    throw new Error(
      '[hlsjs-sei-patch] missing node_modules/hls.js. Run `yarn install` first.'
    )
  }

  const installed = JSON.parse(readUtf8(hlsPkgJsonPath))
  if (installed.version !== version) {
    throw new Error(
      `[hlsjs-sei-patch] version mismatch: expected ${version}, but installed hls.js is ${installed.version}`
    )
  }

  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), `hlsjs-src-${version}-`))
  ensureDir(tmpRoot)
  const tarballPath = path.join(tmpRoot, `hls.js-v${version}.tar.gz`)

  downloadTagTarball({ version, outFilePath: tarballPath })
  extractTarGz({ tarGzPath: tarballPath, outDir: tmpRoot })

  const srcDir = findExtractedSourceDir({ extractedRootDir: tmpRoot, version })
  applySourcePatches({ srcDir, repoRoot, version })
  buildHlsJsFromSource({ srcDir })

  // Only overwrite the files we actually patch, to keep patch-package output focused
  // (avoids huge .map diffs etc.).
  overwriteInstalledDistFiles({
    repoRoot,
    srcDir,
    files: [
      'hls.d.ts',
      'hls.d.mts',
      'hls.js',
      'hls.light.js',
      'hls.mjs',
      'hls.light.mjs',
      'hls.worker.js'
    ]
  })
}

module.exports = {
  getRepoRoot,
  run,
  buildPatchedDistAndCopyToNodeModules
}
