const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: 'src/mse/index.js',
  name: 'FlvLivePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  babel: {
    runtimeHelpers: true
  }
}

const mobileConfig = {
  input: 'src/mobile/index.js',
  output: [
    {
      file: uglify ? 'dist/mobile.min.js' : 'dist/mobile.js',
      name: 'FlvLiveMobilePlayer',
      format: 'umd',
      // sourcemap: true,
      globals: {
        'xgplayer': 'Player'
      }
    }
  ],
  name: 'FlvLiveMobilePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  }
}

module.exports = [commonRollup(config), commonRollup(mobileConfig)]
