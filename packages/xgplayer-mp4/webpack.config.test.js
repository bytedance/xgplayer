const webpackConfigs = require('./webpack.config.js')

webpackConfigs[0].mode = 'development'
webpackConfigs[0].output = {
  filename: '[name].js',
}

module.exports = webpackConfigs[0]
