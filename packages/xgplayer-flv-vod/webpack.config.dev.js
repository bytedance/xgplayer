const webpackMerge = require('webpack-merge')
const { umd, client } = require('../../webpack.config')

const developUMD = webpackMerge(umd, {
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-flv',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  mode: 'development',
})

const developClient = webpackMerge(client, {
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'FlvPlayer',
    libraryTarget: 'window'
  },
  devtool: 'inline-source-map',
  mode: 'development'
})


module.exports = [developUMD, developClient]
