const webpackConfigs = require('./webpack.config.js')

webpackConfigs[0].mode = 'development'

module.exports = webpackConfigs[0]
