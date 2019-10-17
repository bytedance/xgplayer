const webpackMerge = require('webpack-merge')
const { umd, client } = require('../../webpack.config')

const buildUMD = webpackMerge(umd, {
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'xgplayer-flv',
    libraryTarget: 'umd'
  },
  mode: 'production'
})

const buildClient = webpackMerge(client, {
  output: {
    path: `${__dirname}/browser`,
    filename: '[name].js',
    library: 'FlvPlayer',
    libraryTarget: 'window'
  },
  mode: 'production'
})

const buildMobileUMD = webpackMerge(umd, {
  entry: ['./src/mobile.js'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.umd.js',
    library: 'xgplayer-flv',
    libraryTarget: 'umd'
  },
  mode: 'production'
})

const buildMobileClient = webpackMerge(client, {
  entry: ['./src/mobile.js'],
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'FlvPlayer',
    libraryTarget: 'window'
  },
  mode: 'production'
})

module.exports = [buildUMD, buildClient, buildMobileUMD, buildMobileClient]
