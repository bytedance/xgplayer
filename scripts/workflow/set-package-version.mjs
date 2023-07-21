#!/usr/bin/env zx

import { getPackageVersion } from './get-package-version.mjs'
import path from 'path'
import versionHelper from './version-helper.mjs'
import semver from 'semver'
import blockList from './block-list.mjs'
const pkgDirs = path.resolve(__dirname, '../../packages')

// eslint-disable-next-line no-undef
const pkgNames = fs.readdirSync(pkgDirs).filter(name => !blockList.includes(name))

const version = getPackageVersion()

if (!version) {
  console.error('Failed to get a target version')
  process.exit(1)
}

for (let name of pkgNames) {
  const jsonFilePath = path.resolve(__dirname, '../../packages/' + name + '/package.json')

  // eslint-disable-next-line no-undef
  const pkgJson = await fs.readJson(jsonFilePath)
  pkgJson.version = version
  const tag = versionHelper.getVersionTag(versionHelper.addVersionPrefix(version))
  pkgJson.publishConfig = Object.assign(pkgJson.publishConfig, {
    tag: tag
  })
  const { dependencies = {}, devDependencies = {}, peerDependencies = {} } = pkgJson
  const updateDeps = (deps) => {
    Object.keys(deps).forEach((depName) => {
      if (pkgNames.includes(depName)) {
        const oriVer = semver.clean(deps[depName])
        deps[depName] = deps[depName].replace(oriVer, version)
      }
    })
  }

  updateDeps(dependencies)
  updateDeps(devDependencies)
  updateDeps(peerDependencies)

  // eslint-disable-next-line no-undef
  await fs.outputJson(
    jsonFilePath,
    pkgJson,
    {
      spaces: 2
    }
  )
}


