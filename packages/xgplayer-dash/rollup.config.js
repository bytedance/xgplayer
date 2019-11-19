const commonRollup = require('../../rollup.config');
const uglify = process.env.NODE_ENV === 'production';

const config = {
  name: 'DashPlayer',
  uglify: uglify,
  external: ['xgplayer', 'xml2js'],
  globals: {
    xgplayer: 'Player'
  }
}
module.exports = commonRollup(config)
