const webpackMerge = require('webpack-merge')
const { umd, client } = require('./webpack.config')

const developUMD = webpackMerge(umd, {
  devtool: 'inline-source-map',
  mode: 'development',
})

const developClient = webpackMerge(client, {
  devtool: 'inline-source-map',
  mode: 'development'
})


module.exports = [developUMD, developClient]
