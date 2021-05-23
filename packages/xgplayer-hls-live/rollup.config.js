const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'HlsLivePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  babel: {
    runtimeHelpers: true,
    babelrc: false,
    'presets': [
      [
        'env',
        {
          'targets': ['IE 10', 'chrome > 57'],
          'modules': false,
          'useBuiltIns': 'usage',
          'corejs': 3
        }
      ]
    ]
    // externalHelpers: false
  }
}

const mobileConfig = {
  input: 'src/mobile/index.js',
  output: [
    {
      file: uglify ? 'dist/mobile.min.js' : 'dist/mobile.js',
      name: 'HlsLiveMobilePlayer',
      format: 'umd',
      sourcemap: false,
      globals: {
        'xgplayer': 'Player'
      }
    }
  ],
  name: 'HlsLiveMobilePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  }
}

module.exports = [commonRollup(config), commonRollup(mobileConfig)]
