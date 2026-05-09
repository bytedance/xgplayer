const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const { getRepoRoot } = require('./source-build')

const PACKAGE_DIR = path.join('packages', 'xgplayer-hls.js')
const EXTRA_ES_ENTRIES = [
  {
    from: path.join('src', 'index.light.js'),
    to: path.join('es', 'index.light.js')
  },
  {
    from: path.join('es', 'index.d.ts'),
    to: path.join('es', 'index.light.d.ts')
  },
  {
    from: path.join('src', 'vendor', 'hls.light.js'),
    to: path.join('es', 'vendor', 'hls.light.js')
  }
]

function copyFile({ repoRoot, from, to }) {
  const source = path.join(repoRoot, PACKAGE_DIR, from)
  const target = path.join(repoRoot, PACKAGE_DIR, to)

  if (!fs.existsSync(source)) {
    throw new Error(`[hlsjs-sei-patch] build output missing: ${source}`)
  }

  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
}

function copyExtraEsEntries({ repoRoot = getRepoRoot() } = {}) {
  for (const entry of EXTRA_ES_ENTRIES) {
    copyFile({
      repoRoot,
      from: entry.from,
      to: entry.to
    })
  }

  process.stdout.write(
    `[hlsjs-sei-patch] Synced extra ES entries: ${EXTRA_ES_ENTRIES.map(entry => entry.to).join(', ')}\n`
  )
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options
  })

  if (result.status !== 0) {
    throw new Error(`[hlsjs-sei-patch] command failed: ${command} ${args.join(' ')}`)
  }
}

function main() {
  const repoRoot = getRepoRoot()
  run('yarn', ['libd', 'build', 'xgplayer-hls.js'], { cwd: repoRoot })
  copyExtraEsEntries({ repoRoot })
}

if (require.main === module) {
  main()
}

module.exports = {
  EXTRA_ES_ENTRIES,
  copyExtraEsEntries
}
