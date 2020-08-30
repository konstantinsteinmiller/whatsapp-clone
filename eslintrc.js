module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },

  plugins: ['prettier', 'node', 'import', 'promise'],

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:node/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],

  rules: {
    'spaced-comment': ['error', 'always'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-multi-str': 'error',
    'no-undefined': 'error',
    'handle-callback-err': 'error',
    'no-path-concat': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'no-alert': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    curly: 'error',

    'prettier/prettier': ['error', { singleQuote: true, semi: false }],

    'promise/no-nesting': ['error'],

    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }
    ]
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue']
      },
      alias: {
        map: [['@', './']],
        extensions: ['.js', '.vue']
      }
    }
  }
}
