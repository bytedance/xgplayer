import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import scss from 'rollup-plugin-scss'
import svg from 'rollup-plugin-svg-import'
import replace from '@rollup/plugin-replace'
import { version } from '../packages/xgplayer/package.json'
import dashPkg from '../packages/xgplayer-dash/package.json'


const packagesDir = path.resolve(__dirname, '../packages')
const fixturesDir = path.resolve(__dirname, '../fixtures')
const target = process.env.target || 'xgplayer'
const fixture = process.env.fixture || target
const pkgName = target.startsWith('xgplayer') ? target : `xgplayer-${target}`
const fixtureDir = path.resolve(fixturesDir, fixture)
const isPlayer = target === 'xgplayer'
const entries = fs.readdirSync(packagesDir)
                .reduce((p, c) => (p[c] = path.resolve(packagesDir, c, 'src/index.js'), p), {})

export default [
  {
    input: path.resolve(__dirname, '../packages', pkgName, 'src/index.js'),
    output: [
      {
        name: pkgName,
        file: path.resolve(fixtureDir, 'main.js'),
        format: `umd`
      }
    ],
    plugins: [
      ...commonPlugins(),
      serve({
        port: 8081,
        contentBase: [fixtureDir],
        onListening() {
          if (process.platform === 'darwin') {
            setTimeout(() => {
              try {
                execSync('ps cax | grep "Google Chrome"')
                execSync('osascript openChrome.applescript "' + encodeURI('http://127.0.0.1:8081') + '"', {
                  cwd: __dirname,
                  stdio: 'ignore'
                })
              } catch (err) {
                // Ignore errors.
              }
            }, 1000)
          }
        }
      }),
      livereload({
        watch: [packagesDir, fixtureDir]
      })
    ]
  },
  {
    input: path.resolve(__dirname, '../packages/xgplayer/src/presets/default.scss'),
    output: {
      file: path.resolve(fixtureDir, 'player.js'),
      format: 'es'
    },
    plugins: [scss()]
  },
  isPlayer ? undefined : {
    input: path.resolve(__dirname, '../packages/xgplayer/src/index.js'),
    output: [
      {
        name: 'xgplayer',
        file: path.resolve(fixtureDir, 'player.js'),
        format: `umd`
      }
    ],
    plugins: commonPlugins()
  }
].filter(Boolean)

function commonPlugins() {
  return [
    svg(),
    scss(),
    commonjs(),
    alias({ entries }),
    nodeResolve(),
    replace({
      __XGPLAYER_VERSION__: JSON.stringify(version),
      __XGPLAYER_DASH__: JSON.stringify(dashPkg.version),
      preventAssignment: true
    })
  ]
}
