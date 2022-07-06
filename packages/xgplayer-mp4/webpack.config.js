const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const polyfill = []
const argv = require('yargs').argv;

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-mp4',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    'xgplayer': 'xgplayer'
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    minimize: true
  }
}

const client = {
  entry: polyfill.concat(['./src/index.js']),
  devtool: 'source-map',
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'Mp4Player',
    libraryTarget: 'window'
  },
  // devtool: argv.watch ? 'source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'production',
  externals: {
    'xgplayer': 'Player'
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: [/\.(js|jsx)$/],
        exclude: [/node_modules/],
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            inline: 1,
            keep_fnames: true
          },
          mangle: {
            keep_fnames: true
          }
        }
      })
    ],
  }
}

module.exports = [umd, client]
