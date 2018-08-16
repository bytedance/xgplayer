const polyfill = []

const umd = {
  entry: polyfill.concat(['./src/index.js']),
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    openPage: 'examples'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'xgplayer-music.js',
    libraryTarget: 'umd'
  },
  mode: 'development',
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
  externals: {
    'xgplayer': 'xgplayer'
  },
  optimization: {
    minimize: true
  }
}

const client = {
  entry: polyfill.concat(['./src/index.js']),
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    open: true,
    openPage: 'examples'
  },
  output: {
    path: `${__dirname}/browser`,
    filename: 'index.js',
    library: 'Music',
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
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
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
