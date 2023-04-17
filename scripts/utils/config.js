const path = require('path')
const fs = require('fs-extra')
const react = require('@vitejs/plugin-react')
const { viteExternalsPlugin } = require('vite-plugin-externals')
const { visualizer: visualizerPlugin } = require('rollup-plugin-visualizer')
const { resolveConfig } = require('vite')
const legacy = require('./legacy')
const ctx = require('../context')
const logger = require('./logger')

function loadPkg (pkg, p) {
  return {
    find: pkg.name,
    replacement: path.join(p, 'src')
  }
}
function loadProject (p) {
  const rootPkgPath = path.resolve(p, 'package.json')
  if (!fs.existsSync(rootPkgPath)) {
    logger.warning(`${p} is not libd project`)
    return
  }
  const pkgsPath = path.resolve(p, 'packages')
  if (fs.existsSync(pkgsPath)) {
    return fs.readdirSync.map(x => {
      const projectPath = path.resolve(pkgsPath, x)
      return loadPkg(require(path.join(projectPath, 'package.json')), projectPath)
    })
  } else {
    return [loadPkg(require(rootPkgPath), p)]
  }
}
function checkFileExist (p, suffixes) {
  let pa
  for (let i = 0, l = suffixes.length; i < l; i++) {
    pa = p + suffixes[i]
    if (fs.existsSync(pa)) return pa
  }
}

const aliasCache = {}
const alias = Object.keys(ctx.pkgs).map(k => ({
  find: k,
  replacement: path.resolve(ctx.pkgs[k].path, 'src')
}))
if (ctx.config.projects) {
  ctx.config.projects.forEach(p => {
    p = path.resolve(ctx.rootPath, p)
    if (!fs.existsSync(p)) {
      logger.warning(`Project ${p} is not exist`)
      return
    }
    const projects = loadProject(p)
    if (projects) {
      alias.push(...projects)
    }
  })
}
alias.push({
  find: /^@\/(.*)/,
  replacement: '$1',
  customResolver (a, b) {
    const p = b.slice(0, b.lastIndexOf('/src/')) + '/src/' + a
    let ret = aliasCache[p]
    if (ret && fs.existsSync(ret)) return ret

    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      ret = p
    } else {
      ret = checkFileExist(p, ['.js', '.ts', '/index.js', '/index.ts', '.tsx', '/index.tsx', '.jsx', '/index.jsx'])
    }

    aliasCache[p] = ret
    return ret
  }
})

let hasReact = false
try {
  hasReact = !!require('react')
} catch (error) {
  // ignore
}

const sassImporter = (url) => {
  if (
    url.startsWith('.') || url.startsWith('url') || url.startsWith('http')
  ) {
    return null
  }
  const cleanUrl = url.startsWith('~') ? url.replace('~', '') : url
  try {
    const resolved = require.resolve(cleanUrl)
    return { file: resolved }
  } catch (e) {
    return null
  }
}

const assetCache = new Map()

