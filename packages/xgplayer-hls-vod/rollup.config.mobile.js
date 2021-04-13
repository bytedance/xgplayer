const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: './src/mobile/index.js',
  output: [
    {
      file: uglify ? 'dist/mobile/index.min.js' : 'dist/mobile/index.js',
      name: 'HlsVodMobilePlayer',
      format: 'umd',
      sourcemap: true,
      globals: {
        'xgplayer': 'Player'
      }
    }
  ],
  name: 'HlsVodMobilePlayer',
  external: ['xgplayer'],
  babel: {
    runtimeHelpers: true
  },
  uglify: uglify
}

module.exports = commonRollup(config)
