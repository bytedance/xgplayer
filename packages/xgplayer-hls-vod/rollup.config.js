
const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: 'src/index.js',
  name: 'HlsVodPlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  }
}

const mobileConfig = {
  input: 'src/mobile/index.js',
  output: [
    {
      file: uglify ? 'dist/mobile.min.js' : 'dist/mobile.js',
      name: 'HlsVodMobilePlayer',
      format: 'umd',
      sourcemap: !uglify,
      globals: {
        'xgplayer': 'Player'
      }
    }
  ],
  name: 'HlsVodMobilePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  }
}

module.exports = [commonRollup(config), commonRollup(mobileConfig)]
