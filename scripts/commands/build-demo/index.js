const path = require('path')
const fs = require('fs-extra')
const { cyan } = require('colorette')
const { build: viteBuild } = require('vite')
const logger = require('../../utils/logger')
const ctx = require('../../context')
const { getBuildConfig } = require('../../utils')

async function main (dir) {
  if (!dir) {
    logger.error('Demo `dir` is required')
    return
  }

  const demoPath = path.resolve(ctx.rootPath, dir)
  const demoIndex = path.join(demoPath, 'index.html')

  if (!fs.existsSync(demoIndex)) {
    logger.error('Cannot found `index.html`')
    return
  }

  const distDir = path.join(demoPath, 'dist')
  const publicDir = path.join(demoPath, 'public')
  const pkgPath = path.join(demoPath, 'package.json')
  let pkgInfo
  if (fs.existsSync(pkgPath)) {
    pkgInfo = require(pkgPath)
  }
  process.env.BROWSERSLIST_CONFIG = pkgInfo?.browserslist ? pkgPath : ctx.rootPkgPath

  const config = ctx.getConfig(pkgInfo)
  const replace = ctx.getReplace(config, pkgInfo, false)

  fs.removeSync(distDir)

  const cfg = await getBuildConfig(false, {
    legacy: false,
    needPolyfills: false,
    replace: { ...replace, __DEV__: false },
    cssPreprocessorOptions: config.cssPreprocessorOptions,
    plugins: config.plugins
  })

  cfg.base = './'
  cfg.root = demoPath
  cfg.publicDir = publicDir
  cfg.build.target = 'es2015'
  cfg.build.outDir = distDir
  cfg.build.sourcemap = !!config.prodSourceMap
  cfg.build.rollupOptions = { input: demoIndex }

  ctx.runPreBuildDemo(cfg, dir, pkgInfo)

  console.log(`Building demo ${cyan(dir)}`)

  await viteBuild(cfg)
}

module.exports = main
