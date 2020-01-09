const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  resolve: {
    symlinks: true
  },
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
    xgplayer: 'xgplayer'
  },
  optimization: {
    minimize: true
  }
}

const client = {
  entry: polyfill.concat(['./src/index.js']),
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
    xgplayer: 'Player'
  },
  resolve: {
    symlinks: true
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = {
  umd,
  client
}
