const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-flv.js',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
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
  externals: {
    'xgplayer': 'xgplayer'
  },
  optimization: {
    minimize: false
  }
}

const client = {
  devtool: 'source-map',
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'FlvJsPlayer',
    libraryTarget: 'window'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
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
  externals: {
    'xgplayer': 'Player'
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [umd, client]
