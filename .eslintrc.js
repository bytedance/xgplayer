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
      configFile: './.babelrc'
    }
  },
  extends: [
    'standard'
  ],
  rules: {
  },
  'overrides': [
    {
      'files': ['packages/**/**.js'],
      'globals': {
        'fetch': true,
        'Headers': true
      }
    }
  ]
}
