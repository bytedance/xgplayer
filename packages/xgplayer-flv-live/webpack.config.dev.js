const webpackMerge = require('webpack-merge')
const { umd, client } = require('./webpack.config')

const developUMD = webpackMerge(umd, {
  devtool: 'inline-source-map',
  mode: 'development',
  externals: {
    'xgplayer': 'xgplayer'
  }
})

const developClient = webpackMerge(client, {
  devtool: 'inline-source-map',
  mode: 'development',
  externals: {
    'xgplayer': 'xgplayer'
  }
})

const devMobileUMD = webpackMerge(umd, {
  entry: ['./src/mobile.js'],
  output: {
    path: `${__dirname}/mobile`,
    filename: 'index.umd.js',
    library: 'xgplayer',
    libraryTarget: 'umd'
  },
  externals: {
    'xgplayer': 'xgplayer'
  },
  mode: 'development'
})

const devMobileClient = webpackMerge(client, {
  entry: ['./src/mobile.js'],
  output: {
    path: `${__dirname}/mobile`,
    filename: '[name].js',
    library: 'FlvPlayer',
    libraryTarget: 'window'
  },
  externals: {
    'xgplayer': 'xgplayer'
  },
  mode: 'development'
})

module.exports = [developUMD, developClient, devMobileUMD, devMobileClient]
