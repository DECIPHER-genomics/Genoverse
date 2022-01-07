const noRestrictedProperies = require('eslint-config-airbnb-base/rules/best-practices').rules['no-restricted-properties'].filter(
  rule => !(
    // Disable options which force code that doesn't work in IE11
    (rule.object === 'Math'   && rule.property === 'pow')  ||
    (rule.object === 'window' && rule.property === 'isNaN')
  )
);

module.exports = {
  env: {
    browser : true,
    jquery  : true
  },
  plugins : [ 'es' ],
  extends : [
    'airbnb-base',
    'plugin:es/no-new-in-es2018',
    'plugin:es/no-new-in-es2017',
    'plugin:es/no-new-in-es2016',
    'plugin:es/no-new-in-es2015'
  ],
  parserOptions: {
    parser      : 'espree',
    ecmaVersion : 5,
    sourceType  : 'script'
  },
  globals: {
    Base         : true,
    Genoverse    : true,
    RTree        : true,
    dallianceLib : true,
    VCFReader    : true,
    BWReader     : true
  },
  ignorePatterns: [
    '.eslintrc.js',
    '**/*.min.js',
    'js/lib/**/*.js'
  ],
  rules: {
    'linebreak-style'       : [ 'error', 'unix' ],
    'comma-dangle'          : [ 'error', 'never' ],
    'quotes'                : [ 'warn', 'single', { avoidEscape: true }], // be more permissive than airbnb - allow 'double quotes containing 'singles''
    'object-shorthand'      : [ 'error', 'never' ],
    'array-bracket-spacing' : [ 'warn', 'always', {
      objectsInArrays : false,
      arraysInArrays  : false
    }],
    'object-curly-newline': [ 'error', {
      ObjectExpression : { multiline: true, consistent: true },
      ObjectPattern    : { multiline: true, consistent: true }
    }],
    'key-spacing': [ 'error', {
      singleLine : { beforeColon: false, afterColon: true },
      multiLine  : { beforeColon: false, afterColon: true },
      align      : { beforeColon: true,  afterColon: true, on: 'colon' },
    }],
    'quote-props'                         : 'off',
    'no-multi-spaces'                     : 'off',
    'prefer-destructuring'                : 'off',
    'no-prototype-builtins'               : 'off',
    'no-nested-ternary'                   : 'off',
    'no-plusplus'                         : 'off',
    'template-curly-spacing'              : 'off',
    'no-var'                              : 'off',
    'one-var'                             : 'off',
    'one-var-declaration-per-line'        : 'off',
    'vars-on-top'                         : 'off',
    'func-names'                          : 'off',
    'prefer-arrow-callback'               : 'off',
    'prefer-spread'                       : 'off',
    'prefer-template'                     : 'off',
    'prefer-rest-params'                  : 'off',
    'no-param-reassign'                   : 'off',
    'no-multi-assign'                     : 'off',
    'no-underscore-dangle'                : 'off',
    'no-empty'                            : 'off',
    'switch-colon-spacing'                : 'off',
    'max-len'                             : 'off',
    'no-continue'                         : 'off',
    'consistent-return'                   : 'off',
    'operator-linebreak'                  : 'off',
    'guard-for-in'                        : 'off',
    'no-restricted-syntax'                : 'off',
    'no-restricted-globals'               : 'off',
    'function-paren-newline'              : 'off',
    'no-fallthrough'                      : 'off',
    'no-bitwise'                          : 'off',
    'no-cond-assign'                      : 'off',
    'no-new'                              : 'off',
    'newline-per-chained-call'            : 'off',
    'prefer-exponentiation-operator'      : 'off',
    'no-restricted-properties'            : noRestrictedProperies
  }
};
