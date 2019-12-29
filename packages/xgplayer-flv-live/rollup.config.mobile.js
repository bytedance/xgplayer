const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: './src/mobile.js',
  output: [
    {
      file: uglify ? 'dist/mobile.min.js' : 'dist/mobile.js',
      name: 'FlvLiveMobilePlayer',
      format: 'umd',
      sourcemap: true,
      globals: {
        'xgplayer': 'Player'
      }
    }
  ],
  name: 'FlvLiveMobilePlayer',
  external: ['xgplayer'],
  babel: {
    runtimeHelpers: true
  }
}

module.exports = commonRollup(config)
