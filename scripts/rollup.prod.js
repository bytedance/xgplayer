import path from 'path'
import renameNodeModules from 'rollup-plugin-rename-node-modules'
import { terser } from 'rollup-plugin-terser'
import { commonPlugins, createCssConfig, getUmdName, getJsEntry, getCssEntry, getUmdGlobals } from './rollup.base'

const target = process.env.TARGET

if (!target) {
  throw new Error('Please specify the TARGET')
}

const packagesDir = path.resolve(__dirname, '../packages')
const pkgDir = path.resolve(packagesDir, target)
const pkgInfo = require(path.resolve(pkgDir, 'package.json'))

const [esEntryFiles, entryFileJsUmd] = getJsEntry(pkgDir, pkgInfo.esEntry)
const [entryFileCss, entryFileCssMobile] = getCssEntry(pkgDir)

export default [
  ...createJsConfig(pkgInfo),
  entryFileCss && createCssConfig(entryFileCss, path.resolve(pkgDir, `dist/${pkgInfo.cssFileName || 'index'}.css`)),
  entryFileCssMobile && createCssConfig(entryFileCssMobile, path.resolve(pkgDir, `dist/${pkgInfo.cssFileNameMobile || 'index.mobile'}.css`))
].filter(Boolean)


function createEsConfig (input, peerDependencies, dependencies) {
  return {
    external: [...peerDependencies, ...dependencies].map(x => new RegExp(`^${x}`)),
    input: input,
    output: [
      {
        format: 'es',
        dir: path.resolve(pkgDir, 'es'),
        preserveModules: true,
        preserveModulesRoot: `packages/${target}/src`,
        // some plugin generated virtual file
        // The file name is not js suffix, which will cause vite crash
        sanitizeFileName (name) {
          // commonjs plugin add query suffix
          // @see https://github.com/rollup/plugins/blob/master/packages/commonjs/src/helpers.js#L5
          if (name.includes('.js?')) {
            return name.slice(0, name.lastIndexOf('?'))
          }
          // rollup default behavior
          const match = /^[a-z]:/i.exec(name)
          const driveLetter = match ? match[0] : ''
          name = driveLetter + name.substr(driveLetter.length).replace(/[\0?*:]/g, '_')
          // web-worker-loader plugin not add .js suffix
          // @see https://github.com/darionco/rollup-plugin-web-worker-loader/blob/master/src/helper/auto/createBase64WorkerFactory.js#L2
          if (name.endsWith('web-worker-loader__helper__browser__createBase64WorkerFactory')) name += '.js'
          return name
        },
        plugins: [
          // npm will ignore node_modules folder, rename to _externals
          renameNodeModules('_externals')
        ]
      }
    ],
    plugins: commonPlugins(pkgInfo)
  }
}

function createJsConfig (pkgInfo) {
  const peerDependencies = Object.keys(pkgInfo.peerDependencies || {})
  const dependencies = Object.keys(pkgInfo.dependencies || {})
  const esConfig = esEntryFiles.map(x => createEsConfig(x, peerDependencies, dependencies))

  return [
    {
      external: peerDependencies.map(x => new RegExp(`^${x}(?:/[^/\\\\]+)*$`)),
      input: entryFileJsUmd,
      output: [
        {
          sourcemap: false,
          name: getUmdName(pkgInfo, target),
          format: 'umd',
          file: path.resolve(pkgDir, 'dist/index.min.js'),
          exports: 'default',
          globals: getUmdGlobals(peerDependencies, pkgInfo.umdGlobals),
          plugins: [terser()]
        }
      ],
      plugins: commonPlugins(pkgInfo)
    },
    ...esConfig
  ]
}
