module.exports = {
  testEnvironment : 'jsdom',
  testMatch       : [ '**/test/**/*.test.js' ],
  setupFiles      : [ '<rootDir>/jest.setup.js' ],
  transform       : {
    '\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [ '/node_modules/(?!jquery)' ],
};
