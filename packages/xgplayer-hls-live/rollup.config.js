const commonRollup = require('../../rollup.config')
const uglify = process.env.NODE_ENV === 'production'

const configToIe11 = {
  input: 'src/index.js',
  output: [
    {
      file: uglify ? 'dist/index.all.min.js' : 'dist/index.all.js',
      name: 'HlsLivePlayer',
      format: 'umd',
      sourcemap: !uglify,
      globals: {
        xgplayer: 'Player'
      }
    }
  ],
  name: 'HlsLivePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    xgplayer: 'Player'
  },
  // babel
  targets: {
    chrome: '58',
    ie: '11'
  }
}

const config = {
  input: 'src/index.js',
  name: 'HlsLivePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    xgplayer: 'Player'
  }
}

const mobileConfig = {
  input: 'src/mobile/index.js',
  output: [
    {
      file: uglify ? 'dist/mobile.min.js' : 'dist/mobile.js',
      name: 'HlsLiveMobilePlayer',
      format: 'umd',
      sourcemap: !uglify,
      globals: {
        xgplayer: 'Player'
      }
    }
  ],
  name: 'HlsLiveMobilePlayer',
  uglify: uglify,
  external: ['xgplayer'],
  globals: {
    xgplayer: 'Player'
  }
}
module.exports = [commonRollup(configToIe11), commonRollup(config), commonRollup(mobileConfig)]
