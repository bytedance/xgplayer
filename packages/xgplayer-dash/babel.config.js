
const babelTarget = process.env.BABEL_TARGET
const { version } = require('./package.json')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: babelTarget || false
      }
    ]
  ],
  babelrc: false,
  plugins: [
    [
      'search-and-replace',
      {
        rules: [{
          search: /__XGPLAYER_DASH__/,
          replace: JSON.stringify(version)
        }]
      }
    ]
  ]
}
