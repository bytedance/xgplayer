const { umd, client } = require('../../webpack.config')
umd.output = {
  path: `${__dirname}/dist`,
  filename: 'index.js',
  library: 'xgplayer-flv',
  libraryTarget: 'umd'
}

client.output = {
  path: `${__dirname}/browser`,
  filename: 'index.js',
  library: 'FlvPlayer',
  libraryTarget: 'window'
}

module.exports = [umd, client]