async function getBuildConfig (isDev, cfg = {}, isEs) {
  let viteTerser
  let viteWorker

  const cssOpts = cfg.cssPreprocessorOptions || {}
  cssOpts.scss = cssOpts.scss || {}
  if (!cssOpts.scss.importer) cssOpts.scss.importer = sassImporter

  /**
   * @type {import('vite').UserConfig}
   */
  const c = {
    configFile: false,
    root: ctx.rootPath,
    define: cfg.replace,
    mode: isDev ? 'development' : 'production',
    logLevel: 'warn',
    publicDir: false,
    server: isDev
      ? {
        host: '0.0.0.0',
        fs: {
          strict: false
        },
        ...ctx.config.server
      }
      : undefined,
    resolve: {
      alias
    },
    css: {
      preprocessorOptions: cssOpts,
      postcss: isDev ? undefined : { plugins: [require('autoprefixer')()] }
    },
    build: {
      polyfillModulePreload: false,
      reportCompressedSize: false,
      emptyOutDir: false,
      assetsInlineLimit: 81920
    },
    plugins: [
      {
        name: 'libd:svg',
        enforce: 'pre',
        transform: (_, id) => {
          if (path.extname(id) !== '.svg') return null
          if (!assetCache.get(id)) {
            assetCache.set(id, {
              code: `
              export default function() {
                return (new DOMParser().parseFromString(${JSON.stringify(fs.readFileSync(id, { encoding: 'utf-8' }))}, 'image/svg+xml')).firstChild;
              };
              `,
              map: { mappings: '' }
            })
          }
          return assetCache.get(id)
        }
      },
      hasReact ? react() : undefined,
      cfg.banner
        ? {
          name: 'libd:banner',
          enforce: 'post',
          generateBundle (_, bundle) {
            Object.values(bundle).forEach(x => {
              if (x.code) {
                x.code = cfg.banner + '\n' + x.code
              }
            })
          }
        }
        : undefined,
      // Vite Externals
      cfg.externals ? viteExternalsPlugin(cfg.externals) : undefined,
      (isDev || !cfg.legacy) ? undefined : legacy({ needPolyfills: cfg.needPolyfills, exclude: cfg.babelExclude }),
      isDev
        ? undefined
        : {
          name: 'libd-worker',
          enforce: 'pre',
          configResolved (c) {
            if (viteTerser) {
              const i = c.worker.plugins.findIndex(x => x.name === 'vite:terser')
              if (i >= 0) {
                c.worker.plugins[i] = viteTerser
              } else {
                c.worker.plugins.push(viteTerser)
              }
            }
            if (viteWorker) {
              const i = c.plugins.findIndex(x => x.name === 'vite:worker')
              if (i >= 0) {
                c.plugins[i] = viteWorker
              }
            }
          }
        },
      // Rollup Visualizer Plugin
      cfg.visualizer && !isDev && !isEs ? visualizerPlugin(typeof cfg.visualizer === 'object' ? cfg.visualizer : undefined) : undefined,
      ...cfg.plugins
    ].filter(Boolean),
    worker: {
      plugins: [
        !isDev ? legacy({ exclude: cfg.babelExclude }) : undefined
      ].filter(Boolean),
      rollupOptions: {
        external: [],
        output: {
          sourcemap: false
        }
      }
    }
  }

  if (!isDev) {
    const workerConfig = await resolveConfig({
      ...c,
      command: 'build',
      build: {
        ...c.build,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
          output: { comments: false }
        }
      }
    }, 'build', 'production')

    if (isEs) {
      viteTerser = workerConfig.plugins.find(x => x.name === 'vite:terser')
    } else {
      viteWorker = workerConfig.plugins.find(x => x.name === 'vite:worker')
    }
  }

  return c
}

/**
 * @returns {import('vite').UserConfig}
 */
async function getEsBuildConfig (pkgDir, target, input, allExternal, c) {
  let viteConfig
  const cssRE = /(?:s[ac]ss|less|css)$/
  const emptyCssRE = /\/\*\sempty\scss\s+\*\//g
  /**
   * @type {import('vite').UserConfig}
   */
  const cfg = await getBuildConfig(false, c, true)
  cfg.build.minify = false
  cfg.plugins.push({
    name: 'libd-css-es',
    transform (a, b) {
      if (!cssRE.test(b)) return
      let p = path.relative(pkgDir, b).replace('src/', 'es/')
      const i = p.lastIndexOf('.')
      if (i > -1) {
        p = path.resolve(pkgDir, p.slice(0, i) + '.css')
      }
      fs.outputFileSync(p, a)
    },
    generateBundle (_, bundle) {
      Object.keys(bundle).forEach(k => {
        if (cssRE.test(k)) {
          delete bundle[k]
        }
      })
    },
    configResolved (resolvedConfig) {
      viteConfig = resolvedConfig
    },
    options () {
      // hack inline svg
      viteConfig.build.lib = true
    }
  })
  cfg.plugins.push({
    name: 'libd-css-es-post',
    enforce: 'post',
    generateBundle (_, bundle) {
      Object.keys(bundle).forEach(k => {
        if (bundle[k].type === 'chunk') {
          bundle[k].code = bundle[k].code.replace(emptyCssRE, '')
        }
      })
    }
  })
  cfg.build.rollupOptions = {
    external: allExternal,
    input,
    preserveEntrySignatures: 'strict',
    output: {
      manualChunks: undefined,
      format: 'es',
      dir: path.resolve(pkgDir, 'es'),
      preserveModules: true,
      preserveModulesRoot: ctx.isMonorepo ? `packages/${target}/src` : 'src',
      entryFileNames: '[name].js',
      assetFileNames: '[name][extname]',
      sanitizeFileName (name) {
        // commonjs plugin add query suffix
        // @see https://github.com/rollup/plugins/blob/master/packages/commonjs/src/helpers.js#L5
        if (name.includes('.js?')) name += '.js'
        // rollup default behavior
        const match = /^[a-z]:/i.exec(name)
        const driveLetter = match ? match[0] : ''
        name = driveLetter + name.substr(driveLetter.length).replace(/[\0?*:]/g, '_')
        return name
      }
    }
  }

  return cfg
}

module.exports = {
  getBuildConfig,
  getEsBuildConfig
}
