module.exports = api => {
  if (api.env('test')) {
    return {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
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
