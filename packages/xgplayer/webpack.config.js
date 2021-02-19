const polyfill = []

const moduleConfig = {
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
  }, {
    test: /\.svg/,
    loader: 'raw-loader'
  }]
};

const umd = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/simple_player.js']),
    'core_player': polyfill.concat(['./src/core_player.js']),
    controls: polyfill.concat(['./src/controls.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'xgplayer',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: moduleConfig,
  optimization: {
    minimize: true
  }
}

const client = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/simple_player.js']),
    'core_player': polyfill.concat(['./src/core_player.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/browser`,
    filename: '[name].js',
    library: 'Player',
    libraryTarget: 'window'
  },
  module: moduleConfig,
  mode: 'production',
  optimization: {
    minimize: true
  }
}

const client_controls = {
  entry: {
    controls: polyfill.concat(['./src/controls.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/browser`,
    filename: '[name].js',
    library: 'PlayerControls',
    libraryTarget: 'window'
  },
  module: moduleConfig,
  mode: 'production',
  optimization: {
    minimize: true
  }
}

module.exports = [umd, client, client_controls]
