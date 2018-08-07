// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const polyfill = []
const umd = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-panoramic',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}

const client = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'Player',
    libraryExport: 'default',
    libraryTarget: 'window'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}

module.exports = [umd, client]
