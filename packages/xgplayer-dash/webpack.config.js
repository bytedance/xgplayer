const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.scss.js',
    library: 'xgplayer-dash',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
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
    minimize: true
  }
}

const client = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.scss.js',
    library: 'DashPlayer',
    libraryTarget: 'window'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
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
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [umd, client]
