const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

function getRepoRoot() {
  return path.resolve(__dirname, '..', '..', '..', '..')
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  return typeof result.status === 'number' ? result.status : 1
}

const repoRoot = getRepoRoot()
const patchDir = path.join('packages', 'xgplayer-hls.js', 'patches')

process.chdir(repoRoot)

// 1) Resolve installed hls.js version and ensure we have a matching patch file.
const hlsPkgJsonPath = path.join(repoRoot, 'node_modules', 'hls.js', 'package.json')
if (!fs.existsSync(hlsPkgJsonPath)) {
  // node_modules is still being installed, but in practice this script runs after install.
  // If it happens, make it loud and fail.
  // eslint-disable-next-line no-console
  console.error(
    '[hlsjs-sei-patch] missing node_modules/hls.js. Run `yarn install` again.'
  )
  process.exit(1)
}

const { version } = JSON.parse(readUtf8(hlsPkgJsonPath))
const patchFile = path.join(repoRoot, patchDir, `hls.js+${version}.patch`)
if (!fs.existsSync(patchFile)) {
  // eslint-disable-next-line no-console
  console.error(
    `[hlsjs-sei-patch] missing patch file for installed hls.js@${version}: ${path.relative(repoRoot, patchFile)}\n` +
      '[hlsjs-sei-patch] If you upgraded hls.js, please regenerate the patch:\n' +
      '  yarn install --ignore-scripts\n' +
      '  yarn workspace xgplayer-hls.js hlsjs:patch:regen\n' +
      '  yarn install\n'
  )
  process.exit(1)
}

// 2) Apply patches.
const patchPackageCmd =
  process.platform === 'win32' ? 'patch-package.cmd' : 'patch-package'
const applyStatus = run(patchPackageCmd, ['--patch-dir', patchDir, '--error-on-fail'])
if (applyStatus !== 0) {
  process.exit(applyStatus)
}

// 3) Verify patches are actually in effect.
const verifyScript = path.join(
  'packages',
  'xgplayer-hls.js',
  'patches',
  'hlsjs-sei-patch',
  'verify.js'
)
const verifyStatus = run(process.execPath, [verifyScript])
process.exit(verifyStatus)
