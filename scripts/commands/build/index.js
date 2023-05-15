const path = require('path')
const fs = require('fs-extra')
const walk = require('klaw-sync')
const execa = require('execa')
const { prompt } = require('enquirer')
const { cyan, green, blue, bold } = require('colorette')
const zlib = require('zlib')
const { Project, ts } = require('ts-morph')
const brotli = require('brotli-size')
const ui = require('cliui')({ width: process.stdout.columns || 80 })
const { build: viteBuild } = require('vite')
const ctx = require('../../context')
const { getUmdName, getJsEntry, getUmdGlobals, getEsBuildConfig, getBuildConfig } = require('../../utils')

async function buildAll() {
  const pkgNames = fs.readdirSync(path.resolve(ctx.rootPath, './packages'))

  for (let name of pkgNames) {
    try {
      await build(name);
    } catch(e) {
      console.error(e.message);
      process.exit(1);
    } 
  }
}

async function build (target, { all } = {all: false}) {
  if (!target && all) {
    return buildAll();
  }

  if (!target && ctx.isMonorepo) {
    const ret = await prompt({
      type: 'autocomplete',
      name: 'name',
      message: 'Select package',
      choices: Object.values(ctx.pkgs).map(x => x.dir)
    })
    target = ret.name
    if (!target) throw new Error('pkg name is required')
  }
  const pkgDir = ctx.isMonorepo ? path.resolve(ctx.pkgsPath, target) : ctx.rootPath
  const pkgJsonDir = path.resolve(pkgDir, 'package.json')
  const pkgInfo = fs.readJsonSync(pkgJsonDir)
  const config = ctx.getConfig(pkgInfo)
  const distDir = path.resolve(pkgDir, 'dist')
  const esDir = path.resolve(pkgDir, 'es')

  const isTs = ctx.isTs(pkgDir)
  const [entryEs, entryUmd] = getJsEntry(pkgDir, isTs)

  const dependencies = Object.keys(pkgInfo.dependencies || {})
  if (
    config.legacy && config.legacy.enabled && config.legacy.needPolyfills && !dependencies.includes('core-js')
  ) {
    dependencies.push('core-js')
  }
  const peerDependencies = Object.keys(pkgInfo.peerDependencies || {})
  const peerExternal = peerDependencies.map(x => new RegExp(`^${x}(?:/[^/\\\\]+)*$`))
  const allExternal = peerExternal.concat(dependencies.map(x => new RegExp(`^${x}(?:/[^/\\\\]+)*$`)))

  fs.removeSync(distDir)
  fs.removeSync(esDir)

  const banner = ctx.getBanner(config, target, pkgInfo)
  const replace = ctx.getReplace(config, pkgInfo, false)
  process.env.BROWSERSLIST_CONFIG = pkgInfo.browserslist ? pkgJsonDir : ctx.rootPkgPath

  if (config.buildFormats !== false) {
    const formats = config.buildFormats = config.buildFormats || []

    if (formats.length === 1) {
      formats[0].output = formats[0].output || 'index.min.js'
      formats[0].outputCss = formats[0].outputCss || 'index.min.css'
    }

    if (!formats.length) {
      formats.push({
        format: 'umd',
        input: entryUmd,
        output: 'index.min.js',
        outputCss: 'index.min.css'
      })
    }

    await Promise.all(formats.map(async f => {
      if (typeof f === 'string') {
        f = { format: f, output: `index.${f}.min.js` }
      }
      f.format = f.format || 'umd'
      const isGlobal = f.format === 'umd' || f.format === 'iife'
      f.input = f.input || (isGlobal ? entryUmd : entryEs)
      f.name = f.name || isGlobal ? getUmdName(pkgInfo, config) : undefined
      f.output = f.output || `index.${f.format}.min.js`
      f.outputCss = f.outputCss || `index.${f.format}.min.css`
      const external = f.browser === false ? allExternal : peerExternal

      const buildFormat = async (dev, filename) => {
        let cfg = await getBuildConfig(false, {
          legacy: f.legacy ?? config.legacy.enabled,
          needPolyfills: f.needPolyfills ?? config.legacy.needPolyfills,
          babelExclude: config.legacy.exclude,
          replace: { ...replace, __DEV__: dev },
          banner,
          cssPreprocessorOptions: config.cssPreprocessorOptions,
          plugins: config.plugins,
          externals: config.externals,
          visualizer: config.visualizer
        })
        cfg.build.minify = 'terser'
        cfg.build.terserOptions = { module: f.format === 'es', output: { comments: false } }
        cfg.build.outDir = distDir
        cfg.build.sourcemap = !!config.prodSourceMap
        cfg.build.lib = {
          entry: f.input,
          name: f.name,
          fileName: () => filename || f.output,
          formats: [f.format]
        }
        cfg.build.rollupOptions = { external, output: {} }
        if (isGlobal) {
          cfg.build.rollupOptions.output.globals = getUmdGlobals(peerDependencies, config.umdGlobals)
        }
        cfg.build.rollupOptions.output.assetFileNames = f.outputCss
        cfg = ctx.runPreBuild(cfg, target, pkgInfo) || cfg
        console.log(`Building [${f.format + (dev ? '/dev' : '/prod')}] ${cyan(f.input)}`)
        await viteBuild(cfg)
      }

      if (f.keepDev) {
        const devName = `index.${f.format}.dev.min.js`
        const prodName = `index.${f.format}.prod.min.js`
        await buildFormat(true, devName)
        await buildFormat(false, prodName)
        fs.writeFileSync(path.join(distDir, f.output), getDistJSCode(devName, prodName))
      } else {
        await buildFormat(false)
      }
    }))
  }

  if (config.es !== false) {
    config.es = config.es || {
      keepCss: true,
      keepDev: true
    }
    if (config.es.enabled !== false) {
      const rep = { ...replace }
      rep.__DEV__ = false
      if (config.es.keepDev) {
        // eslint-disable-next-line quotes
        rep.__DEV__ = `(process.env.NODE_ENV !== 'production')`
      }

      let cfg = await getEsBuildConfig(pkgDir, target, entryEs, allExternal, {
        legacy: config.legacy.esEnabled,
        needPolyfills: config.legacy.esNeedPolyfills,
        replace: rep,
        banner,
        cssPreprocessorOptions: config.cssPreprocessorOptions,
        plugins: config.plugins
      })
      cfg = ctx.runPreBuild(cfg, target, pkgInfo) || cfg
      console.log(`Building [ES] ${cyan(entryEs)}`)
      await viteBuild(cfg)

      if (config.es.keepCss) {
        const srcDir = path.resolve(pkgDir, 'src')
        walk(srcDir, {
          nodir: true,
          traverseAll: true,
          filter ({ path }) {
            return path.endsWith('.less') || path.endsWith('.scss') || path.endsWith('.sass')
          }
        }).forEach(x => {
          fs.copySync(x.path, path.resolve(esDir, path.relative(srcDir, x.path)))
        })
      }
    }
  }

  if (config.declaration) {
    await buildTsType(pkgDir, target)
    if (config.bundleDts) {
      execa.sync('dts-bundle-generator', [
        '--no-banner',
        '--no-check',
        '--silent',
        '-o',
        path.resolve(pkgDir, 'dist', typeof config.bundleDts === 'string' ? config.bundleDts : 'index.d.ts'),
        path.resolve(esDir, 'index.d.ts')
      ], {
        stdio: 'inherit',
        preferLocal: true,
        cwd: pkgDir
      })

      if (!config.buildEs) fs.removeSync(esDir)
    }
  }

  process.on('exit', () => reportSize(pkgDir))

  ctx.runPostBuild(target, pkgInfo)
}

