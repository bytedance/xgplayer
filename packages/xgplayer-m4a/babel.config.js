
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
      'inline-svg',
      {
        svgo: {
          plugins: [
            {
              removeViewBox: false,
              removeDimensions: true
            }
          ]
        }
      }
    ], [
      'search-and-replace',
      {
        rules: [{
          search: /__XGPLAYER_MP4__/,
          replace: JSON.stringify(version)
        }]
      }
    ]
  ]
}
