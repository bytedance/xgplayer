const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-flv.js',
    libraryTarget: 'umd'
  },
  mode: 'development',
  devtool: 'inline-source-map',
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
  }
}

const client = {
  entry: polyfill.concat(['./src/index.js']),
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'FlvJsPlayer',
    libraryTarget: 'window'
  },
  devtool: 'inline-source-map',
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
  mode: 'development'
}

module.exports = [umd, client]
