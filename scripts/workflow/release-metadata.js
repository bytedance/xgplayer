const fs = require('fs-extra')
const path = require('node:path')
const os = require('node:os')
const execa = require('execa')
const semver = require('semver')
const { getReleasePackages } = require('./release-packages')

function parseReleaseTag(tag) {
  const version = tag?.startsWith('v') ? tag.slice(1) : ''
  const parsed = semver.parse(version)
  if (!parsed || parsed.version !== version || parsed.build.length) {
    throw new Error(`Invalid release tag: ${tag}`)
  }
  const isStable = parsed.prerelease.length === 0
  const npmTag = isStable ? 'latest' : String(parsed.prerelease[0])
  if (
    !/^[a-zA-Z][0-9a-zA-Z-]*$/.test(npmTag) ||
    (!isStable && (npmTag === 'latest' || semver.validRange(npmTag)))
  ) {
    throw new Error(`Invalid prerelease channel: ${npmTag}`)
  }
  return { tag, version, isStable, npmTag }
}

function validateReleaseVersion({ metadata, tags, packageVersions }) {
  for (const tag of tags) {
    if (tag === metadata.tag) continue
    const version = tag.startsWith('v') ? tag.slice(1) : ''
    const parsed = semver.parse(version)
    if (!parsed || parsed.version !== version || parsed.build.length) continue
    const isStable = parsed.prerelease.length === 0
    const channel = isStable ? 'stable' : String(parsed.prerelease[0])
    if (!isStable && (metadata.isStable || channel !== metadata.npmTag)) {
      continue
    }
    if (!semver.gt(metadata.version, version)) {
      throw new Error(
        `Release version ${metadata.version} must be greater than existing ${channel} tag ${tag}`
      )
    }
  }

  for (const version of packageVersions) {
    if (!semver.valid(version)) {
      throw new Error(`Invalid public package version: ${version}`)
    }
    if (semver.lt(metadata.version, version)) {
      throw new Error(
        `Release version ${metadata.version} must not be lower than current package version ${version}`
      )
    }
  }
}

function updatePackageVersion(pkg, version, npmTag, packageNames) {
  const updated = JSON.parse(JSON.stringify(pkg))
  updated.version = version
  updated.publishConfig = { ...updated.publishConfig, tag: npmTag }
  for (const field of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies'
  ]) {
    for (const [name, range] of Object.entries(updated[field] || {})) {
      if (!packageNames.includes(name)) continue
      // Synchronize pinned versions; preserve open-ended compatibility ranges.
      const match = range.match(/^([~^]?)(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/)
      if (!match) {
        if (!semver.validRange(range)) {
          throw new Error(
            `Invalid internal dependency range: ${pkg.name} ${name}@${range}`
          )
        }
        continue
      }
      updated[field][name] = `${match[1]}${version}`
    }
  }
  return updated
}

