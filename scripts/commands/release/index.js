const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const semver = require('semver')
const { prompt } = require('enquirer')
const build = require('../build')
const ctx = require('../../context')
const { logger } = require('../../utils')

const versions = [['prerelease', 'alpha'], ['prerelease', 'beta'], ['prerelease', 'rc'], ['patch'], ['minor'], ['major']]
const verIndex = { alpha: 0, beta: 1, rc: 2 }

async function main (skipLint, skipTest, skipBuild, skipPublish, buildScript) {
  const [allPackages, pkgGroups] = getPkgGroups()

  if (ctx.isMonorepo) checkGroup(pkgGroups)

  const rootPkgInfo = require(ctx.rootPkgPath)

  if (run('git', ['status', '--porcelain'], { stdio: 'pipe' })) {
    logger.warning('Git working directory is NOT clean')
  }

  logger.warning(`Current branch is ${run('git', ['branch', '--show-current'], { stdio: 'pipe' })}`)

  let group
  if (ctx.isMonorepo) {
    const ret = await prompt({
      type: 'autocomplete',
      name: 'group',
      message: 'Select release group',
      choices: Object.entries(pkgGroups).map(([name, items]) => `${name}${(items.length - 1) ? ` (${items.length})` : ''}`)
    })
    group = ret.group.match(/^([^\s]+)\s?/)[1]
  } else {
    rootPkgInfo.__path = ctx.rootPath
    group = rootPkgInfo.name.split('/').pop()
  }

  const packages = ctx.isMonorepo ? pkgGroups[group] : [rootPkgInfo]
  const currentVersion = packages[0].version
  const prerelease = semver.prerelease(currentVersion) || []
  const preId = prerelease[0] || 'alpha'
  const preIndex = verIndex[preId]
  if (preIndex === null) versions.unshift(['prerelease', preId])

  const inc = (i, pre) => semver.inc(currentVersion, i, pre)
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: `Select release type (${currentVersion})`,
    choices: ['custom'].concat(versions.slice(preIndex || 0).map(([x, pre]) => `${x} (${inc(x, pre)})`))
  })
  let targetVersion = ''
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }
  if (!semver.valid(targetVersion)) {
    return logger.error(`Invalid target version: ${targetVersion}`)
  }

  let { npmTag = ''} = await prompt({
    type: 'input',
    name: 'npmTag',
    message: 'Input npm tag',
    initial: (semver.prerelease(targetVersion) || [])[0] || 'latest'
  })
  npmTag = npmTag.trim()

  const { yes } = await prompt({
    type: 'toggle',
    name: 'yes',
    initial: 'y',
    message: `(${packages.map(x => x.name)}) ${currentVersion} -> ${targetVersion}. Confirm?`
  })
  if (!yes) return

  if (!skipLint && rootPkgInfo.scripts.lint) {
    logger.step('\nRunning lint...')
    run('yarn', ['lint'])
  }

  if (!skipTest && rootPkgInfo.scripts.test) {
    logger.step('\nRunning tests...')
    run('yarn', ['test'])
  }

  logger.step('\nUpdating versions...')
  updateVersions(targetVersion, npmTag, packages, allPackages)

  if (!skipBuild) {
    if (buildScript) {
      logger.step('\nBuilding')
      run('yarn', [buildScript])
    } else {
      await buildPackages(packages)
    }
  }

  if (rootPkgInfo.scripts.changelog) {
    run('yarn', ['changelog'])
    await prompt({
      type: 'toggle',
      name: 'yes',
      initial: 'y',
      message: 'Please update CHANGELOG.md'
    })
  }

  if (!skipPublish) {
    const { publishYes } = await prompt({
      type: 'toggle',
      name: 'publishYes',
      initial: 'y',
      message: `Publish (${packages.map(x => x.name)}) ${currentVersion} -> ${targetVersion}. Confirm?`
    })
    if (!publishYes) return

    logger.step('\nPublishing packages...')
    publishPackages(packages, npmTag)
  }

  const gitTag = `${group}@${targetVersion}`
  const { gitYes } = await prompt({
    type: 'toggle',
    name: 'gitYes',
    initial: 'y',
    message: `Create tag: ${gitTag}, commit and push to origin. Confirm?`
  })
  if (!gitYes) return

  const branchName = `release-${gitTag}`
  logger.step('\nPushing to remote git origin...')
  run('git', ['add', '-A'])
  run('git', ['commit', '-m', `release: ${gitTag}`])
  run('git', ['checkout', '-b', branchName])
  run('git', ['tag', gitTag])
  run('git', ['push', 'origin', `refs/tags/${gitTag}`])
  run('git', ['push', 'origin', branchName])

  logger.success('\nDone\n')
}

