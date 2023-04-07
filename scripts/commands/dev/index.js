const os = require('os')
const path = require('path')
const { createServer } = require('vite')
const { cyan, bold } = require('colorette')
const { getBuildConfig } = require('../../utils')
const ctx = require('../../context')

async function dev (dir, p, open) {
  const replace = ctx.getReplace(ctx.config, undefined, true)
  let cfg = await getBuildConfig(true, { replace, plugins: ctx.config.plugins })
  cfg.build.sourcemap = !!ctx.config.devSourceMap
  if (p) cfg.server.port = p
  dir = dir || ''
  if (dir) {
    dir = '/' + path.relative(ctx.rootPath, path.resolve(ctx.rootPath, dir))
    if (!dir.endsWith('.html')) {
      const l = dir.length
      if (dir[l - 1] !== '/') dir += '/'
      dir += 'index.html'
    }
  }

  if (ctx.config.onDevProgress) {
    cfg.plugins.push({
      enforce: 'post',
      name: 'libd-dev-progress-hook',
      buildEnd () {
        setTimeout(() => {
          ctx.runDevProgress()
        })
      }
    })
  }

  if (open) {
    cfg.server.open = dir || true
  }
  cfg = ctx.runPreDev(cfg) || cfg
  const server = await createServer(cfg)
  await server.listen()

  const protocol = server.config.server?.https ? 'https' : 'http'
  const port = server.httpServer.address().port
  console.log()
  Object.values(os.networkInterfaces())
    .flatMap((nInterface) => nInterface ?? [])
    .filter((detail) => detail && detail.address && detail.family === 'IPv4')
    .forEach((detail) => {
      const type = detail.address.includes('127.0.0.1') ? 'Local:   ' : 'Network: '
      const url = `${protocol}://${detail.address}:${bold(port)}${dir}`
      console.log(`  > ${type} ${cyan(url)}`)
    })
  console.log()
  ctx.runPostDev()
}

module.exports = dev
