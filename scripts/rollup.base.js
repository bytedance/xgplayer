import path from 'path'
import fs from 'fs'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import svg from 'rollup-plugin-svg-import'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import { babel } from '@rollup/plugin-babel'

const packagesDir = path.resolve(__dirname, '../packages')
const entries = fs.readdirSync(packagesDir).reduce((p, c) => (p[c] = path.resolve(packagesDir, c, 'src/index.js'), p), {})

export function commonPlugins (pkgInfo) {
  return [
    alias({ entries }),
    nodeResolve(),
    commonjs(),
    json(),
    svg(),
    replace({
      __VERSION__: `"${pkgInfo.version}"`,
      __DEV__: process.env.IS_DEVELOPMENT === 'true',
      preventAssignment: true
    }),
    webWorkerLoader({
      targetPlatform: 'browser',
      external: []
    }),
    babel({
      exclude: [/core-js/, /worker\.js/, /hevc-worker\.js/, /hevc-worker-thread\.js/],
      babelHelpers: 'runtime'
    })
  ]
}

export function createCssConfig (input, output, pkgDir) {
  const config = {
    input,
    plugins: [
      scss({
        output,
        processor: () => postcss([autoprefixer()]),
        includePaths: [
          path.resolve(__dirname, '../node_modules')
        ],

        // watch mode
        outputStyle: pkgDir ? undefined : 'compressed',
        watch: pkgDir ? path.resolve(pkgDir, 'src') : undefined
      })
    ]
  }
  return config
}

export function getUmdName (pkg, pathName) {
  return pkg.umdName || pathName.replace(/^xgplayer/i, 'XGPlayer').replace(/-([A-Za-z])/g, (_, c) => c.toUpperCase())
}

export function getJsEntry (pkgDir, esEntry = []) {
  const esIndex = path.resolve(pkgDir, 'src/index.js')
  let entryFileJsUmd = path.resolve(pkgDir, 'src/index.umd.js')
  entryFileJsUmd = fs.existsSync(entryFileJsUmd) ? entryFileJsUmd : esIndex

  const esEntryFiles = esEntry.map(x => path.resolve(pkgDir, x))
  esEntryFiles.push(esIndex)

  return [esEntryFiles, entryFileJsUmd]
}

export function getCssEntry (pkgDir) {
  const entryFileCss = path.resolve(pkgDir, 'src/index.scss')
  const entryFileCssMobile = path.resolve(pkgDir, 'src/index.mobile.scss')

  return [fs.existsSync(entryFileCss) && entryFileCss, fs.existsSync(entryFileCssMobile) && entryFileCssMobile]
}

export function getUmdGlobals (peerDependencies, custom) {
  let globals = {}
  if (peerDependencies.length) {
    const pkgNames = fs.readdirSync(packagesDir).reduce((ret, p) => {
      try {
        const pkgInfo = require(path.resolve(packagesDir, p, 'package.json'))
        ret[pkgInfo.name] = getUmdName(pkgInfo, p)
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