async function prepareRelease({ cwd, tag, outputDir }) {
  const metadata = parseReleaseTag(tag)
  const git = (args, options = {}) => execa('git', args, { cwd, ...options })
  const { stdout: sourceSha } = await git(['rev-parse', `${tag}^{commit}`])
  const { stdout: head } = await git(['rev-parse', 'HEAD'])
  if (head !== sourceSha) throw new Error(`Release preparation must run at ${tag}`)

  const packages = getReleasePackages(cwd)
  if (!packages.length) throw new Error('No public release packages found')
  const packageManifests = await Promise.all(
    packages.map(async (pkg) => ({
      pkg,
      manifest: await fs.readJson(path.join(cwd, pkg.path, 'package.json'))
    }))
  )
  const { stdout: tagList } = await git(['tag', '--list', 'v*'])
  validateReleaseVersion({
    metadata,
    tags: tagList.split('\n').filter(Boolean),
    packageVersions: packageManifests.map(({ manifest }) => manifest.version)
  })

  const files = packages.flatMap((pkg) => [
    `${pkg.path}/package.json`,
    ...(metadata.isStable ? [`${pkg.path}/CHANGELOG.md`] : [])
  ])
  const { stdout: dirty } = await git(['status', '--porcelain', '--', ...files])
  if (dirty) throw new Error('Release metadata files must be clean before preparation')

  const names = packages.map((pkg) => pkg.name)
  for (const { pkg, manifest } of packageManifests) {
    const file = path.join(cwd, pkg.path, 'package.json')
    const updated = updatePackageVersion(
      manifest,
      metadata.version,
      metadata.npmTag,
      names
    )
    await fs.outputJson(file, updated, { spaces: 2 })
  }

  // The existing changelog command remains the only notes generator.
  const changelog = require('../commands/changelog')
  const result = await changelog({
    cwd,
    to: tag,
    releaseVersion: metadata.version,
    releaseNotes: path.join(outputDir, 'release-notes.md'),
    skipPackages: !metadata.isStable
  })

  const indexDir = await fs.mkdtemp(path.join(os.tmpdir(), 'xgplayer-release-index-'))
  try {
    const options = { env: { GIT_INDEX_FILE: path.join(indexDir, 'index') } }
    await git(['read-tree', 'HEAD'], options)
    await git(['add', '--', ...files], options)
    const { stdout: patch } = await git(
      ['diff', '--cached', '--binary', 'HEAD', '--', ...files],
      { ...options, stripFinalNewline: false }
    )
    await fs.outputFile(path.join(outputDir, 'metadata.patch'), patch)
  } finally {
    await fs.remove(indexDir)
  }

  const release = { ...metadata, sourceSha, fromTag: result.from, packages }
  await fs.outputJson(path.join(outputDir, 'release.json'), release, { spaces: 2 })
  return release
}

async function applyReleaseMetadata({ cwd, releaseDir, checkoutMain = false }) {
  const release = await fs.readJson(path.join(releaseDir, 'release.json'))
  if (!release.isStable)
    throw new Error('Only stable release metadata can be committed to main')
  const git = (args, options = {}) => execa('git', args, { cwd, ...options })
  if (checkoutMain) {
    await git(['fetch', 'origin', 'main'])
    await git(['switch', '--detach', 'origin/main'])
  }
  for (const pkg of release.packages) {
    const current = await fs.readJson(path.join(cwd, pkg.path, 'package.json'))
    if (semver.gt(current.version, release.version)) {
      throw new Error(`Refusing to downgrade ${pkg.name} from ${current.version}`)
    }
  }

  const patch = path.join(releaseDir, 'metadata.patch')
  if (!(await fs.readFile(patch, 'utf8')).trim()) return false
  const check = await git(['apply', '--check', patch], { reject: false })
  if (check.exitCode !== 0) {
    const reverse = await git(['apply', '--reverse', '--check', patch], { reject: false })
    if (reverse.exitCode === 0) return false
    throw new Error(`Release metadata conflicts with main:\n${check.stderr}`)
  }
  await git(['apply', patch])
  await git([
    'add',
    '--',
    ...release.packages.flatMap((pkg) => [
      `${pkg.path}/package.json`,
      `${pkg.path}/CHANGELOG.md`
    ])
  ])
  return true
}

module.exports = {
  prepareRelease,
  applyReleaseMetadata
}

if (require.main === module) {
  const [command, releaseDir] = process.argv.slice(2)
  const cwd = process.cwd()
  ;(async () => {
    if (!releaseDir) throw new Error('A release artifact directory is required')
    if (command === 'prepare') {
      const release = await prepareRelease({
        cwd,
        tag: process.env.TAG,
        outputDir: releaseDir
      })
      if (process.env.GITHUB_OUTPUT) {
        await fs.appendFile(
          process.env.GITHUB_OUTPUT,
          [
            `tag=${release.tag}`,
            `version=${release.version}`,
            `is_stable=${release.isStable}`,
            `npm_tag=${release.npmTag}`,
            `source_sha=${release.sourceSha}`,
            `from_tag=${release.fromTag}`,
            ''
          ].join('\n')
        )
      }
    } else if (command === 'apply') {
      await applyReleaseMetadata({ cwd, releaseDir, checkoutMain: true })
    } else {
      throw new Error(`Unknown release metadata command: ${command}`)
    }
  })().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