function getPkgGroups () {
  if (!ctx.isMonorepo) return [[], {}]
  const allPackages = ctx.getAllPublicPkgs()
  return [allPackages, allPackages.reduce((ret, pkg) => {
    const config = ctx.getConfig(pkg)
    const group = config.group || pkg.name
    ret[group] = ret[group] || []
    ret[group].push(pkg)
    return ret
  }, Object.create(null))]
}

async function buildPackages (packages) {
  for await (const p of packages) {
    logger.step(`\nBuilding ${p.name}`)
    await build(p.__dir)
  }
}

function updateVersions (version, npmTag, packages, allPackages) {
  const packagesMap = packages.reduce((ret, c) => { ret[c.name] = c; return ret }, {})
  const allPackageMap = allPackages.reduce((ret, c) => {
    ret[c.name] = c
    // update to be released version
    // dependencies or peerDependencies may use the version
    if (packagesMap[c.name]) c.version = version
    return ret
  }, {})

  packages.forEach(pkg => {
    const filePath = path.resolve(pkg.__path, 'package.json')
    const pkgObj = fs.readJsonSync(filePath)
    pkgObj.version = version
    pkgObj.publishConfig = pkgObj.publishConfig || {}
    pkgObj.publishConfig.tag = npmTag
    const libdConfig = pkgObj.libd || {}
    if (ctx.isMonorepo) {
      if (pkgObj.peerDependencies && !libdConfig.closeUpdatePeerDeps) {
        Object.keys(pkgObj.peerDependencies).forEach(d => {
          if (allPackageMap[d]) {
            const oriVer = semver.clean(pkgObj.peerDependencies[d])
            if (oriVer !== allPackageMap[d].version) {
              logger.warning(`${pkg.name}: Change peerDeps ${allPackageMap[d].name} ${oriVer} -> ${allPackageMap[d].version}`)
              pkgObj.peerDependencies[d] = allPackageMap[d].version
            }
          }
        })
      }
      if (pkgObj.dependencies) {
        Object.keys(pkgObj.dependencies).forEach(d => {
          if (allPackageMap[d]) {
            const oriVer = semver.clean(pkgObj.dependencies[d])
            if (oriVer !== allPackageMap[d].version) {
              logger.warning(`${pkg.name}: Change deps ${allPackageMap[d].name} ${oriVer} -> ${allPackageMap[d].version}`)
              pkgObj.dependencies[d] = allPackageMap[d].version
            }
          }
        })
      }
    }
    logger.success(`Update version: ${pkgObj.name}@${version}`)
    fs.writeJsonSync(filePath, pkgObj, { spaces: 2 })
  })
}

function publishPackages (packages, tag) {
  packages.forEach(pkg => {
    const p = fs.readJsonSync(path.resolve(pkg.__path, 'package.json'))
    logger.info(`\nPublishing ${pkg.name} ${tag ? `with tag: ${tag}` : ''}\n`)
    ctx.runPrePublish(pkg.__dir, p)
    run('npm', ['publish', ...(tag ? ['--tag', tag] : [])], { cwd: pkg.__path })
    ctx.runPostPublish(pkg.__dir, p)
  })
}

function checkGroup (pkgGroups) {
  if (!Object.keys(pkgGroups).length) {
    logger.error('No public package')
    process.exit(1)
  }
  Object.entries(pkgGroups).forEach(([groupName, items]) => {
    const ver = items[0].version
    items.forEach(({ version, name }) => {
      if (ver !== version) {
        logger.error(`${groupName}: ${name} version is not uniform`)
        process.exit(1)
      }
    })
  })
}

function run (file, args, opts) {
  return execa.sync(file, args, { stdio: 'inherit', ...opts }).stdout
}

main.buildPackages = buildPackages

module.exports = main
