const path = require('path')
const polyfill = []

const rules = [{
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
}];

const umdModuleConfig = {
  rules
};

const babelModuleConfig = {
  rules: rules.concat({
    test:/\.(js|jsx)$/,
    use:{
      loader:'babel-loader',
      options:{
        presets:[
          'es2015'
        ],
        plugins: [
          "add-module-exports",
          "babel-plugin-bulk-import"
        ]
      }
    },
    exclude:/node_modules/
  })
};

const umd = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/simple_player.js']),
    'core_player': polyfill.concat(['./src/core_player.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'xgplayer',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: babelModuleConfig,
  optimization: {
    minimize: true
  }
}

const umd_es6 = {
  entry: {
    index: polyfill.concat(['./src/index.js']),
    'simple_player': polyfill.concat(['./src/simple_player.js']),
    'core_player': polyfill.concat(['./src/core_player.js'])
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/es`,
    filename: '[name].js',
    library: 'xgplayer',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: umdModuleConfig,
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
  module: babelModuleConfig,
  mode: 'production',
  optimization: {
    minimize: true
  }
}

const controls = ['airplay', 'cssFullscreen', 'danmu', 'definition', 'download', 'enter', 'error', 'errorRetry', 
  'flex', 'fullscreen', 'i18n', 'keyboard', 'loading', 'localPreview', 'memoryPlay', 'miniplayer', 'mobile', 'pc', 
  'pip', 'play', 'playbackRate', 'playNext', 'poster', 'progress', 'reload', 'replay', 'rotate', 'screenShot', 
  'start', 'textTrack', 'nativeTextTrack', 'time', 'volume'];

const umd_es6_controls = controls.map(key => {
  return {
    entry: `./src/bind/${key}.js`,
    output: {
      filename: `${key}.js`,
      path: path.resolve(__dirname, 'es/controls'),
      library: ['xgplayer', 'PlayerControls', key],
      libraryTarget: 'umd'
    },
    mode: 'production',
    optimization: {},
    module: umdModuleConfig,
    devtool: false
  }
})

const umd_controls = controls.map(key => {
  return {
    entry: `./src/bind/${key}.js`,
    output: {
      filename: `${key}.js`,
      path: path.resolve(__dirname, 'dist/controls'),
      library: ['xgplayer', 'PlayerControls', key],
      libraryTarget: 'umd'
    },
    mode: 'production',
    optimization: {},
    module: babelModuleConfig,
    devtool: false
  }
})

const client_controls = controls.map(key => {
  return {
    entry: `./src/bind/${key}.js`,
    output: {
      filename: `${key}.js`,
      path: path.resolve(__dirname, 'browser/controls'),
      library: ['PlayerControls', key],
      libraryTarget: 'window'
    },
    mode: 'production',
    optimization: {},
    module: babelModuleConfig,
    devtool: false
  }
})

module.exports = [umd, umd_es6, client].concat(umd_controls, umd_es6_controls, client_controls)
