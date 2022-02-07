module.exports = {
  testEnvironment  : 'jsdom',
  testMatch        : [ '**/test/**/*.test.js' ],
  setupFiles       : [ '<rootDir>/jest.setup.js' ],
  moduleNameMapper : {
    '^js/(.*)$'  : '<rootDir>/src/js/$1',
    '^css/(.*)$' : 'identity-obj-proxy',
  },
  transform: {
    '\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [ '/node_modules/(?!jquery)' ],
};