function reportSize (pkgDir) {
  const distFiles = walk(path.resolve(pkgDir, 'dist'), {
    nodir: true,
    traverseAll: true,
    filter ({ path }) {
      return path.endsWith('.js') || path.endsWith('.css')
    }
  }).map(x => {
    return { path: x.path, size: x.stats.size, name: path.basename(x.path), code: fs.readFileSync(x.path) }
  })

  const formatSize = size => (size / 1024).toFixed(2) + ' KiB'
  const gzipSize = code => formatSize(zlib.gzipSync(code).length)
  const brotliSize = code => formatSize(brotli.sync(code))
  const row = (a, b, c, d) => `${a}\t  ${b}\t${c}\t${d}`

  ui.div(
    row(
      bold(cyan(`File(${path.basename(pkgDir)})`)),
      bold(cyan('Size')),
      bold(cyan('Gzip')),
      bold(cyan('Brotli'))
    ) + '\n\n' +
    distFiles.map(file => row(
      /js$/.test(file.name)
        ? green(file.name)
        : blue(file.name),
      formatSize(file.size),
      gzipSize(file.code),
      brotliSize(file.code)
    )).join('\n')
  )

  console.log('\n\n' + ui.toString() + '\n\n')
  ui.resetOutput()
}

async function buildTsType (cwd, target) {
  const tsDir = path.resolve(cwd, 'tsconfig.json')
  const tsExist = fs.existsSync(tsDir)
  const srcDir = path.resolve(cwd, 'src')
  const esDir = path.resolve(cwd, 'es')

  const project = new Project({
    skipFileDependencyResolution: true,
    skipLoadingLibFiles: false,
    tsConfigFilePath: tsExist ? tsDir : undefined,
    compilerOptions: {
      rootDir: ctx.isMonorepo ? ctx.rootPath : srcDir,
      emitDeclarationOnly: true,
      declaration: true,
      declarationMap: false,
      declarationDir: esDir,
      allowJs: true,
      noEmit: false
    }
  })

  if (!tsExist) {
    project.addSourceFilesAtPaths(srcDir + '/**/*.js')
  }

  const cssRE = /\.(?:s[ca]ss|less|css)$/

  const result = project.emitToMemory({
    emitOnlyDtsFiles: true,
    customTransformers: {
      afterDeclarations: [(ctx) => {
        return {
          transformSourceFile (node) {
            const p = node.fileName
            return ts.visitNode(node, (n) => {
              return ts.visitEachChild(n, (x) => {
                if (ts.isImportDeclaration(x)) {
                  let newNode = null
                  x.forEachChild(c => {
                    if (ts.isStringLiteral(c)) {
                      const v = c.text
                      if (cssRE.test(v)) {
                        newNode = undefined
                      } else if (v.startsWith('@/')) {
                        newNode = ctx.factory.createImportDeclaration(x.decorators, x.modifiers, x.importClause, ctx.factory.createStringLiteral('./' + path.relative(
                          path.resolve(p, '..'),
                          path.resolve(srcDir, v.slice(2))
                        )), x.assertClause)
                      }
                    }
                  })
                  if (newNode) return newNode
                  if (newNode === undefined) return undefined
                }
                else if (ts.isExportDeclaration(x)) {
                  let hasFrom = false
                  let newNode = null
                  x.forEachChild(x => {
                    if (!hasFrom) hasFrom = x.kind === ts.SyntaxKind.FromKeyword
                  })
                  if (hasFrom) {
                    x.forEachChild(s => {
                      if (s.kind === ts.SyntaxKind.FromKeyword && s.text.startsWith('@/')) {
                        newNode = ctx.factory.createExportDeclaration(x.decorators, x.modifiers, x.isTypeOnly, x.exportClause, ctx.factory.createStringLiteral('./' + path.relative(
                          path.resolve(p, '..'),
                          path.resolve(srcDir, s.text.slice(2))
                        )), x.assertClause)
                      }
                    })
                  }
                  if (newNode) return newNode
                }
                return x
              }, ctx)
            })
          }
        }
      }]
    }
  })

  const files = result.getFiles()
  if (!files.length) return

  if (ctx.isMonorepo) {
    const mark = `/packages/${target}/src/`
    const writeProject = new Project()
    files.forEach((file) => {
      if (file.filePath.includes(mark)) {
        writeProject.createSourceFile(file.filePath.replace(mark, '/'), file.text, { overwrite: true })
      }
    })
    await writeProject.save()
  } else {
    await result.saveFiles()
  }
}

function getDistJSCode (dev, prod) {
  return `if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${prod}')
} else {
  module.exports = require('./v}')
}
`
}

module.exports = build
