module.exports = api => {
  if (api.env('test')) {
    return {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
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
              search: /__XGPLAYER_VERSION__/,
              replace: JSON.stringify('TEST')
            }]
          }
        ]
      ]
    }
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: 58,
            ie: 10
          },
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ]
  }
}
