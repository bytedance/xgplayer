const path = require('path')
const fs = require('fs-extra')
const ctx = require('../../context')
const logger = require('../../utils/logger')

function link () {
  if (!ctx.isMonorepo) return

  let write = false
  Object.values(ctx.pkgs).forEach(x => {
    const p = path.resolve(x.path, 'tsconfig.json')
    if (fs.existsSync(p)) {
      const c = require(p)
      c.extends = '../../tsconfig.settings.json'
      c.compilerOptions = c.compilerOptions || {}
      c.compilerOptions.baseUrl = '.'
      logger.info(`update ${x.dir} tsconfig.json`)
      fs.writeFileSync(p, JSON.stringify(c, null, 2))
      write = true
    } else {
      logger.warning(`ignore: ${x.dir}/tsconfig.json`)
    }
  })

  if (write) {
    const tsSettingPath = path.resolve(ctx.rootPath, 'tsconfig.settings.json')
    let rootSetting = {}
    if (fs.existsSync(tsSettingPath)) {
      rootSetting = require(tsSettingPath)
    } else {
      logger.info('create tsconfig.settings.json')
    }

    const nameMap = Object.values(ctx.pkgs).reduce((p, c) => {
      p[c.pkg.name] = [`../${c.dir}/src`]
      return p
    }, {})

    rootSetting.compilerOptions = rootSetting.compilerOptions || {}
    rootSetting.compilerOptions.paths = Object.assign({
      '@/*': ['src/*'],
      ...nameMap
    }, rootSetting.compilerOptions.paths)
    rootSetting.compilerOptions.types = rootSetting.compilerOptions.types || []
    if (!rootSetting.compilerOptions.types.includes('libd/client')) {
      rootSetting.compilerOptions.types.push('libd/client')
    }

    fs.writeFileSync(tsSettingPath, JSON.stringify(rootSetting, null, 2))
  }

}

module.exports = link
