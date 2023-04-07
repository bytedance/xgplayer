const path = require('path')
const fs = require('fs-extra')
const changelog = require('conventional-changelog')
const addStream = require('add-stream')
const ctx = require('../../context')

function gChangelog (input, s, pkg) {
  let gitCfg
  if (!s) {
    gitCfg = { path: input }
  }

  const changelogStream = changelog({
    preset: 'angular',
    pkg: {
      path: path.resolve(input, 'package.json')
    }
  }, undefined, gitCfg).on('error', function (err) {
    console.error(err.toString())
    process.exit(1)
  })

  const changelogPath = path.resolve(input, 'CHANGELOG.md')
  const inputExist = fs.existsSync(changelogPath)

  if (inputExist) {
    if (pkg) {
      const data = fs.readFileSync(changelogPath).toString().slice(0, 100)
      if (data.includes(`# ${pkg.version} `) || data.includes(`${pkg.name}@${pkg.version}`)) {
        return
      }
    }
    const tmp = path.resolve(input, '.changelog_temp')
    changelogStream
      .pipe(addStream(fs.createReadStream(changelogPath)))
      .pipe(fs.createWriteStream(tmp))
      .on('finish', function () {
        fs.createReadStream(tmp)
          .pipe(fs.createWriteStream(changelogPath))
          .on('finish', () => fs.removeSync(tmp))
      })
  } else {
    changelogStream
      .pipe(fs.createWriteStream(changelogPath))
  }

}

function main (s) {
  if (ctx.isMonorepo && !s) {
    Object.keys(ctx.pkgs).forEach(k => {
      gChangelog(ctx.pkgs[k].path, false, ctx.pkgs[k].pkg)
    })
  } else {
    gChangelog(ctx.rootPath, true)
  }
}

module.exports = main
