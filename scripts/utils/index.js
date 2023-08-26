const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const ctx = require('../context')

function getUmdName (pkg, config) {
  return config.umdName || pkg.name
}

function getJsEntry (pkgDir, isTs) {
  const esIndex = path.resolve(pkgDir, 'src/index' + (isTs ? '.ts' : '.js'))
  let entryFileJsUmd = path.resolve(pkgDir, 'src/index.umd' + (isTsUmdEntry(pkgDir) ? '.ts' : '.js'))
  entryFileJsUmd = fs.existsSync(entryFileJsUmd) ? entryFileJsUmd : esIndex

  return [esIndex, entryFileJsUmd]
}

function getUmdGlobals (peerDependencies, custom) {
  let globals = {}
  if (peerDependencies.length && ctx.isMonorepo) {
    const pkgNames = Object.values(ctx.pkgs).reduce((ret, p) => {
      try {
        ret[p.pkg.name] = getUmdName(p.pkg, ctx.getConfig(p.pkg))
      } catch (error) {
        // ignore
      }
      return ret
    }, {})

    globals = peerDependencies.reduce((ret, c) => {
      if (pkgNames[c]) {
        ret[c] = pkgNames[c]
      }
      return ret
    }, {})
  }
  return Object.assign(globals, custom)
}

function isTsUmdEntry (folder) {
  return fs.existsSync(path.resolve(folder, 'src/index.umd.ts'))
}

let pkgM
function installPkgs (pkgs) {
  if (!pkgs || !pkgs.length) return
  if (!pkgM) {
    try {
      execa.sync('yarnpkg', ['--version'])
      pkgM = 'yarn'
    } catch (e) {
      pkgM = 'npm'
    }
  }

  const isWorkspaces = !!require(path.resolve(process.cwd(), 'package.json')).workspaces
  const args = pkgM === 'yarn' ? ['add', isWorkspaces ? '-W' : '', '-D', ...pkgs] : ['i', '-D', ...pkgs]

  execa.sync(pkgM, args.filter(Boolean), {
    stdio: 'inherit',
    cwd: process.cwd()
  })
}

function splitSubArrays (inputArray, max = 4) {
  if (!Array.isArray(inputArray)) {
    throw new TypeError('输入必须是一个数组')
  }

  const outputArray = []

  for (const subArray of inputArray) {
    if (!Array.isArray(subArray)) {
      throw new TypeError('输入数组的子项必须是数组')
    }

    if (subArray.length > max) {
      for (let i = 0; i < subArray.length; i += max) {
        outputArray.push(subArray.slice(i, i + max))
      }
    } else {
      outputArray.push(subArray)
    }
  }

  return outputArray
}


module.exports = {
  installPkgs,
  logger: require('./logger'),
  getUmdName,
  getJsEntry,
  getUmdGlobals,
  isTsUmdEntry,
  splitSubArrays,
  ...require('./config')
}
