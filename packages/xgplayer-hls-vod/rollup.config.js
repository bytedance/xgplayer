const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  input: './src/index.js',
  name: 'HlsVodPlayer',
  uglify: uglify,
  babel: {},
  external: ['xgplayer'],
  globals: {
    'xgplayer': 'Player'
  },
  watch: {
    chokidar: true,
    include: ['node_modules/**/**', 'src/**']
  }
}
module.exports = commonRollup(config)
