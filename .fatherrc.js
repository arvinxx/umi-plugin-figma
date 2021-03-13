module.exports = {
  entry: 'src/index.ts',
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
};
