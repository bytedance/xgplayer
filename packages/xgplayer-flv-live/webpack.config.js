const polyfill = []

const umd = {
  entry:  {index: ['./src/index.js'], mobile: ['./src/mobile.js']},
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'xgplayer-flv',
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
  entry: {index:polyfill.concat(['./src/index.js']), mobile:polyfill.concat(['./src/mobile.js'])},
  output: {
    path: `${__dirname}/browser`,
    filename: '[name].js',
    library: 'FlvPlayer',
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
  mode: 'development',
  devtool: 'inline-source-map'
}

module.exports = [umd, client]
