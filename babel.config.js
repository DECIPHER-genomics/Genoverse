module.exports = (api) => {
  if (api.caller(({ name }) => name === 'babel-jest')) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: [[ 'transform-amd-to-commonjs', { restrictToTopLevelDefine: false }], 'require-context-hook' ],
    };
  }

  return {};
};
