const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const alignAssignments = require("eslint-plugin-align-assignments");
const babelParser = require("@babel/eslint-parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const noRestrictedProperies = require("eslint-config-airbnb-base/rules/best-practices").rules["no-restricted-properties"].filter(
    rule => !(rule.object === "Math" && rule.property === "pow" || rule.object === "window" && rule.property === "isNaN"),
);

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            Genoverse: true,
        },

        parser: babelParser,
        ecmaVersion: 8,
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
        },
    },

    plugins: {
        "align-assignments": alignAssignments,
    },

    extends: compat.extends("airbnb-base"),

    rules: {
        "align-assignments/align-assignments": "error",

        "padding-line-between-statements": ["error", ...[[
            "*",
            ["multiline-block-like", "return", "break", "export", "throw", "cjs-export"],
        ], ["*", ["cjs-import", "import", "const", "let", "var"]], [
            ["multiline-block-like", "return", "break", "export", "throw", "cjs-export"],
            "*",
        ], [["cjs-import", "import", "const", "let", "var"], "*"], ["cjs-import", "cjs-import", "any"], ["import", "import", "any"], ["singleline-const", "const", "any"], ["singleline-let", "let", "any"], ["singleline-var", "var", "any"], ["expression", "expression", "any"]].map(([prev, next = "*", blankLine = "always"]) => ({
            prev,
            next,
            blankLine,
        }))],

        "max-len": "off",
        "no-multi-spaces": "off",
        "no-multi-assign": "off",
        "no-nested-ternary": "off",
        "no-prototype-builtins": "off",
        "no-plusplus": "off",
        "operator-linebreak": "off",
        "prefer-destructuring": "off",
        "quote-props": "off",
        "template-curly-spacing": "off",
        "yoda": "off",
        "no-underscore-dangle": "off",
        "newline-per-chained-call": "off",
        "default-param-last": "off",
        "no-promise-executor-return": "off",
        "no-continue": "off",
        "no-fallthrough": "off",
        "no-bitwise": "off",
        "func-names": "off",
        "no-param-reassign": "off",

        "array-bracket-spacing": ["warn", "always", {
            objectsInArrays: false,
            arraysInArrays: false,
        }],

        "quotes": ["warn", "single", {
            avoidEscape: true,
        }],

        "arrow-parens": ["error", "as-needed", {
            requireForBlockBody: true,
        }],

        "function-paren-newline": ["error", "consistent"],
        "function-call-argument-newline": ["error", "consistent"],
        "linebreak-style": ["error", "unix"],
        "object-shorthand": ["error", "consistent"],

        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "always-multiline",
            functions: "never",
        }],

        "key-spacing": ["error", {
            singleLine: {
                beforeColon: false,
                afterColon: true,
            },

            multiLine: {
                beforeColon: false,
                afterColon: true,
            },

            align: {
                beforeColon: true,
                afterColon: true,
                on: "colon",
            },
        }],

        "object-curly-newline": ["error", {
            ObjectExpression: {
                multiline: true,
                consistent: true,
            },

            ObjectPattern: {
                multiline: true,
                consistent: true,
            },
        }],

        "import/no-extraneous-dependencies": ["error"],

        "import/order": ["error", {
            alphabetize: {
                order: "asc",
            },

            groups: ["builtin", "external", "internal", "parent", "sibling"],
        }],

        "no-restricted-globals": ["error", "event", "isFinite"],
        "no-restricted-properties": noRestrictedProperies,
        "consistent-return": "off",
    },
}, globalIgnores([
    "**/node_modules",
    "**/dist",
    "**/*.min.js",
    "src/js/lib/dalliance/*.js",
    "src/js/lib/jquery-plugins/*.js",
]), {
    files: ["test/**/*.js"],

    languageOptions: {
        globals: {
            jest: true,
            describe: true,
            it: true,
            expect: true,
            fail: true,
            beforeAll: true,
            afterAll: true,
            afterEach: true,
            beforeEach: true,
        },
    },
}]);
