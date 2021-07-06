const path = require('path')
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    babelOptions: {
      configFile: path.resolve(__dirname, './babel.config.js')
    }
  },
  extends: [
    'standard'
  ],
  rules: {
    'array-callback-return': 0
    // allowImplicit: false
  },
  overrides: [
    {
      files: ['packages/**/**.js'],
      globals: {
        fetch: true,
        Headers: true
      }
    }
  ]
}
