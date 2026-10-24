const path = require('node:path')
const fs = require('fs-extra')
const execa = require('execa')
const semver = require('semver')
const ctx = require('../../context')
const { getReleasePackages } = require('../../workflow/release-packages')

const RELEASE_NOTE_PATTERN = /^Release note(?:[ \t]*\(([^)\r\n]+)\))?:[ \t]*(.+)$/im
const TYPE_BY_RELEASE_NOTE = {
  'bug fix': 'fix',
  feature: 'feat',
  performance: 'perf'
}
const SECTION_ORDER = [
  'BREAKING CHANGES',
  'Features',
  'Bug Fixes',
  'Performance Improvements',
  'Reverts',
  'Code Refactoring',
  'Documentation',
  'Styles',
  'Tests',
  'Build System',
  'Continuous Integration',
  'Maintenance'
]

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractReleaseNote(commit) {
  const match = `${commit.body || ''}\n${commit.footer || ''}`.match(RELEASE_NOTE_PATTERN)
  if (!match) return
  const subject = match[2].trim()
  if (!subject || /^N\/A$/i.test(subject)) return

  return {
    type: TYPE_BY_RELEASE_NOTE[match[1]?.toLowerCase()] || commit.type,
    subject
  }
}

function findVersionEntry(content, version, packageName = '') {
  const names = packageName ? `(?:${escapeRegExp(packageName)}@)?` : ''
  const heading = new RegExp(
    `^(#{1,3})[ \\t]+(?:\\[)?${names}v?${escapeRegExp(version)}(?:\\])?(?=[ \\t\\r\\n(]|$)[^\\r\\n]*`,
    'm'
  )
  const match = heading.exec(content)
  if (!match) return

  const afterHeading = match.index + match[0].length
  const nextHeading = new RegExp(`^#{1,${match[1].length}}[ \\t]+`, 'm').exec(
    content.slice(afterHeading)
  )
  return {
    start: match.index,
    end: nextHeading ? afterHeading + nextHeading.index : content.length
  }
}

