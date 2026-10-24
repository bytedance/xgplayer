const fs = require('fs-extra')
const path = require('node:path')
const crypto = require('node:crypto')
const execa = require('execa')

async function digest(file) {
  return crypto
    .createHash('sha512')
    .update(await fs.readFile(file))
    .digest('hex')
}

async function packRelease({ cwd, releaseDir, outputDir, run = execa }) {
  const release = await fs.readJson(path.join(releaseDir, 'release.json'))
  await fs.ensureDir(outputDir)
  const packages = []
  for (const pkg of release.packages) {
    const pkgCwd = path.join(cwd, pkg.path)
    const { stdout } = await run(
      'npm',
      ['pack', '--json', '--pack-destination', outputDir],
      { cwd: pkgCwd }
    )
    const [archive] = JSON.parse(stdout)
    const files = archive.files.map((file) => file.path)
    if (
      !files.includes('CHANGELOG.md') ||
      !files.some((file) => /^(es|dist)\//.test(file))
    ) {
      throw new Error(`${pkg.name}: archive must include CHANGELOG.md and built output`)
    }
    const file = path.join(outputDir, archive.filename)
    const { stdout: packageJson } = await run('tar', [
      '-xOf',
      file,
      'package/package.json'
    ])
    const packed = JSON.parse(packageJson)
    if (
      packed.name !== pkg.name ||
      packed.version !== release.version ||
      packed.private
    ) {
      throw new Error(`Unexpected package metadata in ${archive.filename}`)
    }
    packages.push({
      name: pkg.name,
      filename: archive.filename,
      sha512: await digest(file)
    })
  }
  const manifest = { ...release, packages }
  await fs.outputJson(path.join(outputDir, 'archives.json'), manifest, { spaces: 2 })
  return manifest
}

async function publishRelease({ archiveDir, run = execa }) {
  const release = await fs.readJson(path.join(archiveDir, 'archives.json'))
  // Validate all archives before starting any registry writes.
  for (const pkg of release.packages) {
    if ((await digest(path.join(archiveDir, pkg.filename))) !== pkg.sha512) {
      throw new Error(`Archive checksum mismatch: ${pkg.filename}`)
    }
  }

  const results = await Promise.allSettled(
    release.packages.map(async (pkg) => {
      try {
        const { stdout } = await run('npm', [
          'view',
          `${pkg.name}@${release.version}`,
          'version',
          '--json'
        ])
        if (JSON.parse(stdout) === release.version) {
          console.log(`${pkg.name}@${release.version} already published; skipping`)
          return
        }
      } catch (error) {
        const message = [error.stdout, error.stderr, error.message].join('\n')
        if (!/E404|404 Not Found|No match found/.test(message)) throw error
      }
      await run(
        'npm',
        ['publish', path.join(archiveDir, pkg.filename), '--tag', release.npmTag],
        { stdio: 'inherit' }
      )
    })
  )
  const failed = results.flatMap((result, index) => {
    if (result.status !== 'rejected') return []
    console.error(release.packages[index].name, result.reason)
    return [release.packages[index].name]
  })
  if (failed.length) throw new Error(`Publish failed for packages: ${failed.join(', ')}`)
}

module.exports = { packRelease, publishRelease }

if (require.main === module) {
  const [releaseDir, outputDir] = process.argv.slice(2)
  if (!releaseDir || !outputDir)
    throw new Error('Release and archive directories are required')
  packRelease({ cwd: process.cwd(), releaseDir, outputDir }).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
