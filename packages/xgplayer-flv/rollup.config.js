const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'FlvPlayer',
  uglify: uglify,
  globals: {
    'xgplayer': 'Player'
  },
  external: ['xgplayer']
}
module.exports = commonRollup(config)
