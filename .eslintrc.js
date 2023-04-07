module.exports = {
  extends: ['eslint:recommended', 'plugin:no-lookahead-lookbehind-regexp/recommended'],
  plugins: ['import', 'node'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    __VERSION__: 'readonly',
    __DEV__: 'readonly',
    module: 'readonly'
  },
  ignorePatterns: [
    'node_modules/*',
    'dist/*',
    'examples/*',
    'fixtures/*',
    '/**/__tests__/*',
    '/**/dist/*',
    '/**/es/*',
    '/**/lib/*',
    '/**/liv/*',
    '/**/browser/*'
  ],
  overrides: [
    {
      files: ['packages/**/**.js'],
      globals: {
        fetch: true,
        Headers: true,
        global: true
      }
    }
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': 'error',
    'space-infix-ops': 'error',
    'multiline-ternary': ['error', 'always-multiline'], // 如果表达式跨越多行，则在三元表达式的操作数之间强制换行。
    'spaced-comment': ['error', 'always'], // 注释空格
    'no-multi-spaces': 'error',
    'comma-dangle': ['error', 'never'], // 不使用拖尾逗号
    quotes: [2, 'single'],
    semi: ['error', 'never'], // 默认不使用分号
    // Possible Errors
    'getter-return': ['error', { allowImplicit: true }],
    'no-control-regex': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-extra-boolean-cast': 'off',
    'no-inner-declarations': ['error', 'both'],
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    'no-prototype-builtins': 'off',
    'no-unexpected-multiline': 'off',
    'require-atomic-updates': 'off',
    'no-cond-assign': 'off',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-implied-eval': 'error',
    // best Practices
    'block-scoped-var': 'warn',
    'default-case': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'warn',
    'no-proto': 'error',
    'no-useless-escape': 'off',
    // space
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    // es6
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'prefer-const': 'warn',
    'symbol-description': 'warn',

    // Variables
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'none'
      }
    ],
    'no-restricted-globals': [
      'warn',
      {
        name: 'isFinite',
        message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite'
      },
      {
        name: 'isNaN',
        message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan'
      }
    ],
    // 正则
    'no-lookahead-lookbehind-regexp/no-lookahead-lookbehind-regexp': [
      'error',
      'no-lookahead',
      'no-lookbehind',
      'no-negative-lookahead',
      'no-negative-lookbehind'
    ],

    // import
    'import/named': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/export': 'error',
    'import/no-named-as-default-member': 'error',

    'import/no-absolute-path': 'warn',
    'import/first': 'warn',
    'import/no-useless-path-segments': ['warn', { commonjs: true }],
    'import/no-deprecated': 'warn',
    'import/no-duplicates': 'warn'
  }
}
