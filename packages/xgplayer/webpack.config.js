const polyfill = []

const umd = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/index.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'xgplayer',
    libraryTarget: 'umd'
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
    },{
      test: /\.svg/,
      loader: 'raw-loader'
    }]
  },
  optimization: {
    minimize: true
  }
}

const client = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/index.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/browser`,
    filename: '[name].js',
    library: 'Player',
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
    },{
      test: /\.svg/,
      loader: 'raw-loader'
    }]
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [umd, client]
