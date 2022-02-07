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
  extends : [
    'airbnb-base',
  ],
  globals: {
    Genoverse: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules',
    'dist',
    'index.js',
    '**/*.min.js',
    'src/js/lib/**/*.js'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              js  : `${__dirname}/src/js`,
              css : `${__dirname}/src/css`,
            },
          },
        },
      },
    },
  },
  overrides: [
    {
      files         : [ 'src/js/**/*.js' ],
      parser        : '@babel/eslint-parser',
      parserOptions : {
        requireConfigFile : false,
        ecmaVersion       : 8,
        sourceType        : 'module',
      },
      rules: {
        'import/no-mutable-exports': 'off',

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
    },
    {
      files : [ '**/*.js' ],
      excludedFiles: 'src/js/**/*.js',
      env   : {
        es6: true,
      },
      plugins : [ 'align-assignments' ],
      globals : {
        jest       : true,
        describe   : true,
        it         : true,
        expect     : true,
        fail       : true,
        beforeAll  : true,
        afterAll   : true,
        afterEach  : true,
        beforeEach : true,
      },
      rules: {
        'align-assignments/align-assignments' : [ 'error', { requiresOnly: false }],
        'padding-line-between-statements'     : [
          'error', ...[
            [ '*', [ 'multiline-block-like', 'return', 'break', 'export', 'throw', 'cjs-export' ]],
            [ '*', [ 'cjs-import', 'import', 'const', 'let', 'var' ]],
            [[ 'multiline-block-like', 'return', 'break', 'export', 'throw', 'cjs-export' ], '*' ],
            [[ 'cjs-import', 'import', 'const', 'let', 'var' ], '*' ],
            [ 'cjs-import',       'cjs-import', 'any' ],
            [ 'import',           'import', 'any' ],
            [ 'singleline-const', 'const', 'any' ],
            [ 'singleline-let',   'let', 'any' ],
            [ 'singleline-var',   'var', 'any' ],
            [ 'expression',       'expression', 'any' ],
          ].map(
            ([ prev, next = '*', blankLine = 'always' ]) => ({ prev, next, blankLine })
          ),
        ],
        'max-len'                    : 'off',
        'no-multi-spaces'            : 'off',
        'no-multi-assign'            : 'off',
        'no-nested-ternary'          : 'off',
        'no-prototype-builtins'      : 'off',
        'no-plusplus'                : 'off',
        'operator-linebreak'         : 'off',
        'prefer-destructuring'       : 'off',
        'quote-props'                : 'off',
        'template-curly-spacing'     : 'off',
        'yoda'                       : 'off',
        'no-underscore-dangle'       : 'off',
        'newline-per-chained-call'   : 'off',
        'default-param-last'         : 'off',
        'no-promise-executor-return' : 'off',
        'no-continue'                : 'off',
        'no-fallthrough'             : 'off',
        'no-bitwise'                 : 'off',
        'func-names'                 : 'off',
        'no-param-reassign'          : 'off',

        'array-bracket-spacing' : [ 'warn', 'always', { objectsInArrays: false, arraysInArrays: false }],
        'quotes'                : [ 'warn', 'single', { avoidEscape: true }],

        'arrow-parens'                   : [ 'error', 'as-needed', { requireForBlockBody: true }],
        'function-paren-newline'         : [ 'error', 'consistent' ],
        'function-call-argument-newline' : [ 'error', 'consistent' ],
        'linebreak-style'                : [ 'error', 'unix' ],
        'object-shorthand'               : [ 'error', 'consistent' ],

        'comma-dangle': [ 'error', {
          arrays    : 'always-multiline',
          objects   : 'always-multiline',
          imports   : 'always-multiline',
          exports   : 'always-multiline',
          functions : 'never',
        }],
        'key-spacing': [ 'error', {
          singleLine : { beforeColon: false, afterColon: true },
          multiLine  : { beforeColon: false, afterColon: true },
          align      : { beforeColon: true,  afterColon: true, on: 'colon' },
        }],
        'object-curly-newline': [ 'error', {
          ObjectExpression : { multiline: true, consistent: true },
          ObjectPattern    : { multiline: true, consistent: true },
        }],
        'import/no-extraneous-dependencies' : [ 'error' ],
        'import/order'                      : [ 'error', {
          alphabetize : { order: 'asc' },
          groups      : [ 'builtin', 'external', 'internal', 'parent', 'sibling' ],
        }],

        'no-restricted-globals'    : [ 'error', 'event', 'isFinite' ],
        'no-restricted-properties' : noRestrictedProperies,
      }
    },
  ]
};
