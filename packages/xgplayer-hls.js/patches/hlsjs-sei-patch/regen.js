const path = require('node:path')

const {
  buildPatchedDistAndCopyToNodeModules,
  getRepoRoot,
  run
} = require('./source-build')

function main() {
  const repoRoot = getRepoRoot()
  process.chdir(repoRoot)

  // 1) Determine installed version.
  const hlsPkgJson = require(
    path.join(repoRoot, 'node_modules', 'hls.js', 'package.json')
  )
  const version = hlsPkgJson.version

  // 2) Build patched dist from upstream tag source and overwrite selected dist files.
  buildPatchedDistAndCopyToNodeModules({ version })

  // 3) Re-generate patch file from current node_modules changes.
  const patchPackageCmd =
    process.platform === 'win32' ? 'patch-package.cmd' : 'patch-package'
  run(patchPackageCmd, [
    'hls.js',
    '--patch-dir',
    path.join('packages', 'xgplayer-hls.js', 'patches'),
    '--use-yarn'
  ])

  // 4) Verify.
  run(process.execPath, [
    path.join('packages', 'xgplayer-hls.js', 'patches', 'hlsjs-sei-patch', 'verify.js')
  ])

  process.stdout.write(
    '[hlsjs-sei-patch] Patch regenerated from upstream tag source. ' +
      'Note: node_modules is now modified; re-run `yarn install` to restore a clean state.\n'
  )
}

main()
