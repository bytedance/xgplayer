const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { execSync } = require('child_process')
const { version } = require('../packages/xgplayer/package.json')
const dashVersion = require('../packages/xgplayer-dash/package.json').version

const packagesDir = path.resolve(__dirname, '../packages')
const fixtureDir = path.resolve(__dirname, '../fixtures')

const alias = fs.readdirSync(packagesDir)
                .filter(x => x !== 'xgplayer')
                .reduce(
                  (p, c) => (p[c] = path.resolve(packagesDir, c, 'src/index.js'), p), 
                  { xgplayer: path.resolve(packagesDir, 'xgplayer/dev.js') }
                )

module.exports = env => {
  env.target = env.target || 'xgplayer'
  const isPlayer = env.target === 'xgplayer'

  const pkgDir = path.resolve(packagesDir, env.target.startsWith('xgplayer') ? env.target : `xgplayer-${env.target}`)
  const targetDir = path.resolve(fixtureDir, env.fixture || env.target)
  
  /**@type {import('webpack').Configuration} */
  const config = {
    mode: 'development',
    devtool: 'cheap-module-source-map',

    target: ['web'],

    entry: {
      client: 'webpack-dev-server/client',
      player: path.resolve(packagesDir, 'xgplayer/dev.js'),
      ...isPlayer ? undefined : { main: path.resolve(pkgDir, 'src/index.js') }
    },

    experiments: {
      outputModule: true,
    },

    output: {
      module: true,
      scriptType: 'module',
      library: {
        type: 'module',
      },
    },

    resolve: { alias },

    devServer: {
      contentBase: [fixtureDir, packagesDir],
      watchContentBase: true,
      liveReload: true,
      injectClient: false,
      host: '0.0.0.0',
      after() {
        if (process.platform === 'darwin') {
          setTimeout(() => {
            try {
              execSync('ps cax | grep "Google Chrome"')
              execSync('osascript openChrome.applescript "' + encodeURI('http://127.0.0.1:8080') + '"', {
                cwd: __dirname,
                stdio: 'ignore'
              })
            } catch (err) {
              // Ignore errors.
            }
          }, 1000)
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.svg$/,
          type: 'asset/source'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          use: [{loader: 'babel-loader', options: { plugins: [[
              'search-and-replace',
              {
                rules: [{
                  search: /__XGPLAYER_VERSION__/,
                  replace: JSON.stringify(version)
                }, {
                  search: /__XGPLAYER_DASH__/,
                  replace: JSON.stringify(dashVersion)
                }]
              }
            ]] } }]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        __XGPLAYER_VERSION__: `"${version}"`,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(targetDir, 'index.html')
      })
    ]
  }

  return config
}
