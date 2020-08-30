const processors = []

// only use preprocessor if linting single file vue components
if (process.env.npm_lifecycle_event === 'lint:styles:vue') {
  processors.push('@mapbox/stylelint-processor-arbitrary-tags')
}

module.exports = {
  processors,
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],

  rules: {
    'selector-no-qualifying-type': null,
    'selector-max-id': 1,
    'selector-max-compound-selectors': 10,
    'max-nesting-depth': 10,
    'color-hex-case': null,
    'string-no-newline': null,
    'declaration-colon-newline-after': null,
    'function-parentheses-space-inside': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'scss/at-import-no-partial-leading-underscore': null,

    'order/properties-alphabetical-order': null,
    'order/order': [
      {
        type: 'at-rule',
        name: 'import'
      },
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'include'
      },
      {
        type: 'at-rule',
        name: 'extend'
      }
    ],
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "apply",
        "tailwind",
        "include",
        "extend",
        "screen"
      ]
    }],
  }
}
