module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'stable',
    'stable/typescript',
  ],
  ignorePatterns: [
    'node_modules/',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