function prependEntry(content, entry) {
  const history = content.replace(/^# [^\n]*(?:\r?\n|$)/, '').trim()
  return `# Changelog\n\n${entry.trim()}\n${history ? `\n${history}\n` : ''}`
}

function formatEntry(entry) {
  const [header, ...sections] = entry.trim().split(/\n### /)
  if (!sections.length) return `${header.trim()}\n`

  sections.sort((a, b) => {
    const rank = (section) => {
      const index = SECTION_ORDER.indexOf(section.split('\n')[0])
      return index < 0 ? SECTION_ORDER.length : index
    }
    return rank(a) - rank(b)
  })
  return `${header.trim()}\n\n${sections.map((section) => `### ${section.trim()}`).join('\n\n')}\n`
}

function selectPreviousTag(tags, version) {
  const current = semver.parse(version)
  if (!current) throw new Error(`Invalid release version: ${version}`)

  return tags
    .map((tag) => ({ tag, version: semver.parse(tag.replace(/^v/, '')) }))
    .filter(({ version: candidate }) => {
      if (!candidate || !semver.lt(candidate, current)) return false
      return current.prerelease.length > 0 || candidate.prerelease.length === 0
    })
    .sort((a, b) => semver.rcompare(a.version, b.version))[0]?.tag
}

async function listVersionTags(cwd) {
  const { stdout } = await execa('git', ['tag', '--list', 'v*'], { cwd })
  return stdout.split('\n').filter(Boolean)
}

async function refExists(cwd, ref) {
  try {
    await execa('git', ['rev-parse', '--verify', `${ref}^{commit}`], { cwd })
    return true
  } catch {
    return false
  }
}

async function resolveRange({ cwd, from, to, version }) {
  const versionTag = `v${version}`
  const target = to || ((await refExists(cwd, versionTag)) ? versionTag : 'HEAD')
  if (!(await refExists(cwd, target))) {
    throw new Error(`Unknown release ref: ${target}`)
  }

  const previous = from || selectPreviousTag(await listVersionTags(cwd), version)
  if (!previous) {
    throw new Error(`No previous release tag found for ${version}`)
  }
  await execa('git', ['rev-parse', '--verify', `${previous}^{commit}`], { cwd })

  const { stdout: date } = await execa('git', ['show', '-s', '--format=%cs', target], {
    cwd
  })
  return {
    from: previous,
    to: target,
    currentTag: to || versionTag,
    date
  }
}

function repositoryContext(rootPkg) {
  const repositoryUrl = rootPkg.repository?.url || ''
  const match = repositoryUrl.match(/github\.com[/:]([^/]+)\/([^/.]+)(?:\.git)?$/)
  if (!match) return {}

  return {
    host: 'https://github.com',
    owner: match[1],
    repository: match[2],
    commit: 'commit',
    issue: 'issues',
    linkCompare: true
  }
}

async function generateEntry({
  cwd,
  from,
  to,
  currentTag = to,
  version,
  date,
  packagePath,
  rootPkg
}) {
  const { ConventionalChangelog, defaultCommitTransform } = await import(
    'conventional-changelog'
  )
  const { default: createAngularPreset } = await import('conventional-changelog-angular')
  const preset = createAngularPreset()
  const generator = new ConventionalChangelog(cwd)
    .config(preset)
    .commits({ from, to, path: packagePath })
    .context({
      ...repositoryContext(rootPkg),
      version,
      previousTag: from,
      currentTag,
      date
    })
    .options({
      transformCommit: (commit, params) => {
        const patch = defaultCommitTransform(commit, params)
        const releaseNote = extractReleaseNote(commit)
        return releaseNote ? { ...patch, ...releaseNote } : patch
      }
    })
    .writer({
      // The explicit range is one release, including any prerelease tags within it.
      generateOn: null,
      doFlush: true,
      headerPartial: (context) =>
        preset.writer.headerPartial({ ...context, isPatch: true }),
      template: (context) => preset.writer.template(context).replace(/^\* /gm, '- ')
    })

  let entry = ''
  for await (const chunk of generator.write()) {
    entry += chunk
  }
  if (/\n### /.test(entry)) return formatEntry(entry)
  return `${entry.trim()}\n\n### Maintenance\n\n- No user-facing changes.\n`
}

function getPublicPackages(cwd) {
  return getReleasePackages(cwd).map((pkg) => ({
    ...fs.readJsonSync(path.join(cwd, pkg.path, 'package.json')),
    __path: path.join(cwd, pkg.path)
  }))
}

async function writePackageEntry({ pkg, entry, version, dryRun }) {
  const changelogPath = path.join(pkg.__path, 'CHANGELOG.md')
  const content = await fs.readFile(changelogPath, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return ''
    throw error
  })
  const existing = findVersionEntry(content, version, pkg.name)
  const history = existing ? content.slice(existing.end) : ''
  const updated = existing
    ? `${content.slice(0, existing.start)}${entry.trim()}\n${history ? `\n${history}` : ''}`
    : prependEntry(content, entry)
  if (updated === content) {
    return { file: changelogPath, changed: false }
  }

  if (!dryRun) {
    await fs.outputFile(changelogPath, updated)
  }
  return { file: changelogPath, changed: true }
}

async function main({
  cwd = ctx.rootPath,
  from,
  to,
  releaseVersion,
  releaseNotes,
  skipPackages = false,
  single = false,
  dryRun = false
} = {}) {
  const packages = getPublicPackages(cwd)
  const rootPkg = await fs.readJson(path.join(cwd, 'package.json'))
  const version = releaseVersion || packages[0]?.version
  if (!version || !semver.valid(version)) {
    throw new Error(`Invalid release version: ${version || '(missing)'}`)
  }
  if (packages.some((pkg) => pkg.version !== packages[0].version) && !releaseVersion) {
    throw new Error(
      'Public package versions are not uniform; pass --releaseVersion explicitly'
    )
  }

  const range = await resolveRange({
    cwd,
    from,
    to,
    version
  })
  const rootEntry = await generateEntry({
    cwd,
    ...range,
    version,
    rootPkg
  })

  if (releaseNotes) {
    await fs.outputFile(path.resolve(releaseNotes), rootEntry)
  } else if (single || dryRun) {
    process.stdout.write(rootEntry)
  }

  const changed = []
  if (!skipPackages && !single && !semver.prerelease(version)) {
    for (const pkg of packages) {
      const entry = await generateEntry({
        cwd,
        ...range,
        version,
        packagePath: path.relative(cwd, pkg.__path),
        rootPkg
      })
      const result = await writePackageEntry({ pkg, entry, version, dryRun })
      if (result.changed) changed.push(result.file)
    }
  }

  return {
    ...range,
    version,
    changed,
    releaseNotes: rootEntry
  }
}

module.exports = main
