const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { createServer } = require('vite')
const { build } = require('esbuild')
const { getBuildConfig } = require('../../scripts/utils')
const ctx = require('../../scripts/context')
const { prepareRuntime } = require('../../packages/xgplayer-ffmpeg/prepare-runtime.cjs')

async function main() {
  const cfg = await getBuildConfig(true, {
    replace: ctx.getReplace(ctx.config, undefined, true),
    plugins: ctx.config.plugins
  })
  cfg.cacheDir = path.join(os.tmpdir(), 'xgplayer-ffmpeg-demo', 'vite-cache')
  cfg.optimizeDeps = { entries: ['fixtures/ffmpeg/index.html'] }
  cfg.server.host = '127.0.0.1'
  cfg.server.port = Number(process.env.FFMPEG_PORT || 8081)
  cfg.server.strictPort = true
  const directories = {
    core: process.env.FFMPEG_RUNTIME || (await prepareRuntime())
  }
  const worker = await build({
    entryPoints: [
      path.resolve(__dirname, '../../packages/xgplayer-ffmpeg/src/worker/index.ts')
    ],
    bundle: true,
    format: 'esm',
    write: false
  })
  cfg.plugins.push({
    name: 'ffmpeg-runtime-assets',
    configureServer(server) {
      // Vite 2 injects DOM-dependent HMR helpers into dynamic Worker imports.
      // Serve the prepared runtime directly without Vite HMR transformation.
      server.middlewares.use('/ffmpeg-runtime', (request, response, next) => {
        if (request.url === '/worker.js') {
          response.setHeader('Content-Type', 'text/javascript')
          return response.end(worker.outputFiles[0].text)
        }
        const match = /^\/(core)\/([\w-]+\.(?:js|wasm))$/.exec(request.url || '')
        if (!match) return next()
        const filename = path.join(directories[match[1]], match[2])
        if (!fs.existsSync(filename)) return next()
        response.setHeader(
          'Content-Type',
          filename.endsWith('.wasm') ? 'application/wasm' : 'text/javascript'
        )
        if (request.method === 'HEAD') return response.end()
        fs.createReadStream(filename)
          .on('error', (error) => response.destroy(error))
          .pipe(response)
      })
    }
  })
  const server = await createServer(cfg)
  await server.listen()
  console.log(`http://127.0.0.1:${cfg.server.port}/fixtures/ffmpeg/index.html`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
