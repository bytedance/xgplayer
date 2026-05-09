const fs = require('node:fs')
const path = require('node:path')

const { getRepoRoot } = require('./source-build')

function assertIncludes(filePath, needle) {
  const content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes(needle)) {
    throw new Error(
      `[hlsjs-sei-patch] verify failed: ${path.relative(process.cwd(), filePath)} missing \"${needle}\"`
    )
  }
}

function main() {
  const repoRoot = getRepoRoot()
  const hlsRoot = path.join(repoRoot, 'node_modules', 'hls.js')
  const pkgJson = path.join(hlsRoot, 'package.json')
  if (!fs.existsSync(pkgJson)) {
    throw new Error(
      '[hlsjs-sei-patch] missing node_modules/hls.js. Run `yarn install` first.'
    )
  }

  const { version } = JSON.parse(fs.readFileSync(pkgJson, 'utf8'))
  const dist = path.join(hlsRoot, 'dist')

  // Types
  assertIncludes(path.join(dist, 'hls.d.ts'), 'customSeiMessage?: boolean;')
  assertIncludes(path.join(dist, 'hls.d.mts'), 'customSeiMessage?: boolean;')

  // Main bundles
  assertIncludes(path.join(dist, 'hls.js'), 'customSeiMessage: true')
  assertIncludes(path.join(dist, 'hls.light.js'), 'customSeiMessage: true')
  assertIncludes(path.join(dist, 'hls.mjs'), 'customSeiMessage: true')
  assertIncludes(path.join(dist, 'hls.light.mjs'), 'customSeiMessage: true')

  // Worker bundle (minified)
  assertIncludes(path.join(dist, 'hls.worker.js'), 'customSeiMessage:!0')

  // Patch file naming convention: hls.js+<version>.patch
  const patchFile = path.join(
    repoRoot,
    'packages',
    'xgplayer-hls.js',
    'patches',
    `hls.js+${version}.patch`
  )
  if (!fs.existsSync(patchFile)) {
    throw new Error(
      `[hlsjs-sei-patch] verify failed: missing patch file ${path.relative(repoRoot, patchFile)}`
    )
  }

  process.stdout.write(`[hlsjs-sei-patch] OK (hls.js@${version})\n`)
}

main()
